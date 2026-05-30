import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, MessageCircle, Phone, Send } from "lucide-react";
import { COMPANY, ROUTES, SERVICES, telHref, waHref } from "@/lib/company";

export const Route = createFileRoute("/enquiry")({
  head: () => ({
    meta: [
      { title: "Shipment Enquiry — Gautam Roadways" },
      { name: "description", content: "Book a freight enquiry with Gautam Roadways. Quote, pickup window and bilty confirmed within minutes." },
      { property: "og:title", content: "Shipment Enquiry — Gautam Roadways" },
      { property: "og:description", content: "Submit your freight enquiry — we confirm quote, pickup and bilty within minutes." },
    ],
    links: [{ rel: "canonical", href: "/enquiry" }],
  }),
  component: EnquiryPage,
});

type Form = {
  name: string; phone: string; pickup: string; drop: string; goods: string; service: string; notes: string;
};

function EnquiryPage() {
  const [form, setForm] = useState<Form>({ name: "", phone: "", pickup: "Jaipur", drop: "Delhi", goods: "", service: "FTL", notes: "" });
  const [done, setDone] = useState(false);
  const update = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `New shipment enquiry%0A%0AName: ${form.name}%0APhone: ${form.phone}%0AService: ${form.service}%0APickup: ${form.pickup}%0ADrop: ${form.drop}%0AGoods: ${form.goods}%0ANotes: ${form.notes}`;
    window.open(`https://wa.me/${COMPANY.whatsapp}?text=${msg}`, "_blank", "noopener");
    setDone(true);
  };

  if (done) {
    return (
      <section className="container-x py-24">
        <div className="max-w-xl mx-auto card-surface p-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
            <Check className="h-7 w-7" />
          </div>
          <h1 className="mt-6">Enquiry received.</h1>
          <p className="mt-3 text-muted-foreground">
            Our dispatch desk will revert with quote and pickup window within minutes during operating hours. You can also reach us directly:
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={telHref(COMPANY.primaryPhone)} className="btn btn-dark"><Phone className="h-4 w-4" /> {COMPANY.primaryPhoneDisplay}</a>
            <a href={waHref()} target="_blank" rel="noopener" className="btn btn-whatsapp"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
          </div>
        </div>
      </section>
    );
  }

  const cities = Array.from(new Set(ROUTES.flatMap((r) => [r.from, r.to])));

  return (
    <>
      <section className="border-b border-border bg-secondary/40">
        <div className="container-x py-16">
          <div className="eyebrow">Shipment enquiry</div>
          <h1 className="mt-3 max-w-3xl">Book a freight enquiry — quote in minutes.</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Submit the basics. Our dispatch desk responds on WhatsApp or phone with a confirmed quote and pickup window.
          </p>
        </div>
      </section>

      <section className="container-x py-16 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <form onSubmit={onSubmit} className="card-surface p-6 md:p-8 space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Your name" required>
              <input required value={form.name} onChange={update("name")} className="input" placeholder="Full name" />
            </Field>
            <Field label="Phone number" required>
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  if (value.length <= 10) {
                    setForm((f) => ({ ...f, phone: value }));
                  }
                }}
                className="input"
                placeholder="10-digit mobile"
                pattern="[6-9]{1}[0-9]{9}"
                maxLength={10}
                title="Enter a valid 10-digit mobile number"
              />            </Field>
            <Field label="Pickup city" required>
              <select required value={form.pickup} onChange={update("pickup")} className="input">
                {cities.map((c) => <option key={c}>{c}</option>)}
                <option value="Other">Other</option>
              </select>
            </Field>
            <Field label="Drop city" required>
              <select required value={form.drop} onChange={update("drop")} className="input">
                {cities.map((c) => <option key={c}>{c}</option>)}
                <option value="Other">Other</option>
              </select>
            </Field>
            <Field label="Service required" required>
              <select required value={form.service} onChange={update("service")} className="input">
                {SERVICES.map((s) => <option key={s.slug}>{s.name}</option>)}
              </select>
            </Field>
            <Field label="Goods type" required>
              <input required value={form.goods} onChange={update("goods")} className="input" placeholder="e.g. textiles, marble, parts" />
            </Field>
          </div>
          <Field label="Notes (weight, urgency, special handling)">
            <textarea value={form.notes} onChange={update("notes")} rows={4} className="input" placeholder="Optional" />
          </Field>
          <div className="flex flex-wrap gap-3 pt-2">
            <button type="submit" className="btn btn-primary"><Send className="h-4 w-4" /> Send enquiry on WhatsApp</button>
            <a href={telHref(COMPANY.primaryPhone)} className="btn btn-ghost"><Phone className="h-4 w-4" /> Call instead</a>
          </div>
          <p className="text-xs text-muted-foreground">
            Submitting opens WhatsApp with your enquiry pre-filled to our dispatch number.
          </p>
        </form>

        <aside className="space-y-5">
          <div className="card-surface p-6 bg-primary text-primary-foreground border-primary">
            <h3 className="text-white">Faster routes</h3>
            <p className="mt-2 text-sm text-white/70">If it's urgent, skip the form.</p>
            <div className="mt-5 grid gap-2">
              <a href={telHref(COMPANY.primaryPhone)} className="btn btn-primary"><Phone className="h-4 w-4" /> Call dispatch</a>
              <a href={waHref()} target="_blank" rel="noopener" className="btn btn-whatsapp"><MessageCircle className="h-4 w-4" /> WhatsApp now</a>
            </div>
          </div>
          <div className="card-surface p-6">
            <div className="eyebrow">What you'll get back</div>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex gap-2"><Check className="h-4 w-4 text-accent shrink-0 mt-0.5" /> Quote with vehicle type</li>
              <li className="flex gap-2"><Check className="h-4 w-4 text-accent shrink-0 mt-0.5" /> Pickup window confirmation</li>
              <li className="flex gap-2"><Check className="h-4 w-4 text-accent shrink-0 mt-0.5" /> Bilty / documentation details</li>
              <li className="flex gap-2"><Check className="h-4 w-4 text-accent shrink-0 mt-0.5" /> Direct PoC at dispatch desk</li>
            </ul>
          </div>
        </aside>
      </section>
    </>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}{required && <span className="text-destructive"> *</span>}</span>
      <div className="mt-1.5">{children}</div>
      <style>{`.input{display:block;width:100%;border:1px solid var(--color-border);background:var(--color-surface);border-radius:10px;padding:.7rem .85rem;font-size:.95rem;color:var(--color-foreground);outline:none;transition:border-color .15s,box-shadow .15s}.input:focus{border-color:var(--color-accent);box-shadow:0 0 0 3px color-mix(in oklab,var(--color-accent) 18%,transparent)}`}</style>
    </label>
  );
}
