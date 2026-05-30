import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import { BRANCHES, COMPANY, COMPLAINT, telHref } from "@/lib/company";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-primary text-primary-foreground">
      <div className="container-x py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <img src={'/GrLogo2.png'} alt="" width={36} height={36} className="h-10 md:h-14 w-30 md:w-42  p-1" />
            {/* <div>
              <div className="font-bold tracking-tight">GAUTAM ROADWAYS</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/60">Est. {COMPANY.since}</div>
            </div> */}
          </div>
          <p className="mt-4 text-sm text-white/70 max-w-xs">
            Structured freight operations across the Jaipur ↔ Delhi NCR corridor. Daily dispatch, six decades of trust.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">Navigate</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {[["/services","Services"],["/routes","Route Network"],["/about","About"],["/branches","Branches"],["/enquiry","Shipment Enquiry"]].map(([to,l]) => (
              <li key={to}><Link to={to} className="hover:text-white">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">Operations</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {BRANCHES.slice(0,4).map((b) => (
              <li key={b.name}>
                <div className="font-medium text-white/90">{b.name}</div>
                <a href={telHref(b.phones[0])} className="hover:text-white">{b.phones[0]}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">Escalation</h4>
          <div className="mt-4 text-sm text-white/70">
            <div className="font-medium text-white/90">Complaints — {COMPLAINT.name}</div>
            <a href={telHref(COMPLAINT.raw)} className="hover:text-white">{COMPLAINT.phone}</a>
            <div className="mt-4 space-y-1">
              {COMPANY.emails.map((e) => (
                <div key={e}><a href={`mailto:${e}`} className="hover:text-white">{e}</a></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/55">
          <div>© {new Date().getFullYear()} Gautam Roadways. All rights reserved.</div>
          <div>Jaipur · Delhi · Gurgaon · Noida · Faridabad · Ghaziabad</div>
        </div>
      </div>
    </footer>
  );
}
