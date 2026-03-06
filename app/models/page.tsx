import { models } from "@/lib/models-data"
import { ModelsGrid } from "@/components/models-grid"

export const metadata = {
  title: "Models | BABES Agency",
  description: "Browse our roster of exceptional models available for editorial, runway, commercial, and event bookings.",
}

export default function ModelsPage() {
  return (
    <div className="min-h-dvh bg-background px-5 pt-24 pb-16 md:px-12 md:pt-28 md:pb-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Browse Our Roster</p>
          <h1 className="text-3xl font-serif text-gold">Our Models</h1>
        </div>
        
        <ModelsGrid models={models} />
      </div>
    </div>
  )
}
