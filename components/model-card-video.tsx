"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Model } from "@/lib/models-data"

interface ModelCardVideoProps {
  model: Model
  priority?: boolean
}

export function ModelCardVideo({ model, priority = false }: ModelCardVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const cardRef = useRef<HTMLAnchorElement>(null)
  const [videoReady, setVideoReady] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)

  // Autoplay when card is in view
  useEffect(() => {
    if (!cardRef.current || videoFailed) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return
        if (entry.isIntersecting) {
          videoRef.current.play().catch(() => setVideoFailed(true))
        } else {
          videoRef.current.pause()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [videoFailed])

  return (
    <Link
      ref={cardRef}
      href={`/models/${model.slug}`}
      title={`View ${model.name}`}
      className="group block"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-secondary">
        {/* Fallback image - always present underneath */}
        <Image
          src={model.image}
          alt={`${model.name} - model portrait`}
          fill
          className={`object-cover object-top transition-transform duration-700 group-hover:scale-105 ${
            videoReady && !videoFailed ? "opacity-0" : "opacity-100"
          }`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
        />

        {/* Video - always tries to autoplay */}
        {!videoFailed && (
          <video
            ref={videoRef}
            src={model.videoUrl}
            muted
            loop
            playsInline
            preload="metadata"
            onCanPlay={() => setVideoReady(true)}
            onError={() => setVideoFailed(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              videoReady ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Gradient overlay - stronger on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent transition-opacity duration-300 group-hover:from-foreground/85 group-hover:via-foreground/30" />

        {/* Default: name + location */}
        <div className="absolute inset-x-0 bottom-0 p-5 transition-opacity duration-300 group-hover:opacity-0">
          <h3 className="text-xl font-medium text-card tracking-wide">{model.name}</h3>
          <p className="mt-1 text-[11px] tracking-[0.15em] uppercase text-card/70">
            {model.location}
          </p>
        </div>

        {/* Hover: model info + see more */}
        <div className="absolute inset-x-0 bottom-0 p-5 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <h3 className="text-xl font-medium text-card tracking-wide">{model.name}</h3>
          <p className="mt-1 text-[11px] tracking-[0.15em] uppercase text-card/70">
            {model.location}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-card/80">
            <span>{model.height} · {model.bodyType}</span>
            <span>{model.location}</span>
          </div>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-card/20 backdrop-blur-sm px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase text-card">
            See More <ArrowRight className="h-3 w-3" />
          </div>
        </div>

        {/* Live indicator when video is playing */}
        {videoReady && !videoFailed && (
          <div className="absolute top-4 right-4 flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-card/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-card" />
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}
