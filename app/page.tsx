"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getFeaturedModels } from "@/lib/models-data"
import { FeaturedModelsGrid } from "@/components/featured-models-grid"
import { useEffect, useRef } from "react"

function RotatingBadge() {
  const textRef = useRef<SVGTextElement>(null)

  useEffect(() => {
    // Animation handled by CSS
  }, [])

  return (
    <Link
      href="/models"
      className="absolute bottom-8 right-6 md:bottom-12 md:right-12 group"
    >
      <div className="relative h-24 w-24 md:h-28 md:w-28">
        {/* Rotating text */}
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full animate-spin-slow"
        >
          <defs>
            <path
              id="circlePath"
              d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            />
          </defs>
          <text
            ref={textRef}
            className="fill-card text-[8px] tracking-[0.3em] uppercase"
          >
            <textPath href="#circlePath">
              SEARCH NOW • START YOUR • SEARCH NOW • START YOUR •
            </textPath>
          </text>
        </svg>
        {/* Center arrow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-card/50 transition-all group-hover:scale-110 group-hover:border-card">
            <ArrowRight className="h-4 w-4 text-card transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </Link>
  )
}

function HeroSection() {
  return (
    <section className="relative h-dvh min-h-[600px] overflow-hidden">
      <Image
        src="/images/hero-model.jpg"
        alt="Featured model"
        fill
        className="object-cover object-top"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/20 via-transparent to-foreground/40" />

      {/* Logo */}
      <div className="absolute top-24 left-6 md:left-12 flex items-center gap-4">
        <Image
          src="/images/logo.png"
          alt="Babes"
          width={80}
          height={100}
          className="h-20 w-auto md:h-28"
        />
        <div>
          <h1 className="font-serif text-4xl tracking-wide text-card md:text-6xl">
            Babes
          </h1>
          <p className="mt-1 text-[10px] tracking-[0.4em] uppercase text-card/70">
            Models
          </p>
        </div>
      </div>

      {/* Rotating badge CTA */}
      <RotatingBadge />
    </section>
  )
}

function FeaturedSection() {
  const featured = getFeaturedModels()

  return (
    <section className="bg-background px-5 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">Discover</p>
            <h2 className="font-serif text-2xl tracking-wide text-foreground md:text-3xl">Featured Models</h2>
          </div>
          <Link
            href="/models"
            className="hidden sm:inline-flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase text-muted-foreground transition-colors hover:text-foreground"
          >
            View All
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <FeaturedModelsGrid models={featured} />
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedSection />
    </>
  )
}
