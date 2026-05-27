import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Phone, MessageCircle, Truck, Package, Warehouse, MapPin, ShieldCheck, Clock, CircleDot } from "lucide-react";
import heroImg from "@/assets/hero-fleet.jpg";
import warehouseImg from "@/assets/warehouse.jpg";
import loadingImg from "@/assets/loading.jpg";
import { COMPANY, ROUTES, SERVICES, telHref, waHref } from "@/lib/company";
import { CTABlock } from "@/components/site/CTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gautam Roadways — Jaipur ↔ Delhi NCR Freight Since 1959" },
      { name: "description", content: "Full Truck Load, Part Load and parcel dispatch between Jaipur and Delhi NCR. Daily operations, six decades of trust." },
      { property: "og:title", content: "Gautam Roadways — Jaipur ↔ Delhi NCR Freight" },
      { property: "og:description", content: "Daily FTL, PTL and parcel dispatch between Jaipur and Delhi NCR since 1959." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const serviceIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  ftl: Truck, ptl: Package, parcel: Package, "factory-pickup": Warehouse, "door-delivery": MapPin,
};

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Gautam Roadways fleet at transport nagar" width={1920} height={1080}
            className="h-full w-full object-cover" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/40" />
        </div>
        <div className="relative container-x py-20 md:py-32 text-primary-foreground">
          <div className="max-w-3xl">
            <div className="eyebrow text-white/70 capitalize">Trusted Logistics & Freight partners since 1959</div>
            <h1 className="mt-5 text-white">
              Reliable <span className="text-accent">freight transport</span> for businesses that can't afford delays.
            </h1>
            <p className="mt-5 text-lg text-white/80 max-w-2xl">
              We operate structured parcel, PTL, and full truckload logistics across key industrial routes in North India built on decades of operational discipline. Every shipment is handled with planning, tracking, and accountability from pickup to delivery.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={telHref(COMPANY.primaryPhone)} className="btn btn-primary text-base">
                <Phone className="h-4 w-4" /> Call dispatch
              </a>
              <a href={waHref()} target="_blank" rel="noopener" className="btn btn-whatsapp text-base">
                <MessageCircle className="h-4 w-4" /> WhatsApp quote
              </a>
              <Link to="/enquiry" className="btn btn-ghost bg-white/5 border-white/20 text-white hover:bg-white/10 text-base">
                Book shipment <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <dl className="mt-12 grid grid-cols-3 gap-6 max-w-xl border-t border-white/10 pt-6">
              {[
                ["1959", "Operating since"],
                ["5", "NCR delivery cities"],
                ["Daily", "Scheduled dispatch"],
              ].map(([v, l]) => (
                <div key={l as string}>
                  <dt className="text-2xl md:text-3xl font-bold text-white">{v}</dt>
                  <dd className="text-xs uppercase tracking-wider text-white/60 mt-1">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="container-x py-20">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <div className="eyebrow">Operational services</div>
            <h2 className="mt-3 max-w-xl">Four service lines, one disciplined dispatch system.</h2>
          </div>
          <Link to="/services" className="text-sm font-semibold text-accent hover:underline">View all services →</Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.slice(0, 5).map((s) => {
            const Icon = serviceIcon[s.slug] ?? Truck;
            return (
              <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }}
                className="card-surface p-6 hover:shadow-elevated transition-shadow group">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg">{s.name}</h3>
                </div>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{s.short}</p>
                <div className="mt-5 text-sm font-semibold text-accent group-hover:underline">View details →</div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ROUTES */}
      <section className="border-y border-border bg-secondary/50">
        <div className="container-x py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <div className="eyebrow">Core network</div>
              <h2 className="mt-3">Five active corridors out of Jaipur.</h2>
              <p className="mt-4 text-muted-foreground max-w-lg">
                Each route is a scheduled freight lane, not a one-off booking. Capacity is planned daily against confirmed loads.
              </p>
              <Link to="/routes" className="btn btn-dark mt-6">Explore route network <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="grid gap-3">
              {ROUTES.map((r) => (
                <Link key={r.slug} to="/routes"
                  className="card-surface p-5 flex items-center justify-between gap-4 hover:border-accent/40">
                  <div className="flex items-center gap-4 min-w-0">
                    <CircleDot className="h-4 w-4 text-accent shrink-0" />
                    <div className="min-w-0">
                      <div className="font-semibold truncate">{r.from} ↔ {r.to}</div>
                      <div className="text-xs text-muted-foreground truncate">{r.role}</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-semibold">{r.km} km</div>
                    <div className="text-xs text-muted-foreground">{r.hours} hrs</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LEGACY / OPS */}
      <section className="container-x py-20 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="relative">
          <img src={warehouseImg} alt="Warehouse operations" width={1600} height={1000} loading="lazy"
            className="rounded-2xl border border-border object-cover w-full h-[420px]" />
          <div className="absolute -bottom-6 -right-4 md:right-6 card-surface p-5 max-w-[260px] hidden sm:block">
            <div className="eyebrow">Since 1959</div>
            <p className="mt-2 text-sm">Three generations of operational discipline on a single freight corridor.</p>
          </div>
        </div>
        <div>
          <div className="eyebrow">Operational strength</div>
          <h2 className="mt-3">Built on routine, not promises.</h2>
          <p className="mt-4 text-muted-foreground">
            Gautam Roadways operates a fixed daily dispatch system between Jaipur and Delhi NCR. Loads are consolidated at our Transport Nagar head office, scheduled against confirmed trucks, and tracked through branch hand-offs.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {[
              { Icon: ShieldCheck, t: "Bilty-backed bookings", d: "Documented consignment notes at every pickup and delivery." },
              { Icon: Clock, t: "Fixed dispatch windows", d: "Trucks loaded and rolled to a daily operating schedule." },
              { Icon: Warehouse, t: "Owned branch network", d: "Operational nodes at Jaipur, Karol Bagh, Sanganer & Sitapura." },
              { Icon: Truck, t: "Mixed-fleet capacity", d: "FTL, PTL and parcel handled out of a single command desk." },
            ].map((b) => (
              <div key={b.t} className="flex gap-3">
                <b.Icon className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">{b.t}</div>
                  <p className="text-sm text-muted-foreground mt-1">{b.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-border bg-primary text-primary-foreground">
        <div className="container-x py-10 grid gap-6 sm:grid-cols-3 text-center sm:text-left">
          <div><div className="text-3xl font-bold">65+</div><div className="text-sm text-white/60">Years of continuous operation</div></div>
          <div><div className="text-3xl font-bold">4</div><div className="text-sm text-white/60">Branch & pickup nodes</div></div>
          <div><div className="text-3xl font-bold">5</div><div className="text-sm text-white/60">Active NCR delivery cities</div></div>
        </div>
      </section>

      {/* CONTACT PREVIEW */}
      <section className="container-x py-20 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <div className="eyebrow">Reach dispatch</div>
          <h2 className="mt-3">Jaipur head office handles every booking.</h2>
          <p className="mt-4 text-muted-foreground max-w-lg">
            Transport Nagar, Near SBI Bank, Broadway Hotel Area. Dispatch desk is staffed daily — call, WhatsApp, or walk in.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={telHref(COMPANY.primaryPhone)} className="btn btn-dark"><Phone className="h-4 w-4" /> {COMPANY.primaryPhoneDisplay}</a>
            <a href={waHref()} target="_blank" rel="noopener" className="btn btn-whatsapp"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
            <Link to="/branches" className="btn btn-ghost">All branches</Link>
          </div>
        </div>
        <img src={loadingImg} alt="Loading operations" width={1600} height={1000} loading="lazy"
          className="rounded-2xl border border-border object-cover w-full h-[360px]" />
      </section>

      <CTABlock />
    </>
  );
}
