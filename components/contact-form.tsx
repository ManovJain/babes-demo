"use client"

import { useState } from "react"
import { Send, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const inquiryTypes = ["General", "Booking", "Representation", "Press", "Other"]

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary">
          <Check className="h-5 w-5 text-primary-foreground" />
        </div>
        <h3 className="font-serif text-xl tracking-wide text-foreground">Message Sent</h3>
        <p className="mt-2 max-w-sm text-xs leading-relaxed text-muted-foreground">
          Thank you for reaching out. We&apos;ll get back to you as soon as possible.
        </p>
        <button
          onClick={() => {
            setSubmitted(false)
            setFormData({ name: "", email: "", inquiryType: "", subject: "", message: "" })
          }}
          className="mt-6 text-[11px] tracking-[0.12em] uppercase text-muted-foreground hover:text-foreground transition-colors"
        >
          Send Another Message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] tracking-[0.15em] uppercase text-foreground">
            Full Name <span className="text-muted-foreground">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Your name"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-foreground placeholder:text-muted-foreground/50"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] tracking-[0.15em] uppercase text-foreground">
            Email <span className="text-muted-foreground">*</span>
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="email@example.com"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-foreground placeholder:text-muted-foreground/50"
          />
        </div>
      </div>

      {/* Inquiry type */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] tracking-[0.15em] uppercase text-foreground">
          Inquiry Type <span className="text-muted-foreground">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {inquiryTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFormData({ ...formData, inquiryType: type })}
              className={cn(
                "rounded-full px-4 py-2 text-[11px] tracking-[0.1em] uppercase transition-colors",
                formData.inquiryType === type
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] tracking-[0.15em] uppercase text-foreground">
          Subject <span className="text-muted-foreground">*</span>
        </label>
        <input
          type="text"
          required
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          placeholder="Brief subject line"
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-foreground placeholder:text-muted-foreground/50"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] tracking-[0.15em] uppercase text-foreground">
          Message <span className="text-muted-foreground">*</span>
        </label>
        <textarea
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="How can we help you?"
          className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-foreground placeholder:text-muted-foreground/50"
        />
      </div>

      <button
        type="submit"
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-[11px] tracking-[0.15em] uppercase text-primary-foreground transition-opacity hover:opacity-90 self-start"
      >
        Send Message
        <Send className="h-3.5 w-3.5" />
      </button>
    </form>
  )
}
