import { NextRequest, NextResponse } from 'next/server';
import { connectDB, saveInMemorySubscriber } from '@/lib/db';
import Newsletter from '@/models/Newsletter';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    const conn = await connectDB();
    if (conn) {
      // Real database connected
      // Check if subscriber already exists
      const existing = await Newsletter.findOne({ email: email.toLowerCase() });
      if (existing) {
        return NextResponse.json({ message: 'You have already subscribed!' });
      }

      const subscriber = new Newsletter({ email: email.toLowerCase() });
      await subscriber.save();
      return NextResponse.json({ success: true, message: 'Successfully subscribed to Trinklets Newsletter!' });
    } else {
      // In-memory simulation
      saveInMemorySubscriber({ email: email.toLowerCase(), createdAt: new Date() });
      return NextResponse.json({
        success: true,
        message: 'Subscribed successfully (saved in-memory for preview!)',
        previewMode: true
      });
    }
  } catch (error: any) {
    console.error('Error in newsletter subscription API:', error);
    return NextResponse.json({ error: error.message || 'Server error, please try again.' }, { status: 500 });
  }
}
