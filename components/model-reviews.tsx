"use client"

import { useState, useEffect } from "react"
import { Star } from "lucide-react"

interface Review {
  id: string
  rating: number
  text: string
  timestamp: number
}

const SEED_REVIEWS: Record<string, Review[]> = {
  "valentina-reyes": [
    { id: "seed-v1", rating: 5, text: "Valentina is absolutely stunning and so easy to talk to. Made me feel completely at ease from the moment we met.", timestamp: Date.now() - 86400000 * 2 },
    { id: "seed-v2", rating: 5, text: "Incredible experience. She's even more beautiful in person. Will definitely book again.", timestamp: Date.now() - 86400000 * 5 },
    { id: "seed-v3", rating: 4, text: "Great time, very professional and classy. Highly recommend.", timestamp: Date.now() - 86400000 * 12 },
  ],
  "camila-duarte": [
    { id: "seed-c1", rating: 5, text: "Camila is a dream. Sweet, gorgeous, and genuinely fun to be around. 10/10.", timestamp: Date.now() - 86400000 * 1 },
    { id: "seed-c2", rating: 5, text: "Best experience I've had. She goes above and beyond to make sure you're happy.", timestamp: Date.now() - 86400000 * 7 },
    { id: "seed-c3", rating: 4, text: "Very beautiful and attentive. The photos don't do her justice.", timestamp: Date.now() - 86400000 * 15 },
    { id: "seed-c4", rating: 5, text: "", timestamp: Date.now() - 86400000 * 20 },
  ],
  "sofia-herrera": [
    { id: "seed-s1", rating: 5, text: "Sofia has this incredible energy that lights up the room. Unforgettable evening.", timestamp: Date.now() - 86400000 * 3 },
    { id: "seed-s2", rating: 4, text: "Tall, elegant, and sharp. Great conversation over dinner.", timestamp: Date.now() - 86400000 * 9 },
    { id: "seed-s3", rating: 5, text: "Absolutely world class. Worth every penny.", timestamp: Date.now() - 86400000 * 18 },
  ],
  "isabella-campos": [
    { id: "seed-i1", rating: 5, text: "Isabella is the total package - warm, funny, and drop-dead gorgeous.", timestamp: Date.now() - 86400000 * 1 },
    { id: "seed-i2", rating: 5, text: "Her smile alone is worth the trip to Tijuana. Amazing experience.", timestamp: Date.now() - 86400000 * 6 },
    { id: "seed-i3", rating: 4, text: "Super fun and easygoing. We had an amazing time together.", timestamp: Date.now() - 86400000 * 10 },
    { id: "seed-i4", rating: 5, text: "", timestamp: Date.now() - 86400000 * 22 },
  ],
  "natalia-blanc": [
    { id: "seed-n1", rating: 5, text: "Natalia is ethereal. Like something out of a movie. Truly special.", timestamp: Date.now() - 86400000 * 4 },
    { id: "seed-n2", rating: 4, text: "Beautiful and sophisticated. A perfect companion for any occasion.", timestamp: Date.now() - 86400000 * 14 },
  ],
  "lucia-mendoza": [
    { id: "seed-l1", rating: 5, text: "Lucia is an angel. So sweet and genuine, I felt an instant connection.", timestamp: Date.now() - 86400000 * 2 },
    { id: "seed-l2", rating: 5, text: "Young, beautiful, and incredibly attentive. Can't wait to see her again.", timestamp: Date.now() - 86400000 * 8 },
    { id: "seed-l3", rating: 4, text: "Lovely girl, great experience overall.", timestamp: Date.now() - 86400000 * 16 },
  ],
}

function getReviews(modelSlug: string): Review[] {
  if (typeof window === "undefined") return SEED_REVIEWS[modelSlug] || []
  const raw = localStorage.getItem(`reviews-${modelSlug}`)
  const userReviews: Review[] = raw ? JSON.parse(raw) : []
  const seeds = SEED_REVIEWS[modelSlug] || []
  const userIds = new Set(userReviews.map((r) => r.id))
  const merged = [...userReviews, ...seeds.filter((s) => !userIds.has(s.id))]
  merged.sort((a, b) => b.timestamp - a.timestamp)
  return merged
}

function saveReview(modelSlug: string, review: Review) {
  const existing = getReviews(modelSlug)
  existing.unshift(review)
  localStorage.setItem(`reviews-${modelSlug}`, JSON.stringify(existing))
}

function StarRating({ rating, onRate, interactive = false }: { rating: number; onRate?: (r: number) => void; interactive?: boolean }) {
  const [hovered, setHovered] = useState(0)

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onRate?.(star)}
          onMouseEnter={() => interactive && setHovered(star)}
          onMouseLeave={() => interactive && setHovered(0)}
          title={interactive ? `Rate ${star} star${star !== 1 ? "s" : ""}` : `${star} star${star !== 1 ? "s" : ""}`}
          className={interactive ? "cursor-pointer transition-transform hover:scale-110" : "cursor-default"}
        >
          <Star
            className={`h-5 w-5 transition-colors ${
              (hovered || rating) >= star
                ? "fill-amber-400 text-amber-400"
                : "fill-transparent text-muted-foreground/40"
            }`}
          />
        </button>
      ))}
    </div>
  )
}

function formatDate(ts: number) {
  const d = new Date(ts)
  const now = Date.now()
  const diff = now - ts
  if (diff < 60000) return "just now"
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

export function ModelRatingBadge({ modelSlug }: { modelSlug: string }) {
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    setReviews(getReviews(modelSlug))
  }, [modelSlug])

  const avg = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0

  return (
    <div className="flex items-center gap-1.5 mt-1.5">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3.5 w-3.5 ${
              reviews.length > 0 && Math.round(avg) >= star
                ? "fill-amber-400 text-amber-400"
                : "fill-transparent text-muted-foreground/40"
            }`}
          />
        ))}
      </div>
      {reviews.length > 0 ? (
        <>
          <span className="text-xs font-medium text-foreground">{avg.toFixed(1)}</span>
          <span className="text-[10px] text-muted-foreground">({reviews.length})</span>
        </>
      ) : (
        <span className="text-[10px] text-muted-foreground">No reviews yet</span>
      )}
    </div>
  )
}

export function ModelReviews({ modelSlug }: { modelSlug: string }) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [rating, setRating] = useState(0)
  const [text, setText] = useState("")
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    setReviews(getReviews(modelSlug))
  }, [modelSlug])

  const avgRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (rating === 0) return

    const review: Review = {
      id: crypto.randomUUID(),
      rating,
      text: text.trim(),
      timestamp: Date.now(),
    }
    saveReview(modelSlug, review)
    setReviews([review, ...reviews])
    setRating(0)
    setText("")
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div>
      {/* Summary */}
      {reviews.length > 0 && (
        <div className="flex items-center gap-3 mb-6">
          <StarRating rating={Math.round(avgRating)} />
          <span className="text-sm text-foreground font-medium">{avgRating.toFixed(1)}</span>
          <span className="text-xs text-muted-foreground">({reviews.length} review{reviews.length !== 1 ? "s" : ""})</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="rounded-2xl bg-card border border-border/50 p-5 mb-6">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Leave a Review</p>
        <StarRating rating={rating} onRate={setRating} interactive />
        {rating > 0 && (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share your experience (optional)"
            rows={3}
            className="mt-4 w-full resize-none rounded-xl bg-secondary/50 border border-border/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-foreground/20"
          />
        )}
        <button
          type="submit"
          disabled={rating === 0}
          className="mt-4 rounded-full bg-foreground px-6 py-2.5 text-[11px] tracking-[0.15em] uppercase text-background transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {submitted ? "Thank you!" : "Submit Review"}
        </button>
      </form>

      {/* Reviews list */}
      {reviews.length > 0 && (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-2xl bg-card border border-border/50 p-5">
              <div className="flex items-center justify-between mb-2">
                <StarRating rating={review.rating} />
                <span className="text-[10px] text-muted-foreground">{formatDate(review.timestamp)}</span>
              </div>
              {review.text && (
                <p className="text-sm text-muted-foreground leading-relaxed">{review.text}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
