'use server';

import nodemailer from 'nodemailer';

export async function sendContactEmail(formData: FormData) {
  // 1. Ambil data dari form (Contact.tsx)
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  // 2. Validasi sederhana
  if (!name || !email || !message) {
    return { success: false, error: 'Semua kolom wajib diisi.' };
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
      subject: `Pesan Baru dari Website: ${name}`,
      text: `Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`, // Versi teks biasa (untuk email client lama)
      
      // Versi HTML agar tampilan email lebih rapi dan profesional saat dibaca
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 10px; background-color: #ffffff;">
          <h2 style="color: #16a34a; border-bottom: 2px solid #16a34a; padding-bottom: 10px;">Pesan Baru dari Website GGG Indonesia</h2>
          <div style="margin-top: 20px;">
            <p style="margin: 5px 0;"><strong>Nama Pengirim:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>Email Pengirim:</strong> <a href="mailto:${email}" style="color: #2563eb;">${email}</a></p>
          </div>
          <div style="margin-top: 25px;">
            <p style="margin-bottom: 5px;"><strong>Isi Pesan:</strong></p>
            <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; white-space: pre-wrap; color: #374151; font-size: 15px; line-height: 1.5; border: 1px solid #e5e7eb;">${message}</div>
          </div>
          <div style="margin-top: 30px; font-size: 12px; color: #9ca3af; text-align: center;">
            <p>Email ini dikirim secara otomatis melalui formulir kontak di website GGG Indonesia.</p>
          </div>
        </div>
      `,
    };

    // 5. Eksekusi pengiriman email
    await transporter.sendMail(mailOptions);
    
    // 6. Kembalikan status sukses ke komponen klien (Contact.tsx)
    return { success: true, message: 'Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.' };
    
  } catch (error) {
    // Tangkap error jika gagal mengirim (misal: password SMTP salah, atau server Hostinger down)
    console.error('Error saat mengirim email SMTP:', error);
    return { success: false, error: 'Maaf, sistem sedang sibuk. Gagal mengirim pesan. Silakan coba beberapa saat lagi.' };
  }
}