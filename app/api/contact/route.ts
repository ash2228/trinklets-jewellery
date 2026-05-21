import { NextRequest, NextResponse } from 'next/server';
import { connectDB, saveInMemorySubmission } from '@/lib/db';
import Contact from '@/models/Contact';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Please fill in all contact form fields.' }, { status: 400 });
    }

    const conn = await connectDB();
    if (conn) {
      // Real database connected
      const submission = new Contact({ name, email: email.toLowerCase(), message });
      await submission.save();
      return NextResponse.json({ success: true, message: 'Message submitted successfully. Thank you!' });
    } else {
      // In-memory simulation
      saveInMemorySubmission({ name, email: email.toLowerCase(), message, createdAt: new Date() });
      return NextResponse.json({
        success: true,
        message: 'Message captured successfully (Saved in-memory for preview!)',
        previewMode: true
      });
    }
  } catch (error: any) {
    console.error('Error in contact form submission API:', error);
    return NextResponse.json({ error: error.message || 'Server error, please try again.' }, { status: 500 });
  }
}
