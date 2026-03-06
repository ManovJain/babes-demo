import Link from "next/link"
import Image from "next/image"

export function SiteFooter() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="flex items-center gap-2" title="Home">
            <Image
              src="/images/babes-logo.svg"
              alt="Babes"
              width={28}
              height={28}
            />
            <span className="font-serif text-lg text-gold">
              Babes
            </span>
          </Link>

          <nav className="flex flex-wrap gap-6">
            <Link href="/models" title="Models" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Models</Link>
            <Link href="/booking" title="Booking" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Booking</Link>
            <Link href="/about" title="About" className="text-xs text-muted-foreground hover:text-foreground transition-colors">About</Link>
            <Link href="/contact" title="Contact" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
          </nav>

          <p className="text-[10px] text-muted-foreground">
            &copy; {new Date().getFullYear()} Babes Agency
          </p>
        </div>
      </div>
    </footer>
  )
}
