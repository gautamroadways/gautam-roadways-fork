import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, Phone, MessageCircle, ArrowRight } from "lucide-react";
import { COMPANY, ROUTES, SERVICES, telHref, waHref } from "@/lib/company";
import ftl from "@/assets/ftl.jpg";
import parcel from "@/assets/parcel.jpg";
import loading from "@/assets/loading.jpg";
import warehouse from "@/assets/warehouse.jpg";
import route from "@/assets/route-highway.jpg";
import { CTABlock } from "@/components/site/CTA";

const img: Record<string, string> = { ftl, parcel, loading, warehouse, route };

type ServiceDetail = {
  positioning: string;
  how: string[];
  useCases: string[];
  trust: string[];
};

const DETAILS: Record<string, ServiceDetail> = {
  "ftl": {
    positioning: "Dedicated trucks for single-consignor freight between Jaipur and Delhi NCR.",
    how: [
      "Confirmed booking against vehicle type (14ft / 17ft / 20ft / 22ft / 32ft).",
      "Direct pickup from factory or warehouse on a scheduled time window.",
      "Sealed vehicle, single-driver run, no transhipment in between.",
      "Bilty issued at pickup, POD shared on delivery confirmation.",
    ],
    useCases: ["Manufacturer-to-distributor inbound stock", "Project cargo and trade fair freight", "Bulk movement of textiles, marble, handicrafts, FMCG"],
    trust: ["GST-compliant documentation", "Driver KYC on file", "Direct dispatch desk contact"],
  },
  "ptl": {
    positioning: "Shared truck capacity on scheduled Jaipur ↔ NCR runs — pay only for your portion.",
    how: [
      "Loads consolidated at Transport Nagar head office.",
      "Departure aligned with daily dispatch windows.",
      "Inter-branch hand-off in NCR to the relevant delivery node.",
      "Last-mile delivery booked into Door-to-Door service.",
    ],
    useCases: ["SME inventory replenishment to NCR retailers", "Spare parts and engineering components", "Mid-volume orders that don't justify an FTL"],
    trust: ["Per-consignment bilty", "Defined operational SLA", "Single PoC across pickup and delivery"],
  },
  "parcel": {
    positioning: "Counter-to-counter parcel dispatch on the Jaipur–NCR corridor, every working day.",
    how: [
      "Book parcels at Jaipur head office or Sanganer branch.",
      "Loaded on the same-day or next-day dispatch run.",
      "Available at NCR branch counters; door delivery on request.",
    ],
    useCases: ["Documents, samples, urgent dispatches", "E-commerce returns / replacements", "Trader-to-trader regular consignments"],
    trust: ["Acknowledged booking receipt", "Branch-level handover record", "Escalation desk on call"],
  },
  "factory-pickup": {
    positioning: "Scheduled pickups from Jaipur industrial belts — Sitapura, Bagru, Jhotwara, Kukas.",
    how: [
      "Pickup vehicle dispatched to factory gate on confirmed time.",
      "Loading supervised by our Sitapura pickup point team.",
      "Consignment brought to Transport Nagar for onward dispatch.",
    ],
    useCases: ["MSME export consolidation", "Daily factory outbound", "Multi-vendor pickup against single PO"],
    trust: ["Gate-pass and weighbridge support", "Loading staff on company rolls", "Direct route to head office"],
  },
  "door-delivery": {
    positioning: "Last-mile delivery across Delhi, Gurgaon, Noida, Faridabad and Ghaziabad.",
    how: [
      "NCR branch receives consignment from Jaipur dispatch.",
      "Local vehicle scheduled to consignee address.",
      "POD captured and shared with the consignor.",
    ],
    useCases: ["B2B distribution to retail outlets", "Project site deliveries", "Office and showroom dispatches"],
    trust: ["Pin-code level coverage in NCR", "Karol Bagh branch coordination", "Hand-off tracking across nodes"],
  },
};

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = SERVICES.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service, detail: DETAILS[service.slug] };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.service.name} — Gautam Roadways` },
      { name: "description", content: loaderData.detail.positioning },
      { property: "og:title", content: `${loaderData.service.name} — Gautam Roadways` },
      { property: "og:description", content: loaderData.detail.positioning },
    ] : [],
    links: loaderData ? [{ rel: "canonical", href: `/services/${loaderData.service.slug}` }] : [],
  }),
  component: ServiceDetailPage,
  notFoundComponent: () => (
    <div className="container-x py-24 text-center">
      <h1>Service not found</h1>
      <Link to="/services" className="btn btn-primary mt-6">All services</Link>
    </div>
  ),
});

function ServiceDetailPage() {
  const { service, detail } = Route.useLoaderData();
  return (
    <>
      <section className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0">
          <img src={img[service.image]} alt="" width={1920} height={1000} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/50" />
        </div>
        <div className="relative container-x py-16 md:py-24 text-primary-foreground">
          <Link to="/services" className="text-xs uppercase tracking-[0.18em] text-white/60 hover:text-white">← All services</Link>
          <h1 className="mt-4 max-w-3xl text-white">{service.name}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">{detail.positioning}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={telHref(COMPANY.primaryPhone)} className="btn btn-primary"><Phone className="h-4 w-4" /> Call dispatch</a>
            <a href={waHref(`Hello, I need a quote for ${service.name}.`)} target="_blank" rel="noopener" className="btn btn-whatsapp"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
            <Link to="/enquiry" className="btn btn-ghost bg-white/5 border-white/20 text-white hover:bg-white/10">Send enquiry</Link>
          </div>
        </div>
      </section>

      <section className="container-x py-16 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-12">
          <div>
            <div className="eyebrow">How this service runs</div>
            <h2 className="mt-3">Operational flow</h2>
            <ol className="mt-6 space-y-3">
              {detail.how.map((step: string, i: number) => (
                <li key={i} className="card-surface p-4 flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">{i + 1}</span>
                  <span className="text-sm leading-relaxed pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <div className="eyebrow">Use cases</div>
            <h2 className="mt-3">Where this service fits</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {detail.useCases.map((u: string) => (
                <div key={u} className="card-surface p-4 flex gap-3">
                  <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <p className="text-sm">{u}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="eyebrow">Route relevance</div>
            <h2 className="mt-3">Active corridors for this service</h2>
            <div className="mt-6 grid gap-2">
              {ROUTES.map((r) => (
                <div key={r.slug} className="card-surface p-4 flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{r.from} ↔ {r.to}</div>
                    <div className="text-xs text-muted-foreground">{r.role}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">{r.km} km</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="card-surface p-6">
            <div className="eyebrow">Trust indicators</div>
            <ul className="mt-4 space-y-3">
              {detail.trust.map((t: string) => (
                <li key={t} className="flex gap-2 text-sm"><Check className="h-4 w-4 text-accent shrink-0 mt-0.5" /> {t}</li>
              ))}
            </ul>
          </div>
          <div className="card-surface p-6 bg-primary text-primary-foreground border-primary">
            <h3 className="text-white">Need this moving today?</h3>
            <p className="text-sm text-white/70 mt-2">Dispatch desk responds within minutes during operating hours.</p>
            <div className="mt-5 grid gap-2">
              <a href={telHref(COMPANY.primaryPhone)} className="btn btn-primary"><Phone className="h-4 w-4" /> Call now</a>
              <a href={waHref(`Hello, I need ${service.name}.`)} target="_blank" rel="noopener" className="btn btn-whatsapp"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
              <Link to="/enquiry" className="btn btn-ghost bg-white/5 border-white/20 text-white hover:bg-white/10">Enquiry form <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
