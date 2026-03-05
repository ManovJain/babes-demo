"use client"

import { useRef, useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import type { Model } from "@/lib/models-data"

// Use the same video for all model cards on hover
const HOVER_VIDEO = "/videos/gallery-hover.mp4"

interface ModelCardVideoProps {
  model: Model
  priority?: boolean
}

export function ModelCardVideo({ model, priority = false }: ModelCardVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {})
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [])

  return (
    <Link
      href={`/models/${model.slug}`}
      className="group block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-secondary">
        {/* Static image */}
        <Image
          src={model.image}
          alt={`${model.name} - model portrait`}
          fill
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
        />

        {/* Video overlay */}
        <video
          ref={videoRef}
          src={HOVER_VIDEO}
          muted
          loop
          playsInline
          preload="none"
          onLoadedData={() => setVideoLoaded(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            isHovered && videoLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />

        {/* Name overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="text-xl font-medium text-card tracking-wide">{model.name}</h3>
          <p className="mt-1 text-[11px] tracking-[0.15em] uppercase text-card/70">
            {model.location}
          </p>
        </div>

        {/* Play indicator */}
        <div
          className={`absolute top-4 right-4 flex items-center gap-1.5 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-card/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-card" />
          </span>
        </div>
      </div>
    </Link>
  )
}
