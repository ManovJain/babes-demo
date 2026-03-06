"use client"

import { useState, useMemo } from "react"
import type { Model, Service, BodyType, Attribute } from "@/lib/models-data"
import { getAllServices, getAllBodyTypes, getAgeRanges, getAllAttributes } from "@/lib/models-data"
import { ModelCardVideo } from "@/components/model-card-video"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ModelsGridProps {
  models: Model[]
}

export function ModelsGrid({ models }: ModelsGridProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedServices, setSelectedServices] = useState<Service[]>([])
  const [selectedBodyTypes, setSelectedBodyTypes] = useState<BodyType[]>([])
  const [selectedAttributes, setSelectedAttributes] = useState<Attribute[]>([])
  const [selectedAgeRange, setSelectedAgeRange] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const services = getAllServices()
  const bodyTypes = getAllBodyTypes()
  const attributes = getAllAttributes()
  const ageRanges = getAgeRanges()

  const toggleService = (service: Service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    )
  }

  const toggleBodyType = (type: BodyType) => {
    setSelectedBodyTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    )
  }

  const toggleAttribute = (attr: Attribute) => {
    setSelectedAttributes((prev) =>
      prev.includes(attr)
        ? prev.filter((a) => a !== attr)
        : [...prev, attr]
    )
  }

  const clearFilters = () => {
    setSelectedServices([])
    setSelectedBodyTypes([])
    setSelectedAttributes([])
    setSelectedAgeRange(null)
    setSearchQuery("")
  }

  const activeFilterCount =
    selectedServices.length +
    selectedBodyTypes.length +
    selectedAttributes.length +
    (selectedAgeRange ? 1 : 0)

  const filtered = useMemo(() => {
    let result = models

    // Filter by services
    if (selectedServices.length > 0) {
      result = result.filter((m) =>
        selectedServices.every((service) => m.services.includes(service))
      )
    }

    // Filter by body type
    if (selectedBodyTypes.length > 0) {
      result = result.filter((m) => selectedBodyTypes.includes(m.bodyType))
    }

    // Filter by attributes
    if (selectedAttributes.length > 0) {
      result = result.filter((m) =>
        selectedAttributes.every((attr) => m.attributes.includes(attr))
      )
    }

    // Filter by age range
    if (selectedAgeRange) {
      const range = ageRanges.find((r) => r.label === selectedAgeRange)
      if (range) {
        result = result.filter((m) => m.age >= range.min && m.age <= range.max)
      }
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.location.toLowerCase().includes(q)
      )
    }

    return result
  }, [selectedServices, selectedBodyTypes, selectedAttributes, selectedAgeRange, searchQuery, models, ageRanges])

  return (
    <div>
      {/* Search and filter toggle */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or location..."
            className="w-full rounded-full border border-border bg-card pl-11 pr-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-foreground/50 placeholder:text-muted-foreground/50"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          title="Toggle filters"
          className={cn(
            "flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-colors",
            showFilters || activeFilterCount > 0
              ? "bg-foreground text-background"
              : "bg-card border border-border text-foreground hover:bg-secondary"
          )}
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-background text-foreground text-xs">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="mb-8 rounded-2xl bg-card border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Filter Models
            </h3>
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                title="Clear all filters"
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                <X className="h-3 w-3" />
                Clear all
              </button>
            )}
          </div>

          {/* Services Offered */}
          <div className="mb-6">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Services Offered
            </h4>
            <div className="flex flex-wrap gap-2">
              {services.map((service) => (
                <button
                  key={service}
                  onClick={() => toggleService(service)}
                  title={`Filter by ${service}`}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    selectedServices.includes(service)
                      ? "bg-foreground text-background"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>

          {/* Body Type */}
          <div className="mb-6">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Body Type
            </h4>
            <div className="flex flex-wrap gap-2">
              {bodyTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => toggleBodyType(type)}
                  title={`Filter by ${type}`}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    selectedBodyTypes.includes(type)
                      ? "bg-foreground text-background"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Attributes */}
          <div className="mb-6">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Attributes
            </h4>
            <div className="flex flex-wrap gap-2">
              {attributes.map((attr) => (
                <button
                  key={attr}
                  onClick={() => toggleAttribute(attr)}
                  title={`Filter by ${attr}`}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    selectedAttributes.includes(attr)
                      ? "bg-foreground text-background"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  {attr}
                </button>
              ))}
            </div>
          </div>

          {/* Age Range */}
          <div>
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Age
            </h4>
            <div className="flex flex-wrap gap-2">
              {ageRanges.map((range) => (
                <button
                  key={range.label}
                  onClick={() =>
                    setSelectedAgeRange(
                      selectedAgeRange === range.label ? null : range.label
                    )
                  }
                  title={`Filter by age ${range.label}`}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    selectedAgeRange === range.label
                      ? "bg-foreground text-background"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Active filters display */}
      {activeFilterCount > 0 && !showFilters && (
        <div className="flex flex-wrap gap-2 mb-6">
          {selectedServices.map((service) => (
            <span
              key={service}
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground/10 px-3 py-1.5 text-xs font-medium text-foreground"
            >
              {service}
              <button
                onClick={() => toggleService(service)}
                title={`Remove ${service} filter`}
                className="hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          {selectedBodyTypes.map((type) => (
            <span
              key={type}
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground/10 px-3 py-1.5 text-xs font-medium text-foreground"
            >
              {type}
              <button
                onClick={() => toggleBodyType(type)}
                title={`Remove ${type} filter`}
                className="hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          {selectedAttributes.map((attr) => (
            <span
              key={attr}
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground/10 px-3 py-1.5 text-xs font-medium text-foreground"
            >
              {attr}
              <button
                onClick={() => toggleAttribute(attr)}
                title={`Remove ${attr} filter`}
                className="hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          {selectedAgeRange && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground/10 px-3 py-1.5 text-xs font-medium text-foreground">
              {selectedAgeRange} years
              <button
                onClick={() => setSelectedAgeRange(null)}
                title="Remove age filter"
                className="hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* Results count */}
      <p className="text-sm text-muted-foreground mb-6">
        Showing {filtered.length} {filtered.length === 1 ? "model" : "models"}
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((model, i) => (
          <ModelCardVideo key={model.id} model={model} priority={i < 3} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-4">
            No models match your filters.
          </p>
          <button
            onClick={clearFilters}
            title="Clear all filters"
            className="text-sm text-foreground underline hover:no-underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}
