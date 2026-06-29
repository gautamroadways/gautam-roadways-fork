import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { ROUTES } from "@/lib/company";
import routeImg from "@/assets/route-highway.jpg";
import { CTABlock } from "@/components/site/CTA";

export const Route = createFileRoute("/routes")({
  head: () => ({
    meta: [
      { title: "Route Network — Jaipur to Delhi, Gurgaon, Noida, Faridabad, Ghaziabad" },
      { name: "description", content: "Daily freight operations across five active corridors from Jaipur into Delhi NCR. Operational context for each route." },
      { property: "og:title", content: "Route Network — Gautam Roadways" },
      { property: "og:description", content: "Five active freight corridors out of Jaipur into Delhi NCR." },
    ],
    links: [{ rel: "canonical", href: "/routes" }],
  }),
  component: RoutesPage,
});

function RoutesPage() {
  return (
    <>
      <section className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0">
          <img src={routeImg} alt="" width={1920} height={1000} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/50" />
        </div>
        <div className="relative container-x py-16 md:py-24 text-primary-foreground">
          <div className="eyebrow text-white/60">Route network</div>
          <h1 className="mt-4 max-w-3xl text-white">Five corridors. One operating system.</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Each lane below is a daily scheduled freight movement — not a one-off booking. Capacity is planned against confirmed loads, with branch hand-offs across NCR.
          </p>
        </div>
      </section>

      <section className="container-x py-16">
        {/* Network "map" diagram */}
        <div className="card-surface p-8 md:p-10 mb-12 relative overflow-hidden">
          <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />
          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-[200px_1fr] items-center">
            <div className="text-center md:text-left">
              <div className="inline-flex flex-col items-center md:items-start">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <MapPin className="h-6 w-6" />
                </div>
                <div className="mt-3 font-bold text-lg">Jaipur</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Origin · Transport Nagar</div>
              </div>
            </div>
            <div className="grid gap-2">
              {ROUTES.map((r) => (
                <div key={r.slug} className="flex items-center gap-4">
                  <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-accent/40 to-accent" />
                  <ArrowRight className="hidden md:block h-4 w-4 text-accent" />
                  <div className="flex-1 md:flex-none flex items-center justify-between md:justify-start gap-3 md:min-w-[260px]">
                    <span className="font-semibold">{r.to}</span>
                    <span className="text-xs text-muted-foreground">{r.km} km · {r.hours} hrs</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {ROUTES.map((r) => (
            <article key={r.slug} className="card-surface p-6 hover:shadow-elevated transition-shadow">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl md:text-2xl">{r.from} ↔ {r.to}</h2>
                <div className="text-right">
                  <div className="text-sm font-semibold">{r.km} km</div>
                  <div className="text-xs text-muted-foreground">{r.hours} hrs transit</div>
                </div>
              </div>
              <div className="mt-5 space-y-3 text-sm">
                <div>
                  <div className="eyebrow">Operational importance</div>
                  <p className="mt-1.5 text-foreground">{r.role}</p>
                </div>
                <div>
                  <div className="eyebrow">Industrial context</div>
                  <p className="mt-1.5 text-muted-foreground">{r.context}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CTABlock title="Booking a load on one of these corridors?" subtitle="Confirm pickup, vehicle and bilty in a single call with our dispatch desk." />
    </>
  );
}
