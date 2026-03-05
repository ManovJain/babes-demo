import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Clock, Heart, Instagram, MessageCircle } from "lucide-react"
import { getModelBySlug, models } from "@/lib/models-data"
import { PhotoGallery } from "@/components/photo-gallery"
import { ModelReviews, ModelRatingBadge } from "@/components/model-reviews"
import { CollapsibleSection } from "@/components/collapsible-section"

export function generateStaticParams() {
  return models.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const model = getModelBySlug(slug)
  if (!model) return { title: "Model Not Found" }
  return {
    title: `${model.name} | BABES Agency`,
    description: model.bio,
  }
}

export default async function ModelProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const model = getModelBySlug(slug)

  if (!model) {
    notFound()
  }

  return (
    <div className="min-h-dvh bg-background">
      {/* Full-bleed hero section */}
      <section className="relative h-dvh overflow-hidden">
        <Image
          src={model.image}
          alt={`${model.name} - model portrait`}
          fill
          className="object-cover object-top"
          sizes="100vw"
          priority
        />
        
        {/* Light gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/10 via-transparent to-background/80" />

        {/* Back button */}
        <Link
          href="/models"
          title="Back to Models"
          className="absolute top-24 left-5 md:left-8 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-card shadow-lg text-foreground transition-transform hover:scale-105"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Back to Models</span>
        </Link>

        {/* Frosted glass card at bottom */}
        <div className="absolute inset-x-4 bottom-6 md:inset-x-auto md:right-8 md:bottom-10 md:left-auto md:w-[380px] rounded-3xl bg-muted/60 backdrop-blur-xl p-6 shadow-xl">
          {/* Name and agency */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-medium text-foreground tracking-wide">
                {model.name}
              </h1>
              <p className="text-xs text-muted-foreground mt-1">
                Babes Agency
              </p>
              <ModelRatingBadge modelSlug={model.slug} />
            </div>
            {model.instagram && (
              <a
                href={`https://instagram.com/${model.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                title={`${model.name} on Instagram`}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground/10 text-foreground transition-colors hover:bg-foreground/20"
              >
                <Instagram className="h-4 w-4" />
              </a>
            )}
          </div>

          {/* Stats grid */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Height</p>
              <p className="mt-1 text-sm font-medium text-foreground">{model.height}</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Bust</p>
              <p className="mt-1 text-sm font-medium text-foreground">{model.bust}</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Waist</p>
              <p className="mt-1 text-sm font-medium text-foreground">{model.waist}</p>
            </div>
          </div>

          {/* Location */}
          <div className="mt-4">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Location</p>
            <p className="mt-1 text-sm text-foreground">{model.location}</p>
          </div>

          {/* Book button */}
          <Link
            href={`/booking?model=${model.slug}`}
            title={`Book ${model.name}`}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-3.5 text-[11px] tracking-[0.15em] uppercase text-background transition-opacity hover:opacity-90"
          >
            Book Now
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* About section */}
      <section className="px-5 py-12 md:px-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">About</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{model.bio}</p>

          {/* Additional measurements */}
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Hips</p>
              <p className="mt-1 text-sm text-foreground">{model.hips}</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Shoe</p>
              <p className="mt-1 text-sm text-foreground">{model.shoe}</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Hair</p>
              <p className="mt-1 text-sm text-foreground">{model.hair}</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Eyes</p>
              <p className="mt-1 text-sm text-foreground">{model.eyes}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      {model.gallery && model.gallery.length > 0 && (
        <section className="pb-12">
          <div className="px-5 md:px-12 mb-6">
            <h2 className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Gallery</h2>
          </div>
          <PhotoGallery images={model.gallery} modelName={model.name} videoUrl={model.videoUrl} />
        </section>
      )}

      {/* Offerings section */}
      {model.offerings && model.offerings.length > 0 && (
        <section className="px-5 py-12 md:px-12 bg-secondary/50">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-6">Offerings</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {model.offerings.map((offering) => (
                <div 
                  key={offering.id}
                  className="rounded-2xl bg-card p-5 shadow-sm border border-border/50"
                >
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium text-foreground">{offering.title}</h3>
                    <span className="text-sm font-medium text-foreground">{offering.price}</span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {offering.description}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span className="text-[11px]">{offering.duration}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Book CTA */}
            <div className="mt-8 text-center">
              <Link
                href={`/booking?model=${model.slug}`}
                title={`Book ${model.name.split(' ')[0]}`}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-3.5 text-[11px] tracking-[0.15em] uppercase text-background transition-opacity hover:opacity-90"
              >
                Book {model.name.split(' ')[0]}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Blog/Feed section */}
      {model.blog && model.blog.length > 0 && (
        <section className="px-5 py-12 md:px-12">
          <div className="mx-auto max-w-2xl">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                {model.name.split(' ')[0]}&apos;s Feed
              </h2>
              {model.instagram && (
                <a
                  href={`https://instagram.com/${model.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View Instagram"
                  className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
                >
                  {model.instagram}
                </a>
              )}
            </div>

            <CollapsibleSection>
            <div className="space-y-4">
              {model.blog.map((post) => (
                <article 
                  key={post.id} 
                  className="rounded-2xl bg-card p-4 shadow-sm border border-border/50"
                >
                  {/* Post header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                      <Image
                        src={model.image}
                        alt={model.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{model.name}</p>
                      <p className="text-[10px] text-muted-foreground">{post.timestamp}</p>
                    </div>
                  </div>

                  {/* Post content */}
                  <p className="text-sm text-foreground leading-relaxed mb-3">
                    {post.content}
                  </p>

                  {/* Post image */}
                  {post.image && (
                    <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-3">
                      <Image
                        src={post.image}
                        alt="Post image"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Post actions */}
                  <div className="flex items-center gap-4 pt-2 border-t border-border/50">
                    <button title="Like" className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
                      <Heart className="h-4 w-4" />
                      <span className="text-xs">{post.likes.toLocaleString()}</span>
                    </button>
                    <button title="Reply" className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-xs">Reply</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
            </CollapsibleSection>
          </div>
        </section>
      )}

      {/* Reviews section */}
      <section className="px-5 py-12 md:px-12">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-6">Reviews</h2>
          <ModelReviews modelSlug={model.slug} />
        </div>
      </section>

      {/* Back link */}
      <section className="px-5 pb-16 md:px-12">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/models"
            title="Back to All Models"
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to All Models
          </Link>
        </div>
      </section>
    </div>
  )
}
