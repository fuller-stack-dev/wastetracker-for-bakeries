"use client";

import { DollarSign, TrendingDown, Package, ClipboardList, Loader2 } from "lucide-react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/lib/convex-api";
import { useApp } from "@/lib/app-context";
import { useMemo } from "react";

// Demo data fallback
const demoTodayStats = {
  totalWaste: 47.5,
  itemsLogged: 6,
  topWaster: "Sourdough Boule",
  vsYesterday: -12,
};

const demoLast7Days = [
  { date: "Mon", amount: 62 },
  { date: "Tue", amount: 45 },
  { date: "Wed", amount: 58 },
  { date: "Thu", amount: 39 },
  { date: "Fri", amount: 71 },
  { date: "Sat", amount: 55 },
  { date: "Sun", amount: 47.5 },
];

const demoRecentEntries = [
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
  const { bakeryId, isDemo } = useApp();

  // Wire to Convex when bakeryId available
  const todayEntries = useQuery(
    api.wasteEntries.getWasteToday,
    bakeryId ? { bakeryId } : "skip"
  );
  const last7DaysEntries = useQuery(
    api.wasteEntries.getWasteLast7Days,
    bakeryId ? { bakeryId } : "skip"
  );
  const products = useQuery(
    api.products.listProducts,
    bakeryId ? { bakeryId } : "skip"
  );

  // Compute live stats or fall back to demo
  const todayStats = useMemo(() => {
    if (isDemo || !todayEntries) return demoTodayStats;
    const totalWaste = todayEntries.reduce((s: number, e: any) => s + e.dollarValue, 0);
    const itemsLogged = todayEntries.length;
    // Find top waster by product
    const productTotals = new Map<string, number>();
    for (const e of todayEntries as any[]) {
      productTotals.set(e.productId, (productTotals.get(e.productId) || 0) + e.dollarValue);
    }
    let topWaster = "—";
    let topAmount = 0;
    for (const [pid, amount] of productTotals as any) {
      if (amount > topAmount) {
        topAmount = amount;
        const prod = products?.find((p) => p._id === pid);
        topWaster = prod?.name || pid;
      }
    }
    return { totalWaste, itemsLogged, topWaster, vsYesterday: 0 };
  }, [isDemo, todayEntries, products]);

  const last7Days = useMemo(() => {
    if (isDemo || !last7DaysEntries) return demoLast7Days;
    const dayMap = new Map<string, number>();
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (const e of last7DaysEntries as any[]) {
      const d = new Date(e.loggedAt);
      const dayName = dayNames[d.getDay()];
      dayMap.set(dayName, (dayMap.get(dayName) || 0) + e.dollarValue);
    }
    return Array.from(dayMap.entries()).map(([date, amount]) => ({ date, amount }));
  }, [isDemo, last7DaysEntries]);

  const recentEntries = useMemo(() => {
    if (isDemo || !todayEntries) return demoRecentEntries;
    return todayEntries
      .sort((a: any, b: any) => b.loggedAt - a.loggedAt)
      .slice(0, 4)
      .map((e: any) => {
        const prod = products?.find((p) => p._id === e.productId);
        return {
          product: prod?.name || "Unknown",
          qty: e.quantity,
          unit: prod?.unit || "units",
          reason: e.reason.charAt(0).toUpperCase() + e.reason.slice(1),
          cost: e.dollarValue,
          time: new Date(e.loggedAt).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          }),
        };
      });
  }, [isDemo, todayEntries, products]);

  const activeProductCount = isDemo ? 24 : (products?.length ?? 0);

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
          subtext={todayStats.vsYesterday !== 0 ? `${todayStats.vsYesterday}% vs yesterday` : "today so far"}
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
          value={String(activeProductCount)}
          subtext="being tracked"
          icon={Package}
        />
      </div>

      {/* Chart + Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
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
