"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { Calendar, MapPin, Clock, Check, Copy, Search, X } from "lucide-react"
import { models, type Service } from "@/lib/models-data"
import { cn } from "@/lib/utils"

const durations = [
  { id: "1hr", label: "1 Hour", price: "$3,000" },
  { id: "2hr", label: "2 Hours", price: "$5,500" },
  { id: "3hr", label: "3 Hours", price: "$7,500" },
  { id: "tln", label: "TLN (Overnight)", price: "$12,000" },
]

const allServices: Service[] = ["BBBJ", "CIM", "COF", "GREEK", "BBFS"]

// Popular locations in Tijuana
const tijuanaLocations = [
  { name: "Hotel Lucerna Tijuana", area: "Zona Rio" },
  { name: "Grand Hotel Tijuana", area: "Zona Rio" },
  { name: "Hotel Real del Rio", area: "Zona Rio" },
  { name: "Hyatt Place Tijuana", area: "Zona Rio" },
  { name: "City Express Plus", area: "Zona Rio" },
  { name: "Marriott Tijuana", area: "Zona Rio" },
  { name: "Hotel Ticuan", area: "Centro" },
  { name: "Hotel Palacio Azteca", area: "Centro" },
  { name: "Hotel La Villa de Zaragoza", area: "Centro" },
  { name: "Hotel Pueblo Amigo", area: "Via Rapida" },
  { name: "Real Inn Tijuana", area: "Otay" },
  { name: "Fiesta Inn Tijuana", area: "Otay" },
  { name: "Hotel Hacienda del Mar", area: "Playas" },
  { name: "Rosarito Beach Hotel", area: "Rosarito" },
  { name: "Las Rocas Resort", area: "Rosarito" },
  { name: "Private Residence", area: "Custom Address" },
  { name: "Airbnb / Rental", area: "Custom Address" },
]

export function BookingForm() {
  const searchParams = useSearchParams()
  const preselectedModel = searchParams.get("model") || ""

  const [selectedModel, setSelectedModel] = useState<string>(preselectedModel)
  const [location, setLocation] = useState("")
  const [showLocationSearch, setShowLocationSearch] = useState(false)
  const [locationSearch, setLocationSearch] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [duration, setDuration] = useState("")
  const [selectedServices, setSelectedServices] = useState<Service[]>([])
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (preselectedModel) {
      setSelectedModel(preselectedModel)
    }
  }, [preselectedModel])

  const toggleService = (service: Service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    )
  }

  const selectLocation = (loc: typeof tijuanaLocations[0]) => {
    setLocation(loc.area === "Custom Address" ? loc.name : `${loc.name}, ${loc.area}`)
    setShowLocationSearch(false)
    setLocationSearch("")
  }

  const filteredLocations = tijuanaLocations.filter(
    (loc) =>
      loc.name.toLowerCase().includes(locationSearch.toLowerCase()) ||
      loc.area.toLowerCase().includes(locationSearch.toLowerCase())
  )

  const selectedModelData = models.find((m) => m.slug === selectedModel)

  const generateMessageText = () => {
    const modelName = selectedModelData?.name || "Not selected"
    const durationLabel = durations.find((d) => d.id === duration)?.label || "Not selected"
    const servicesText = selectedServices.length > 0 ? selectedServices.join(", ") : "Not specified"
    
    return (
      `Hi, I'd like to book a companion.\n\n` +
      `Companion: ${modelName}\n` +
      `Location: ${location || "Not specified"}\n` +
      `Date: ${date || "Not specified"}\n` +
      `Time: ${time || "Not specified"}\n` +
      `Duration: ${durationLabel}\n` +
      `Services: ${servicesText}\n\n` +
      `Please confirm availability.`
    )
  }

  const copyMessage = async () => {
    await navigator.clipboard.writeText(generateMessageText())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isFormValid = selectedModel && location && date && time && duration

  return (
    <div className="space-y-8">
      {/* Select Companion */}
      <div>
        <label className="block text-xs font-medium uppercase tracking-wider text-foreground mb-4">
          Select Companion
        </label>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {models.map((model) => (
            <button
              key={model.slug}
              type="button"
              onClick={() => setSelectedModel(model.slug)}
              title={`Select ${model.name}`}
              className={cn(
                "relative flex-shrink-0 rounded-2xl overflow-hidden transition-all",
                selectedModel === model.slug
                  ? "ring-2 ring-foreground ring-offset-2 ring-offset-background"
                  : "opacity-70 hover:opacity-100"
              )}
            >
              <div className="relative w-20 h-28 md:w-24 md:h-32">
                <Image
                  src={model.image}
                  alt={model.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
                {selectedModel === model.slug && (
                  <div className="absolute top-1 right-1 h-5 w-5 rounded-full bg-foreground flex items-center justify-center">
                    <Check className="h-3 w-3 text-background" />
                  </div>
                )}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                <p className="text-[10px] text-white font-medium truncate">{model.name}</p>
              </div>
            </button>
          ))}
        </div>
        {selectedModelData && (
          <p className="mt-3 text-xs text-muted-foreground">
            Selected: <span className="text-foreground font-medium">{selectedModelData.name}</span> - {selectedModelData.location}
          </p>
        )}
      </div>

      {/* Location with Search */}
      <div>
        <label className="block text-xs font-medium uppercase tracking-wider text-foreground mb-3">
          Your Location
        </label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onFocus={() => setShowLocationSearch(true)}
            placeholder="Search hotels or enter address..."
            className="w-full rounded-xl bg-secondary border-0 py-3.5 pl-11 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-foreground focus:outline-none"
          />
          {location && (
            <button
              type="button"
              onClick={() => {
                setLocation("")
                setShowLocationSearch(true)
              }}
              title="Clear location"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Location Dropdown */}
        {showLocationSearch && (
          <div className="relative mt-2">
            <div className="absolute z-20 w-full rounded-xl bg-card border border-border shadow-lg max-h-64 overflow-y-auto">
              <div className="sticky top-0 bg-card border-b border-border p-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                    placeholder="Search Tijuana hotels..."
                    autoFocus
                    className="w-full rounded-lg bg-secondary border-0 py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                </div>
              </div>
              <div className="p-1">
                {filteredLocations.map((loc, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => selectLocation(loc)}
                    title={`Select ${loc.name}`}
                    className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <p className="text-sm font-medium text-foreground">{loc.name}</p>
                    <p className="text-xs text-muted-foreground">{loc.area}</p>
                  </button>
                ))}
                {filteredLocations.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No results. Type your custom address above.
                  </p>
                )}
              </div>
              <div className="sticky bottom-0 bg-card border-t border-border p-2">
                <button
                  type="button"
                  onClick={() => setShowLocationSearch(false)}
                  title="Close location search"
                  className="w-full text-xs text-muted-foreground hover:text-foreground py-1"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Date and Time */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-foreground mb-3">
            Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl bg-secondary border-0 py-3.5 pl-11 pr-4 text-sm text-foreground focus:ring-2 focus:ring-foreground focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-foreground mb-3">
            Time
          </label>
          <div className="relative">
            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-xl bg-secondary border-0 py-3.5 pl-11 pr-4 text-sm text-foreground focus:ring-2 focus:ring-foreground focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Duration */}
      <div>
        <label className="block text-xs font-medium uppercase tracking-wider text-foreground mb-3">
          Duration
        </label>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {durations.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setDuration(d.id)}
              title={`Select ${d.label}`}
              className={cn(
                "rounded-xl p-4 text-left transition-all",
                duration === d.id
                  ? "bg-foreground text-background"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              )}
            >
              <p className="text-sm font-medium">{d.label}</p>
              <p className={cn(
                "text-xs mt-1",
                duration === d.id ? "text-background/70" : "text-muted-foreground"
              )}>
                {d.price}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Services */}
      <div>
        <label className="block text-xs font-medium uppercase tracking-wider text-foreground mb-3">
          Services Requested <span className="text-muted-foreground font-normal">(Optional)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {allServices.map((service) => (
            <button
              key={service}
              type="button"
              onClick={() => toggleService(service)}
              title={`Toggle ${service}`}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                selectedServices.includes(service)
                  ? "bg-foreground text-background"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              )}
            >
              {service}
            </button>
          ))}
        </div>
        {selectedModelData && (
          <p className="mt-2 text-[10px] text-muted-foreground">
            {selectedModelData.name} offers: {selectedModelData.services.join(", ")}
          </p>
        )}
      </div>

      {/* Message Preview */}
      <div>
        <label className="block text-xs font-medium uppercase tracking-wider text-foreground mb-3">
          Your Booking Message
        </label>
        <div className="relative">
          <div className="rounded-xl bg-secondary p-4 text-sm text-foreground whitespace-pre-wrap font-mono text-xs leading-relaxed">
            {generateMessageText()}
          </div>
          <button
            type="button"
            onClick={copyMessage}
            title="Copy booking message"
            className={cn(
              "absolute top-3 right-3 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
              copied
                ? "bg-green-500 text-white"
                : "bg-card text-foreground hover:bg-card/80"
            )}
          >
            {copied ? (
              <>
                <Check className="h-3 w-3" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                Copy
              </>
            )}
          </button>
        </div>
        <p className="mt-2 text-[10px] text-muted-foreground">
          Copy this message and paste it directly into WhatsApp or Telegram
        </p>
      </div>

      {/* Submit buttons */}
      <div className="flex flex-col gap-3 pt-4">
        <a
          href={isFormValid ? `https://wa.me/5216641234567?text=${encodeURIComponent(generateMessageText())}` : "#"}
          target={isFormValid ? "_blank" : undefined}
          rel="noopener noreferrer"
          onClick={(e) => !isFormValid && e.preventDefault()}
          title="Send booking via WhatsApp"
          className={cn(
            "flex items-center justify-center gap-3 rounded-xl py-4 text-sm font-medium transition-colors",
            isFormValid
              ? "bg-[#25D366] text-white hover:bg-[#20bd5a]"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          Open WhatsApp
        </a>

        <a
          href={isFormValid ? `https://t.me/babesagency?text=${encodeURIComponent(generateMessageText())}` : "#"}
          target={isFormValid ? "_blank" : undefined}
          rel="noopener noreferrer"
          onClick={(e) => !isFormValid && e.preventDefault()}
          title="Send booking via Telegram"
          className={cn(
            "flex items-center justify-center gap-3 rounded-xl py-4 text-sm font-medium transition-colors",
            isFormValid
              ? "bg-[#0088cc] text-white hover:bg-[#0077b5]"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          Open Telegram
        </a>
      </div>

      {!isFormValid && (
        <p className="text-center text-xs text-muted-foreground">
          Please complete all required fields to generate your booking message
        </p>
      )}

      {/* Discretion note */}
      <p className="text-center text-[10px] text-muted-foreground pt-2">
        All bookings are handled with complete discretion. Payment details will be confirmed via chat.
      </p>
    </div>
  )
}
