import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { COMPANY, CATEGORIES } from "@/data/catalogue";
import { WhatsAppButton } from "@/components/whatsapp-button";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [cats, setCats] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState<{ slug: string; name: string } | null>(null);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const catRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!catOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(e.target as Node)) setCatOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [catOpen]);

  const submitSearch = () => {
    if (selectedCat) {
      navigate({ to: "/products/$slug", params: { slug: selectedCat.slug }, search: query ? { q: query } : {} });
    } else {
      navigate({ to: "/products", search: query ? { q: query } : {} });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-background">
      {/* Contact strip — stacks cleanly on phones, row on desktop */}
      <div className="bg-topbar text-topbar-foreground">
        <div className="mx-auto max-w-7xl px-4 py-2.5 text-[13px] sm:py-3 sm:text-sm">
          <div className="grid gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:gap-3">
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(COMPANY.address)}`}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex min-w-0 items-center gap-2 font-medium hover:text-accent"
            >
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/10 group-hover:bg-accent/20 sm:h-7 sm:w-7">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s-8-7.5-8-13a8 8 0 1 1 16 0c0 5.5-8 13-8 13Z"/><circle cx="12" cy="9" r="2.5"/></svg>
              </span>
              <span className="truncate tracking-wide">{COMPANY.address}</span>
            </a>
            <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2">
              <a href={`mailto:${COMPANY.email}`} className="group inline-flex min-w-0 items-center gap-2 font-medium hover:text-accent">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/10 group-hover:bg-accent/20 sm:h-7 sm:w-7">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
                </span>
                <span className="truncate tracking-wide">{COMPANY.email}</span>
              </a>

              <span className="hidden h-6 w-px bg-white/15 sm:block" />

              <div className="flex w-full items-center gap-2 rounded-full border border-white/15 bg-white/5 px-2 py-1 backdrop-blur-sm sm:w-auto">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground shadow-sm sm:h-7 sm:w-7">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z"/></svg>
                </span>
                <div className="flex min-w-0 flex-col leading-none">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/55">Sales &amp; Support</span>
                  <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    {COMPANY.phones.slice(0, 2).map((p, idx) => (
                      <span key={p} className="flex items-center gap-2">
                        {idx > 0 && <span className="h-3 w-px bg-white/25" />}
                        <a href={`tel:${p.replace(/\s/g, "")}`} className="text-[12px] font-bold tracking-wide text-white transition hover:text-accent sm:text-[13px]">
                          {p}
                        </a>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5 md:gap-6 md:py-2">
          <Link to="/" className="flex h-16 shrink-0 items-center" aria-label="Zentramed Health home">
            <img
              src="/logo-zentramed.png"
              alt="Zentramed Health — Advancing Healthcare and Humanitarian Solutions"
              loading="eager"
              decoding="sync"
              fetchPriority="high"
              className="h-full w-auto max-w-[15rem] object-contain sm:max-w-[18rem] lg:max-w-[22rem]"
            />
          </Link>
          <form
            onSubmit={(e) => { e.preventDefault(); submitSearch(); }}
            className="hidden flex-1 md:block"
          >
            <div className="relative flex items-stretch rounded-md border-2 border-brand bg-background shadow-sm ring-4 ring-brand/10 transition focus-within:ring-brand/25">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={selectedCat ? `Search in ${selectedCat.name}` : "Search for products"}
                className="min-w-0 flex-1 rounded-l-sm bg-transparent px-4 py-2.5 text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground"
              />
              <div ref={catRef} className="relative border-l border-border">
                <button
                  type="button"
                  onClick={() => setCatOpen((o) => !o)}
                  aria-expanded={catOpen}
                  aria-haspopup="listbox"
                  className="flex h-full items-center gap-2 whitespace-nowrap px-4 text-sm font-semibold text-brand hover:bg-muted"
                >
                  {selectedCat?.name ?? "Select Category"}
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
                {catOpen && (
                  <div role="listbox" aria-label="Product categories" className="absolute right-0 top-full z-[60] mt-2 max-h-80 w-72 overflow-auto rounded-md border border-border bg-background text-foreground shadow-xl">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCat(null);
                        setCatOpen(false);
                      }}
                      className={`block w-full border-b border-border px-4 py-2.5 text-left text-sm hover:bg-muted ${selectedCat ? "text-muted-foreground" : "font-semibold text-brand"}`}
                    >
                      All Categories
                    </button>
                    {CATEGORIES.map((c) => (
                      <button
                        type="button"
                        key={c.slug}
                        onClick={() => {
                          setSelectedCat({ slug: c.slug, name: c.name });
                          setCatOpen(false);
                        }}
                        className={`block w-full border-b border-border px-4 py-2.5 text-left text-sm hover:bg-muted hover:text-brand ${selectedCat?.slug === c.slug ? "bg-muted font-semibold text-brand" : ""}`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                type="submit"
                aria-label="Search"
                className="flex items-center justify-center rounded-r-sm bg-brand px-5 text-brand-foreground hover:bg-brand/90"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>
          <div className="hidden shrink-0 lg:block">
            <WhatsAppButton size="sm" badge={null} />
          </div>
          <button className="md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <nav className="border-b border-border bg-brand text-brand-foreground">
        <div className="mx-auto hidden max-w-7xl items-center gap-1 px-4 md:flex">
          <div
            onMouseEnter={() => setCats(true)}
            onMouseLeave={() => setCats(false)}
            className="relative"
          >
            <button className="flex items-center gap-2 bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground">
              <Menu className="h-4 w-4" /> Browse Categories
            </button>
            {cats && (
              <div className="absolute left-0 top-full z-50 w-72 bg-background text-foreground shadow-xl">
                {CATEGORIES.map((c) => (
                  <Link
                    key={c.slug}
                    to="/products/$slug"
                    params={{ slug: c.slug }}
                    className="block border-b border-border px-4 py-2.5 text-sm hover:bg-muted hover:text-brand"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-4 py-3 text-sm font-medium hover:text-accent"
              activeProps={{ className: "px-4 py-3 text-sm font-medium text-accent" }}
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/featured-products"
            className="ml-auto flex animate-pulse-ring items-center gap-2 rounded-full bg-featured px-5 py-2 text-sm font-bold uppercase tracking-widest text-featured-foreground shadow-md transition hover:brightness-105"
            activeProps={{ className: "ml-auto flex animate-pulse-ring items-center gap-2 rounded-full bg-featured px-5 py-2 text-sm font-bold uppercase tracking-widest text-featured-foreground shadow-md ring-2 ring-white/70" }}
          >
            <span className="inline-block h-2 w-2 animate-blink rounded-full bg-white" />
            Offers
          </Link>

        </div>

        {open && (
          <div className="md:hidden">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} className="block border-b border-brand-foreground/10 px-4 py-3 text-sm" onClick={() => setOpen(false)}>
                {n.label}
              </Link>
            ))}
            <Link
              to="/featured-products"
              className="block border-b border-brand-foreground/10 bg-featured px-4 py-3 text-sm font-bold text-featured-foreground"
              onClick={() => setOpen(false)}
            >
              Offers
            </Link>
            <div className="p-3">
              <WhatsAppButton size="sm" badge={null} className="w-full justify-center" />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-topbar text-topbar-foreground">
      {/* Newsletter / CTA band */}
      <div className="border-b border-white/10 bg-gradient-to-r from-brand to-topbar">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 py-8">
          <div>
            <h3 className="font-display text-xl font-semibold text-white md:text-2xl">Need a quote or product advice?</h3>
            <p className="mt-1 text-sm text-white/70">Our specialists respond within one business day.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <WhatsAppButton size="sm" label="WhatsApp Us" badge={null} />
            <Link to="/contact" className="inline-flex items-center rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">
              Contact Sales
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <img
            src="/logo-zentramed.png"
            alt="Zentramed Health"
            loading="lazy"
            decoding="async"
            className="block h-14 w-auto object-contain object-left md:h-16"
          />
          <div className="mt-5 h-px w-24 bg-gradient-to-r from-accent to-transparent" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-topbar-foreground/70">
            Trusted supplier of medical supplies, equipment and healthcare solutions to hospitals,
            clinics, NGOs and humanitarian organizations across Africa.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["ISO-aligned", "Certified brands", "Pan-African delivery"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/75 backdrop-blur-sm transition hover:border-accent/50 hover:text-accent"
              >
                {t}
              </span>
            ))}
          </div>
        </div>


        <div className="md:col-span-2">
          <h4 className="relative pb-3 font-display text-sm font-semibold uppercase tracking-[0.2em] text-white after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-8 after:rounded-full after:bg-accent">Company</h4>
          <ul className="mt-5 space-y-2.5 text-sm text-topbar-foreground/75">
            {NAV.map((n) => (
              <li key={n.to}><Link to={n.to} className="transition hover:text-accent">{n.label}</Link></li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="relative pb-3 font-display text-sm font-semibold uppercase tracking-[0.2em] text-white after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-8 after:rounded-full after:bg-accent">Top Categories</h4>
          <ul className="mt-5 space-y-2.5 text-sm text-topbar-foreground/75">
            {CATEGORIES.slice(0, 5).map((c) => (
              <li key={c.slug}>
                <Link to="/products/$slug" params={{ slug: c.slug }} className="transition hover:text-accent">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="relative pb-3 font-display text-sm font-semibold uppercase tracking-[0.2em] text-white after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-8 after:rounded-full after:bg-accent">Get in Touch</h4>
          <ul className="mt-5 space-y-3 text-sm text-topbar-foreground/75">
            <li>
              <a href={`https://maps.google.com/?q=${encodeURIComponent(COMPANY.address)}`} target="_blank" rel="noreferrer" className="flex items-start gap-2 hover:text-accent">
                <span className="mt-0.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {COMPANY.address}
              </a>
            </li>
            {COMPANY.phones.map((p) => (
              <li key={p}>
                <a href={`tel:${p.replace(/\s/g, "")}`} className="flex items-center gap-2 font-semibold text-white hover:text-accent">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                  {p}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 hover:text-accent">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                {COMPANY.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/20">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-5 text-xs text-topbar-foreground/60">
          <div>© {new Date().getFullYear()} Zentramed Health. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <span className="text-white/50">{COMPANY.social}</span>
            <span className="hidden h-3 w-px bg-white/20 sm:block" />
            <span>Nairobi · Kenya</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
