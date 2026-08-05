'use client'

import { useActionState } from 'react'
import { sendContactMessage, type ContactFormState } from '@/app/actions/contact'
import { Send, LoaderCircle, CircleCheck, CircleAlert } from 'lucide-react'

const initialState: ContactFormState = { status: 'idle', message: '' }

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    sendContactMessage,
    initialState,
  )

  return (
    <div className="flex flex-col rounded-lg border border-border bg-card md:col-span-2">
      <div className="border-b border-border bg-secondary px-4 py-2.5">
        <h3 className="font-mono text-xs text-muted-foreground">
          {'// mesaj-gonder'}
        </h3>
      </div>

      <form action={formAction} className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-name"
            className="font-mono text-xs text-muted-foreground"
          >
            isim
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            placeholder="Adınız"
            className="rounded-md border border-border bg-secondary/50 px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-ring focus:ring-1 focus:ring-ring"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-email"
            className="font-mono text-xs text-muted-foreground"
          >
            e-posta
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder="ornek@mail.com"
            className="rounded-md border border-border bg-secondary/50 px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-ring focus:ring-1 focus:ring-ring"
          />
        </div>

        <div className="flex flex-1 flex-col gap-1.5">
          <label
            htmlFor="contact-message"
            className="font-mono text-xs text-muted-foreground"
          >
            mesaj
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            maxLength={5000}
            rows={5}
            placeholder="Merhaba, seninle bir proje hakkında konuşmak istiyorum..."
            className="min-h-28 flex-1 resize-none rounded-md border border-border bg-secondary/50 px-3 py-2 text-sm leading-relaxed outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-ring focus:ring-1 focus:ring-ring"
          />
        </div>

        {state.status !== 'idle' && (
          <p
            role="status"
            className={`flex items-center gap-2 rounded-md border px-3 py-2 font-mono text-xs ${
              state.status === 'success'
                ? 'border-[#3fb950]/40 bg-[#3fb950]/10 text-[#3fb950]'
                : 'border-[#f85149]/40 bg-[#f85149]/10 text-[#f85149]'
            }`}
          >
            {state.status === 'success' ? (
              <CircleCheck className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            ) : (
              <CircleAlert className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            )}
            {state.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 font-mono text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? (
            <>
              <LoaderCircle
                className="h-4 w-4 animate-spin"
                aria-hidden="true"
              />
              Gönderiliyor...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" />
              Mesaj Gönder
            </>
          )}
        </button>
      </form>
    </div>
  )
}
