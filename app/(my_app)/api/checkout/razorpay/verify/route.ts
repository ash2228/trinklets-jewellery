import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { connectDB, getInMemoryData } from '@/lib/db';
import Order from '@/models/Order';

export async function POST(req: NextRequest) {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, isMock } = await req.json();

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json({ error: 'Missing payment confirmation parameters.' }, { status: 400 });
    }

    let isSignatureValid = false;

    if (isMock) {
      // Mock simulation: Always allow for easy testing
      isSignatureValid = true;
      console.log("🧪 Mock signature validation requested for simulated payment:", razorpayPaymentId);
    } else {
      // Real payment validation
      const secret = process.env.RAZORPAY_SECRET;
      if (!secret) {
        return NextResponse.json({ error: 'Razorpay Secret is not configured on the server-side.' }, { status: 500 });
      }

      const generatedSignature = crypto
        .createHmac('sha256', secret)
        .update(`${razorpayOrderId}|${razorpayPaymentId}`)
        .digest('hex');

      isSignatureValid = generatedSignature === razorpaySignature;
    }

    if (isSignatureValid) {
      const conn = await connectDB();
      
      if (conn) {
        // Real database operation
        const order = await Order.findOne({ razorpayOrderId });
        if (order) {
          order.status = 'Completed';
          order.razorpayPaymentId = razorpayPaymentId;
          order.razorpaySignature = razorpaySignature;
          await order.save();
          console.log("✅ Real Order status updated to Completed in MongoDB:", razorpayOrderId);
        } else {
          console.warn("⚠️ Database connected but order not found for update:", razorpayOrderId);
        }
      } else {
        // Local in-memory update database fallback
        const cache = getInMemoryData();
        const memoryOrder = cache.orders.find(o => o.razorpayOrderId === razorpayOrderId);
        if (memoryOrder) {
          memoryOrder.status = 'Completed';
          memoryOrder.razorpayPaymentId = razorpayPaymentId;
          memoryOrder.razorpaySignature = razorpaySignature;
          console.log("✅ In-memory Order updated to Completed:", razorpayOrderId);
        } else {
          console.warn("⚠️ Order not found in in-memory state:", razorpayOrderId);
        }
      }

      return NextResponse.json({
        success: true,
        message: 'Payment completed and verified successfully!',
        orderId: razorpayOrderId,
      });
    } else {
      console.error("❌ Invalid Razorpay payment signature signature verification failed!");
      return NextResponse.json({ error: 'Payment signature verification failed. Unauthorized.' }, { status: 400 });
    }

  } catch (error: any) {
    console.error('Error verification payment signature API:', error);
    return NextResponse.json({ error: error.message || 'Verification error, try again.' }, { status: 500 });
  }
}
