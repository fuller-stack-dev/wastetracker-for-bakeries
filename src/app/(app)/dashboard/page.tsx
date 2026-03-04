"use client";

import { DollarSign, TrendingDown, Package, ClipboardList } from "lucide-react";
import Link from "next/link";

// Demo data — in production, fetched from Convex
const todayStats = {
  totalWaste: 47.5,
  itemsLogged: 6,
  topWaster: "Sourdough Boule",
  vsYesterday: -12,
};

const last7Days = [
  { date: "Mon", amount: 62 },
  { date: "Tue", amount: 45 },
  { date: "Wed", amount: 58 },
  { date: "Thu", amount: 39 },
  { date: "Fri", amount: 71 },
  { date: "Sat", amount: 55 },
  { date: "Sun", amount: 47.5 },
];

const recentEntries = [
  { product: "Sourdough Boule", qty: 3, unit: "loaves", reason: "Overproduction", cost: 18.0, time: "2:15 PM" },
  { product: "Almond Croissant", qty: 5, unit: "units", reason: "Expired", cost: 12.5, time: "1:45 PM" },
  { product: "Rye Bread", qty: 2, unit: "loaves", reason: "Damage", cost: 9.0, time: "11:30 AM" },
  { product: "Pain au Chocolat", qty: 4, unit: "units", reason: "Spoilage", cost: 8.0, time: "10:00 AM" },
];

function StatCard({
  label,
  value,
  subtext,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string;
  subtext?: string;
  icon: React.ComponentType<{ className?: string }>;
  accent?: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl border border-[var(--border)] p-6 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            accent
              ? "bg-[var(--color-sienna)]/10"
              : "bg-[var(--color-green-organic)]/10"
          }`}
        >
          <Icon
            className={`w-5 h-5 ${
              accent
                ? "text-[var(--color-sienna)]"
                : "text-[var(--color-green-organic)]"
            }`}
          />
        </div>
      </div>
      <p className="text-sm text-[var(--muted-foreground)] mb-1">{label}</p>
      <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
        {value}
      </p>
      {subtext && (
        <p className="text-xs text-[var(--muted-foreground)] mt-1">{subtext}</p>
      )}
    </div>
  );
}

function MiniBarChart({ data }: { data: { date: string; amount: number }[] }) {
  const max = Math.max(...data.map((d) => d.amount));
  return (
    <div className="flex items-end gap-2 h-32">
      {data.map((d) => (
        <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full rounded-t-lg bg-[var(--color-sienna)]/80 hover:bg-[var(--color-sienna)] transition-colors min-h-[4px]"
            style={{ height: `${(d.amount / max) * 100}%` }}
          />
          <span className="text-[10px] text-[var(--muted-foreground)]">
            {d.date}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-2xl md:text-3xl font-bold"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Dashboard
          </h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">
            Today&apos;s waste at a glance
          </p>
        </div>
        <Link
          href="/log"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-sienna)] text-white text-sm font-semibold hover:bg-[var(--color-sienna-dark)] transition-colors shadow-lg shadow-[var(--color-sienna)]/25"
        >
          <ClipboardList className="w-4 h-4" />
          Log Waste
        </Link>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Today's Waste"
          value={`$${todayStats.totalWaste.toFixed(2)}`}
          subtext={`${todayStats.vsYesterday}% vs yesterday`}
          icon={DollarSign}
          accent
        />
        <StatCard
          label="Items Logged"
          value={String(todayStats.itemsLogged)}
          subtext="entries today"
          icon={ClipboardList}
        />
        <StatCard
          label="Top Waster"
          value={todayStats.topWaster}
          subtext="highest $ waste today"
          icon={TrendingDown}
          accent
        />
        <StatCard
          label="Active Products"
          value="24"
          subtext="being tracked"
          icon={Package}
        />
      </div>

      {/* Chart + Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* 7-day chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[var(--border)] p-6">
          <h3 className="font-semibold mb-4">Last 7 Days</h3>
          <MiniBarChart data={last7Days} />
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-[var(--muted-foreground)]">Weekly total</span>
            <span className="font-semibold">
              ${last7Days.reduce((s, d) => s + d.amount, 0).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Recent entries */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-[var(--border)] p-6">
          <h3 className="font-semibold mb-4">Recent Entries</h3>
          <div className="space-y-3">
            {recentEntries.map((entry, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0"
              >
                <div>
                  <p className="text-sm font-medium">{entry.product}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    {entry.qty} {entry.unit} · {entry.reason} · {entry.time}
                  </p>
                </div>
                <span className="text-sm font-semibold text-[var(--color-sienna)]">
                  -${entry.cost.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
