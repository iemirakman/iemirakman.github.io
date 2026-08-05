'use server'

import { Resend } from 'resend'

export type ContactFormState = {
  status: 'idle' | 'success' | 'error'
  message: string
}

export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()

  if (!name || !email || !message) {
    return { status: 'error', message: 'Lütfen tüm alanları doldurun.' }
  }
  if (name.length > 100 || email.length > 200 || message.length > 5000) {
    return { status: 'error', message: 'Girdi çok uzun.' }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: 'error', message: 'Geçerli bir e-posta adresi girin.' }
  }

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) {
    return {
      status: 'error',
      message:
        'E-posta servisi henüz yapılandırılmadı. Lütfen daha sonra tekrar deneyin.',
    }
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from: 'Portfolyo <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `Portfolyo mesajı: ${name}`,
      text: `Gönderen: ${name} <${email}>\n\n${message}`,
    })

    if (error) {
      console.error('[contact] Resend error:', error)
      return {
        status: 'error',
        message: 'Mesaj gönderilemedi. Lütfen tekrar deneyin.',
      }
    }

    return {
      status: 'success',
      message: 'Mesajınız gönderildi! En kısa sürede dönüş yapacağım.',
    }
  } catch (err) {
    console.error('[contact] Send failed:', err)
    return {
      status: 'error',
      message: 'Bir hata oluştu. Lütfen tekrar deneyin.',
    }
  }
}
