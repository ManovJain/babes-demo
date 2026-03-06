"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export function CollapsibleSection({
  children,
  defaultOpen = false,
}: {
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        title={open ? "Collapse" : "Expand"}
        className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        {open ? "Hide" : "Show"} Feed
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && children}
    </div>
  )
}
