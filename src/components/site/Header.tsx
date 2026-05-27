import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import logo from "@/assets/logo.png";
import { COMPANY, telHref, waHref } from "@/lib/company";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/routes", label: "Route Network" },
  { to: "/about", label: "About" },
  { to: "/branches", label: "Branches" },
  { to: "/enquiry", label: "Enquiry" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/85 backdrop-blur supports-[backdrop-filter]:bg-surface/70">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Gautam Roadways home">
          <img src={logo} alt="Gautam Roadways" width={36} height={36} className="h-9 w-9 object-contain" />
          <div className="leading-tight">
            <div className="text-sm font-bold tracking-tight text-foreground">GAUTAM ROADWAYS</div>
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">Since 1959</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => (
            <Link key={n.to} to={n.to}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "px-3 py-2 text-sm font-semibold text-foreground" }}
              activeOptions={{ exact: n.to === "/" }}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <a href={telHref(COMPANY.primaryPhone)} className="btn btn-ghost text-sm">
            <Phone className="h-4 w-4" /> {COMPANY.primaryPhoneDisplay}
          </a>
          <a href={waHref()} target="_blank" rel="noopener" className="btn btn-whatsapp text-sm">WhatsApp</a>
        </div>

        <button className="lg:hidden p-2" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-surface">
          <div className="container-x py-3 flex flex-col">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-2.5 text-sm font-medium text-foreground">
                {n.label}
              </Link>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <a href={telHref(COMPANY.primaryPhone)} className="btn btn-dark text-sm"><Phone className="h-4 w-4" /> Call</a>
              <a href={waHref()} target="_blank" rel="noopener" className="btn btn-whatsapp text-sm">WhatsApp</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
