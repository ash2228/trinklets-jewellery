import { NextRequest, NextResponse } from 'next/server';
import { connectDB, saveInMemoryOrder } from '@/lib/db';
import Order from '@/models/Order';
import { getProductByIdentifier } from '@/lib/products';
import config from '@/config.json';

export async function POST(req: NextRequest) {
  try {
    const { customerName, customerEmail, customerPhone, shippingAddress, items } = await req.json();
    const {deliveryFee, subTotalThreshold} = config;
    if (!customerEmail || !customerName || !shippingAddress || !items || !items.length) {
      return NextResponse.json({ error: 'Missing required checkout information.' }, { status: 400 });
    }

    // Validate requested cart items against the latest product catalog
    const validatedItems: Array<{ id: string; name: string; price: number; quantity: number; image: string; category: string }> = [];
    let cartSubTotal = 0;

    for (const item of items) {
      if (!item?.id || !item?.quantity || item.quantity <= 0) {
        return NextResponse.json({ error: 'Invalid cart item payload.' }, { status: 400 });
      }

      const product = await getProductByIdentifier(item.id);
      if (!product) {
        return NextResponse.json({ error: `Product not found for item id ${item.id}` }, { status: 400 });
      }

      const quantity = Number(item.quantity) || 1;
      const price = Number(product.price) || 0;
      const validatedItem = {
        id: product.id,
        name: product.name,
        price,
        quantity,
        image: product.images[0] || '',
        category: product.category,
      };

      validatedItems.push(validatedItem);
      cartSubTotal += price * quantity;
    }

    const shippingFee = cartSubTotal > subTotalThreshold || cartSubTotal === 0 ? 0 : deliveryFee;
    const jewelleryGst = Math.round(cartSubTotal * 0.03);
    const totalAmount = cartSubTotal + shippingFee;

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
      items: validatedItems,
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
