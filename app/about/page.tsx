import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata = {
  title: "About | BABES",
  description: "BABES is a premier companion agency in Tijuana offering elite, discreet companionship services.",
}

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <Image
          src="/images/about.jpg"
          alt="Elegant setting"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="relative flex h-full flex-col justify-end px-5 pb-12 md:px-12 md:pb-16">
          <p className="text-[10px] tracking-[0.3em] uppercase text-card/70 mb-2">Our Story</p>
          <h1 className="font-serif text-4xl tracking-wide text-card md:text-6xl">About Babes</h1>
        </div>
      </section>

      {/* Story */}
      <section className="px-5 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-6xl grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">Premium Companionship</p>
            <h2 className="font-serif text-2xl tracking-wide text-foreground md:text-3xl">
              Exceptional Experiences, Every Time
            </h2>
            <div className="mt-5 flex flex-col gap-3">
              <p className="text-xs leading-relaxed text-muted-foreground">
                Babes is Tijuana&apos;s premier companion agency, offering access to the most beautiful, sophisticated, and engaging women in the region. We specialize in creating unforgettable experiences for discerning gentlemen who appreciate quality and discretion.
              </p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Every companion in our exclusive roster is carefully selected not only for her stunning beauty, but also for her warmth, intelligence, and ability to provide genuine connection. Whether you&apos;re seeking a dinner date, travel companion, or private encounter, our ladies deliver an experience beyond expectations.
              </p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                We pride ourselves on absolute discretion, professionalism, and a commitment to exceeding your expectations. Your privacy and satisfaction are our highest priorities.
              </p>
            </div>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-secondary">
            <Image
              src="/images/model-3.jpg"
              alt="Elegant companion"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-5 pb-16 md:px-12 md:pb-24">
        <div className="mx-auto max-w-6xl grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {[
            { value: "500+", label: "Happy Clients" },
            { value: "100%", label: "Discretion" },
            { value: "24/7", label: "Availability" },
            { value: "VIP", label: "Service" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-card border border-border p-6 text-center">
              <span className="font-serif text-2xl tracking-wide text-foreground md:text-3xl">{stat.value}</span>
              <p className="mt-1 text-[10px] tracking-[0.15em] uppercase text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="px-5 pb-16 md:px-12 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">Our Promise</p>
            <h2 className="font-serif text-2xl tracking-wide text-foreground md:text-3xl">Why Choose Babes</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              {
                title: "Elite Selection",
                description: "Every companion is hand-selected for beauty, charm, and sophistication. We only represent the finest ladies in Tijuana.",
              },
              {
                title: "Complete Discretion",
                description: "Your privacy is sacred. All interactions are confidential, and we never share client information under any circumstances.",
              },
              {
                title: "Unmatched Service",
                description: "From your first inquiry to the end of your experience, we ensure seamless, professional service at every step.",
              },
            ].map((value) => (
              <div key={value.title} className="rounded-2xl bg-card border border-border p-6">
                <h3 className="font-serif text-lg tracking-wide text-foreground">{value.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-16 md:px-12 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl bg-primary px-6 py-14 text-center md:px-16 md:py-20">
            <h2 className="font-serif text-2xl tracking-wide text-primary-foreground md:text-3xl text-balance">
              Ready to Experience the Best?
            </h2>
            <p className="mt-3 text-xs leading-relaxed text-primary-foreground/70 max-w-sm mx-auto">
              Browse our exclusive roster and find your perfect companion. Contact us today via Telegram or WhatsApp.
            </p>
            <Link
              href="/contact"
              title="Contact Us"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary-foreground px-8 py-3 text-[11px] tracking-[0.15em] uppercase text-primary transition-opacity hover:opacity-90"
            >
              Contact Us
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
