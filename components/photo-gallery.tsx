"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface GalleryImage {
  id: string
  src: string
}

interface PhotoGalleryProps {
  images: GalleryImage[]
  modelName: string
  videoUrl?: string
}

// Default glamour video for hover effect
const DEFAULT_HOVER_VIDEO = "/videos/gallery-hover.mp4"

export function PhotoGallery({ images, modelName, videoUrl }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map())

  const openModal = (index: number) => {
    setSelectedIndex(index)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setSelectedIndex(null)
    document.body.style.overflow = ""
  }

  const goToPrevious = useCallback(() => {
    if (selectedIndex === null) return
    setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1)
  }, [selectedIndex, images.length])

  const goToNext = useCallback(() => {
    if (selectedIndex === null) return
    setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1)
  }, [selectedIndex, images.length])

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index)
    const video = videoRefs.current.get(index)
    if (video) {
      video.currentTime = 0
      video.play().catch(() => {})
    }
  }

  const handleMouseLeave = (index: number) => {
    setHoveredIndex(null)
    const video = videoRefs.current.get(index)
    if (video) {
      video.pause()
      video.currentTime = 0
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return
      if (e.key === "Escape") closeModal()
      if (e.key === "ArrowLeft") goToPrevious()
      if (e.key === "ArrowRight") goToNext()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedIndex, goToPrevious, goToNext])

  const hoverVideoSrc = videoUrl || DEFAULT_HOVER_VIDEO

  return (
    <>
      {/* Horizontal scrollable gallery */}
      <div className="relative -mx-5 md:-mx-12">
        <div className="flex gap-3 overflow-x-auto px-5 md:px-12 pb-4 scrollbar-none">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => openModal(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              className="group relative flex-shrink-0 w-[200px] md:w-[280px] aspect-[3/4] rounded-2xl overflow-hidden bg-muted focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
            >
              {/* Static image */}
              <Image
                src={image.src}
                alt={`${modelName} photo ${index + 1}`}
                fill
                className={cn(
                  "object-cover transition-opacity duration-300",
                  hoveredIndex === index ? "opacity-0" : "opacity-100"
                )}
                sizes="(max-width: 768px) 200px, 280px"
              />
              
              {/* Video overlay on hover */}
              <video
                ref={(el) => {
                  if (el) videoRefs.current.set(index, el)
                }}
                src={hoverVideoSrc}
                muted
                loop
                playsInline
                preload="none"
                className={cn(
                  "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
                  hoveredIndex === index ? "opacity-100" : "opacity-0"
                )}
              />
              
              {/* Hover overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
          onClick={closeModal}
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-muted/80"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              goToPrevious()
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-muted/80"
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous</span>
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              goToNext()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-muted/80"
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next</span>
          </button>

          {/* Image container */}
          <div
            className="relative max-h-[85vh] max-w-[90vw] md:max-w-[80vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[3/4] h-[85vh] max-h-[85vh]">
              <Image
                src={images[selectedIndex].src}
                alt={`${modelName} photo ${selectedIndex + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>
          </div>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-muted px-4 py-2">
            <span className="text-sm text-foreground">
              {selectedIndex + 1} / {images.length}
            </span>
          </div>
        </div>
      )}
    </>
  )
}
