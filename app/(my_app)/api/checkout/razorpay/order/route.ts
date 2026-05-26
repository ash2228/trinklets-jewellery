import { NextRequest, NextResponse } from 'next/server';
import { connectDB, saveInMemoryOrder } from '@/lib/db';
import Order from '@/models/Order';

export async function POST(req: NextRequest) {
  try {
    const { customerName, customerEmail, customerPhone, shippingAddress, items, totalAmount } = await req.json();

    if (!customerEmail || !customerName || !shippingAddress || !items || !items.length || !totalAmount) {
      return NextResponse.json({ error: 'Missing required checkout information.' }, { status: 400 });
    }

    // Connect to database
    const conn = await connectDB();

    // 1. Double check / Lazy initialize Razorpay integration
    const rzpKeyId = process.env.RAZORPAY_KEY_ID;
    const rzpSecret = process.env.RAZORPAY_SECRET;
    
    let razorpayOrderId = '';
    let isMock = true;

    // Check if we have valid-looking Razorpay credentials configured
    if (rzpKeyId && rzpSecret && !rzpKeyId.includes('your_key_id') && !rzpKeyId.includes('MY_')) {
      try {
        // Dynamic import / Lazy initiation of Razorpay SDK to prevent server startup crash or bundle bloat
        const Razorpay = (await import('razorpay')).default;
        const razorpayInstance = new Razorpay({
          key_id: rzpKeyId,
          key_secret: rzpSecret,
        });

        const options = {
          amount: Math.round(totalAmount * 100), // Razorpay wants amount in paise (Rupees * 100)
          currency: 'INR',
          receipt: `receipt_trinklets_${Date.now()}`,
        };

        const rzpOrder = await razorpayInstance.orders.create(options);
        razorpayOrderId = rzpOrder.id;
        isMock = false;
        console.log("🎟️ Real Razorpay order created successfully:", razorpayOrderId);
      } catch (sdkError) {
        console.warn("⚠️ Razorpay SDK ordering failed or keys error. Falling back to secure transaction simulation.", sdkError);
        razorpayOrderId = `order_sim_${Math.random().toString(36).substring(2, 11)}_${Date.now()}`;
        isMock = true;
      }
    } else {
      // Create a secure simulation Order ID
      razorpayOrderId = `order_sim_${Math.random().toString(36).substring(2, 11)}_${Date.now()}`;
      isMock = true;
      console.log("🧪 Razorpay credentials not active. Initiating secure integration simulation order:", razorpayOrderId);
    }

    // 2. Prepare Order schema
    const orderData = {
      customerName,
      customerEmail: customerEmail.toLowerCase(),
      customerPhone,
      shippingAddress,
      items,
      totalAmount,
      razorpayOrderId,
      status: 'Pending',
      createdAt: new Date(),
    };

    // 3. Save Order to Database (Real or In-memory Backup)
    let savedOrder;
    if (conn) {
      const order = new Order(orderData);
      savedOrder = await order.save();
    } else {
      saveInMemoryOrder(orderData);
      savedOrder = { ...orderData, _id: `id_temp_${Date.now()}` };
    }

    return NextResponse.json({
      success: true,
      order: savedOrder,
      razorpayOrderId,
      keyId: isMock ? 'rzp_test_simulation_key' : rzpKeyId,
      amount: totalAmount,
      isMock,
    });

  } catch (error: any) {
    console.error('CRITICAL: Failed to create order in api route:', error);
    return NextResponse.json({ error: error.message || 'Server error occurred during checkout order creation.' }, { status: 500 });
  }
}
