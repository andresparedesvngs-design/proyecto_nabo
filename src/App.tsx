import { useEffect, useState } from "react";
import type { ButtonHTMLAttributes } from "react";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function Icon({
  name,
  className,
}: {
  name: "menu" | "close" | "search" | "arrow";
  className?: string;
}) {
  const cls = cx("h-4 w-4", className);

  if (name === "menu") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 6h16M4 12h16M4 18h16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (name === "close") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M6 6l12 12M18 6L6 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (name === "search") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M16.5 16.5 21 21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // arrow
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  return (
    <button
      type="button"
      onClick={() => {
        const root = document.documentElement;
        root.classList.toggle("dark");
        setIsDark(root.classList.contains("dark"));
      }}
      className={cx(
        "inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm",
        "text-foreground shadow-sm transition hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring",
      )}
      aria-pressed={isDark}
      aria-label="Cambiar tema"
      title="Cambiar tema"
    >
      <span className={cx("h-2.5 w-2.5 rounded-full", isDark ? "bg-[hsl(var(--chart-3))]" : "bg-primary")} />
      <span className="text-muted-foreground">{isDark ? "Oscuro" : "Claro"}</span>
    </button>
  );
}

function Button({
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition " +
    "focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-60 disabled:pointer-events-none";
  const styles =
    variant === "primary"
      ? "bg-primary text-primary-foreground shadow-sm hover:opacity-95"
      : variant === "secondary"
        ? "border border-border bg-card text-foreground shadow-sm hover:bg-accent"
        : "text-muted-foreground hover:text-foreground hover:bg-accent";

  return <button className={cx(base, styles, className)} {...props} />;
}

function StatShell({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
      <div className="text-sm text-muted-foreground">{title}</div>
      <div className="mt-2 h-7 w-24 rounded-xl bg-muted" />
      <div className="mt-3 h-3 w-40 rounded-lg bg-muted" />
      {sub ? <div className="mt-3 text-xs text-muted-foreground">{sub}</div> : null}
    </div>
  );
}

function RowShell() {
  return (
    <tr className="hover:bg-accent/50">
      <td className="px-4 py-3">
        <div className="h-4 w-44 rounded-lg bg-muted" />
        <div className="mt-2 h-3 w-20 rounded-lg bg-muted" />
      </td>
      <td className="px-4 py-3">
        <div className="h-4 w-40 rounded-lg bg-muted" />
      </td>
      <td className="px-4 py-3">
        <div className="h-7 w-24 rounded-full bg-muted" />
      </td>
      <td className="px-4 py-3">
        <div className="h-4 w-16 rounded-lg bg-muted" />
      </td>
      <td className="px-4 py-3">
        <div className="h-2 w-28 rounded-full bg-muted" />
      </td>
      <td className="px-4 py-3">
        <div className="h-4 w-14 rounded-lg bg-muted" />
      </td>
      <td className="px-4 py-3">
        <div className="h-4 w-20 rounded-lg bg-muted" />
      </td>
      <td className="px-4 py-3">
        <div className="h-9 w-20 rounded-full bg-muted" />
      </td>
    </tr>
  );
}

function SidebarNav({
  active,
  onNavigate,
}: {
  active: string;
  onNavigate: (key: string) => void;
}) {
  const items = [
    { key: "Dashboard", hint: "Resumen" },
    { key: "Campañas", hint: "Listas y envíos" },
    { key: "Contactos", hint: "Segmentación" },
    { key: "Sesiones", hint: "Conexiones" },
    { key: "Plantillas", hint: "Mensajes" },
    { key: "Ajustes", hint: "Configuración" },
  ];

  return (
    <nav className="mt-6 space-y-1">
      {items.map((it) => {
        const isActive = active === it.key;
        return (
          <button
            key={it.key}
            type="button"
            onClick={() => onNavigate(it.key)}
            className={cx(
              "w-full rounded-2xl px-3 py-2 text-left transition",
              "focus:outline-none focus:ring-2 focus:ring-ring",
              isActive
                ? "bg-accent text-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
          >
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">{it.key}</div>
              <Icon name="arrow" className={cx("opacity-40", isActive && "opacity-70")} />
            </div>
            <div className="mt-0.5 text-xs opacity-70">{it.hint}</div>
          </button>
        );
      })}
    </nav>
  );
}

export default function App() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Dashboard");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileSidebarOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div
        className={cx(
          "pointer-events-none fixed inset-0 -z-10",
          "bg-[radial-gradient(70%_55%_at_35%_0%,hsl(var(--primary)/0.18),transparent_60%)]",
        )}
      />

      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-4 rounded-3xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                    <span className="text-sm font-semibold">WM</span>
                  </div>
                  <div>
                    <div className="leading-none">
                      <span className="font-semibold tracking-tight">WhatsMassive</span>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">Command Center</div>
                  </div>
                </div>
                <div className="hidden xl:block">
                  <ThemeToggle />
                </div>
              </div>

              <SidebarNav active={activeSection} onNavigate={setActiveSection} />

              <div className="mt-6 rounded-3xl border border-border bg-background p-4">
                <div className="text-xs text-muted-foreground">Estado del sistema</div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <div className="text-sm font-medium">Operativo</div>
                  <div className="text-xs text-muted-foreground">placeholder</div>
                </div>
              </div>
            </div>
          </aside>

          <div className="space-y-4">
            <header className="rounded-3xl border border-border bg-card p-4 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    variant="secondary"
                    className="lg:hidden"
                    onClick={() => setMobileSidebarOpen(true)}
                    aria-label="Abrir menú"
                  >
                    <Icon name="menu" />
                    Menú
                  </Button>
                  <div>
                    <div className="text-xs text-muted-foreground">Sección</div>
                    <div className="text-xl font-semibold tracking-tight">{activeSection}</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <Icon
                      name="search"
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <input
                      disabled
                      placeholder="Buscar (placeholder)..."
                      className={cx(
                        "h-10 w-full rounded-full border border-border bg-background pl-9 pr-3 text-sm",
                        "shadow-sm outline-none transition focus:ring-2 focus:ring-ring sm:w-[320px]",
                        "disabled:opacity-70",
                      )}
                    />
                  </div>

                  <select
                    disabled
                    className={cx(
                      "h-10 rounded-full border border-border bg-background px-3 text-sm shadow-sm",
                      "outline-none transition focus:ring-2 focus:ring-ring disabled:opacity-70",
                    )}
                    aria-label="Filtrar por estado"
                  >
                    <option>Estado</option>
                  </select>

                  <select
                    disabled
                    className={cx(
                      "h-10 rounded-full border border-border bg-background px-3 text-sm shadow-sm",
                      "outline-none transition focus:ring-2 focus:ring-ring disabled:opacity-70",
                    )}
                    aria-label="Rango de fechas"
                  >
                    <option>Rango</option>
                  </select>

                  <ThemeToggle />
                  <Button variant="primary">Nueva campaña</Button>
                </div>
              </div>
            </header>

            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <StatShell title="Campañas activas" sub="(placeholder)" />
              <StatShell title="Mensajes enviados" sub="(placeholder)" />
              <StatShell title="Entrega promedio" sub="(placeholder)" />
              <StatShell title="Respuestas" sub="(placeholder)" />
            </section>

            <section className="grid gap-4 xl:grid-cols-[1fr_360px]">
              <div className="rounded-3xl border border-border bg-card shadow-sm">
                <div className="flex flex-col gap-2 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-sm font-semibold tracking-tight">Campañas</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      Cascarón: tabla + filtros + acciones (sin datos reales)
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" disabled>
                      Limpiar filtros
                    </Button>
                    <Button variant="secondary" disabled>
                      Exportar
                    </Button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[860px] text-left text-sm">
                    <thead className="text-xs text-muted-foreground">
                      <tr>
                        <th className="px-4 py-3 font-medium">Campaña</th>
                        <th className="px-4 py-3 font-medium">Lista</th>
                        <th className="px-4 py-3 font-medium">Estado</th>
                        <th className="px-4 py-3 font-medium">Enviados</th>
                        <th className="px-4 py-3 font-medium">Entrega</th>
                        <th className="px-4 py-3 font-medium">Respuestas</th>
                        <th className="px-4 py-3 font-medium">Actualizado</th>
                        <th className="px-4 py-3 font-medium"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <RowShell />
                      <RowShell />
                      <RowShell />
                    </tbody>
                  </table>
                </div>
              </div>

              <aside className="rounded-3xl border border-border bg-card p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold tracking-tight">Actividad</div>
                    <div className="mt-1 text-xs text-muted-foreground">Cascarón</div>
                  </div>
                  <Button variant="ghost" disabled>
                    Ver todo
                  </Button>
                </div>

                <div className="mt-4 space-y-3">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="rounded-3xl border border-border bg-background p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="h-4 w-40 rounded-lg bg-muted" />
                          <div className="mt-2 h-3 w-52 rounded-lg bg-muted" />
                        </div>
                        <div className="h-7 w-14 rounded-full bg-muted" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-3xl border border-border bg-background p-4">
                  <div className="text-xs text-muted-foreground">Consejo</div>
                  <div className="mt-2 h-3 w-[90%] rounded-lg bg-muted" />
                  <div className="mt-2 h-3 w-[70%] rounded-lg bg-muted" />
                </div>
              </aside>
            </section>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div
        className={cx(
          "fixed inset-0 z-40 lg:hidden",
          mobileSidebarOpen ? "" : "pointer-events-none",
        )}
        aria-hidden={!mobileSidebarOpen}
      >
        <div
          className={cx(
            "absolute inset-0 bg-background/60 backdrop-blur-sm transition",
            mobileSidebarOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setMobileSidebarOpen(false)}
        />
        <div
          className={cx(
            "absolute left-0 top-0 h-full w-[86%] max-w-[320px] border-r border-border bg-card shadow-xl transition",
            mobileSidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Menú"
        >
          <div className="flex items-center justify-between border-b border-border p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                <span className="text-sm font-semibold">WM</span>
              </div>
              <div>
                <div className="leading-none">
                  <span className="font-semibold tracking-tight">WhatsMassive</span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">Command Center</div>
              </div>
            </div>
            <Button
              variant="secondary"
              onClick={() => setMobileSidebarOpen(false)}
              aria-label="Cerrar menú"
            >
              <Icon name="close" />
            </Button>
          </div>

          <div className="p-5">
            <SidebarNav
              active={activeSection}
              onNavigate={(key) => {
                setActiveSection(key);
                setMobileSidebarOpen(false);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

