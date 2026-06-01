import { createFileRoute } from "@tanstack/react-router";
import { Phone, MapPin, MessageCircle, AlertTriangle, Mail } from "lucide-react";
import { BRANCHES, COMPANY, COMPLAINT, telHref, waHref } from "@/lib/company";

export const Route = createFileRoute("/branches")({
  head: () => ({
    meta: [
      { title: "Branches & Contact — Gautam Roadways" },
      { name: "description", content: "Jaipur head office, Karol Bagh Delhi branch, Sanganer office and Sitapura pickup point — phone numbers and operational roles." },
      { property: "og:title", content: "Branches & Contact — Gautam Roadways" },
      { property: "og:description", content: "Branch network and contacts for Gautam Roadways across Jaipur and Delhi NCR." },
    ],
    links: [{ rel: "canonical", href: "/branches" }],
  }),
  component: BranchesPage,
});

function BranchesPage() {
  return (
    <>
      <section className="border-b border-border bg-secondary/40">
        <div className="container-x py-16 md:py-20">
          <div className="eyebrow">Branches & contact</div>
          <h1 className="mt-3 max-w-3xl">Four functional nodes. One operating network.</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground text-lg">
            Each branch handles a specific role in the Jaipur ↔ NCR freight flow. Reach the right node directly, or call the head office dispatch desk.
          </p>
        </div>
      </section>

      <section className="container-x py-16 grid gap-6 md:grid-cols-2">
        {BRANCHES.map((b, idx) => (
          <article key={b.name} className="card-surface p-6 flex flex-col">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-accent font-semibold">Node {String(idx + 1).padStart(2, "0")}</div>
                <h2 className="mt-2 text-xl md:text-2xl">{b.name}</h2>
              </div>
              <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{b.role}</p>
            <div className="mt-4 text-sm">{b.address}</div>
            <div className="mt-5 flex flex-wrap gap-2">
              {b.phones.map((p) => (
                <a key={p} href={telHref(p)} className="btn btn-ghost text-sm">
                  <Phone className="h-3.5 w-3.5" /> {p}
                </a>
              ))}
            </div>
            <a href={waHref(`Hello, I'd like to reach ${b.name}.`)} target="_blank" rel="noopener"
              className="btn btn-whatsapp text-sm mt-3 self-start">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </article>
        ))}
      </section>

      <section className="container-x grid gap-6 md:grid-cols-2 mb-16">
        <div className="card-surface p-6 border-l-4 border-l-destructive">
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            <div className="text-xs uppercase tracking-[0.18em] font-semibold">Complaint escalation</div>
          </div>
          <h3 className="mt-3 text-xl">{COMPLAINT.name}</h3>
          <p className="mt-2 text-sm text-muted-foreground">Direct mail for service complaints, missing parcels and delivery escalations.</p>
          <a href={`mailto:info@gautamroadways.com`} className="btn btn-dark mt-5"><Mail className="h-4 w-4" />info@gautamroadways.com</a>
          <p className="text-red-500 mt-3 text-sm">For complaints and service escalations only. Not for business enquiries, quotations, bookings, or office-related queries.</p>
        </div>
        <div className="card-surface p-6">
          <div className="flex items-center gap-2 text-accent">
            <Mail className="h-5 w-5" />
            <div className="text-xs uppercase tracking-[0.18em] font-semibold">Email the office</div>
          </div>
          <h3 className="mt-3 text-xl">Written enquiries</h3>
          <p className="mt-2 text-sm text-muted-foreground">For documentation, account billing and bulk freight quotes.</p>
          <div className="mt-5 grid gap-2">
            {COMPANY.emails.map((e) => (
              <a key={e} href={`mailto:${e}`} className="btn btn-ghost"><Mail className="h-4 w-4" /> {e}</a>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x mb-20">
        <div className="card-surface overflow-hidden">
          <iframe
            title="Gautam Roadways — Jaipur Head Office"
            src="https://www.google.com/maps?q=Transport+Nagar+Jaipur+Broadway+Hotel&output=embed"
            className="w-full h-[420px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          {/* <iframe title="Gautam Roadways — Jaipur Head Office" referrerPolicy="no-referrer-when-downgrade" className="w-full h-[420px] border-0" src="https://www.google.com/maps/d/embed?mid=1cufVK4IzizMX5Qsd0TxXc_wX2cDRlsQ&ehbc=2E312F" width="640" height="480"></iframe> */}
        </div>
      </section>
    </>
  );
}
