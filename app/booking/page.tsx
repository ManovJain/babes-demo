import { Suspense } from "react"
import { BookingForm } from "@/components/booking-form"

export const metadata = {
  title: "Book | BABES",
  description: "Book a companion via Telegram or WhatsApp.",
}

export default function BookingPage() {
  return (
    <div className="px-5 pt-24 pb-16 md:px-12 md:pt-32 md:pb-24">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">Make a Reservation</p>
          <h1 className="font-serif text-3xl tracking-wide text-gold md:text-4xl">Book a Companion</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Fill out your preferences below and we&apos;ll connect you via WhatsApp or Telegram.
          </p>
        </div>

        <div className="rounded-2xl bg-card border border-border p-6 md:p-8">
          <Suspense fallback={<div className="h-96 flex items-center justify-center text-muted-foreground text-sm">Loading...</div>}>
            <BookingForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
