import Image from "next/image"
import Link from "next/link"
import type { Model } from "@/lib/models-data"

interface ModelCardProps {
  model: Model
  priority?: boolean
}

export function ModelCard({ model, priority = false }: ModelCardProps) {
  return (
    <Link href={`/models/${model.slug}`} title={`View ${model.name}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
        <Image
          src={model.image}
          alt={`${model.name} - model portrait`}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
        />
        <div className="absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/10" />
      </div>
      <div className="mt-4">
        <h3 className="font-serif text-lg tracking-wide text-foreground">{model.name}</h3>
        <p className="mt-1 text-xs tracking-[0.15em] uppercase text-muted-foreground">
          {model.location}
        </p>
      </div>
    </Link>
  )
}
