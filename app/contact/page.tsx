import Link from "next/link"
import { MapPin, Clock, MessageCircle } from "lucide-react"

export const metadata = {
  title: "Contact | BABES",
  description: "Get in touch with BABES for bookings and inquiries via Telegram or WhatsApp.",
}

export default function ContactPage() {
  return (
    <div className="px-5 pt-24 pb-16 md:px-12 md:pt-32 md:pb-24">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12 text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">Reach Out</p>
          <h1 className="font-serif text-3xl tracking-wide text-gold md:text-4xl">Contact Us</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            For bookings and inquiries, reach us directly via Telegram or WhatsApp.
          </p>
        </div>

        {/* Contact buttons */}
        <div className="flex flex-col gap-4 mb-12">
          <Link
            href="https://t.me/babesagency"
            target="_blank"
            rel="noopener noreferrer"
            title="Open Telegram"
            className="flex items-center gap-4 rounded-2xl bg-card border border-border p-5 transition-colors hover:bg-secondary"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0088cc]">
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-white fill-current">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Telegram</p>
              <p className="text-xs text-muted-foreground">@babesagency</p>
            </div>
            <MessageCircle className="h-5 w-5 text-muted-foreground" />
          </Link>

          <Link
            href="https://wa.me/5216641234567"
            target="_blank"
            rel="noopener noreferrer"
            title="Open WhatsApp"
            className="flex items-center gap-4 rounded-2xl bg-card border border-border p-5 transition-colors hover:bg-secondary"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366]">
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-white fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">WhatsApp</p>
              <p className="text-xs text-muted-foreground">+52 664 123 4567</p>
            </div>
            <MessageCircle className="h-5 w-5 text-muted-foreground" />
          </Link>
        </div>

        {/* Additional info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-card border border-border p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary mb-3">
              <MapPin className="h-4 w-4 text-foreground" />
            </div>
            <p className="text-[10px] tracking-[0.15em] uppercase text-foreground mb-1">Location</p>
            <p className="text-xs text-muted-foreground">Tijuana, Mexico</p>
          </div>
          <div className="rounded-2xl bg-card border border-border p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary mb-3">
              <Clock className="h-4 w-4 text-foreground" />
            </div>
            <p className="text-[10px] tracking-[0.15em] uppercase text-foreground mb-1">Hours</p>
            <p className="text-xs text-muted-foreground">Available 24/7</p>
          </div>
        </div>
      </div>
    </div>
  )
}
