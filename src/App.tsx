// @ts-nocheck
import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Download,
  Search,
  Plus,
  X,
  CheckCircle2,
  Circle,
  TrendingUp,
  DollarSign,
  Users,
  Briefcase,
  Target,
  CreditCard,
  FileText,
  Printer,
  Loader2,
  Mail,
  Calendar,
  Clock,
  Receipt,
  Wallet,
  ShieldCheck,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ListChecks,
  Bell,
  CheckCheck,
  AlertCircle,
  Building2,
} from "lucide-react";

/* ============================================================
   PORTAL CONFIGURATION — change these values for each client
   ============================================================ */
const AGENCY_NAME = "Apex Growth Partners";
const CLIENT_NAME = "Northwind Dental Group";
const REPORT_PERIOD = "November 2026";
const ACCOUNT_MANAGER = "Jordan Ellis";
const ACCOUNT_MANAGER_EMAIL = "jordan@apexgrowth.co";
const TOTAL_AD_SPEND = 12450;
const BASE_QUALIFIED_LEADS = 348;
const PAYMENT_METHOD_LABEL = "Visa ending in 4242";

const STATUSES = ["Closed Won", "Proposal Sent", "Discovery Call"];

const STATUS_STYLES = {
  "Closed Won": {
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    dot: "bg-emerald-500",
  },
  "Proposal Sent": {
    badge: "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
    dot: "bg-indigo-500",
  },
  "Discovery Call": {
    badge: "bg-amber-50 text-amber-700 ring-amber-600/20",
    dot: "bg-amber-500",
  },
};

const INITIAL_LEADS = [
  {
    id: 1,
    name: "Sarah Mitchell",
    email: "sarah@brightlineortho.com",
    company: "Brightline Orthodontics",
    value: 18500,
    status: "Closed Won",
    lastContacted: "2026-11-19",
  },
  {
    id: 2,
    name: "David Chen",
    email: "dchen@harborviewdental.com",
    company: "Harborview Family Dental",
    value: 12400,
    status: "Proposal Sent",
    lastContacted: "2026-11-20",
  },
  {
    id: 3,
    name: "Priya Raman",
    email: "priya@summitsmile.co",
    company: "Summit Smile Studio",
    value: 9800,
    status: "Discovery Call",
    lastContacted: "2026-11-21",
  },
  {
    id: 4,
    name: "Marcus Johnson",
    email: "marcus@lakesidedc.com",
    company: "Lakeside Dental Care",
    value: 15200,
    status: "Closed Won",
    lastContacted: "2026-11-17",
  },
  {
    id: 5,
    name: "Elena Rossi",
    email: "elena@pearlcosmetic.com",
    company: "Pearl Cosmetic Dentistry",
    value: 7600,
    status: "Proposal Sent",
    lastContacted: "2026-11-18",
  },
  {
    id: 6,
    name: "Tom Whitaker",
    email: "tom@crestwoodpeds.com",
    company: "Crestwood Pediatric Dental",
    value: 5400,
    status: "Discovery Call",
    lastContacted: "2026-11-16",
  },
  {
    id: 7,
    name: "Aisha Patel",
    email: "apatel@evergreenimplants.com",
    company: "Evergreen Implant Center",
    value: 11300,
    status: "Proposal Sent",
    lastContacted: "2026-11-14",
  },
  {
    id: 8,
    name: "Ryan O'Connor",
    email: "ryan@metroendo.com",
    company: "Metro Endodontics",
    value: 4000,
    status: "Discovery Call",
    lastContacted: "2026-11-12",
  },
];

const INITIAL_TASKS = [
  {
    id: 1,
    title: "Landing Page A/B Test",
    detail: "Variant B headline with social-proof block above the fold",
    category: "CRO",
    owner: "Maya Lin",
    due: "2026-11-24",
    done: true,
  },
  {
    id: 2,
    title: "Meta Retargeting Setup",
    detail: "Pixel events plus 30/60/90-day warm audiences",
    category: "Paid Social",
    owner: "Chris Dalton",
    due: "2026-11-22",
    done: true,
  },
  {
    id: 3,
    title: "Q4 Email Sequence",
    detail: "5-touch nurture flow for consultation no-shows",
    category: "Lifecycle",
    owner: "Nina Kapoor",
    due: "2026-11-28",
    done: false,
  },
  {
    id: 4,
    title: "Google Ads Keyword Expansion",
    detail: "High-intent implant and clear-aligner terms",
    category: "Paid Search",
    owner: "Chris Dalton",
    due: "2026-11-20",
    done: true,
  },
  {
    id: 5,
    title: "Call Tracking Integration",
    detail: "Route tracked calls into CRM for lead attribution",
    category: "Analytics",
    owner: "Sam Ortiz",
    due: "2026-11-26",
    done: false,
  },
  {
    id: 6,
    title: "Holiday Promo Creative",
    detail: "6 static and 3 short-form video ad variants",
    category: "Creative",
    owner: "Maya Lin",
    due: "2026-12-01",
    done: false,
  },
  {
    id: 7,
    title: "Monthly Strategy Review",
    detail: "Executive call with December budget plan",
    category: "Strategy",
    owner: "Jordan Ellis",
    due: "2026-11-30",
    done: false,
  },
];

const INITIAL_INVOICES = [
  {
    id: "INV-2026-1104",
    description: "November Retainer — Growth Management",
    amount: 4500,
    issued: "2026-11-01",
    due: "2026-11-30",
    status: "Pending",
    paidOn: null,
  },
  {
    id: "INV-2026-1103",
    description: "Ad Spend Reconciliation — Meta & Google",
    amount: 2490,
    issued: "2026-11-05",
    due: "2026-11-25",
    status: "Pending",
    paidOn: null,
  },
  {
    id: "INV-2026-1102",
    description: "Holiday Creative Production",
    amount: 1850,
    issued: "2026-11-10",
    due: "2026-12-05",
    status: "Pending",
    paidOn: null,
  },
  {
    id: "INV-2026-1001",
    description: "October Retainer — Growth Management",
    amount: 4500,
    issued: "2026-10-01",
    due: "2026-10-31",
    status: "Paid",
    paidOn: "2026-10-28",
  },
  {
    id: "INV-2026-1002",
    description: "Landing Page Build & CRO Sprint",
    amount: 3200,
    issued: "2026-10-08",
    due: "2026-10-25",
    status: "Paid",
    paidOn: "2026-10-20",
  },
  {
    id: "INV-2026-0901",
    description: "September Retainer — Growth Management",
    amount: 4500,
    issued: "2026-09-01",
    due: "2026-09-30",
    status: "Paid",
    paidOn: "2026-09-29",
  },
];

const TRENDS = {
  spend: [8200, 8900, 9400, 10100, 11050, 11500, 12450],
  leads: [182, 205, 231, 259, 284, 312, 348],
  pipeline: [41200, 47800, 53900, 60100, 68400, 75900, 84200],
  roi: [310, 355, 402, 448, 497, 541, 576],
};

const PRINT_CSS = `
@media print {
  @page { size: A4; margin: 14mm; }
  html, body { background: #ffffff !important; height: auto !important; overflow: visible !important; }
  .app-shell, .no-print { display: none !important; }
  .report-overlay { position: static !important; inset: auto !important; background: #ffffff !important; padding: 0 !important; overflow: visible !important; backdrop-filter: none !important; }
  .report-page { box-shadow: none !important; border: none !important; max-width: none !important; margin: 0 !important; padding: 0 !important; border-radius: 0 !important; }
  .avoid-break { break-inside: avoid; page-break-inside: avoid; }
  * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}
@keyframes toast-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
.toast-in { animation: toast-in 0.25s ease-out; }
`;

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const formatCurrency = (n) => currency.format(n);

const parseISO = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};

const formatDate = (iso) =>
  parseISO(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const todayISO = () => {
  const t = new Date();
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(t.getDate()).padStart(2, "0")}`;
};

const daysUntil = (iso) => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.round((parseISO(iso) - now) / 86400000);
};

const initials = (name) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const AGENCY_MONOGRAM = initials(AGENCY_NAME);

function Sparkline({ data, id }) {
  const w = 120;
  const h = 40;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((d, i) => [
    (i / (data.length - 1)) * w,
    h - ((d - min) / range) * (h - 6) - 3,
  ]);
  const line = pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `M0,${h} L${pts
    .map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" L")} L${w},${h} Z`;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-28 h-10 text-indigo-500"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`spark-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.22" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#spark-${id})`} />
      <polyline
        points={line}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset whitespace-nowrap ${s.badge}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}

function MetricCard({ metric }) {
  const Icon = metric.icon;
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-inset ring-indigo-100 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
          <Icon className="h-5 w-5" />
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
          <TrendingUp className="h-3 w-3" />
          {metric.change}
        </span>
      </div>
      <p className="mt-4 text-sm font-medium text-slate-500">{metric.label}</p>
      <div className="mt-1 flex items-end justify-between gap-3">
        <p className="text-3xl font-semibold tracking-tight text-slate-900">
          {metric.value}
        </p>
        <Sparkline data={metric.trend} id={metric.id} />
      </div>
      <p className="mt-2 text-xs text-slate-400">{metric.note}</p>
    </div>
  );
}

function SectionHeader({ icon: Icon, title, subtitle, action }) {
  return (
    <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900">{title}</h2>
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}

function AddLeadModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    value: "",
    status: "Discovery Call",
    lastContacted: todayISO(),
  });
  const [errors, setErrors] = useState({});

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "Contact name is required.";
    if (!form.company.trim()) next.company = "Company is required.";
    if (
      form.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    )
      next.email = "Enter a valid email address.";
    const numeric = Number(String(form.value).replace(/[^0-9.]/g, ""));
    if (!numeric || numeric <= 0)
      next.value = "Enter a deal value greater than $0.";
    if (!form.lastContacted) next.lastContacted = "Choose a date.";
    setErrors(next);
    if (Object.keys(next).length) return;
    onAdd({
      id: Date.now(),
      name: form.name.trim(),
      email: form.email.trim() || "—",
      company: form.company.trim(),
      value: Math.round(numeric),
      status: form.status,
      lastContacted: form.lastContacted,
    });
  };

  const inputBase =
    "w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10";
  const fieldClass = (f) =>
    `${inputBase} ${errors[f] ? "border-rose-300" : "border-slate-300"}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-lead-title"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h3
              id="add-lead-title"
              className="text-lg font-semibold text-slate-900"
            >
              Add New Lead
            </h3>
            <p className="text-sm text-slate-500">
              The lead is added to your pipeline instantly.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={submit} className="space-y-4 px-6 py-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Contact name
              </label>
              <input
                autoFocus
                value={form.name}
                onChange={update("name")}
                placeholder="Jane Cooper"
                className={fieldClass("name")}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-rose-600">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                value={form.email}
                onChange={update("email")}
                placeholder="jane@company.com"
                className={fieldClass("email")}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-rose-600">{errors.email}</p>
              )}
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Company
            </label>
            <input
              value={form.company}
              onChange={update("company")}
              placeholder="Riverside Dental Partners"
              className={fieldClass("company")}
            />
            {errors.company && (
              <p className="mt-1 text-xs text-rose-600">{errors.company}</p>
            )}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Deal value (USD)
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  $
                </span>
                <input
                  value={form.value}
                  onChange={update("value")}
                  inputMode="numeric"
                  placeholder="12,000"
                  className={`${fieldClass("value")} pl-7`}
                />
              </div>
              {errors.value && (
                <p className="mt-1 text-xs text-rose-600">{errors.value}</p>
              )}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Last contacted
              </label>
              <input
                type="date"
                value={form.lastContacted}
                onChange={update("lastContacted")}
                className={fieldClass("lastContacted")}
              />
              {errors.lastContacted && (
                <p className="mt-1 text-xs text-rose-600">
                  {errors.lastContacted}
                </p>
              )}
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Status
            </label>
            <div className="grid grid-cols-3 gap-2">
              {STATUSES.map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setForm((f) => ({ ...f, status: s }))}
                  className={`rounded-lg border px-2 py-2 text-xs font-medium transition ${
                    form.status === s
                      ? "border-indigo-600 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-600/20"
                      : "border-slate-300 bg-white text-slate-600 hover:border-slate-400 hover:bg-slate-50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/30"
            >
              <Plus className="h-4 w-4" />
              Add Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ReportView({ onClose, metrics, leads, tasks, invoices }) {
  const [printHint, setPrintHint] = useState(false);
  const handlePrint = () => {
    setPrintHint(true);
    try {
      window.print();
    } catch (err) {
      setPrintHint(true);
    }
  };
  const byStatus = STATUSES.map((s) => {
    const rows = leads.filter((l) => l.status === s);
    return {
      status: s,
      count: rows.length,
      value: rows.reduce((a, l) => a + l.value, 0),
    };
  });
  const topDeals = [...leads].sort((a, b) => b.value - a.value).slice(0, 5);
  const doneCount = tasks.filter((t) => t.done).length;
  const pct = Math.round((doneCount / tasks.length) * 100);
  const paid = invoices
    .filter((i) => i.status === "Paid")
    .reduce((a, i) => a + i.amount, 0);
  const outstanding = invoices
    .filter((i) => i.status === "Pending")
    .reduce((a, i) => a + i.amount, 0);
  const generated = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="report-overlay fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 p-4 backdrop-blur-sm sm:p-8">
      <div className="no-print mx-auto mb-4 flex max-w-4xl flex-col gap-3 rounded-xl bg-white/95 px-4 py-3 shadow-lg sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <FileText className="h-4 w-4 text-indigo-600" />
          Report preview — choose{" "}
          <span className="font-semibold text-slate-900">Save as PDF</span> in
          the print dialog to download.
        </div>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            <Printer className="h-4 w-4" />
            Print / Save as PDF
          </button>
        </div>
      </div>
      {printHint && (
        <p className="no-print mx-auto mb-4 max-w-4xl rounded-lg bg-indigo-50 px-4 py-2 text-xs text-indigo-800 ring-1 ring-inset ring-indigo-200">
          No print dialog? Some embedded previews block printing. On your
          deployed site, or with Ctrl/Cmd + P, this page prints as a clean PDF
          report.
        </p>
      )}

      <div className="report-page mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 shadow-2xl sm:p-12">
        <header className="flex flex-col gap-6 border-b-2 border-slate-900 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-base font-bold text-white">
              {AGENCY_MONOGRAM}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {AGENCY_NAME}
              </p>
              <p className="text-xs uppercase tracking-widest text-slate-500">
                Monthly Performance Report
              </p>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-2xl font-semibold tracking-tight text-slate-900">
              {CLIENT_NAME}
            </p>
            <p className="text-sm text-slate-500">
              {REPORT_PERIOD} · Generated {generated}
            </p>
          </div>
        </header>

        <section className="avoid-break mt-8">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
            Executive Summary
          </h3>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {metrics.map((m) => (
              <div
                key={m.id}
                className="rounded-xl border border-slate-200 p-4"
              >
                <p className="text-xs text-slate-500">{m.label}</p>
                <p className="mt-1 text-xl font-semibold text-slate-900">
                  {m.value}
                </p>
                <p className="mt-1 text-xs font-semibold text-emerald-600">
                  {m.change} MoM
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            This month, {formatCurrency(TOTAL_AD_SPEND)} in managed ad spend
            generated {metrics[1].value} qualified leads and {metrics[2].value}{" "}
            in tracked pipeline, a net return of {metrics[3].value}.{" "}
            {byStatus[0].count} deals have closed, worth{" "}
            {formatCurrency(byStatus[0].value)}.
          </p>
        </section>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <section className="avoid-break">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
              Pipeline by Stage
            </h3>
            <table className="mt-3 w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-xs text-slate-500">
                  <th className="py-2 font-medium">Stage</th>
                  <th className="py-2 text-right font-medium">Deals</th>
                  <th className="py-2 text-right font-medium">Value</th>
                </tr>
              </thead>
              <tbody>
                {byStatus.map((r) => (
                  <tr key={r.status} className="border-b border-slate-100">
                    <td className="py-2 text-slate-700">{r.status}</td>
                    <td className="py-2 text-right text-slate-700">
                      {r.count}
                    </td>
                    <td className="py-2 text-right font-medium text-slate-900">
                      {formatCurrency(r.value)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <section className="avoid-break">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
              Top Opportunities
            </h3>
            <ul className="mt-3 divide-y divide-slate-100 text-sm">
              {topDeals.map((l) => (
                <li
                  key={l.id}
                  className="flex items-center justify-between py-2"
                >
                  <div>
                    <p className="font-medium text-slate-900">{l.company}</p>
                    <p className="text-xs text-slate-500">
                      {l.name} · {l.status}
                    </p>
                  </div>
                  <p className="font-semibold text-slate-900">
                    {formatCurrency(l.value)}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="avoid-break mt-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
              Campaign Deliverables
            </h3>
            <p className="text-sm font-semibold text-slate-900">
              {doneCount}/{tasks.length} complete · {pct}%
            </p>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-indigo-600"
              style={{ width: `${pct}%` }}
            />
          </div>
          <ul className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
            {tasks.map((t) => (
              <li key={t.id} className="flex items-center gap-2">
                {t.done ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                ) : (
                  <Circle className="h-4 w-4 shrink-0 text-slate-300" />
                )}
                <span className={t.done ? "text-slate-900" : "text-slate-500"}>
                  {t.title}
                </span>
                <span className="ml-auto text-xs text-slate-400">
                  {t.category}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="avoid-break mt-8 rounded-xl bg-slate-50 p-5">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
            Billing Summary
          </h3>
          <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-500">Paid to date</p>
              <p className="text-lg font-semibold text-slate-900">
                {formatCurrency(paid)}
              </p>
            </div>
            <div>
              <p className="text-slate-500">Outstanding</p>
              <p className="text-lg font-semibold text-slate-900">
                {formatCurrency(outstanding)}
              </p>
            </div>
          </div>
        </section>

        <footer className="mt-10 flex flex-col gap-1 border-t border-slate-200 pt-4 text-xs text-slate-400 sm:flex-row sm:justify-between">
          <span>
            Prepared by {AGENCY_NAME} · {ACCOUNT_MANAGER}, Account Director ·{" "}
            {ACCOUNT_MANAGER_EMAIL}
          </span>
          <span>Confidential — prepared for {CLIENT_NAME}</span>
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sort, setSort] = useState({ key: "lastContacted", dir: "desc" });
  const [showAddLead, setShowAddLead] = useState(false);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [invoices, setInvoices] = useState(INITIAL_INVOICES);
  const [invoiceTab, setInvoiceTab] = useState("Pending");
  const [processingId, setProcessingId] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [toasts, setToasts] = useState([]);

  const notify = useCallback((message, tone = "success") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setShowAddLead(false);
        setShowReport(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const pipelineValue = useMemo(
    () => leads.reduce((a, l) => a + l.value, 0),
    [leads]
  );
  const qualifiedLeads =
    BASE_QUALIFIED_LEADS + (leads.length - INITIAL_LEADS.length);
  const netRoi = Math.round(
    ((pipelineValue - TOTAL_AD_SPEND) / TOTAL_AD_SPEND) * 100
  );

  const metrics = useMemo(
    () => [
      {
        id: "spend",
        label: "Total Ad Spend",
        value: formatCurrency(TOTAL_AD_SPEND),
        change: "+8.2%",
        note: "Meta, Google & LinkedIn combined",
        icon: DollarSign,
        trend: TRENDS.spend,
      },
      {
        id: "leads",
        label: "Qualified Leads Generated",
        value: qualifiedLeads.toLocaleString("en-US"),
        change: "+23.6%",
        note: `${formatCurrency(
          Math.round(TOTAL_AD_SPEND / qualifiedLeads)
        )} cost per qualified lead`,
        icon: Users,
        trend: TRENDS.leads,
      },
      {
        id: "pipeline",
        label: "Pipeline Value",
        value: formatCurrency(pipelineValue),
        change: "+31.4%",
        note: `${leads.length} active opportunities tracked`,
        icon: Briefcase,
        trend: TRENDS.pipeline,
      },
      {
        id: "roi",
        label: "Net ROI",
        value: `${netRoi}%`,
        change: "+42.1%",
        note: "Pipeline return on managed spend",
        icon: Target,
        trend: TRENDS.roi,
      },
    ],
    [qualifiedLeads, pipelineValue, netRoi, leads.length]
  );

  const statusCounts = useMemo(() => {
    const c = { All: leads.length };
    STATUSES.forEach(
      (s) => (c[s] = leads.filter((l) => l.status === s).length)
    );
    return c;
  }, [leads]);

  const visibleLeads = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = leads.filter((l) => {
      const matchesStatus = statusFilter === "All" || l.status === statusFilter;
      const matchesQuery =
        !q ||
        [l.name, l.company, l.email, l.status].some((v) =>
          v.toLowerCase().includes(q)
        );
      return matchesStatus && matchesQuery;
    });
    const dir = sort.dir === "asc" ? 1 : -1;
    return [...rows].sort((a, b) => {
      if (sort.key === "value") return (a.value - b.value) * dir;
      if (sort.key === "lastContacted")
        return (parseISO(a.lastContacted) - parseISO(b.lastContacted)) * dir;
      return a[sort.key].localeCompare(b[sort.key]) * dir;
    });
  }, [leads, query, statusFilter, sort]);

  const toggleSort = (key) =>
    setSort((s) =>
      s.key === key
        ? { key, dir: s.dir === "asc" ? "desc" : "asc" }
        : { key, dir: key === "name" || key === "company" ? "asc" : "desc" }
    );

  const SortIcon = ({ col }) => {
    if (sort.key !== col)
      return <ArrowUpDown className="h-3.5 w-3.5 text-slate-300" />;
    return sort.dir === "asc" ? (
      <ArrowUp className="h-3.5 w-3.5 text-indigo-600" />
    ) : (
      <ArrowDown className="h-3.5 w-3.5 text-indigo-600" />
    );
  };

  const addLead = (lead) => {
    setLeads((ls) => [lead, ...ls]);
    setShowAddLead(false);
    setStatusFilter("All");
    setQuery("");
    notify(`${lead.name} added to pipeline · ${formatCurrency(lead.value)}`);
  };

  const doneCount = tasks.filter((t) => t.done).length;
  const progress = Math.round((doneCount / tasks.length) * 100);

  const toggleTask = (id) => {
    const task = tasks.find((t) => t.id === id);
    setTasks((ts) =>
      ts.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
    notify(
      task.done
        ? `"${task.title}" reopened`
        : `"${task.title}" marked complete`,
      task.done ? "info" : "success"
    );
  };

  const pendingInvoices = invoices.filter((i) => i.status === "Pending");
  const outstanding = pendingInvoices.reduce((a, i) => a + i.amount, 0);
  const paidTotal = invoices
    .filter((i) => i.status === "Paid")
    .reduce((a, i) => a + i.amount, 0);
  const nextDue = [...pendingInvoices].sort(
    (a, b) => parseISO(a.due) - parseISO(b.due)
  )[0];
  const visibleInvoices = invoices.filter(
    (i) => invoiceTab === "All" || i.status === invoiceTab
  );

  const payInvoice = (id) => {
    setProcessingId(id);
    setTimeout(() => {
      setInvoices((inv) =>
        inv.map((i) =>
          i.id === id ? { ...i, status: "Paid", paidOn: todayISO() } : i
        )
      );
      setProcessingId(null);
      const inv = invoices.find((i) => i.id === id);
      notify(`Payment of ${formatCurrency(inv.amount)} received for ${id}`);
    }, 1400);
  };

  const scrollToBilling = () =>
    document
      .getElementById("billing")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  })();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
      <style>{PRINT_CSS}</style>

      <div className="app-shell">
        <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-lg">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-slate-900 text-sm font-bold text-white shadow-sm">
                {AGENCY_MONOGRAM}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {AGENCY_NAME}
                </p>
                <p className="hidden truncate text-xs text-slate-500 sm:block">
                  Client Portal · {CLIENT_NAME}
                </p>
              </div>
              <span className="ml-2 hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 md:inline-flex">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Campaigns Active
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={scrollToBilling}
                className="relative hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 sm:inline-flex"
              >
                <CreditCard className="h-4 w-4 text-slate-500" />
                Billing
                {pendingInvoices.length > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1.5 text-xs font-semibold text-white">
                    {pendingInvoices.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setShowReport(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-500/30"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">
                  Download Monthly Report
                </span>
                <span className="sm:hidden">Report</span>
              </button>
              <button
                className="hidden rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 lg:inline-flex"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
              </button>
              <div className="hidden h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700 ring-2 ring-white lg:flex">
                {initials(CLIENT_NAME)}
              </div>
            </div>
          </div>
        </nav>

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium text-indigo-600">
                {greeting}, {CLIENT_NAME} team
              </p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Performance Overview
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Reporting period: {REPORT_PERIOD} · Your account director is{" "}
                {ACCOUNT_MANAGER}
              </p>
            </div>
            <div className="flex items-center gap-2 md:hidden">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Campaigns Active
              </span>
            </div>
            <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 shadow-sm sm:inline-flex">
              <Calendar className="h-4 w-4 text-slate-400" />
              {REPORT_PERIOD}
            </div>
          </div>

          <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map((m) => (
              <MetricCard key={m.id} metric={m} />
            ))}
          </section>

          <div className="mt-8">
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <SectionHeader
                icon={Users}
                title="Lead Tracker"
                subtitle={`${visibleLeads.length} of ${
                  leads.length
                } leads · ${formatCurrency(
                  visibleLeads.reduce((a, l) => a + l.value, 0)
                )} shown`}
                action={
                  <button
                    onClick={() => setShowAddLead(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/30"
                  >
                    <Plus className="h-4 w-4" />
                    Add New Lead
                  </button>
                }
              />
              <div className="flex flex-col gap-3 border-b border-slate-100 bg-slate-50/60 px-5 py-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="relative w-full lg:max-w-xs">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search name, company, email…"
                    className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-8 text-sm shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-slate-400 hover:text-slate-700"
                      aria-label="Clear search"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {["All", ...STATUSES].map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatusFilter(s)}
                      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                        statusFilter === s
                          ? "bg-slate-900 text-white shadow-sm"
                          : "bg-white text-slate-600 ring-1 ring-inset ring-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {s}
                      <span
                        className={`rounded px-1.5 py-0.5 text-xs ${
                          statusFilter === s
                            ? "bg-white/20 text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {statusCounts[s]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[820px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                      {[
                        { key: "name", label: "Name" },
                        { key: "company", label: "Company" },
                        { key: "value", label: "Deal Value", right: true },
                        { key: "status", label: "Status" },
                        { key: "lastContacted", label: "Last Contacted" },
                      ].map((c) => (
                        <th
                          key={c.key}
                          className={`px-5 py-3 font-medium ${
                            c.right ? "text-right" : ""
                          }`}
                        >
                          <button
                            onClick={() => toggleSort(c.key)}
                            className={`inline-flex items-center gap-1.5 transition hover:text-slate-900 ${
                              c.right ? "flex-row-reverse" : ""
                            }`}
                          >
                            {c.label}
                            <SortIcon col={c.key} />
                          </button>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {visibleLeads.map((l) => (
                      <tr
                        key={l.id}
                        className="transition-colors hover:bg-indigo-50/40"
                      >
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
                              {initials(l.name)}
                            </div>
                            <div className="min-w-0">
                              <p className="truncate font-medium text-slate-900">
                                {l.name}
                              </p>
                              <p className="flex items-center gap-1 truncate text-xs text-slate-500">
                                <Mail className="h-3 w-3" />
                                {l.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-slate-700">
                            <Building2 className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                            {l.company}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-right font-semibold tabular-nums text-slate-900">
                          {formatCurrency(l.value)}
                        </td>
                        <td className="px-5 py-3.5">
                          <StatusBadge status={l.status} />
                        </td>
                        <td className="px-5 py-3.5 text-slate-600">
                          <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                            <Clock className="h-3.5 w-3.5 text-slate-400" />
                            {formatDate(l.lastContacted)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {visibleLeads.length === 0 && (
                  <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                      <Search className="h-5 w-5 text-slate-400" />
                    </div>
                    <p className="mt-3 text-sm font-medium text-slate-900">
                      No leads match your filters
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Try a different search term or status.
                    </p>
                    <button
                      onClick={() => {
                        setQuery("");
                        setStatusFilter("All");
                      }}
                      className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            </section>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <SectionHeader
                icon={ListChecks}
                title="Campaign Deliverables"
                subtitle={`${doneCount} of ${tasks.length} complete this cycle`}
              />
              <div className="px-5 pt-5">
                <div className="flex items-end justify-between">
                  <p className="text-sm font-medium text-slate-600">
                    Overall progress
                  </p>
                  <p className="text-2xl font-semibold tracking-tight text-slate-900">
                    {progress}%
                  </p>
                </div>
                <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-700 transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                {progress === 100 && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                    <CheckCheck className="h-3.5 w-3.5" />
                    All deliverables shipped for {REPORT_PERIOD}
                  </p>
                )}
              </div>
              <ul className="space-y-2 p-4">
                {tasks.map((t) => {
                  const days = daysUntil(t.due);
                  const dueLabel = t.done
                    ? "Done"
                    : days < 0
                    ? `${Math.abs(days)}d overdue`
                    : days === 0
                    ? "Due today"
                    : `Due ${formatDate(t.due).replace(/, \d{4}$/, "")}`;
                  const dueTone = t.done
                    ? "text-emerald-600"
                    : days < 0
                    ? "text-rose-600"
                    : days <= 2
                    ? "text-amber-600"
                    : "text-slate-500";
                  return (
                    <li key={t.id}>
                      <button
                        onClick={() => toggleTask(t.id)}
                        className={`group flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-all duration-200 ${
                          t.done
                            ? "border-emerald-100 bg-emerald-50/40 hover:border-emerald-200"
                            : "border-slate-200 bg-white hover:border-indigo-300 hover:shadow-sm"
                        }`}
                        aria-pressed={t.done}
                      >
                        {t.done ? (
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                        ) : (
                          <Circle className="mt-0.5 h-5 w-5 shrink-0 text-slate-300 transition group-hover:text-indigo-500" />
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p
                              className={`text-sm font-medium ${
                                t.done
                                  ? "text-slate-500 line-through decoration-slate-300"
                                  : "text-slate-900"
                              }`}
                            >
                              {t.title}
                            </p>
                            <span className="shrink-0 rounded-md bg-slate-100 px-1.5 py-0.5 text-xs font-medium text-slate-600">
                              {t.category}
                            </span>
                          </div>
                          <p className="mt-0.5 text-xs text-slate-500">
                            {t.detail}
                          </p>
                          <div className="mt-2 flex items-center justify-between text-xs">
                            <span className="inline-flex items-center gap-1.5 text-slate-500">
                              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
                                {initials(t.owner)}
                              </span>
                              {t.owner}
                            </span>
                            <span className={`font-medium ${dueTone}`}>
                              {dueLabel}
                            </span>
                          </div>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>

            <section
              id="billing"
              className="scroll-mt-24 self-start overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2"
            >
              <SectionHeader
                icon={Receipt}
                title="Invoices & Billing"
                subtitle={`Payment method on file: ${PAYMENT_METHOD_LABEL}`}
                action={
                  <div className="inline-flex rounded-lg bg-slate-100 p-1">
                    {["Pending", "Paid", "All"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setInvoiceTab(tab)}
                        className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                          invoiceTab === tab
                            ? "bg-white text-slate-900 shadow-sm"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        {tab}
                        {tab !== "All" && (
                          <span className="ml-1.5 text-slate-400">
                            {invoices.filter((i) => i.status === tab).length}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                }
              />
              <div className="grid grid-cols-1 gap-px bg-slate-200 sm:grid-cols-3">
                <div className="bg-white px-5 py-4">
                  <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                    <Wallet className="h-3.5 w-3.5" />
                    Outstanding balance
                  </p>
                  <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
                    {formatCurrency(outstanding)}
                  </p>
                  <p className="text-xs text-slate-500">
                    {pendingInvoices.length} open invoice
                    {pendingInvoices.length === 1 ? "" : "s"}
                  </p>
                </div>
                <div className="bg-white px-5 py-4">
                  <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Paid to date
                  </p>
                  <p className="mt-1 text-2xl font-semibold tracking-tight text-emerald-600">
                    {formatCurrency(paidTotal)}
                  </p>
                  <p className="text-xs text-slate-500">
                    {invoices.length - pendingInvoices.length} invoices settled
                  </p>
                </div>
                <div className="bg-white px-5 py-4">
                  <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                    <Calendar className="h-3.5 w-3.5" />
                    Next payment due
                  </p>
                  {nextDue ? (
                    <>
                      <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
                        {formatDate(nextDue.due)}
                      </p>
                      <p className="text-xs text-slate-500">
                        {nextDue.id} · {formatCurrency(nextDue.amount)}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="mt-1 text-2xl font-semibold tracking-tight text-emerald-600">
                        All clear
                      </p>
                      <p className="text-xs text-slate-500">
                        No payments outstanding
                      </p>
                    </>
                  )}
                </div>
              </div>
              <ul className="divide-y divide-slate-100 border-t border-slate-200">
                {visibleInvoices.map((inv) => {
                  const days = daysUntil(inv.due);
                  const isPending = inv.status === "Pending";
                  const overdue = isPending && days < 0;
                  const processing = processingId === inv.id;
                  return (
                    <li
                      key={inv.id}
                      className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-slate-50/70 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                            isPending
                              ? "bg-amber-50 text-amber-600"
                              : "bg-emerald-50 text-emerald-600"
                          }`}
                        >
                          {isPending ? (
                            <FileText className="h-5 w-5" />
                          ) : (
                            <CheckCircle2 className="h-5 w-5" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-medium text-slate-900">
                              {inv.description}
                            </p>
                            <span
                              className={`rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${
                                !isPending
                                  ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20"
                                  : overdue
                                  ? "bg-rose-50 text-rose-700 ring-rose-600/20"
                                  : "bg-amber-50 text-amber-700 ring-amber-600/20"
                              }`}
                            >
                              {!isPending
                                ? "Paid"
                                : overdue
                                ? "Overdue"
                                : "Pending"}
                            </span>
                          </div>
                          <p className="mt-0.5 text-xs text-slate-500">
                            {inv.id} · Issued {formatDate(inv.issued)} ·{" "}
                            {isPending ? (
                              <span
                                className={
                                  overdue
                                    ? "font-medium text-rose-600"
                                    : days <= 5
                                    ? "font-medium text-amber-600"
                                    : ""
                                }
                              >
                                {overdue
                                  ? `${Math.abs(days)} days overdue`
                                  : days === 0
                                  ? "Due today"
                                  : `Due in ${days} day${
                                      days === 1 ? "" : "s"
                                    }`}
                              </span>
                            ) : (
                              <span className="text-emerald-600">
                                Paid {formatDate(inv.paidOn)}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-4 sm:justify-end">
                        <p className="text-lg font-semibold tabular-nums text-slate-900">
                          {formatCurrency(inv.amount)}
                        </p>
                        {isPending ? (
                          <button
                            onClick={() => payInvoice(inv.id)}
                            disabled={processingId !== null}
                            className="inline-flex min-w-32 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {processing ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Processing
                              </>
                            ) : (
                              <>
                                <CreditCard className="h-4 w-4" />
                                Pay Now
                              </>
                            )}
                          </button>
                        ) : (
                          <span className="inline-flex min-w-32 items-center justify-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-sm font-medium text-emerald-700">
                            <CheckCheck className="h-4 w-4" />
                            Settled
                          </span>
                        )}
                      </div>
                    </li>
                  );
                })}
                {visibleInvoices.length === 0 && (
                  <li className="flex flex-col items-center px-6 py-12 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
                      <ShieldCheck className="h-6 w-6 text-emerald-600" />
                    </div>
                    <p className="mt-3 text-sm font-medium text-slate-900">
                      You're all paid up
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      No {invoiceTab.toLowerCase()} invoices right now.
                    </p>
                  </li>
                )}
              </ul>
            </section>
          </div>

          <footer className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-slate-200 pt-6 text-xs text-slate-400 sm:flex-row">
            <p>
              © {new Date().getFullYear()} {AGENCY_NAME}. All rights reserved.
            </p>
            <p className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" />
              Secure client portal · Questions? {ACCOUNT_MANAGER_EMAIL}
            </p>
          </footer>
        </main>
      </div>

      {showAddLead && (
        <AddLeadModal onClose={() => setShowAddLead(false)} onAdd={addLead} />
      )}

      {showReport && (
        <ReportView
          onClose={() => setShowReport(false)}
          metrics={metrics}
          leads={leads}
          tasks={tasks}
          invoices={invoices}
        />
      )}

      <div className="no-print pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="toast-in pointer-events-auto flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-lg"
          >
            {t.tone === "success" ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            ) : (
              <AlertCircle className="h-5 w-5 text-indigo-600" />
            )}
            {t.message}
          </div>
        ))}
      </div>
    </div>
  );
}
