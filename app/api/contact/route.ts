import { resend } from '@/lib/email';
import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  phone: string;
  service: string;
  location: string;
  message?: string;
  _honeypot?: string;
}

export async function POST(req: NextRequest) {
  const body: ContactFormData = await req.json();

  if (body._honeypot) {
    return NextResponse.json({ success: true });
  }

  if (!body.name?.trim() || !body.phone?.trim() || !body.service) {
    return NextResponse.json(
      { error: 'Name, phone, and service are required.' },
      { status: 400 }
    );
  }

  const digitsOnly = body.phone.replace(/\D/g, '');
  if (digitsOnly.length < 10) {
    return NextResponse.json(
      { error: 'Please enter a valid phone number.' },
      { status: 400 }
    );
  }

  try {
    await resend.emails.send({
      from: 'website@alaskanac.com',
      to: process.env.CONTACT_EMAIL!,
      subject: `New Lead — ${body.service} — ${body.location} — ${body.name}`,
      html: `
        <h2 style="color:#1B6CA8">New Contact Form Submission</h2>
        <table cellpadding="8" cellspacing="0" style="border-collapse:collapse">
          <tr><td><strong>Name</strong></td><td>${body.name}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${body.phone}</td></tr>
          <tr><td><strong>Service</strong></td><td>${body.service}</td></tr>
          <tr><td><strong>Location</strong></td><td>${body.location}</td></tr>
          <tr><td><strong>Message</strong></td><td>${body.message || 'None provided'}</td></tr>
        </table>
        <p style="color:#6B7280;font-size:12px;margin-top:16px">
          Submitted from alaskanac.com contact form
        </p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact form email failed:', err);
    return NextResponse.json(
      { error: 'Message could not be sent. Please call (844) 364-5800.' },
      { status: 500 }
    );
  }
}
