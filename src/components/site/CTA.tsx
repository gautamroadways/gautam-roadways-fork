import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle, ClipboardList } from "lucide-react";
import { COMPANY, telHref, waHref } from "@/lib/company";

export function CTABlock({ title = "Move freight today.", subtitle = "Talk to dispatch in under 2 minutes — quote, pickup window, and bilty confirmed on call." }: { title?: string; subtitle?: string }) {
  return (
    <section className="container-x my-20">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-primary text-primary-foreground p-8 md:p-12">
        <div className="absolute inset-0 opacity-[0.06] grid-lines" aria-hidden />
        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <div className="eyebrow text-white/60">Dispatch desk · Open daily</div>
            <h2 className="mt-3 text-white">{title}</h2>
            <p className="mt-3 max-w-xl text-white/70">{subtitle}</p>
          </div>
          <div className="grid gap-2.5 sm:grid-cols-3 md:grid-cols-1">
            <a href={telHref(COMPANY.primaryPhone)} className="btn btn-primary"><Phone className="h-4 w-4" /> Call dispatch</a>
            <a href={waHref()} target="_blank" rel="noopener" className="btn btn-whatsapp"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
            <Link to="/enquiry" className="btn btn-ghost bg-white/5 border-white/15 text-white hover:bg-white/10"><ClipboardList className="h-4 w-4" /> Enquiry form</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
