import { useEffect, useMemo, useState } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

type IconName =
  | "menu"
  | "close"
  | "search"
  | "arrow"
  | "bell"
  | "send"
  | "check"
  | "users";

function Icon({ name, className }: { name: IconName; className?: string }) {
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

  if (name === "bell") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 22a2.2 2.2 0 0 0 2.2-2.2h-4.4A2.2 2.2 0 0 0 12 22Z"
          fill="currentColor"
        />
        <path
          d="M18 16v-5a6 6 0 1 0-12 0v5l-2 2h16l-2-2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "send") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M22 2 11 13"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M22 2 15 22l-4-9-9-4 20-7Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "check") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M20 6 9 17l-5-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "users") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M16 11a4 4 0 1 0-8 0 4 4 0 0 0 8 0Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M4 21a8 8 0 0 1 16 0"
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
      <span
        className={cx(
          "h-2.5 w-2.5 rounded-full",
          isDark ? "bg-[hsl(var(--chart-3))]" : "bg-primary",
        )}
      />
      <span className="text-muted-foreground">{isDark ? "Oscuro" : "Claro"}</span>
    </button>
  );
}

function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition " +
    "focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-60 disabled:pointer-events-none";
  const pad = size === "sm" ? "px-3 py-1.5 text-sm" : "px-4 py-2 text-sm";
  const styles =
    variant === "primary"
      ? "bg-primary text-primary-foreground shadow-sm hover:opacity-95"
      : variant === "secondary"
        ? "border border-border bg-card text-foreground shadow-sm hover:bg-accent"
        : "text-muted-foreground hover:text-foreground hover:bg-accent";

  return <button className={cx(base, pad, styles, className)} {...props} />;
}

function Badge({
  tone = "neutral",
  children,
}: {
  tone?: "neutral" | "good" | "warn" | "info" | "bad" | "running";
  children: ReactNode;
}) {
  const toneCls =
    tone === "good"
      ? "bg-[hsl(var(--chart-1)/0.16)] text-[hsl(var(--chart-1))]"
      : tone === "info"
        ? "bg-[hsl(var(--chart-3)/0.16)] text-[hsl(var(--chart-3))]"
        : tone === "warn"
          ? "bg-[hsl(var(--chart-4)/0.16)] text-[hsl(var(--chart-4))]"
          : tone === "bad"
            ? "bg-[hsl(var(--chart-5)/0.16)] text-[hsl(var(--chart-5))]"
            : tone === "running"
              ? "bg-[hsl(var(--chart-2)/0.16)] text-[hsl(var(--chart-2))]"
              : "bg-accent text-accent-foreground";

  return (
    <span
      className={cx(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
        toneCls,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-90" />
      {children}
    </span>
  );
}

function StatCard({
  title,
  value,
  meta,
  icon,
  tint,
}: {
  title: string;
  value: string;
  meta: string;
  icon: IconName;
  tint: "primary" | "info" | "good" | "warn";
}) {
  const tintCls =
    tint === "good"
      ? "bg-[hsl(var(--chart-1)/0.14)] text-[hsl(var(--chart-1))]"
      : tint === "info"
        ? "bg-[hsl(var(--chart-3)/0.14)] text-[hsl(var(--chart-3))]"
        : tint === "warn"
          ? "bg-[hsl(var(--chart-4)/0.14)] text-[hsl(var(--chart-4))]"
          : "bg-[hsl(var(--primary)/0.14)] text-primary";

  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm text-muted-foreground">{title}</div>
          <div className="mt-1 text-3xl font-semibold tracking-tight">{value}</div>
          <div className="mt-1 text-xs text-muted-foreground">{meta}</div>
        </div>
        <div className={cx("grid h-10 w-10 place-items-center rounded-2xl", tintCls)}>
          <Icon name={icon} />
        </div>
      </div>
    </div>
  );
}

function MiniBars({ values }: { values: number[] }) {
  const max = Math.max(1, ...values);
  return (
    <div className="flex items-end gap-1" aria-hidden="true">
      {values.map((v, i) => (
        <div
          key={i}
          className="w-2 rounded-full bg-[hsl(var(--primary)/0.85)]"
          style={{ height: `${Math.max(10, Math.round((v / max) * 44))}px` }}
        />
      ))}
    </div>
  );
}

type CampaignStatus =
  | "Borrador"
  | "Programada"
  | "En curso"
  | "Pausada"
  | "Finalizada"
  | "Fallida";

type Campaign = {
  id: string;
  name: string;
  list: string;
  status: CampaignStatus;
  sent: number;
  deliveredPct: number;
  replies: number;
  updatedAt: string;
};

const campaignsSeed: Campaign[] = [
  {
    id: "cmp_001",
    name: "Promoción Febrero",
    list: "Clientes VIP",
    status: "En curso",
    sent: 3240,
    deliveredPct: 98.4,
    replies: 412,
    updatedAt: "2026-02-10T09:21:00.000Z",
  },
  {
    id: "cmp_002",
    name: "Recuperación carrito",
    list: "Ecommerce - 7 días",
    status: "Programada",
    sent: 0,
    deliveredPct: 0,
    replies: 0,
    updatedAt: "2026-02-09T17:02:00.000Z",
  },
  {
    id: "cmp_003",
    name: "NPS Post-compra",
    list: "Pedidos completados",
    status: "Pausada",
    sent: 1180,
    deliveredPct: 96.1,
    replies: 156,
    updatedAt: "2026-02-08T12:40:00.000Z",
  },
  {
    id: "cmp_004",
    name: "Reactivación Q1",
    list: "Inactivos 90 días",
    status: "Borrador",
    sent: 0,
    deliveredPct: 0,
    replies: 0,
    updatedAt: "2026-02-07T08:12:00.000Z",
  },
  {
    id: "cmp_005",
    name: "Aviso de stock",
    list: "Suscriptores",
    status: "Finalizada",
    sent: 5200,
    deliveredPct: 99.1,
    replies: 328,
    updatedAt: "2026-02-05T19:09:00.000Z",
  },
  {
    id: "cmp_006",
    name: "Prueba plantilla",
    list: "QA",
    status: "Fallida",
    sent: 200,
    deliveredPct: 12.0,
    replies: 0,
    updatedAt: "2026-02-04T21:18:00.000Z",
  },
];

function statusTone(status: CampaignStatus): Parameters<typeof Badge>[0]["tone"] {
  switch (status) {
    case "Finalizada":
      return "good";
    case "En curso":
      return "running";
    case "Programada":
      return "info";
    case "Pausada":
      return "warn";
    case "Fallida":
      return "bad";
    case "Borrador":
    default:
      return "neutral";
  }
}

function formatNumber(n: number) {
  return new Intl.NumberFormat("es-ES").format(n);
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
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
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<CampaignStatus | "Todos">("Todos");
  const [range, setRange] = useState<"Hoy" | "7 días" | "30 días">("7 días");

  const campaigns = useMemo(() => campaignsSeed, []);
  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return campaigns
      .filter((c) => (status === "Todos" ? true : c.status === status))
      .filter((c) => {
        if (!qq) return true;
        return (
          c.name.toLowerCase().includes(qq) ||
          c.list.toLowerCase().includes(qq) ||
          c.id.toLowerCase().includes(qq)
        );
      });
  }, [campaigns, q, status]);

  const totals = useMemo(() => {
    const active = campaigns.filter((c) => c.status === "En curso").length;
    const sent = campaigns.reduce((acc, c) => acc + c.sent, 0);
    const replies = campaigns.reduce((acc, c) => acc + c.replies, 0);
    const deliveredAvg =
      campaigns.length === 0
        ? 0
        : campaigns.reduce((acc, c) => acc + c.deliveredPct, 0) / campaigns.length;
    return { active, sent, replies, deliveredAvg };
  }, [campaigns]);

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
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-70">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-[hsl(var(--chart-3)/0.12)] blur-3xl" />
        <div className="absolute -right-24 top-48 h-80 w-80 rounded-full bg-[hsl(var(--chart-2)/0.12)] blur-3xl" />
      </div>

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
                <ThemeToggle />
              </div>

              <SidebarNav active={activeSection} onNavigate={setActiveSection} />

              <div className="mt-6 rounded-3xl border border-border bg-background p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground">Salud del sistema</div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      <div className="text-sm font-medium">Operativo</div>
                      <div className="text-xs text-muted-foreground">latencia normal</div>
                    </div>
                  </div>
                  <MiniBars values={[8, 13, 10, 18, 14, 16, 19]} />
                </div>
              </div>

              <div className="mt-4 rounded-3xl border border-border bg-background p-4">
                <div className="text-xs text-muted-foreground">Atajos</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button variant="secondary" size="sm">
                    <Icon name="send" />
                    Enviar test
                  </Button>
                  <Button variant="secondary" size="sm">
                    <Icon name="users" />
                    Importar
                  </Button>
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
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder="Buscar campaña, lista o ID..."
                      className={cx(
                        "h-10 w-full rounded-full border border-border bg-background pl-9 pr-3 text-sm",
                        "shadow-sm outline-none transition focus:ring-2 focus:ring-ring sm:w-[320px]",
                      )}
                    />
                  </div>

                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as CampaignStatus | "Todos")}
                    className={cx(
                      "h-10 rounded-full border border-border bg-background px-3 text-sm shadow-sm",
                      "outline-none transition focus:ring-2 focus:ring-ring",
                    )}
                    aria-label="Filtrar por estado"
                  >
                    <option value="Todos">Todos</option>
                    <option value="En curso">En curso</option>
                    <option value="Programada">Programada</option>
                    <option value="Pausada">Pausada</option>
                    <option value="Finalizada">Finalizada</option>
                    <option value="Borrador">Borrador</option>
                    <option value="Fallida">Fallida</option>
                  </select>

                  <div className="hidden sm:flex items-center gap-2 rounded-full border border-border bg-background p-1 shadow-sm">
                    {(["Hoy", "7 días", "30 días"] as const).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRange(r)}
                        className={cx(
                          "rounded-full px-3 py-1.5 text-xs font-medium transition",
                          "focus:outline-none focus:ring-2 focus:ring-ring",
                          r === range
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground",
                        )}
                      >
                        {r}
                      </button>
                    ))}
                  </div>

                  <Button variant="secondary" aria-label="Notificaciones" title="Notificaciones">
                    <Icon name="bell" />
                  </Button>

                  <Button variant="primary">Nueva campaña</Button>
                </div>
              </div>
            </header>

            {(activeSection === "Dashboard" || activeSection === "Campañas") && (
              <>
                <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <StatCard
                    title="Campañas activas"
                    value={String(totals.active)}
                    meta={`Rango: ${range}`}
                    icon="check"
                    tint="primary"
                  />
                  <StatCard
                    title="Mensajes enviados"
                    value={formatNumber(totals.sent)}
                    meta="+6.2% vs periodo anterior"
                    icon="send"
                    tint="info"
                  />
                  <StatCard
                    title="Entrega promedio"
                    value={`${totals.deliveredAvg.toFixed(1)}%`}
                    meta="Sin picos anómalos"
                    icon="check"
                    tint="good"
                  />
                  <StatCard
                    title="Respuestas"
                    value={formatNumber(totals.replies)}
                    meta="Aumenta en listas VIP"
                    icon="users"
                    tint="warn"
                  />
                </section>

                <section className="grid gap-4 xl:grid-cols-[1fr_360px]">
                  <div className="rounded-3xl border border-border bg-card shadow-sm">
                    <div className="flex flex-col gap-2 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="text-sm font-semibold tracking-tight">Campañas</div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {filtered.length} resultados (estado: {status})
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setQ("");
                            setStatus("Todos");
                          }}
                        >
                          Limpiar
                        </Button>
                        <Button variant="secondary">Exportar</Button>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[920px] text-left text-sm">
                        <thead className="sticky top-0 bg-card text-xs text-muted-foreground">
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
                          {filtered.map((c) => (
                            <tr key={c.id} className="hover:bg-accent/50">
                              <td className="px-4 py-3">
                                <div className="font-medium">{c.name}</div>
                                <div className="mt-0.5 text-xs text-muted-foreground">{c.id}</div>
                              </td>
                              <td className="px-4 py-3">{c.list}</td>
                              <td className="px-4 py-3">
                                <Badge tone={statusTone(c.status)}>{c.status}</Badge>
                              </td>
                              <td className="px-4 py-3">{formatNumber(c.sent)}</td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <div className="h-2 w-28 rounded-full bg-muted">
                                    <div
                                      className="h-2 rounded-full bg-primary"
                                      style={{ width: `${Math.max(0, Math.min(100, c.deliveredPct))}%` }}
                                    />
                                  </div>
                                  <div className="text-xs text-muted-foreground">{c.deliveredPct.toFixed(1)}%</div>
                                </div>
                              </td>
                              <td className="px-4 py-3">{formatNumber(c.replies)}</td>
                              <td className="px-4 py-3 text-muted-foreground">{formatDate(c.updatedAt)}</td>
                              <td className="px-4 py-3">
                                <Button variant="secondary" size="sm">
                                  Abrir
                                </Button>
                              </td>
                            </tr>
                          ))}
                          {filtered.length === 0 && (
                            <tr>
                              <td colSpan={8} className="px-4 py-10 text-center text-muted-foreground">
                                No hay resultados con esos filtros.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <aside className="space-y-4">
                    <div className="rounded-3xl border border-border bg-card p-4 shadow-sm">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="text-sm font-semibold tracking-tight">Insights</div>
                          <div className="mt-1 text-xs text-muted-foreground">Volumen estimado por día</div>
                        </div>
                        <MiniBars values={[12, 17, 15, 21, 19, 23, 18]} />
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="rounded-3xl border border-border bg-background p-4">
                          <div className="text-xs text-muted-foreground">Top lista</div>
                          <div className="mt-1 text-sm font-medium">Clientes VIP</div>
                          <div className="mt-2 text-xs text-muted-foreground">+12% respuesta</div>
                        </div>
                        <div className="rounded-3xl border border-border bg-background p-4">
                          <div className="text-xs text-muted-foreground">Riesgo</div>
                          <div className="mt-1 text-sm font-medium">Plantilla QA</div>
                          <div className="mt-2 text-xs text-muted-foreground">revisar variables</div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-3xl border border-border bg-card p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold tracking-tight">Actividad</div>
                          <div className="mt-1 text-xs text-muted-foreground">Eventos recientes</div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Ver todo
                        </Button>
                      </div>

                      <div className="mt-4 space-y-3">
                        {[
                          { t: "running" as const, title: "Sesión conectada", desc: "whatsapp-01 · 09:18" },
                          { t: "info" as const, title: "Programada", desc: "Recuperación carrito · 17:00" },
                          { t: "good" as const, title: "Entrega estable", desc: "Promoción Febrero · 98.4%" },
                          { t: "warn" as const, title: "Pausa manual", desc: "NPS Post-compra · Ana" },
                        ].map((e, idx) => (
                          <div key={idx} className="rounded-3xl border border-border bg-background p-4">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="text-sm font-medium">{e.title}</div>
                                <div className="mt-1 text-xs text-muted-foreground">{e.desc}</div>
                              </div>
                              <Badge tone={e.t}>OK</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </aside>
                </section>
              </>
            )}

            {activeSection !== "Dashboard" && activeSection !== "Campañas" && (
              <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <div className="text-sm font-semibold tracking-tight">{activeSection}</div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Placeholder de sección. Si me dices qué va aquí, lo maquetamos con el mismo estilo.
                </p>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div
        className={cx("fixed inset-0 z-40 lg:hidden", mobileSidebarOpen ? "" : "pointer-events-none")}
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
            <Button variant="secondary" onClick={() => setMobileSidebarOpen(false)} aria-label="Cerrar menú">
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
