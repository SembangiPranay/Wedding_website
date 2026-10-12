import { FormEvent, ReactNode, useState, useEffect, useRef } from "react";

const images = {
  hero: "/images/tirumala_mandapam_stage_real.jpg",
  venue: "/images/Mandapam.jpg",
  table: "/images/banana_leaf_feast_spread.jpg",
  couple: "/images/telugu_bamboo_mat_mandapam_real.jpg",
  ritual: "/images/tirumala_mandapam_stage_real.jpg",
  ballroom: "/images/telugu_function_hall.jpg",
  flowers: "/images/telugu_floral_decor.jpg",
  dinner: "/images/satvik_bhojanam.jpg",
  // Temple_5 has the clearest real photographic composition: bright gopuram,
  // visible Seshachalam ridge, and open sky for the hero copy.
  temple: "/images/Temple_reference/Temple_5.jpg",
  hillsPanorama: "/images/tirumala_overview.jpg",
  hillsMorning: "/images/tirumala_morning_hills.jpg",
  hillsRidge: "/images/sapthagiri_hills.jpg",
  templeGopuram: "/images/tirumala_gopurams.jpg",
  mandapamEco: "/images/telugu_coconut_leaf_mandapam_real.jpg",
  mandapamBamboo: "/images/telugu_bamboo_mat_mandapam_real.jpg",
  mandapamStage: "/images/Mandapam.jpg",
  feastLeaf: "/images/banana_leaf_feast_spread.jpg",
  bride: "/images/telugu_bride_pelli.jpg",
  diyas: "/images/telugu_vedic_pooja.jpg",
  // Core unique section assets & newly added authentic photos
  balajiPooja: "/images/Balaji_pooja.png",
  dweepam: "/images/Dweepam.png",
  mandapam: "/images/Mandapam.jpg",
  royalMandapam: "/images/Mandapam_v2.jpg",
  mandapamV2: "/images/Mandapam_v2.jpg",
  mandapamV3: "/images/Mandapam_v3.jpg",
  functionHall: "/images/telugu_function_hall.jpg",
  weddingSymbol: "/images/Wedding_symbol.png",
  floralDecor: "/images/telugu_floral_decor.jpg",
  satvikBhojanam: "/images/satvik_bhojanam.jpg",
  poojaHomam: "/images/pooja_homam.jpg",
  engagementRing: "/images/Engagement.jpg",
  pellikuthuru: "/images/Pellikuthuru.png",
  templeMoon: "/images/Gopuram_moon.jpg",
  balajiPortrait: "/images/Balaji_potrate.jpg",
  bridePelli: "/images/telugu_bride_pelli.jpg",
  // The 7 authentic celebration & marriage ritual assets
  marriageFamily: "/images/Marrage.jpg",
  haldiCelebration: "/images/Talambralu.jpg",
  talambraluRitual: "/images/Talambralu_v2.jpg",
  thaliHolding: "/images/Thali.jpg",
  thaliUnion: "/images/Thali_v2.jpg",
  jeelakarraBellam: "/images/Thambulam.jpg",
  saptapadiWalk: "/images/wedding.jpg",
  // High-end faceless review assets
  storyMangalyam: "/images/story_mangalyam.jpg",
  storyJeelakarra: "/images/story_jeelakarra.jpg",
  storyPanigrahanam: "/images/story_panigrahanam.jpg",
  // Official Company Logo
  logo: "/images/Logo.png",
  logoJpg: "/images/Logo.jpg",
};

type IconName =
  | "arrow"
  | "calendar"
  | "camera"
  | "check"
  | "chevron"
  | "clock"
  | "flower"
  | "guests"
  | "mail"
  | "map"
  | "menu"
  | "music"
  | "phone"
  | "pin"
  | "sparkle"
  | "star"
  | "x";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    camera: (
      <>
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
        <circle cx="12" cy="13" r="3" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </>
    ),
    flower: (
      <>
        <circle cx="12" cy="12" r="2.25" />
        <path d="M12 9c-1-4 4-6 5-3 1 2-2 4-5 6M15 12c4-1 6 4 3 5-2 1-4-2-6-5M12 15c1 4-4 6-5 3-1-2 2-4 5-6M9 12c-4 1-6-4-3-5 2-1 4 2 6 5" />
      </>
    ),
    guests: (
      <>
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="9" r="2" />
        <path d="M3 20c0-4 2.5-7 6-7s6 3 6 7M15 14c3 0 5 2 5 5" />
      </>
    ),
    mail: (
      <>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </>
    ),
    map: (
      <>
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
        <line x1="8" y1="2" x2="8" y2="18" />
        <line x1="16" y1="6" x2="16" y2="22" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    music: (
      <>
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </>
    ),
    phone: (
      <path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-4-2-2 2c-4-1.5-6.5-4-8-8l2-2-2-4Z" />
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    sparkle: (
      <>
        <path d="M12 2c.7 4.5 3.5 7.3 8 8-4.5.7-7.3 3.5-8 8-.7-4.5-3.5-7.3-8-8 4.5-.7 7.3-3.5 8-8Z" />
        <path d="M19 17c.3 1.7 1.3 2.7 3 3-1.7.3-2.7 1.3-3 3-.3-1.7-1.3-2.7-3-3 1.7-.3 2.7-1.3 3-3Z" />
      </>
    ),
    star: (
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor" />
    ),
    x: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function GopuramIcon({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true" className="brand-gopuram-svg">
      <circle cx="18" cy="3" r="1.3" fill="#dfbd7d" />
      <circle cx="14" cy="4" r="1.1" fill="#dfbd7d" />
      <circle cx="22" cy="4" r="1.1" fill="#dfbd7d" />
      <path d="M12 5.5h12l-1 2h-10l-1-2z" fill="#dfbd7d" />
      <path d="M11 8h14l-1 2.8h-12l-1-2.8z" stroke="#dfbd7d" strokeWidth="1" fill="none" />
      <path d="M9.5 11.5h17l-1 3.2h-15l-1-3.2z" stroke="#dfbd7d" strokeWidth="1" fill="none" />
      <path d="M8 15.5h20l-1 3.5h-18l-1-3.5z" stroke="#dfbd7d" strokeWidth="1" fill="none" />
      <path d="M6.5 20h23l-1.2 4h-20.6l-1.2-4z" stroke="#dfbd7d" strokeWidth="1" fill="none" />
      <path d="M5 25h26v8h-26v-8z" stroke="#dfbd7d" strokeWidth="1.2" fill="none" />
      <path d="M14.5 33v-5.5a3.5 3.5 0 0 1 7 0v5.5" stroke="#dfbd7d" strokeWidth="1.2" fill="none" />
      <line x1="15" y1="9" x2="15" y2="10.8" stroke="#dfbd7d" strokeWidth="0.8" />
      <line x1="18" y1="8" x2="18" y2="10.8" stroke="#dfbd7d" strokeWidth="0.8" />
      <line x1="21" y1="9" x2="21" y2="10.8" stroke="#dfbd7d" strokeWidth="0.8" />
      <line x1="14" y1="12.5" x2="14" y2="14.7" stroke="#dfbd7d" strokeWidth="0.8" />
      <line x1="18" y1="12" x2="18" y2="14.7" stroke="#dfbd7d" strokeWidth="0.8" />
      <line x1="22" y1="12.5" x2="22" y2="14.7" stroke="#dfbd7d" strokeWidth="0.8" />
      <line x1="13" y1="16.5" x2="13" y2="19" stroke="#dfbd7d" strokeWidth="0.8" />
      <line x1="18" y1="16" x2="18" y2="19" stroke="#dfbd7d" strokeWidth="0.8" />
      <line x1="23" y1="16.5" x2="23" y2="19" stroke="#dfbd7d" strokeWidth="0.8" />
    </svg>
  );
}

function LotusIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 26" fill="none" stroke="#dfbd7d" strokeWidth="1.3" aria-hidden="true">
      <path d="M16 3c0 7-3 14-3 17 2 2 4 2 6 0 0-3-3-10-3-17z" fill="rgba(223, 189, 125, 0.22)" />
      <path d="M16 20c-5-2-11-7-11-12 0 4 3 9 8 12" />
      <path d="M16 20c-3-3-8-4-13-1 2 4 7 7 13 3" />
      <path d="M16 20c5-2 11-7 11-12 0 4-3 9-8 12" />
      <path d="M16 20c3-3 8-4 13-1-2 4-7 7-13 3" />
      <path d="M10 22c3 2 9 2 12 0" strokeWidth="1" />
    </svg>
  );
}

function MandalaIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#dfbd7d" strokeWidth="1.2" aria-hidden="true">
      <rect x="5" y="5" width="14" height="14" rx="2" transform="rotate(45 12 12)" />
      <rect x="7" y="7" width="10" height="10" rx="1" />
      <circle cx="12" cy="12" r="2.5" fill="#dfbd7d" />
    </svg>
  );
}

function DiyaIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#dfbd7d" strokeWidth="1.4" aria-hidden="true">
      <path d="M12 2c.8 2 2.5 3.5 2.5 5.5a2.5 2.5 0 0 1-5 0C9.5 5.5 11.2 4 12 2z" fill="#dfbd7d" />
      <path d="M3 13c1.5 5 5 7 9 7s7.5-2 9-7H3z" fill="rgba(223, 189, 125, 0.2)" />
      <path d="M2.5 13h19" />
    </svg>
  );
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.57 20.15 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.59 20.15 12.05 20.15ZM16.57 14.39C16.32 14.27 15.1 13.67 14.87 13.58C14.65 13.5 14.48 13.46 14.32 13.71C14.15 13.96 13.68 14.51 13.54 14.68C13.39 14.84 13.25 14.86 13 14.74C12.75 14.61 11.95 14.35 11 13.51C10.26 12.85 9.76 12.04 9.61 11.79C9.47 11.54 9.6 11.4 9.72 11.28C9.83 11.17 9.97 10.99 10.09 10.84C10.22 10.7 10.26 10.59 10.34 10.42C10.43 10.26 10.38 10.11 10.32 9.99C10.26 9.87 9.77 8.66 9.56 8.16C9.36 7.68 9.16 7.74 9.01 7.73C8.87 7.73 8.71 7.72 8.54 7.72C8.38 7.72 8.11 7.78 7.89 8.03C7.66 8.27 7.03 8.86 7.03 10.07C7.03 11.27 7.91 12.43 8.03 12.59C8.15 12.76 9.75 15.22 12.21 16.28C12.8 16.53 13.25 16.68 13.61 16.79C14.2 16.98 14.73 16.95 15.15 16.89C15.62 16.82 16.6 16.3 16.8 15.72C17.01 15.15 17.01 14.65 16.95 14.55C16.89 14.45 16.82 14.51 16.57 14.39Z" />
    </svg>
  );
}

function ScrollCircleIcon() {
  return (
    <span className="scroll-circle-btn">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#dfbd7d" strokeWidth="2" aria-hidden="true">
        <path d="M12 5v14M19 12l-7 7-7-7" />
      </svg>
    </span>
  );
}

function AnimatedCounter({ value, formatted }: { value: number; formatted?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
          let startTime: number | null = null;
          const duration = 1200;

          const step = (now: number) => {
            if (!startTime) startTime = now;
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Cubic deceleration curve
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * value);
            setCount(current);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(value);
            }
          };

          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, hasStarted]);

  return (
    <span ref={ref} className="stat-number">
      {hasStarted && formatted && count === value ? formatted : count.toLocaleString()}
    </span>
  );
}

const services = [
  { title: "Tirumala Convention Hall", note: "Up to 800 guests · Grand 40-ft stage", image: images.mandapamV2 },
  { title: "Authentic Telugu Bhojanam", note: "Traditional satvik banana leaf feast", image: images.satvikBhojanam },
  { title: "Traditional Floral Décor", note: "Rose wall, Tirumala Namam & brass bells", image: images.floralDecor },
  { title: "Purohit & Vedic Kalyanam", note: "Sacred Shastras · Traditional Sampradayam Honoured", image: images.poojaHomam },
  { title: "Sacred Deepam & Ambiance", note: "Divine Serenity · Seshachalam Hill Tranquility", image: images.templeGopuram },
  { title: "Grand Kalyana Mandapam", note: "Golden Balaji deities & floral canopy", image: images.mandapamV3 },
];

const allServices = [
  {
    title: "Function Hall Booking",
    telugu: "AC & Traditional Kalyana Mandapams",
    desc: "A/C & traditional marriage halls in Tirumala & Tirupati suited for all guest counts.",
    icon: "pin" as IconName,
  },
  {
    title: "Accommodation Arrangements",
    telugu: "Guest Cottages & Deluxe Rooms",
    desc: "Comfortable cottages, guest houses, and deluxe rooms for your visiting family and relatives.",
    icon: "check" as IconName,
  },
  {
    title: "Catering Services",
    telugu: "Authentic Satvik Feast & Dining",
    desc: "Authentic Satvik Telugu Bhojanam served with utmost hygiene and divine Tirumala taste.",
    icon: "flower" as IconName,
  },
  {
    title: "Traditional & Modern Decorations",
    telugu: "Temple Gopurams & Floral Themes",
    desc: "Exquisite rose walls, jasmine garlands, temple gopuram backdrops, and modern lighting.",
    icon: "sparkle" as IconName,
  },
  {
    title: "Photography & Videography",
    telugu: "Cinematic 4K & Candid Wedding Films",
    desc: "Cinematic 4K wedding films, candid moments, traditional coverage, and premium photo albums.",
    icon: "camera" as IconName,
  },
  {
    title: "Experienced Purohits",
    telugu: "Learned Vedic Priests & Scholars",
    desc: "Learned Vedic scholars conducting your rituals with strict adherence to Sanatana Dharma.",
    icon: "sparkle" as IconName,
  },
  {
    title: "Pooja Materials & Articles",
    telugu: "Complete Sacred Homam & Ritual Samagri",
    desc: "Complete homam samagri, fresh flowers, pasupu-kumkum, kankanams, and sacred articles.",
    icon: "flower" as IconName,
  },
  {
    title: "Bridal Makeup Artists",
    telugu: "Professional Bridal Makeover & Styling",
    desc: "Expert bridal makeover, saree draping, mehendi, and traditional hairstyles.",
    icon: "sparkle" as IconName,
  },
  {
    title: "Sannai Melam & Traditional Music",
    telugu: "Auspicious Nadaswaram & Temple Melam",
    desc: "Auspicious Nadaswaram, Tavil, and classical temple music creating divine celebrations.",
    icon: "music" as IconName,
  },
  {
    title: "Event Planning & Coordination",
    telugu: "Single-Point Dedicated Coordination",
    desc: "End-to-end planning with dedicated event managers ensuring a seamless, worry-free wedding.",
    icon: "calendar" as IconName,
  },
  {
    title: "Guest Management",
    telugu: "Warm Hospitality & Guest Logistics",
    desc: "Warm Telugu hospitality, reception coordination, guest transport, and personalized care.",
    icon: "guests" as IconName,
  },
  {
    title: "And All Other Event Services",
    telugu: "Customized Requests for Every Occasion",
    desc: "All custom arrangements and supplies required to make your sacred event truly memorable.",
    icon: "check" as IconName,
  },
];

type DecorCategory = "all" | "mandapam" | "traditional" | "entrance" | "reception";

interface DecorItem {
  id: string;
  title: string;
  telugu: string;
  category: DecorCategory;
  categoryLabel: string;
  image: string;
  desc: string;
  venueNote: string;
}

const decorationItems: DecorItem[] = [
  // 01. Kalyana Mandapam
  {
    id: "rose-canopy",
    title: "Grand Rose & Jasmine Canopy Stage",
    telugu: "Rose & Jasmine Wedding Mandapam",
    category: "mandapam",
    categoryLabel: "Kalyana Mandapam",
    image: "/images/decorations/decor_mandapam_rose_canopy.jpg",
    desc: "Multi-tiered floral ceiling with hanging rose garlands and traditional golden temple spire backdrop.",
    venueNote: "Tirumala Convention Stage",
  },
  // 02. Traditional & Eco
  {
    id: "coconut-leaf",
    title: "Traditional Coconut Leaf & Bamboo Pavilion",
    telugu: "Traditional Eco-Friendly Thatch Pavilion",
    category: "traditional",
    categoryLabel: "Traditional & Eco",
    image: "/images/decorations/decor_trad_coconut_leaf_pelli.jpg",
    desc: "Authentic eco-friendly Telugu village mandapam with fresh coconut palms, banana bunches, and red carpet.",
    venueNote: "Village Sampradayam Setup",
  },
  // 03. Grand Entrance
  {
    id: "night-gopuram",
    title: "Illuminated Temple Gopuram Night Gate",
    telugu: "Illuminated Temple Gopuram Night Gate",
    category: "entrance",
    categoryLabel: "Grand Entrance",
    image: "/images/decorations/decor_entrance_night_gopuram.jpg",
    desc: "Majestic temple entrance archway with banana trunks, warm halogen spotlights, and red carpet aisle.",
    venueNote: "Main Hall Entrance Walkway",
  },
  // 04. Modern Reception
  {
    id: "rose-wall",
    title: "Lush Pastel Pink & Ivory Rose Wall",
    telugu: "Rose Wall Backdrop & Regal Seating",
    category: "reception",
    categoryLabel: "Modern Reception",
    image: "/images/decorations/decor_reception_rose_wall_sofa.jpg",
    desc: "Full wall of fresh roses with golden baroque sofa, crystal drops, and green foliage accents.",
    venueNote: "Evening Reception Stage",
  },
  // 05. Kalyana Mandapam
  {
    id: "golden-shrine",
    title: "Royal Golden Gopuram Mandapam",
    telugu: "Regal Golden Gopuram Mandapam",
    category: "mandapam",
    categoryLabel: "Kalyana Mandapam",
    image: "/images/decorations/decor_mandapam_golden_shrine.jpg",
    desc: "Carved golden temple arch with red velvet detailing, Balaji Namam, and lush floral stage borders.",
    venueNote: "Grand Hall · Tirumala",
  },
  // 06. Traditional & Eco
  {
    id: "banana-stalk",
    title: "Fresh Banana Trunk & Floral Mandapam",
    telugu: "Sacred Banana Trunk & Floral Mandapam",
    category: "traditional",
    categoryLabel: "Traditional & Eco",
    image: "/images/decorations/decor_trad_banana_stalk_mandapam.jpg",
    desc: "Natural green banana stalk pillars with woven coconut thatch roof and fresh marigold hangings.",
    venueNote: "Natural Sampradayam",
  },
  // 07. Grand Entrance
  {
    id: "fairy-lights",
    title: "Royal Temple Archway & Light Canopy",
    telugu: "Golden Archway & Fairy Light Canopy",
    category: "entrance",
    categoryLabel: "Grand Entrance",
    image: "/images/decorations/decor_entrance_fairy_lights.jpg",
    desc: "Bright golden gopuram entrance arch with fairy light ceiling canopy and welcoming family frames.",
    venueNote: "Grand Night Walkway",
  },
  // 08. Modern Reception
  {
    id: "ivory-canopy",
    title: "Modern Ivory Floral Canopy Stage",
    telugu: "Ivory Floral Canopy & Luxury Lounge",
    category: "reception",
    categoryLabel: "Modern Reception",
    image: "/images/decorations/decor_reception_ivory_canopy.jpg",
    desc: "Contemporary ivory gazebo with white hydrangeas, dangling crystals, and regal white sofa set.",
    venueNote: "Modern Wedding Reception",
  },
  // 09. Kalyana Mandapam
  {
    id: "amber-heritage",
    title: "Heritage Stone Pillar Temple Mandapam",
    telugu: "Heritage Stone Pillar Temple Mandapam",
    category: "mandapam",
    categoryLabel: "Kalyana Mandapam",
    image: "/images/decorations/decor_mandapam_amber_heritage.jpg",
    desc: "Warm ambient lit carved temple pillars with brass kundu lamps and floral sanctum centerpiece.",
    venueNote: "Authentic Vedic Setup",
  },
  // 10. Traditional & Eco
  {
    id: "vedic-courtyard",
    title: "Open Courtyard Vedic Homam Setup",
    telugu: "Open Courtyard Vedic Homam Stage",
    category: "traditional",
    categoryLabel: "Traditional & Eco",
    image: "/images/decorations/decor_trad_vedic_courtyard.jpg",
    desc: "Sacred Vedic homam and muhurtham platform framed with fresh green banana trunks and red rose streamers.",
    venueNote: "Sacred Homam Setup",
  },
  // 11. Modern Reception
  {
    id: "white-chandeliers",
    title: "White Floral Arch & Crystal Chandeliers",
    telugu: "Triple Floral Arches & Chandeliers",
    category: "reception",
    categoryLabel: "Modern Reception",
    image: "/images/decorations/decor_reception_white_chandeliers.jpg",
    desc: "Triple floral arches with crystal warm chandeliers, uplighting, and central reception couch.",
    venueNote: "Centrally A/C Ballroom",
  },
  // 12. Kalyana Mandapam
  {
    id: "floral-pillars",
    title: "Four Golden Columns & Floral Arch",
    telugu: "Four Golden Columns & Floral Arch",
    category: "mandapam",
    categoryLabel: "Kalyana Mandapam",
    image: "/images/decorations/decor_mandapam_floral_pillars.jpg",
    desc: "Four golden carved pillars with dense yellow rose and white lily canopy, crystal chandeliers.",
    venueNote: "Tirupati Kalyana Hall",
  },
  // 13. Traditional & Eco
  {
    id: "balaji-statues",
    title: "Deity Statues & Jasmine Garland Backing",
    telugu: "Divine Balaji Statues & Jasmine Drapery",
    category: "traditional",
    categoryLabel: "Traditional & Eco",
    image: "/images/decorations/decor_trad_balaji_floral_statues.jpg",
    desc: "Lord Venkateswara and Padmavathi Ammavaru in royal attire backed by jasmine curtain and red drapes.",
    venueNote: "Sannidhi Stage Decor",
  },
  // 14. Modern Reception
  {
    id: "velvet-namam",
    title: "Wide Crimson Velvet & Balaji Namam Stage",
    telugu: "Crimson Velvet Backdrop & Golden Namam",
    category: "reception",
    categoryLabel: "Modern Reception",
    image: "/images/decorations/decor_reception_velvet_namam.jpg",
    desc: "Royal crimson velvet backdrop featuring golden Tirumala Namam, Shankha & Chakra with floral borders.",
    venueNote: "Grand Banquet Stage",
  },
  // 15. Kalyana Mandapam
  {
    id: "temple-bell",
    title: "Sacred Tirumala Bell Stage Décor",
    telugu: "Golden Temple Bell & Marigold Stage",
    category: "mandapam",
    categoryLabel: "Kalyana Mandapam",
    image: "/images/decorations/decor_mandapam_temple_bell.jpg",
    desc: "Illuminated golden temple bell motif with yellow marigold garlands and vibrant floral wings.",
    venueNote: "Vedic Muhurtham Setup",
  },
  // 16. Kalyana Mandapam
  {
    id: "sanctum-arch",
    title: "Illuminated Balaji Sanctum Stage",
    telugu: "Illuminated Balaji Sanctum Stage",
    category: "mandapam",
    categoryLabel: "Kalyana Mandapam",
    image: "/images/decorations/decor_mandapam_sanctum_arch.jpg",
    desc: "Intricately carved temple dome with fresh pink rose tassels, jasmine borders and illuminated deities.",
    venueNote: "Traditional Telugu Pelli",
  },
];

const occasions = [
  { name: "Bridal Ceremony · Pellikuthuru", image: images.pellikuthuru },
  { name: "Engagement · Nischitartham", image: images.engagementRing },
  { name: "Haldi & Blessings · Mangalasnanam", image: images.haldiCelebration },
  { name: "Grand Reception & Banquet", image: images.functionHall },
];


const steps = [
  ["01", "Share Your Dream & Muhurtham", "Share your auspicious muhurtham, family traditions and the moments closest to your heart."],
  ["02", "Meticulous Heritage Planning", "We bring together the mandapam, satvik dining, décor, and every sacred Vedic ritual."],
  ["03", "Celebrate with Divine Joy", "Your dedicated coordinator manages every guest and detail while your family celebrates peacefully."],
];

const stories = [
  {
    ritualTelugu: "Mangalya Dharanam",
    ritualEn: "Sacred Thali Union",
    quote: "The sacred Mangalyadharanam moment in the holy precincts of Tirumala was pure bliss. Surrounded by the divine aura of Lord Venkateswara and the pure resonance of Vedic mantras, tying the holy thali felt truly blessed for a lifetime.",
    couple: "Sravani & Karthik",
    location: "Traditional Telugu Pelli · Vijayawada",
    image: images.storyMangalyam,
    alt: "Sacred Mangalasutram holding ceremony with lotus petals, jasmine flowers, and bride and groom hands in authentic Telugu wedding",
  },
  {
    ritualTelugu: "Jeelakarra-Bellam",
    ritualEn: "Auspicious Sumuhurtham",
    quote: "The Jeelakarra-Bellam muhurtham under the guidance of learned Vedic scholars filled our families with deep reverence. Every ancient Telugu tradition, the divine floral decor, and the authentic satvik bhojanam were conducted with utmost purity.",
    couple: "Haritha & Vikram",
    location: "Vedic Kalyanam · Hyderabad",
    image: images.storyJeelakarra,
    alt: "Auspicious Jeelakarra Bellam ritual with bride and groom placing sacred betel leaves with cumin and jaggery at sumuhurtham",
  },
  {
    ritualTelugu: "Panigrahanam & Saptapadi",
    ritualEn: "Seven Sacred Steps",
    quote: "Taking our sacred Saptapadi vows at the foothills of the holy Seven Hills felt like heaven on earth. Holding hands with the sacred kankanam amidst temple bells and elders' blessings brought eternal peace and sanctity to our marriage.",
    couple: "Deepthi & Rajesh",
    location: "Sumuhurtham & Kalyanam · Tirupati",
    image: images.storyPanigrahanam,
    alt: "Panigrahanam and Saptapadi ceremony with bride in golden Kanjeevaram silk and groom holding hands tied with sacred thread",
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeStory, setActiveStory] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeFilter, setActiveFilter] = useState<DecorCategory>("all");
  const [selectedModalImage, setSelectedModalImage] = useState<DecorItem | null>(null);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const [mobileViewMode, setMobileViewMode] = useState<"grid" | "list">("grid");
  const touchStartX = useRef<number | null>(null);
  const modalTouchStartX = useRef<number | null>(null);

  const filteredDecorations =
    activeFilter === "all"
      ? decorationItems
      : decorationItems.filter((item) => item.category === activeFilter);

  const isFiltered = activeFilter !== "all";
  const INITIAL_DISPLAY_COUNT = 6;
  const displayedDecorations = isFiltered || isMobileExpanded
    ? filteredDecorations
    : filteredDecorations.slice(0, INITIAL_DISPLAY_COUNT);
  const remainingDecorCount = filteredDecorations.length - displayedDecorations.length;

  const modalIndex = selectedModalImage
    ? filteredDecorations.findIndex((item) => item.id === selectedModalImage.id)
    : -1;

  const prevModalImage = () => {
    if (modalIndex <= 0) {
      setSelectedModalImage(filteredDecorations[filteredDecorations.length - 1]);
    } else {
      setSelectedModalImage(filteredDecorations[modalIndex - 1]);
    }
  };

  const nextModalImage = () => {
    if (modalIndex >= filteredDecorations.length - 1) {
      setSelectedModalImage(filteredDecorations[0]);
    } else {
      setSelectedModalImage(filteredDecorations[modalIndex + 1]);
    }
  };

  const handleModalTouchStart = (e: React.TouchEvent) => {
    modalTouchStartX.current = e.touches[0].clientX;
  };

  const handleModalTouchEnd = (e: React.TouchEvent) => {
    if (modalTouchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = modalTouchStartX.current - touchEndX;
    if (diff > 45) {
      nextModalImage();
    } else if (diff < -45) {
      prevModalImage();
    }
    modalTouchStartX.current = null;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedModalImage(null);
      } else if (e.key === "ArrowLeft" && selectedModalImage) {
        prevModalImage();
      } else if (e.key === "ArrowRight" && selectedModalImage) {
        nextModalImage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedModalImage, modalIndex, filteredDecorations]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveStory((prev) => (prev === stories.length - 1 ? 0 : prev + 1));
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal-init");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const prevStory = () => {
    setActiveStory((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
  };

  const nextStory = () => {
    setActiveStory((prev) => (prev === stories.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 45) {
      nextStory();
    } else if (diff < -45) {
      prevStory();
    }
    touchStartX.current = null;
  };

  const scrollToInquiry = () => {
    document.querySelector("#inquiry")?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const submitInquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Tirumala Balaji Marriages and Events home">
          <img
            src={images.logo}
            alt="Tirumala Balaji Marriages & Events Logo"
            className="brand-logo-img"
            width={40}
            height={40}
          />
          <div className="brand-text">
            <strong className="brand-title">Tirumala Balaji</strong>
            <small className="brand-subtitle">MARRIAGES &amp; EVENTS</small>
          </div>
        </a>

        <nav className={menuOpen ? "nav-links nav-open" : "nav-links"} aria-label="Main navigation">
          <a href="#home" className="nav-item active" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#wedding-focus" className="nav-item" onClick={() => setMenuOpen(false)}>Traditions</a>
          <a href="#venue" className="nav-item" onClick={() => setMenuOpen(false)}>Function Hall</a>
          <a href="#rituals" className="nav-item" onClick={() => setMenuOpen(false)}>Rituals</a>
          <a href="#services" className="nav-item" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#decorations" className="nav-item" onClick={() => setMenuOpen(false)}>Decorations</a>
          <a href="#scenery" className="nav-item" onClick={() => setMenuOpen(false)}>Sacred Hills</a>
          <a href="#blessing" className="nav-item" onClick={() => setMenuOpen(false)}>Divine Grace</a>
          <a href="#stories" className="nav-item" onClick={() => setMenuOpen(false)}>Stories</a>
          <a href="#inquiry" className="nav-item" onClick={() => setMenuOpen(false)}>Contact</a>
          <a href="tel:9491155403" className="nav-item nav-phone-mobile">
            <Icon name="phone" size={14} /> Call: 94911 55403
          </a>
          <button className="nav-cta-pill" onClick={scrollToInquiry}>PLAN YOUR EVENT <Icon name="arrow" size={15} /></button>
        </nav>

        <div className="header-right-actions">
          <a href="tel:9491155403" className="header-phone-pill" aria-label="Call 9491155403">
            <Icon name="phone" size={13} />
            <span className="header-phone-text">94911 55403</span>
          </a>
          <button className="nav-cta-pill-desktop" onClick={scrollToInquiry}>
            PLAN YOUR EVENT <Icon name="arrow" size={14} />
          </button>
          <button
            className="menu-button-circle"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <Icon name={menuOpen ? "x" : "menu"} size={18} />
          </button>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-media-wrapper">
          <img
            className="hero-temple"
            src={images.temple}
            alt="Sacred Tirumala Seshachalam hills and Venkateswara temple gopurams illuminated at twilight"
          />
          <div className="hero-shade-left" />
        </div>

        {/* Right-Side Vertical Progress Slider */}
        <aside className="hero-vertical-nav" aria-label="Page sections">
          <span className="vert-scroll-text">SCROLL</span>
          <div className="vert-track">
            <span className="vert-active-dot" />
          </div>
          <div className="vert-steps">
            <span className="step-num active">01</span>
            <span className="step-num">02</span>
            <span className="step-num">03</span>
            <span className="step-num">04</span>
          </div>
        </aside>

        {/* Left-Aligned Hero Content */}
        <div className="hero-container-left">
          <div className="hero-kicker-stack">
            <span className="kicker-rule" />
            <div className="kicker-lines">
              <span>A DIVINE BEGINNING</span>
              <span>FOR YOUR SPECIAL MOMENTS ·</span>
            </div>
          </div>

          <div className="hero-lotus-ornament">
            <span className="lotus-stem" />
            <LotusIcon size={26} />
          </div>

          <h1 className="hero-title-left">
            Tirumala Balaji
            <span className="hero-subtitle-left">Marriages &amp; Events</span>
          </h1>

          <p className="hero-copy-left">
            We organize weddings and all types of events for every budget, offering complete end-to-end event management services. From simple ceremonies to grand celebrations, we ensure a smooth, hassle-free, and unforgettable experience with quality service at affordable prices.
          </p>

          <div className="hero-actions-left">
            <button className="button hero-btn-gold" onClick={scrollToInquiry}>
              PLAN YOUR CELEBRATION <Icon name="arrow" size={16} />
            </button>
            <a
              className="button hero-btn-whatsapp"
              href="https://wa.me/919491155403?text=Namaskaram%20Tirumala%20Balaji%20Events,%20we%20would%20like%20to%20plan%20our%20celebration."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with us on WhatsApp"
            >
              <WhatsAppIcon size={18} />
              <span>WhatsApp Us</span>
            </a>
            <a
              className="button hero-btn-call"
              href="tel:9491155403"
              aria-label="Call 9491155403"
            >
              <Icon name="phone" size={15} />
              <span>Call: 94911 55403</span>
            </a>
          </div>

          <div className="hero-metrics-row">
            <div className="metric-cell">
              <Icon name="guests" size={18} />
              <div>
                <strong>500+</strong>
                <span>Happy Families</span>
              </div>
            </div>
            <div className="metric-cell">
              <Icon name="flower" size={18} />
              <div>
                <strong>Every Budget</strong>
                <span>Simple to Grand</span>
              </div>
            </div>
            <div className="metric-cell">
              <Icon name="pin" size={18} />
              <div>
                <strong>Tirumala &amp; Tirupati</strong>
                <span>Direct Local Offices</span>
              </div>
            </div>
            <div className="metric-cell">
              <Icon name="clock" size={18} />
              <div>
                <strong>24/7 Support</strong>
                <span>Direct Coordinator</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Scroll Discover Left, Gold Line, Mandala Right */}
        <div className="hero-bottom-bar-left">
          <div className="bottom-bar-left-side">
            <a href="#wedding-focus" className="scroll-discover-link" aria-label="Scroll to discover">
              <ScrollCircleIcon />
              <span>SCROLL TO DISCOVER</span>
            </a>
          </div>

          <div className="bottom-bar-gold-line" />

          <div className="bottom-bar-right-side">
            <MandalaIcon size={22} />
            <div className="mandala-text">
              <strong>YOUR CELEBRATION</strong>
              <small>OUR RESPONSIBILITY</small>
            </div>
          </div>
        </div>
      </section>

      <section className="wedding-focus reveal-init" id="wedding-focus" aria-label="Telugu wedding planning">
        <div className="wedding-focus-image-wrapper">
          <div className="wedding-focus-image">
            <img src={images.balajiPooja} alt="Sacred Tirumala Malayappa Swamy Kalyana Utsavam mangala harathi with divine floral garlands" />
            <div className="wedding-image-seal">
              <span className="seal-text-telugu">DIVINE</span>
              <small className="seal-subtext">Kalyanotsavam</small>
            </div>
          </div>
        </div>
        <div className="wedding-focus-copy">
          <p className="eyebrow"><span /> SACRED VEDIC TRADITIONS · THE HEART OF WHAT WE DO</p>
          <h2 className="wedding-focus-heading">
            Your wedding,<br />
            <span className="heading-bold-gold">honoured beautifully.</span>
          </h2>
          <p className="wedding-focus-lead">
            A traditional wedding is a coming together of families, blessings, and
            centuries of sacred tradition. From jeelakarra bellam to saptapadi, we
            thoughtfully arrange every ritual while surrounding your guests with
            warm, gracious hospitality under the divine gaze of Lord Malayappa Swamy.
          </p>
          <div className="wedding-promises-grid">
            <div className="promise-card">
              <span className="promise-check"><Icon name="check" size={15} /></span>
              <div className="promise-card-text">
                <strong>Authentic Traditions</strong>
                <span>Traditional Vedic rituals &amp; experienced Tirumala Purohits</span>
              </div>
            </div>
            <div className="promise-card">
              <span className="promise-check"><Icon name="check" size={15} /></span>
              <div className="promise-card-text">
                <strong>Complete Family Hospitality</strong>
                <span>Tirumala AC accommodation, guest transport &amp; Satvik bhojanam</span>
              </div>
            </div>
            <div className="promise-card">
              <span className="promise-check"><Icon name="check" size={15} /></span>
              <div className="promise-card-text">
                <strong>One Dedicated Wedding Team</strong>
                <span>Single coordinator for hall booking, decor, catering &amp; pooja</span>
              </div>
            </div>
          </div>
          <div className="wedding-focus-cta-group">
            <button className="button button-gold hero-btn-gold" onClick={scrollToInquiry}>
              PLAN YOUR WEDDING <Icon name="arrow" size={16} />
            </button>
            <a
              className="button hero-btn-whatsapp"
              href="https://wa.me/919491155403?text=Namaskaram%20Tirumala%20Balaji%20Events,%20we%20want%20to%20plan%20our%20wedding."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
            >
              <WhatsAppIcon size={17} />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>

      <section className="section services reveal-init" id="services">
        <div className="temple-watermark" aria-hidden="true">BALAJI</div>
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span /> OUR SERVICES · COMPREHENSIVE WEDDING SOLUTIONS</p>
            <h2>Everything you need<br /><em>for a sacred celebration.</em></h2>
          </div>
          <p>
            From auspicious sumuhurtham to mangala harathi, we bring venue, rituals, hospitality,
            and celebration together with heartfelt warmth.
          </p>
        </div>
        <div className="service-grid">
          {services.map((service, index) => (
            <article className="image-card" key={service.title}>
              <img src={service.image} alt={service.title} />
              <div className="card-gradient" />
              <span className="card-number">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <p>{service.note}</p>
                <h3>{service.title}</h3>
              </div>
            </article>
          ))}
        </div>
        <p className="service-swipe-hint">
          <span>← Swipe horizontally to explore all services →</span>
        </p>

        {/* End-to-End 12 Professional Services Catalog & Budget Value Proposition */}
        <div className="all-services-catalog">
          <div className="catalog-header-card">
            <div className="catalog-badge">
              <Icon name="sparkle" size={14} /> Complete Event Management · All Budgets
            </div>
            <h3>End-to-End Event Management for Every Budget</h3>
            <p className="catalog-lead">
              We organize weddings and all types of events for every budget, offering complete end-to-end event management services. From simple ceremonies to grand celebrations, we ensure a smooth, hassle-free, and unforgettable experience with quality service at affordable prices.
            </p>
            <div className="catalog-pills">
              <span>✨ Simple Ceremonies to Grand Celebrations</span>
              <span>💰 Customized for Every Budget</span>
              <span>🤝 Complete End-to-End Coordination</span>
              <span>📍 Local Office in Tirumala &amp; Tirupati</span>
            </div>
          </div>

          <div className="catalog-services-grid">
            {allServices.map((item, idx) => (
              <div className="catalog-service-card" key={item.title}>
                <div className="catalog-card-top">
                  <span className="catalog-service-icon">
                    <Icon name={item.icon} size={18} />
                  </span>
                  <span className="catalog-service-num">{String(idx + 1).padStart(2, "0")}</span>
                </div>
                <h4>{item.title}</h4>
                <small className="catalog-telugu-title">{item.telugu}</small>
                <p>{item.desc}</p>
                <span className="catalog-service-tag">Included Service</span>
              </div>
            ))}
          </div>

          <div className="catalog-cta-banner">
            <div className="catalog-cta-text">
              <strong>Need a customized wedding package for your family budget?</strong>
              <p>Talk directly with our wedding coordinator for package estimates and hall booking assistance.</p>
            </div>
            <div className="catalog-cta-actions">
              <a href="tel:9491155403" className="button button-gold">
                <Icon name="phone" size={15} /> Call: 94911 55403
              </a>
              <a
                href="https://wa.me/919491155403?text=Namaskaram%20Tirumala%20Balaji%20Events,%20we%20would%20like%20to%20know%20about%20your%20services%20and%20budget%20packages."
                target="_blank"
                rel="noopener noreferrer"
                className="button hero-btn-whatsapp"
              >
                <WhatsAppIcon size={16} /> WhatsApp Inquiry
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="venue-section reveal-init" id="venue">
        <div className="venue-image">
          <img src={images.mandapam} alt="Tirumala Balaji grand Kalyana Mandapam with 40-foot temple carved gopuram stage, tiered kundu lamps, and banquet seating" />
          <div className="venue-monogram">TB</div>
        </div>
        <div className="venue-copy">
          <p className="eyebrow light"><span /> OUR FUNCTION HALL &amp; CONVENTION MANDAPAM</p>
          <h2>A grand convention hall<br /><em>for sacred beginnings.</em></h2>
          <p>
            A spacious, centrally air-conditioned marriage and convention hall crafted for authentic traditional weddings. Featuring a grand 40-foot traditional stage, royal floral archways, a dedicated banquet dining hall, and executive family suites at the holy foothills of Tirumala.
          </p>
          <dl>
            <div><dt><AnimatedCounter value={800} /></dt><dd>seated guests</dd></div>
            <div><dt><AnimatedCounter value={12000} formatted="12,000" /></dt><dd>square feet</dd></div>
            <div><dt><AnimatedCounter value={2} /></dt><dd>family suites</dd></div>
          </dl>
          <button className="button button-outline-light" onClick={scrollToInquiry}>
            Visit our convention hall <Icon name="arrow" size={18} />
          </button>
        </div>
      </section>

      <section className="rituals-section reveal-init" id="rituals" aria-label="Sacred marriage rituals">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span /> AUSPICIOUS CEREMONIES · SACRED WEDDING MOMENTS</p>
            <h2>From Sumuhurtham to Talambralu,<br /><em>every moment, alive with joy.</em></h2>
          </div>
          <p>
            A traditional wedding is a vibrant celebration of lifelong vows, family laughter, and sacred Vedic traditions. Experience how each auspicious ritual unfolds with splendour, warmth, and boundless celebration.
          </p>
        </div>

        {/* Grand Family Blessing Showcase Card: Marrage.jpg */}
        <div className="rituals-hero-banner">
          <img
            src={images.marriageFamily}
            alt="Traditional wedding muhurtham with three generations of family members showering yellow akshinthalu in front of Lord Balaji mandapam"
            className="rituals-hero-img"
          />
          <div className="rituals-hero-overlay">
            <span className="rituals-badge">
              <Icon name="sparkle" size={14} /> Auspicious Akshinthalu · The Grand Family Blessing
            </span>
            <h3>When three generations shower sacred Akshinthalu.</h3>
            <p>
              Under the benevolent gaze of Lord Balaji and amidst the resonance of Vedic chants and Nadaswaram, family elders, parents, and friends raise their hands in unison to bless the new couple with showers of yellow pearls and rose petals.
            </p>
          </div>
        </div>

        {/* 4 Pillars of Telugu Kalyanam Grid */}
        <div className="rituals-grid">
          {/* Card 1: Jeelakarra Bellam (Thambulam.jpg) */}
          <article className="ritual-card">
            <div className="ritual-card-media">
              <img src={images.jeelakarraBellam} alt="Bride and groom placing betel leaves with cumin seeds and jaggery on each other's heads during Sumuhurtham" />
              <span className="ritual-card-tag">Sumuhurtham</span>
            </div>
            <div className="ritual-card-body">
              <span className="ritual-step-num">01 · Auspicious Hour</span>
              <h4>Jeelakarra &amp; Bellam (Cumin-Jaggery Union)</h4>
              <p>
                The exact auspicious second when the curtain lowers and the couple places cumin and jaggery on each other's heads, uniting their hearts, souls, and thoughts for a lifetime.
              </p>
            </div>
          </article>

          {/* Card 2: Mangalyadharana (Thali.jpg) */}
          <article className="ritual-card">
            <div className="ritual-card-media">
              <img src={images.thaliHolding} alt="Sacred golden Lakshmi thali pendant touched with kumkum in bride's hands" />
              <span className="ritual-card-tag">Mangalyadharanam</span>
            </div>
            <div className="ritual-card-body">
              <span className="ritual-step-num">02 · Sacred Thali</span>
              <h4>Mangalasutram &amp; Three Sacred Knots</h4>
              <p>
                The tying of the sacred yellow thread and golden Lakshmi thali with three knots, witnessed by Agni Deva and sanctified by the blessings of family elders.
              </p>
            </div>
          </article>

          {/* Card 3: Talambralu (Talambralu_v2.jpg) */}
          <article className="ritual-card">
            <div className="ritual-card-media">
              <img src={images.talambraluRitual} alt="Bride in Madhuparkam pouring white talambralu pearls over smiling groom surrounded by laughing family" />
              <span className="ritual-card-tag">Talambralu</span>
            </div>
            <div className="ritual-card-body">
              <span className="ritual-step-num">03 · Joyful Showers</span>
              <h4>Sacred Pearls &amp; Family Showers</h4>
              <p>
                The most joyful wedding tradition: bride and groom playfully showering golden pearls, fragrant turmeric rice, and flower petals over each other amidst cheers from family.
              </p>
            </div>
          </article>

          {/* Card 4: Saptapadi (wedding.jpg) */}
          <article className="ritual-card">
            <div className="ritual-card-media">
              <img src={images.saptapadiWalk} alt="Intertwined little fingers of bride and groom walking together in silk pattu" />
              <span className="ritual-card-tag">Saptapadi</span>
            </div>
            <div className="ritual-card-body">
              <span className="ritual-step-num">04 · Seven Sacred Steps</span>
              <h4>Panigrahanam &amp; Seven Sacred Steps</h4>
              <p>
                Walking together hand-in-hand for seven sacred steps around the holy fire, pledging eternal friendship, nourishment, joy, and lifelong devotion.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="scenery-section reveal-init" id="scenery">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span /> SACRED FOOTHILLS · SEVEN HILLS SCENERY</p>
            <h2>Blessed by the sacred heights<br /><em>of Seshachalam &amp; Sapthagiri.</em></h2>
          </div>
          <p>
            Set against the majestic backdrop of Tirumala's holy peaks. Where cool mountain breezes, morning valley mist, and centuries of divine grace accompany your auspicious vows.
          </p>
        </div>

        <div className="scenery-hero-card">
          <img 
            src={images.hillsPanorama} 
            alt="Panoramic vista of the holy Seshachalam mountain ranges and valleys of Tirumala" 
          />
          <div className="scenery-hero-overlay">
            <span className="scenery-hero-badge">
              <Icon name="sparkle" size={14} /> The Seven Sacred Peaks · Seshachalam Sanctuary
            </span>
            <h3>Where sacred geography meets eternal vows.</h3>
            <p>
              Traditional families have sought the divine presence of Lord Venkateswara for generations. Our convention hall and wedding pavilions are set amidst the tranquil panorama of the Seshachalam biosphere, giving your guests a sacred spiritual retreat.
            </p>
          </div>
        </div>

        <div className="scenery-grid">
          <article className="scenery-card">
            <div className="scenery-card-media">
              <img src={images.dweepam} alt="Sacred brass deepam flame in foreground with illuminated Tirumala temple gopuram and Seshachalam hill" />
              <span className="scenery-card-tag">Sacred Deepam</span>
            </div>
            <div className="scenery-card-body">
              <h4>Sacred Deepam &amp; Temple Gopuram</h4>
              <p>
                A sacred flame lit under the holy temple gopuram and misty hill contours. Bringing peace, radiance, and auspicious spiritual energy to every moment of your marriage.
              </p>
            </div>
          </article>

          <article className="scenery-card">
            <div className="scenery-card-media">
              <img src={images.feastLeaf} alt="Authentic South Indian wedding bhojanam served on fresh banana leaf with traditional accompaniments" />
              <span className="scenery-card-tag">Authentic Bhojanam</span>
            </div>
            <div className="scenery-card-body">
              <h4>Traditional Banana Leaf Feast (Satvik Bhojanam)</h4>
              <p>
                Authentic satvik Telugu wedding feast: freshly steamed sona masoori rice, sambar, rasam, avakaya, payasam, and crisps served on fresh plantain leaves.
              </p>
            </div>
          </article>

          <article className="scenery-card">
            <div className="scenery-card-media scenery-card-moon">
              <img src={images.templeMoon} alt="Tirumala white temple gopuram rising into twilight under glowing full moon" />
              <span className="scenery-card-tag tag-right">Full Moon Darshan</span>
            </div>
            <div className="scenery-card-body">
              <h4>Moonlit Gopuram Darshan · Celestial Sanctity</h4>
              <p>
                Under the serene aura of the full moon over the sacred white gopuram. Auspicious muhurthams blessed by celestial tranquility and temple bells.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="section occasions reveal-init">
        <div className="center-heading">
          <p className="eyebrow centered"><span /> FOR EVERY AUSPICIOUS OCCASION <span /></p>
          <h2>Every occasion,<br /><em>made truly auspicious.</em></h2>
        </div>
        <div className="occasion-grid">
          {occasions.map((occasion) => (
            <article key={occasion.name}>
              <div><img src={occasion.image} alt={occasion.name} /></div>
              <h3>{occasion.name}</h3>
              <span>Explore <Icon name="arrow" size={15} /></span>
            </article>
          ))}
        </div>
      </section>

      <section className="section decorations-section reveal-init" id="decorations" aria-label="Our Real Event & Stage Decorations">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span /> CURATED STAGE DESIGNS · EVENT DECORATION FORMATIONS</p>
            <h2>Explore Our Events<br /><em>&amp; Mandapam Formations.</em></h2>
          </div>
          <p>
            From grand temple gopuram stages and fragrant floral canopies to traditional eco-thatch wedding pavilions and royal night entrances. Browse our real event setups across Tirumala &amp; Tirupati.
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className="decor-filter-bar" role="tablist" aria-label="Decoration categories">
          {[
            { id: "all", label: "All Formations", count: decorationItems.length },
            { id: "mandapam", label: "Kalyana Mandapams", count: decorationItems.filter((d) => d.category === "mandapam").length },
            { id: "traditional", label: "Traditional & Eco", count: decorationItems.filter((d) => d.category === "traditional").length },
            { id: "entrance", label: "Grand Entrances", count: decorationItems.filter((d) => d.category === "entrance").length },
            { id: "reception", label: "Modern Reception", count: decorationItems.filter((d) => d.category === "reception").length },
          ].map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeFilter === cat.id}
              className={`decor-filter-tab ${activeFilter === cat.id ? "active" : ""}`}
              onClick={() => {
                setActiveFilter(cat.id as DecorCategory);
                setIsMobileExpanded(false);
              }}
            >
              <span>{cat.label}</span>
              <small className="filter-count">{cat.count}</small>
            </button>
          ))}
        </div>

        {/* Mobile Efficiency Toolbar & View Switcher */}
        <div className="decor-toolbar">
          <span className="decor-count-pill">
            Showing <strong>{displayedDecorations.length}</strong> of {filteredDecorations.length} setups · <em>Tap any setup to maximize</em>
          </span>
          <div className="decor-view-toggle" role="group" aria-label="Mobile view switcher">
            <button
              type="button"
              className={`decor-toggle-btn ${mobileViewMode === "grid" ? "active" : ""}`}
              onClick={() => setMobileViewMode("grid")}
              aria-label="2 at a time grid view"
              title="2 at a time grid"
            >
              2 at a Time
            </button>
            <button
              type="button"
              className={`decor-toggle-btn ${mobileViewMode === "list" ? "active" : ""}`}
              onClick={() => setMobileViewMode("list")}
              aria-label="Detailed single column view"
              title="Detailed view"
            >
              Detailed
            </button>
          </div>
        </div>

        {/* Photo Grid */}
        <div className={`decor-grid ${mobileViewMode === "list" ? "decor-grid-list" : "decor-grid-compact"}`}>
          {displayedDecorations.map((item) => (
            <article 
              className="decor-card" 
              key={item.id}
              onClick={() => setSelectedModalImage(item)}
            >
              <div 
                className="decor-card-media"
                role="button"
                tabIndex={0}
                aria-label={`Maximize image of ${item.title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedModalImage(item);
                  }
                }}
              >
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="decor-card-overlay" />
                <span className="decor-card-tag">{item.categoryLabel}</span>
                <span className="decor-zoom-pill">
                  <Icon name="sparkle" size={11} /> Maximize
                </span>
              </div>
              <div className="decor-card-body">
                <div className="decor-card-meta">
                  <span className="decor-venue-note">{item.venueNote}</span>
                </div>
                <h3>{item.title}</h3>
                <small className="decor-telugu-name">{item.telugu}</small>
                <p className="decor-card-desc">{item.desc}</p>
                <div className="decor-card-actions" onClick={(e) => e.stopPropagation()}>
                  <button 
                    type="button"
                    className="decor-view-btn"
                    onClick={() => setSelectedModalImage(item)}
                    aria-label={`Maximize details of ${item.title}`}
                  >
                    <Icon name="sparkle" size={11} /> Maximize
                  </button>
                  <a
                    className="decor-inquire-btn"
                    href={`https://wa.me/919491155403?text=Namaskaram%20Tirumala%20Balaji%20Events,%20I%20am%20interested%20in%20the%20"${encodeURIComponent(item.title)}"%20decoration%20setup.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Inquire about ${item.title} on WhatsApp`}
                  >
                    <WhatsAppIcon size={13} /> Inquire
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Expand / Collapse Button for Mobile & All View */}
        {!isFiltered && filteredDecorations.length > INITIAL_DISPLAY_COUNT && (
          <div className="decor-expand-wrap">
            <button
              type="button"
              className="decor-expand-all-btn"
              onClick={() => setIsMobileExpanded(!isMobileExpanded)}
              aria-expanded={isMobileExpanded}
            >
              <Icon name="sparkle" size={15} />
              <span>
                {isMobileExpanded 
                  ? "Show Fewer Formations ↑" 
                  : `Explore All ${filteredDecorations.length} Event Formations (+${remainingDecorCount} More) ↓`}
              </span>
            </button>
          </div>
        )}

        {/* Bottom Banner inside decorations section */}
        <div className="decor-banner-cta">
          <div className="decor-banner-text">
            <strong>Have a custom mandapam design or Pinterest inspiration?</strong>
            <p>Our experienced decorators can recreate any traditional or contemporary design to match your family vision and budget.</p>
          </div>
          <div className="decor-banner-actions">
            <a href="tel:9491155403" className="button button-gold">
              <Icon name="phone" size={15} /> Call 94911 55403
            </a>
            <a
              href="https://wa.me/919491155403?text=Namaskaram%20Tirumala%20Balaji%20Events,%20I%20have%20a%20decoration%20idea%20to%20discuss."
              target="_blank"
              rel="noopener noreferrer"
              className="button hero-btn-whatsapp"
            >
              <WhatsAppIcon size={16} /> Share Design on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="process-section reveal-init" id="process">
        <div className="process-intro">
          <p className="eyebrow"><span /> OUR STRUCTURED APPROACH · THE 3-STEP PROCESS</p>
          <h2>From first call<br />to <em>mangala harathi.</em></h2>
          <p>Traditional at heart, meticulous in every detail and warm in every welcome.</p>
        </div>
        <div className="steps">
          {steps.map(([number, title, copy]) => (
            <article key={number}>
              <span>{number}</span>
              <div className="step-icon"><Icon name={number === "01" ? "sparkle" : number === "02" ? "calendar" : "flower"} /></div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section 
        className="story-section reveal-init" 
        id="stories" 
        aria-label="Wedding Stories & Testimonials"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={(e) => {
          setIsPaused(true);
          handleTouchStart(e);
        }}
        onTouchEnd={(e) => {
          handleTouchEnd(e);
          setTimeout(() => setIsPaused(false), 2500);
        }}
      >
        <div className="story-image">
          <img 
            key={stories[activeStory].image} 
            src={stories[activeStory].image} 
            alt={stories[activeStory].alt}
            className="story-active-image" 
          />
          <div className="story-image-gradient" />
          <div className="story-image-badge">
            <span className="badge-telugu">{stories[activeStory].ritualTelugu}</span>
            <small className="badge-sub">{stories[activeStory].ritualEn}</small>
          </div>
        </div>
        <div className="story-copy">
          <div className="story-header-meta">
            <span className="story-eyebrow">
              <span className="story-eyebrow-line" />
              COUPLE STORIES · SACRED TESTIMONIALS
            </span>
            <p className="quote-mark" aria-hidden="true">“</p>
          </div>
          <blockquote key={activeStory} className="story-active-quote">
            {stories[activeStory].quote}
          </blockquote>
          <div className="story-author-meta">
            <p className="couple-name">{stories[activeStory].couple}</p>
            <span className="couple-location">{stories[activeStory].location}</span>
          </div>
          <div className="story-controls">
            <button 
              aria-label="Previous story" 
              onClick={prevStory}
              className="story-ctrl-btn"
            >
              ←
            </button>
            <div className="story-dots" role="tablist" aria-label="Select testimonial">
              {stories.map((_, idx) => (
                <button
                  key={idx}
                  role="tab"
                  aria-selected={idx === activeStory}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  className={`story-dot ${idx === activeStory ? "active" : ""}`}
                  onClick={() => setActiveStory(idx)}
                />
              ))}
            </div>
            <span className="story-counter">
              {String(activeStory + 1).padStart(2, "0")} / {String(stories.length).padStart(2, "0")}
            </span>
            <button 
              aria-label="Next story" 
              onClick={nextStory}
              className="story-ctrl-btn"
            >
              →
            </button>
          </div>
          <p className="story-swipe-hint">
            <span>← Swipe horizontally to explore more reviews →</span>
          </p>
        </div>
      </section>

      <section className="blessing-section reveal-init" id="blessing" aria-label="Divine Balaji Blessing">
        <div className="blessing-backdrop-watermark" aria-hidden="true">OM NAMO VENKATESHAYA</div>
        <div className="blessing-container">
          <div className="blessing-portrait-column">
            <div className="blessing-portrait-aura" />
            <div className="blessing-portrait-frame">
              <span className="blessing-corner-ornament corner-tl" />
              <span className="blessing-corner-ornament corner-tr" />
              <span className="blessing-corner-ornament corner-bl" />
              <span className="blessing-corner-ornament corner-br" />
              <img
                src={images.balajiPortrait}
                alt="Sacred portrait of Lord Sri Venkateswara Swamy with Tirumala Namam, Shankha, Chakra, floral garlands and glowing oil lamp"
                className="blessing-portrait-img"
              />
              <div className="blessing-portrait-badge">
                <span className="badge-telugu">LORD SRI VENKATESWARA</span>
                <small className="badge-sub">Eternal Divine Grace · Tirumala Sanctum</small>
              </div>
            </div>
          </div>

          <div className="blessing-copy-column">
            <p className="eyebrow blessing-eyebrow"><span /> AUSPICIOUS BLESSINGS · DIVINE PRESENCE</p>
            <h2 className="blessing-heading">A Sacred Marriage Blessed<br /><span className="heading-bold-gold">by Lord Venkateswara.</span></h2>

            <div className="blessing-shloka-box">
              <div className="shloka-namam-decor">
                <LotusIcon size={20} />
              </div>
              <p className="blessing-shloka-telugu">
                “Kalyanadbhuta Gatraya Kamitartha Pradayine |<br />
                Srimad Venkatanathaya Srinivasaya Te Namah ||”
              </p>
              <p className="blessing-shloka-translation">
                “Salutations to Sri Srinivasa, Lord of Venkatadri, possessing an auspicious divine form, the grantor of all cherished wishes and lifelong marital blessings.”
              </p>
            </div>

            <p className="blessing-description">
              In traditional Vedic heritage, marriage is not merely an event—it is a sacred sankalpam witnessed by the holy hills. Our halls, priests, and wedding coordinators uphold this eternal sanctity, ensuring every garland, every vedic chant, and every guest welcome is conducted with heartfelt devotion.
            </p>

            <div className="blessing-features-grid">
              <div className="blessing-feat">
                <span className="blessing-feat-icon">
                  <LotusIcon size={18} />
                </span>
                <div>
                  <strong>Eternal Marital Union</strong>
                  <p>Eternal union blessed by the supreme grace of Sri Padmavathi &amp; Lord Balaji.</p>
                </div>
              </div>
              <div className="blessing-feat">
                <span className="blessing-feat-icon">
                  <DiyaIcon size={18} />
                </span>
                <div>
                  <strong>Vedic Shastric Tradition</strong>
                  <p>Strict adherence to Shastras, authentic muhurtham and auspicious rituals.</p>
                </div>
              </div>
              <div className="blessing-feat">
                <span className="blessing-feat-icon">
                  <MandalaIcon size={18} />
                </span>
                <div>
                  <strong>Divine Prasadam &amp; Satvik Feast</strong>
                  <p>Auspicious Tirumala prasadam tokens and satvik banana leaf feast for your guests.</p>
                </div>
              </div>
            </div>

            <div className="blessing-cta-row">
              <button className="button button-gold hero-btn-gold" onClick={scrollToInquiry}>
                PLAN YOUR WEDDING <Icon name="arrow" size={16} />
              </button>
              <a
                className="button hero-btn-whatsapp"
                href="https://wa.me/919491155403?text=Namaskaram%20Tirumala%20Balaji%20Events,%20we%20seek%20Lord%20Balaji%20blessings%20for%20our%20wedding."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
              >
                <WhatsAppIcon size={17} />
                <span>WhatsApp Us</span>
              </a>
              <a
                className="button blessing-call-btn"
                href="tel:9491155403"
                aria-label="Call 9491155403"
              >
                <Icon name="phone" size={15} />
                <span>Call: 94911 55403</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="inquiry-section reveal-init" id="inquiry">
        <div className="inquiry-copy">
          <div className="inquiry-brand-badge">
            <img
              src={images.logo}
              alt="Tirumala Balaji Marriages & Events Logo"
              className="inquiry-logo-badge"
              width={42}
              height={42}
            />
            <div>
              <strong>Tirumala Balaji Marriages &amp; Events</strong>
              <small>Tirumala Weddings · Official Event Contractor</small>
            </div>
          </div>

          <p className="eyebrow light"><span /> BEGIN YOUR CELEBRATION · CONTACT US</p>
          <h2>Let’s plan your<br /><em>sacred celebration.</em></h2>
          <p>
            Connect directly with our wedding planners. We organize weddings and all types of events for every budget, offering complete end-to-end event management services at quality, affordable pricing.
          </p>

          <div className="inquiry-action-cards">
            <a href="tel:9491155403" className="contact-action-card">
              <span className="contact-icon-wrapper">
                <Icon name="phone" size={20} />
              </span>
              <div>
                <small>Direct Phone Call / Immediate Support</small>
                <strong>+91 94911 55403</strong>
                <span className="contact-subtext">R. Rajesh · 24/7 Available</span>
              </div>
            </a>

            <a
              href="https://wa.me/919491155403?text=Namaskaram%20Tirumala%20Balaji%20Events,%20we%20would%20like%20to%20plan%20our%20celebration."
              target="_blank"
              rel="noopener noreferrer"
              className="contact-action-card wa-card"
            >
              <span className="contact-icon-wrapper wa-icon">
                <WhatsAppIcon size={20} />
              </span>
              <div>
                <small>Instant WhatsApp</small>
                <strong>+91 94911 55403</strong>
                <span className="contact-subtext">Packages, Photos &amp; Availability</span>
              </div>
            </a>
          </div>

          {/* Physical Office Addresses */}
          <div className="office-locations-box">
            <div className="office-item">
              <span className="office-pin-icon"><Icon name="pin" size={16} /></span>
              <div>
                <strong>Tirumala Office (Main)</strong>
                <address># 935, Balaji Nagar, TIRUMALA - 517504</address>
              </div>
            </div>
            <div className="office-item">
              <span className="office-pin-icon"><Icon name="pin" size={16} /></span>
              <div>
                <strong>Tirupati Office (City Branch)</strong>
                <address># 4-2-268, Gaju Street, TIRUPATI</address>
              </div>
            </div>
            <div className="office-meta-links">
              <span>✉️ <a href="mailto:rajeshtml.rt@gmail.com">rajeshtml.rt@gmail.com</a></span>
              <span>🌐 <a href="http://www.marriagesintirumala.in" target="_blank" rel="noopener noreferrer">www.marriagesintirumala.in</a></span>
            </div>
          </div>

          {/* Google Maps Interactive Location Card */}
          <div className="gmaps-location-card">
            <div className="gmaps-card-header">
              <div className="gmaps-badge">
                <Icon name="map" size={16} />
                <span>Google Maps Verified Location</span>
              </div>
              <div className="gmaps-rating-badge">
                <span className="rating-star">★</span>
                <strong>5.0</strong>
                <span>(Top Rated)</span>
              </div>
            </div>
            <div className="gmaps-card-info">
              <h4>Marriages in Tirumala · Marriage Contractor</h4>
              <p>D.No : 935, Balaji Nagar, Tirumala, Tirupati Urban, Andhra Pradesh 517504</p>
            </div>
            <div className="gmaps-iframe-frame">
              <iframe
                title="Google Maps Location of Tirumala Balaji Marriages and Events"
                src="https://maps.google.com/maps?q=D.No+:+935,+Balaji+Nagar,+Tirumala,+Tirupati+Urban,+Andhra+Pradesh+517504&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="170"
                style={{ border: 0, borderRadius: "6px" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href="https://maps.app.goo.gl/BMSA9nHjBXEPgDqR8"
              target="_blank"
              rel="noopener noreferrer"
              className="gmaps-directions-btn"
            >
              <span>Get Directions on Google Maps</span>
              <Icon name="arrow" size={15} />
            </a>
          </div>
        </div>

        {submitted ? (
          <div className="success-card" role="status">
            <span><Icon name="check" size={30} /></span>
            <h3>Thank You Very Much.</h3>
            <p>Your details have been received. R. Rajesh and our celebrations team will contact you shortly on your phone/WhatsApp.</p>
            <div className="success-direct-call">
              <small>Need urgent confirmation?</small>
              <a href="tel:9491155403" className="button button-gold">
                <Icon name="phone" size={15} /> Call 94911 55403 Now
              </a>
            </div>
            <button onClick={() => setSubmitted(false)}>Send another inquiry</button>
          </div>
        ) : (
          <form onSubmit={submitInquiry} className="inquiry-form-card">
            <div className="form-card-title">
              <h3>Inquire / Request Package Details</h3>
              <p>Enter your details and our team will get back to you with custom estimates.</p>
            </div>
            <label>
              Your name
              <input name="name" placeholder="Your full name" required />
            </label>
            <label>
              Phone / WhatsApp Number
              <input type="tel" name="phone" placeholder="94911 55403" required />
            </label>
            <label>
              Email address
              <input type="email" name="email" placeholder="you@example.com" />
            </label>
            <label>
              Celebration type
              <select name="type" defaultValue="" required>
                <option value="" disabled>Select an occasion type</option>
                <option>Traditional Wedding Ceremony</option>
                <option>Engagement Ceremony (Nischitartham)</option>
                <option>Wedding Reception &amp; Banquet</option>
                <option>Haldi &amp; Bridal Blessing Ceremony</option>
                <option>Seemantham Ceremony</option>
                <option>Upanayanam Ceremony</option>
                <option>Gruhapravesam / Housewarming</option>
                <option>Other Custom Event</option>
              </select>
            </label>
            <label>
              Estimated guests
              <select name="guests" defaultValue="">
                <option value="" disabled>Choose estimated guest count</option>
                <option>Up to 100 (Intimate Ceremony)</option>
                <option>100–250 (Traditional Gathering)</option>
                <option>250–500 (Grand Wedding)</option>
                <option>500–800+ (Royal Celebration)</option>
              </select>
            </label>
            <label>
              Budget Preference
              <select name="budget" defaultValue="">
                <option value="" disabled>Select budget range</option>
                <option>Simple &amp; Budget-Friendly Ceremony</option>
                <option>Standard Traditional Package</option>
                <option>Grand Royal Package</option>
                <option>Custom Budget Discussion</option>
              </select>
            </label>
            <button className="button button-gold form-submit" type="submit">
              Request Free Consultation &amp; Quotes <Icon name="arrow" size={18} />
            </button>
            <div className="form-direct-call-hint">
              <span>Or call directly for immediate inquiry: </span>
              <a href="tel:9491155403">📞 +91 94911 55403</a>
            </div>
          </form>
        )}
      </section>

      <footer>
        <div className="footer-brand">
          <img
            src={images.logo}
            alt="Tirumala Balaji Marriages & Events"
            className="footer-logo-img"
            width={48}
            height={48}
          />
          <div>
            <strong>Tirumala Balaji</strong>
            <small>Marriages &amp; Events · 9491155403</small>
          </div>
        </div>
        <p>Your Happiness Is Our Blessing · Dedicated to Sacred Celebrations.</p>

        {/* Footer Offices & Credentials */}
        <div className="footer-offices-row">
          <div className="footer-office-block">
            <span className="footer-block-heading">TIRUMALA MAIN OFFICE</span>
            <p># 935, Balaji Nagar, Tirumala, Tirupati Urban, AP - 517504</p>
            <a
              href="https://maps.app.goo.gl/BMSA9nHjBXEPgDqR8"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-map-action"
            >
              📍 Open in Google Maps →
            </a>
          </div>

          <div className="footer-office-block">
            <span className="footer-block-heading">TIRUPATI CITY BRANCH</span>
            <p># 4-2-268, Gaju Street, Tirupati, AP</p>
            <p className="footer-phone-line">
              📞 Direct Call: <a href="tel:9491155403"><strong>+91 94911 55403</strong></a>
            </p>
          </div>

          <div className="footer-office-block">
            <span className="footer-block-heading">CONNECT &amp; INQUIRE</span>
            <p>✉️ <a href="mailto:rajeshtml.rt@gmail.com">rajeshtml.rt@gmail.com</a></p>
            <p>🌐 <a href="http://www.marriagesintirumala.in" target="_blank" rel="noopener noreferrer">www.marriagesintirumala.in</a></p>
            <p>💬 <a href="https://wa.me/919491155403" target="_blank" rel="noopener noreferrer">WhatsApp: 9491155403</a></p>
          </div>
        </div>

        <div className="footer-links">
          <a href="#services">Services</a>
          <a href="#decorations">Decorations</a>
          <a href="#venue">Function hall</a>
          <a href="#rituals">Sacred rituals</a>
          <a href="#scenery">Sacred hills</a>
          <a href="#blessing">Divine grace</a>
          <a href="#process">Approach</a>
          <a href="#stories">Stories</a>
          <button onClick={scrollToInquiry}>Contact</button>
        </div>
        <div className="footer-bottom">
          <span>© 2025 Tirumala Balaji Marriages &amp; Events · All Rights Reserved</span>
          <span>Tirumala · Tirupati · Andhra Pradesh</span>
          <a
            href="https://maps.app.goo.gl/BMSA9nHjBXEPgDqR8"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-gmaps-link-tag"
          >
            Google Maps Verified Partner
          </a>
        </div>
      </footer>

      {/* Interactive Lightbox Modal for Decorations */}
      {selectedModalImage && (
        <div 
          className="lightbox-overlay" 
          role="dialog" 
          aria-modal="true" 
          aria-label={selectedModalImage.title}
          onClick={() => setSelectedModalImage(null)}
        >
          <div 
            className="lightbox-container" 
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleModalTouchStart}
            onTouchEnd={handleModalTouchEnd}
          >
            <button 
              className="lightbox-close-btn" 
              onClick={() => setSelectedModalImage(null)}
              aria-label="Close dialog"
            >
              <Icon name="x" size={20} />
            </button>

            <button 
              className="lightbox-nav-btn lightbox-prev" 
              onClick={prevModalImage}
              aria-label="Previous decoration image"
            >
              ←
            </button>
            <button 
              className="lightbox-nav-btn lightbox-next" 
              onClick={nextModalImage}
              aria-label="Next decoration image"
            >
              →
            </button>

            <div className="lightbox-image-wrap">
              <img src={selectedModalImage.image} alt={selectedModalImage.title} />
              <span className="lightbox-counter">
                {modalIndex + 1} / {filteredDecorations.length}
              </span>
              <span className="lightbox-swipe-pill">
                ← Swipe to browse →
              </span>
            </div>

            <div className="lightbox-info">
              <div className="lightbox-tag-row">
                <span className="lightbox-category-tag">{selectedModalImage.categoryLabel}</span>
                <span className="lightbox-venue-tag">📍 {selectedModalImage.venueNote}</span>
              </div>
              <h3>{selectedModalImage.title}</h3>
              <p className="lightbox-telugu">{selectedModalImage.telugu}</p>
              <p className="lightbox-desc">{selectedModalImage.desc}</p>
              
              <div className="lightbox-actions">
                <a
                  href={`https://wa.me/919491155403?text=Namaskaram%20Tirumala%20Balaji%20Events,%20I%20am%20interested%20in%20the%20"${encodeURIComponent(selectedModalImage.title)}"%20decoration%20setup.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button hero-btn-whatsapp"
                >
                  <WhatsAppIcon size={17} /> Inquire Setup on WhatsApp
                </a>
                <a href="tel:9491155403" className="button button-gold">
                  <Icon name="phone" size={16} /> Call: 94911 55403
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
