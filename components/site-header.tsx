"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/models", label: "Models" },
  { href: "/booking", label: "Booking" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isHome = pathname === "/"

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        isHome
          ? "bg-transparent"
          : "bg-background/90 backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex items-center justify-between px-5 py-5 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Babes"
            width={32}
            height={40}
            className="h-10 w-auto"
          />
          <span
            className={cn(
              "font-serif text-xl tracking-wide",
              isHome ? "text-card" : "text-foreground"
            )}
          >
            Babes
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-xs tracking-[0.15em] uppercase transition-colors",
                isHome
                  ? pathname === link.href
                    ? "text-card"
                    : "text-card/60 hover:text-card"
                  : pathname === link.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className={cn(
            "md:hidden p-2 -mr-2",
            isHome ? "text-card" : "text-foreground"
          )}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav overlay */}
      {mobileOpen && (
        <nav
          className="md:hidden fixed inset-0 top-[65px] bg-background z-40"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col px-5 pt-8 gap-6">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className={cn(
                "text-lg tracking-wide transition-colors",
                pathname === "/" ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Home
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "text-lg tracking-wide transition-colors",
                  pathname === link.href
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
