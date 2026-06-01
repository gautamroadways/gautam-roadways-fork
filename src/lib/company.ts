export const COMPANY = {
  name: "Gautam Roadways",
  since: 1959,
  tagline: "Jaipur ↔ Delhi NCR freight corridor since 1959",
  emails: ["info@gautamroadways.com", "info@baggas.co.in"],
  primaryPhone: "+919214330000",
  primaryPhoneDisplay: "+91 92143 30000",
  whatsapp: "+919214333333",
};

export const BRANCHES = [
  {
    name: "Jaipur — Head Office",
    role: "Network command, parcel booking, dispatch control",
    address: "Transport Nagar, Near SBI Bank, Broadway Hotel Area, Jaipur",
    phones: ["+91 92143 30000", "+91 94626 33000"],
  },
  {
    name: "Delhi Branch — Karol Bagh",
    role: "NCR inbound/outbound hub, delivery coordination",
    address: "Karol Bagh, New Delhi",
    phones: ["+91 93133 77963", "+91 92669 22214", "+91 92143 34443"],
  },
  {
    name: "Sanganer Office",
    role: "South Jaipur consolidation point",
    address: "Sanganer, Jaipur",
    phones: ["+91 73000 90008"],
  },
  {
    name: "Sitapura Pickup Point",
    role: "Industrial pickup for SEZ & factories",
    address: "Sitapura Industrial Area, Jaipur",
    phones: ["+91 98280 13634"],
  },
];

export const COMPLAINT = {
  name: "Puneet Bagga",
  phone: "+91 92143 33333",
  raw: "+919214333333",
};

export const SERVICES = [
  {
    slug: "ftl",
    name: "Full Truck Load (FTL)",
    short: "Dedicated trucks for high-volume freight, single-consignor movement.",
    image: "ftl",
  },
  {
    slug: "ptl",
    name: "Part Truck Load (PTL)",
    short: "Shared truck capacity for medium consignments on scheduled runs.",
    image: "loading",
  },
  {
    slug: "parcel",
    name: "Parcel Booking",
    short: "Daily parcel dispatch with bilty, tracking and counter delivery.",
    image: "parcel",
  },
  {
    slug: "factory-pickup",
    name: "Factory Pickup",
    short: "Scheduled pickups from Sitapura, Bagru, Jhotwara and Kukas industrial belts.",
    image: "warehouse",
  },
  {
    slug: "door-delivery",
    name: "Door-to-Door Delivery",
    short: "Last-mile delivery across Delhi, Gurgaon, Noida, Faridabad and Ghaziabad.",
    image: "route",
  },
] as const;

export const ROUTES = [
  { slug: "jaipur-delhi", from: "Jaipur", to: "Delhi", km: 280, hours: "8–10",
    role: "Core trunk route — daily scheduled dispatch via NH-48.",
    context: "Backbone of Rajasthan–NCR freight flow, serving wholesale markets of Sadar Bazar, Karol Bagh and Chandni Chowk." },
  { slug: "jaipur-gurgaon", from: "Jaipur", to: "Gurgaon", km: 240, hours: "7–9",
    role: "Industrial & corporate freight lane — auto, electronics, retail.",
    context: "Direct relevance to Manesar, IMT and Udyog Vihar industrial clusters." },
  { slug: "jaipur-noida", from: "Jaipur", to: "Noida", km: 310, hours: "9–11",
    role: "Manufacturing and e-commerce inbound corridor.",
    context: "Connects Jaipur factories to Noida sectors 63, 80 and Greater Noida warehousing." },
  { slug: "jaipur-faridabad", from: "Jaipur", to: "Faridabad", km: 290, hours: "9–11",
    role: "Heavy engineering & industrial parts movement.",
    context: "Serves Faridabad industrial areas 1–5 and Ballabgarh manufacturing belt." },
  { slug: "jaipur-ghaziabad", from: "Jaipur", to: "Ghaziabad", km: 320, hours: "10–12",
    role: "Trans-Yamuna freight access for east NCR distribution.",
    context: "Daily relevance to Sahibabad industrial area and Mohan Nagar." },
];

export const telHref = (p: string) => `tel:${p.replace(/\s/g, "")}`;
export const waHref = (text = "Hello, I need a freight quote from Gautam Roadways.") =>
  `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(text)}`;
