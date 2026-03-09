'use server';

import nodemailer from 'nodemailer';

export async function sendContactEmail(formData: FormData) {
  // 1. Ambil data dari form (Contact.tsx)
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  // 2. Validasi sederhana
  if (!name || !email || !message) {
    return { success: false, error: 'All fields are required.' };
  }

  try {
    // 3. Mengatur koneksi ke server email Hostinger (SMTP)
    // Nilai ini diambil dari file .env yang sudah Anda setting
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // Contoh: smtp.hostinger.com
      port: parseInt(process.env.SMTP_PORT || '465'), // Default port SSL adalah 465
      secure: process.env.SMTP_PORT === '465', // true untuk port 465 (SSL), false untuk TLS
      auth: {
        user: process.env.SMTP_USER, // Email admin Anda
        pass: process.env.SMTP_PASS, // Password email admin Anda
      },
    });

    // 4. Mengatur isi pesan email yang akan Anda terima di kotak masuk
    const mailOptions = {
      from: `"${name} (Website GGG)" <${process.env.SMTP_USER}>`, // Penting: 'from' harus selalu dari email SMTP Anda agar tidak dianggap spam
      to: process.env.RECEIVER_EMAIL || process.env.SMTP_USER, // Dikirim ke email admin Anda
      replyTo: email, // Jika Anda menekan "Reply" di email, akan langsung membalas ke email pengunjung
      subject: `New Message from Website: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`, // Versi teks biasa (untuk email client lama)

      // Versi HTML agar tampilan email lebih rapi dan profesional saat dibaca
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 10px; background-color: #ffffff;">
          <h2 style="color: #16a34a; border-bottom: 2px solid #16a34a; padding-bottom: 10px;">New Message from Website GGG Indonesia</h2>
          <div style="margin-top: 20px;">
            <p style="margin: 5px 0;"><strong>Sender Name:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>Sender Email:</strong> <a href="mailto:${email}" style="color: #2563eb;">${email}</a></p>
          </div>
          <div style="margin-top: 25px;">
            <p style="margin-bottom: 5px;"><strong>Message Content:</strong></p>
            <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; white-space: pre-wrap; color: #374151; font-size: 15px; line-height: 1.5; border: 1px solid #e5e7eb;">${message}</div>
          </div>
          <div style="margin-top: 30px; font-size: 12px; color: #9ca3af; text-align: center;">
            <p>This email was sent automatically through the contact form on the GGG Indonesia website.</p>
          </div>
        </div>
      `,
    };

    // 5. Eksekusi pengiriman email
    await transporter.sendMail(mailOptions);
    
    // 6. Kembalikan status sukses ke komponen klien (Contact.tsx)
    return { success: true, message: 'Your message was sent successfully! We will contact you soon.' };
    
  } catch (error) {
    // Tangkap error jika gagal mengirim (misal: password SMTP salah, atau server Hostinger down)
    console.error('Error sending SMTP email:', error);
    return { success: false, error: 'Sorry, the system is busy. Failed to send the message. Please try again later.' };
  }
}