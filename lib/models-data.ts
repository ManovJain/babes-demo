export interface BlogPost {
  id: string
  type: "photo" | "text" | "video"
  content: string
  image?: string
  video?: string
  timestamp: string
  likes: number
}

export interface Offering {
  id: string
  title: string
  description: string
  duration: string
  price: string
}

export interface GalleryImage {
  id: string
  src: string
  category: "editorial" | "swimwear" | "commercial" | "runway" | "beauty" | "lifestyle"
}

export type BodyType = "Slim" | "Athletic" | "Curvy" | "Petite"
export type Service = "CIM" | "COF" | "GREEK" | "BBFS" | "BBBJ"
export type Attribute = "Natural" | "Enhanced" | "No Kids" | "Visa"

export interface Model {
  id: string
  name: string
  slug: string
  image: string
  videoUrl: string
  age: number
  bodyType: BodyType
  height: string
  bust: string
  waist: string
  hips: string
  shoe: string
  hair: string
  eyes: string
  location: string
  categories: string[]
  services: Service[]
  attributes: Attribute[]
  bio: string
  featured: boolean
  instagram?: string
  gallery: GalleryImage[]
  offerings: Offering[]
  blog: BlogPost[]
}

export const models: Model[] = [
  {
    id: "1",
    name: "Valentina Reyes",
    slug: "valentina-reyes",
    image: "/images/model-1.jpg",
    videoUrl: "https://videos.pexels.com/video-files/4057411/4057411-sd_360_640_25fps.mp4",
    age: 24,
    bodyType: "Athletic",
    height: "5'10\"",
    bust: "32\"",
    waist: "24\"",
    hips: "34\"",
    shoe: "9",
    hair: "Dark Brown",
    eyes: "Brown",
    location: "Zona Rio, Tijuana",
    categories: ["Editorial", "Runway", "Commercial"],
    services: ["BBBJ", "CIM", "GREEK"],
    attributes: ["Natural", "No Kids", "Visa"],
    bio: "Valentina brings an effortless Latin elegance to every encounter. Born in Bogota and raised between coasts, she combines a fiery presence with refined sensibility.",
    featured: true,
    instagram: "@valentinareyes",
    gallery: [
      { id: "v-g1", src: "/images/model-1.jpg", category: "swimwear" },
      { id: "v-g2", src: "/images/gallery/valentina-2.jpg", category: "editorial" },
      { id: "v-g3", src: "/images/gallery/valentina-3.jpg", category: "swimwear" },
      { id: "v-g4", src: "/images/gallery/valentina-4.jpg", category: "lifestyle" },
      { id: "v-g5", src: "/images/gallery/valentina-5.jpg", category: "swimwear" },
    ],
    offerings: [
      {
        id: "v-o1",
        title: "1 Hour",
        description: "Perfect for a quick connection",
        duration: "1 hour",
        price: "$3,000",
      },
      {
        id: "v-o2",
        title: "2 Hours",
        description: "Extended time for a relaxed experience",
        duration: "2 hours",
        price: "$5,500",
      },
      {
        id: "v-o3",
        title: "3 Hours",
        description: "Dinner date and quality time together",
        duration: "3 hours",
        price: "$7,500",
      },
      {
        id: "v-o4",
        title: "TLN",
        description: "Full overnight experience until morning",
        duration: "Overnight",
        price: "$12,000",
      },
    ],
    blog: [
      {
        id: "v1",
        type: "text",
        content: "Just landed in Milan for fashion week!! So excited to be here, this city is absolutely magical. Can't wait to show you all what I've been working on",
        timestamp: "2h ago",
        likes: 2341,
      },
      {
        id: "v2",
        type: "photo",
        content: "Morning coffee in Miami hits different",
        image: "/images/blog/valentina-selfie-1.jpg",
        timestamp: "1d ago",
        likes: 4521,
      },
      {
        id: "v3",
        type: "text",
        content: "Reminder: drink water, get some sun, and be kind to yourself today",
        timestamp: "2d ago",
        likes: 1823,
      },
      {
        id: "v4",
        type: "photo",
        content: "BTS from yesterday's shoot - this team was incredible!",
        image: "/images/blog/valentina-selfie-2.jpg",
        timestamp: "3d ago",
        likes: 5672,
      },
    ],
  },
  {
    id: "2",
    name: "Camila Duarte",
    slug: "camila-duarte",
    image: "/images/model-2.jpg",
    videoUrl: "https://videos.pexels.com/video-files/4057413/4057413-sd_360_640_25fps.mp4",
    age: 22,
    bodyType: "Slim",
    height: "5'9\"",
    bust: "31\"",
    waist: "23\"",
    hips: "34\"",
    shoe: "8",
    hair: "Honey Brown",
    eyes: "Green-Hazel",
    location: "Playas de Tijuana",
    categories: ["Editorial", "Beauty", "Commercial"],
    services: ["BBBJ", "COF", "BBFS"],
    attributes: ["Enhanced"],
    bio: "Camila is the epitome of modern beauty. With her mixed heritage and striking features, she offers an unforgettable experience.",
    featured: true,
    instagram: "@camiladuarte",
    gallery: [
      { id: "c-g1", src: "/images/model-2.jpg", category: "lifestyle" },
      { id: "c-g2", src: "/images/gallery/camila-2.jpg", category: "beauty" },
      { id: "c-g3", src: "/images/gallery/camila-3.jpg", category: "commercial" },
      { id: "c-g4", src: "/images/gallery/camila-4.jpg", category: "lifestyle" },
      { id: "c-g5", src: "/images/gallery/camila-5.jpg", category: "swimwear" },
    ],
    offerings: [
      {
        id: "c-o1",
        title: "1 Hour",
        description: "Perfect for a quick connection",
        duration: "1 hour",
        price: "$3,000",
      },
      {
        id: "c-o2",
        title: "2 Hours",
        description: "Extended time for a relaxed experience",
        duration: "2 hours",
        price: "$5,500",
      },
      {
        id: "c-o3",
        title: "3 Hours",
        description: "Dinner date and quality time together",
        duration: "3 hours",
        price: "$7,500",
      },
      {
        id: "c-o4",
        title: "TLN",
        description: "Full overnight experience until morning",
        duration: "Overnight",
        price: "$12,000",
      },
    ],
    blog: [
      {
        id: "c1",
        type: "photo",
        content: "Golden hour in LA never gets old",
        image: "/images/blog/camila-selfie-1.jpg",
        timestamp: "4h ago",
        likes: 3892,
      },
      {
        id: "c2",
        type: "text",
        content: "Just wrapped a beauty campaign that I'm SO excited about. Can't share yet but trust me... it's going to be beautiful",
        timestamp: "1d ago",
        likes: 2145,
      },
      {
        id: "c3",
        type: "photo",
        content: "Lunch break between takes",
        image: "/images/blog/camila-selfie-2.jpg",
        timestamp: "2d ago",
        likes: 4123,
      },
    ],
  },
  {
    id: "3",
    name: "Sofia Herrera",
    slug: "sofia-herrera",
    image: "/images/model-3.jpg",
    videoUrl: "https://videos.pexels.com/video-files/4057416/4057416-sd_360_640_25fps.mp4",
    age: 26,
    bodyType: "Athletic",
    height: "5'11\"",
    bust: "33\"",
    waist: "24\"",
    hips: "35\"",
    shoe: "10",
    hair: "Dark Brown",
    eyes: "Dark Brown",
    location: "Centro, Tijuana",
    categories: ["Runway", "Editorial", "High Fashion"],
    services: ["CIM", "GREEK", "BBFS", "BBBJ"],
    attributes: ["Natural", "No Kids", "Visa"],
    bio: "Sofia commands attention with an undeniable presence. Her sculpted features and powerful energy bring intensity to every encounter.",
    featured: true,
    instagram: "@sofiaherrera",
    gallery: [
      { id: "s-g1", src: "/images/model-3.jpg", category: "swimwear" },
      { id: "s-g2", src: "/images/gallery/sofia-2.jpg", category: "runway" },
      { id: "s-g3", src: "/images/gallery/sofia-3.jpg", category: "editorial" },
      { id: "s-g4", src: "/images/gallery/sofia-4.jpg", category: "lifestyle" },
      { id: "s-g5", src: "/images/gallery/sofia-5.jpg", category: "swimwear" },
    ],
    offerings: [
      {
        id: "s-o1",
        title: "1 Hour",
        description: "Perfect for a quick connection",
        duration: "1 hour",
        price: "$3,000",
      },
      {
        id: "s-o2",
        title: "2 Hours",
        description: "Extended time for a relaxed experience",
        duration: "2 hours",
        price: "$5,500",
      },
      {
        id: "s-o3",
        title: "3 Hours",
        description: "Dinner date and quality time together",
        duration: "3 hours",
        price: "$7,500",
      },
      {
        id: "s-o4",
        title: "TLN",
        description: "Full overnight experience until morning",
        duration: "Overnight",
        price: "$12,000",
      },
    ],
    blog: [
      {
        id: "s1",
        type: "text",
        content: "NYC at night is my favorite thing. There's something about the energy here that makes me feel alive",
        timestamp: "6h ago",
        likes: 1956,
      },
      {
        id: "s2",
        type: "photo",
        content: "Fitting day! 12 looks and counting...",
        image: "/images/blog/sofia-selfie-1.jpg",
        timestamp: "1d ago",
        likes: 3478,
      },
      {
        id: "s3",
        type: "photo",
        content: "Post-show glow is real",
        image: "/images/blog/sofia-selfie-2.jpg",
        timestamp: "3d ago",
        likes: 5234,
      },
    ],
  },
  {
    id: "4",
    name: "Isabella Campos",
    slug: "isabella-campos",
    image: "/images/model-4.jpg",
    videoUrl: "https://videos.pexels.com/video-files/4057418/4057418-sd_360_640_25fps.mp4",
    age: 23,
    bodyType: "Curvy",
    height: "5'8\"",
    bust: "33\"",
    waist: "25\"",
    hips: "35\"",
    shoe: "8.5",
    hair: "Dark Curly",
    eyes: "Hazel",
    location: "Otay, Tijuana",
    categories: ["Commercial", "Swimwear", "Lifestyle"],
    services: ["BBBJ", "COF", "CIM", "BBFS", "GREEK"],
    attributes: ["Enhanced", "No Kids", "Visa"],
    bio: "Isabella's warmth and natural charisma light up every room. Her infectious energy and stunning curves ensure an unforgettable experience.",
    featured: true,
    instagram: "@isabellacampos",
    gallery: [
      { id: "i-g1", src: "/images/model-4.jpg", category: "swimwear" },
      { id: "i-g2", src: "/images/gallery/isabella-2.jpg", category: "lifestyle" },
      { id: "i-g3", src: "/images/gallery/isabella-3.jpg", category: "swimwear" },
      { id: "i-g4", src: "/images/gallery/isabella-4.jpg", category: "lifestyle" },
      { id: "i-g5", src: "/images/gallery/isabella-5.jpg", category: "swimwear" },
    ],
    offerings: [
      {
        id: "i-o1",
        title: "1 Hour",
        description: "Perfect for a quick connection",
        duration: "1 hour",
        price: "$3,000",
      },
      {
        id: "i-o2",
        title: "2 Hours",
        description: "Extended time for a relaxed experience",
        duration: "2 hours",
        price: "$5,500",
      },
      {
        id: "i-o3",
        title: "3 Hours",
        description: "Dinner date and quality time together",
        duration: "3 hours",
        price: "$7,500",
      },
      {
        id: "i-o4",
        title: "TLN",
        description: "Full overnight experience until morning",
        duration: "Overnight",
        price: "$12,000",
      },
    ],
    blog: [
      {
        id: "i1",
        type: "photo",
        content: "Beach days are the best days",
        image: "/images/blog/isabella-selfie-1.jpg",
        timestamp: "3h ago",
        likes: 4567,
      },
      {
        id: "i2",
        type: "text",
        content: "Grateful for this life, this job, and all of you. Sending love from Miami Beach",
        timestamp: "1d ago",
        likes: 2876,
      },
      {
        id: "i3",
        type: "photo",
        content: "Swimwear shoot done! Now time for actual swimming",
        image: "/images/blog/isabella-selfie-2.jpg",
        timestamp: "2d ago",
        likes: 5123,
      },
    ],
  },
  {
    id: "5",
    name: "Natalia Blanc",
    slug: "natalia-blanc",
    image: "/images/model-5.jpg",
    videoUrl: "https://videos.pexels.com/video-files/4057422/4057422-sd_360_640_25fps.mp4",
    age: 25,
    bodyType: "Slim",
    height: "5'10\"",
    bust: "32\"",
    waist: "24\"",
    hips: "34\"",
    shoe: "9",
    hair: "Blonde",
    eyes: "Blue",
    location: "Zona Centro, Tijuana",
    categories: ["Editorial", "Runway", "High Fashion"],
    services: ["BBBJ", "CIM"],
    attributes: ["Natural"],
    bio: "Natalia's ethereal beauty and cool composure make her truly special. Her captivating presence creates an experience that feels both timeless and unforgettable.",
    featured: false,
    instagram: "@nataliablanc",
    gallery: [
      { id: "n-g1", src: "/images/model-5.jpg", category: "swimwear" },
      { id: "n-g2", src: "/images/gallery/natalia-2.jpg", category: "editorial" },
      { id: "n-g3", src: "/images/gallery/natalia-3.jpg", category: "editorial" },
      { id: "n-g4", src: "/images/gallery/natalia-4.jpg", category: "lifestyle" },
      { id: "n-g5", src: "/images/gallery/natalia-5.jpg", category: "swimwear" },
    ],
    offerings: [
      {
        id: "n-o1",
        title: "1 Hour",
        description: "Perfect for a quick connection",
        duration: "1 hour",
        price: "$3,000",
      },
      {
        id: "n-o2",
        title: "2 Hours",
        description: "Extended time for a relaxed experience",
        duration: "2 hours",
        price: "$5,500",
      },
      {
        id: "n-o3",
        title: "3 Hours",
        description: "Dinner date and quality time together",
        duration: "3 hours",
        price: "$7,500",
      },
      {
        id: "n-o4",
        title: "TLN",
        description: "Full overnight experience until morning",
        duration: "Overnight",
        price: "$12,000",
      },
    ],
    blog: [
      {
        id: "n1",
        type: "text",
        content: "Paris, you have my heart. Every time I come back here, I fall in love all over again",
        timestamp: "5h ago",
        likes: 2134,
      },
      {
        id: "n2",
        type: "photo",
        content: "Early morning call time but the sunrise made it worth it",
        image: "/images/blog/natalia-selfie-1.jpg",
        timestamp: "2d ago",
        likes: 3567,
      },
    ],
  },
  {
    id: "6",
    name: "Lucia Mendoza",
    slug: "lucia-mendoza",
    image: "/images/model-6.jpg",
    videoUrl: "https://videos.pexels.com/video-files/4057425/4057425-sd_360_640_25fps.mp4",
    age: 21,
    bodyType: "Petite",
    height: "5'9\"",
    bust: "32\"",
    waist: "24\"",
    hips: "35\"",
    shoe: "8",
    hair: "Dark Brown",
    eyes: "Brown",
    location: "La Mesa, Tijuana",
    categories: ["Beauty", "Editorial", "Bridal"],
    services: ["BBBJ", "COF", "GREEK", "BBFS"],
    attributes: ["Natural", "No Kids"],
    bio: "Lucia brings an exquisite grace to every encounter. Her luminous skin and expressive features make her truly unforgettable.",
    featured: false,
    instagram: "@luciamendoza",
    gallery: [
      { id: "l-g1", src: "/images/model-6.jpg", category: "swimwear" },
      { id: "l-g2", src: "/images/gallery/lucia-2.jpg", category: "beauty" },
      { id: "l-g3", src: "/images/gallery/lucia-3.jpg", category: "editorial" },
      { id: "l-g4", src: "/images/gallery/lucia-4.jpg", category: "lifestyle" },
      { id: "l-g5", src: "/images/gallery/lucia-5.jpg", category: "swimwear" },
    ],
    offerings: [
      {
        id: "l-o1",
        title: "1 Hour",
        description: "Perfect for a quick connection",
        duration: "1 hour",
        price: "$3,000",
      },
      {
        id: "l-o2",
        title: "2 Hours",
        description: "Extended time for a relaxed experience",
        duration: "2 hours",
        price: "$5,500",
      },
      {
        id: "l-o3",
        title: "3 Hours",
        description: "Dinner date and quality time together",
        duration: "3 hours",
        price: "$7,500",
      },
      {
        id: "l-o4",
        title: "TLN",
        description: "Full overnight experience until morning",
        duration: "Overnight",
        price: "$12,000",
      },
    ],
    blog: [
      {
        id: "l1",
        type: "photo",
        content: "Home sweet home. CDMX, te amo",
        image: "/images/blog/lucia-selfie-1.jpg",
        timestamp: "8h ago",
        likes: 3890,
      },
      {
        id: "l2",
        type: "text",
        content: "Beauty comes from within, but good lighting doesn't hurt",
        timestamp: "1d ago",
        likes: 2456,
      },
      {
        id: "l3",
        type: "photo",
        content: "Behind the scenes at today's shoot for my favorite skincare brand",
        image: "/images/blog/lucia-selfie-2.jpg",
        timestamp: "3d ago",
        likes: 4123,
      },
    ],
  },
]

export function getModelBySlug(slug: string): Model | undefined {
  return models.find((m) => m.slug === slug)
}

export function getFeaturedModels(): Model[] {
  return models.filter((m) => m.featured)
}

export function getAllCategories(): string[] {
  const cats = new Set<string>()
  models.forEach((m) => m.categories.forEach((c) => cats.add(c)))
  return Array.from(cats).sort()
}

export function getAllServices(): Service[] {
  return ["BBBJ", "CIM", "COF", "GREEK", "BBFS"]
}

export function getAllBodyTypes(): BodyType[] {
  return ["Slim", "Athletic", "Curvy", "Petite"]
}

export function getAllAttributes(): Attribute[] {
  return ["Natural", "Enhanced", "No Kids", "Visa"]
}

export function getAgeRanges(): { label: string; min: number; max: number }[] {
  return [
    { label: "18-21", min: 18, max: 21 },
    { label: "22-25", min: 22, max: 25 },
    { label: "26-30", min: 26, max: 30 },
    { label: "30+", min: 30, max: 99 },
  ]
}
