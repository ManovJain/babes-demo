"use client"

import type { Model } from "@/lib/models-data"
import { ModelCardVideo } from "@/components/model-card-video"

interface FeaturedModelsGridProps {
  models: Model[]
}

export function FeaturedModelsGrid({ models }: FeaturedModelsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {models.map((model, i) => (
        <ModelCardVideo key={model.id} model={model} priority={i < 2} />
      ))}
    </div>
  )
}
