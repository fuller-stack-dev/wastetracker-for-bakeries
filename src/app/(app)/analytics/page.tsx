"use client";

import { useState, useMemo } from "react";
import { Download, Calendar, TrendingDown } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/lib/convex-api";
import { useApp } from "@/lib/app-context";

// Demo data fallback
const demoDailyData = [
  { date: "Feb 24", total: 62.0, entries: 8 },
  { date: "Feb 25", total: 45.5, entries: 5 },
  { date: "Feb 26", total: 58.0, entries: 7 },
  { date: "Feb 27", total: 39.0, entries: 4 },
  { date: "Feb 28", total: 71.5, entries: 9 },
  { date: "Mar 1", total: 55.0, entries: 6 },
  { date: "Mar 2", total: 47.5, entries: 6 },
  { date: "Mar 3", total: 42.0, entries: 5 },
  { date: "Mar 4", total: 47.5, entries: 6 },
];

const demoByReason = [
  { reason: "Overproduction", total: 145.0, pct: 38 },
  { reason: "Expired", total: 95.5, pct: 25 },
  { reason: "Spoilage", total: 72.0, pct: 19 },
  { reason: "Damage", total: 42.0, pct: 11 },
  { reason: "Returned", total: 28.5, pct: 7 },
];

const demoByProduct = [
  { name: "Sourdough Boule", total: 108.0, entries: 18 },
  { name: "Almond Croissant", total: 72.5, entries: 29 },
  { name: "Rye Bread", total: 58.5, entries: 13 },
  { name: "Baguette", total: 45.0, entries: 15 },
  { name: "Pain au Chocolat", total: 38.0, entries: 19 },
];

type Range = "7d" | "14d" | "30d";
const rangeDays: Record<Range, number> = { "7d": 7, "14d": 14, "30d": 30 };

export default function AnalyticsPage() {
  const { bakeryId, isDemo } = useApp();
  const [range, setRange] = useState<Range>("7d");

  const days = rangeDays[range];

  // Wire to Convex
  const dailyTotals = useQuery(
    api.analytics.getDailyTotals,
    bakeryId ? { bakeryId, days } : "skip"
  );

  const now = Date.now();
  const startDate = now - days * 24 * 60 * 60 * 1000;
  const byReasonData = useQuery(
    api.analytics.getByReason,
    bakeryId ? { bakeryId, startDate, endDate: now } : "skip"
  );

  const products = useQuery(
    api.products.listProducts,
    bakeryId ? { bakeryId } : "skip"
  );

  // Compute display data
  const dailyData = useMemo(() => {
    if (isDemo || !dailyTotals) return demoDailyData;
    return dailyTotals.map((d: any) => ({
      date: new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      total: d.totalDollarWaste,
      entries: d.entryCount,
    }));
  }, [isDemo, dailyTotals]);

  const byReason = useMemo(() => {
    if (isDemo || !byReasonData) return demoByReason;
    const totalAll = byReasonData.reduce((s: number, r: any) => s + r.totalDollarWaste, 0);
    return byReasonData
      .sort((a: any, b: any) => b.totalDollarWaste - a.totalDollarWaste)
      .map((r: any) => ({
        reason: r.reason.charAt(0).toUpperCase() + r.reason.slice(1),
        total: r.totalDollarWaste,
        pct: totalAll > 0 ? Math.round((r.totalDollarWaste / totalAll) * 100) : 0,
      }));
  }, [isDemo, byReasonData]);

  const byProduct = useMemo(() => {
    if (isDemo || !dailyTotals || !products) return demoByProduct;
    // Aggregate top products from daily totals
    const productTotals = new Map<string, { total: number; entries: number }>();
    for (const day of dailyTotals as any[]) {
      if (day.topProduct) {
        const existing = productTotals.get(day.topProduct) || { total: 0, entries: 0 };
        existing.total += day.totalDollarWaste;
        existing.entries += day.entryCount;
        productTotals.set(day.topProduct, existing);
      }
    }
    return Array.from(productTotals.entries())
      .sort((a, b) => b[1].total - a[1].total)
      .slice(0, 5)
      .map(([pid, data]) => ({
        name: products.find((p: any) => p._id === pid)?.name || "Unknown",
        total: data.total,
        entries: data.entries,
      }));
  }, [isDemo, dailyTotals, products]);

  const weeklyTotal = dailyData.reduce((s: number, d: any) => s + d.total, 0);
  const max = Math.max(...dailyData.map((d: any) => d.total), 1);

  function exportCSV() {
    const header = "Date,Total Waste ($),Entries\n";
    const rows = dailyData.map((d: any) => `${d.date},${d.total},${d.entries}`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `waste-report-${range}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1
            className="text-2xl md:text-3xl font-bold"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Analytics
          </h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">
            Where your waste is going and how to fix it.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex rounded-xl border border-[var(--border)] overflow-hidden">
            {(["7d", "14d", "30d"] as Range[]).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-4 py-2 text-xs font-semibold transition-colors ${
                  range === r
                    ? "bg-[var(--color-sienna)] text-white"
                    : "bg-white text-[var(--muted-foreground)] hover:bg-[var(--accent)]"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border)] text-sm font-medium hover:bg-[var(--accent)] transition-colors"
          >
            <Download className="w-4 h-4" />
            CSV
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-[var(--border)] p-6">
          <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] mb-2">
            <Calendar className="w-4 h-4" />
            Period Total
          </div>
          <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
            ${weeklyTotal.toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-[var(--border)] p-6">
          <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] mb-2">
            <TrendingDown className="w-4 h-4" />
            Daily Average
          </div>
          <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
            ${dailyData.length > 0 ? (weeklyTotal / dailyData.length).toFixed(2) : "0.00"}
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-[var(--border)] p-6">
          <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] mb-2">
            <TrendingDown className="w-4 h-4" />
            Top Waste Reason
          </div>
          <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
            {byReason[0]?.reason || "—"}
          </p>
        </div>
      </div>

      {/* Bar chart */}
      <div className="bg-white rounded-2xl border border-[var(--border)] p-6">
        <h3 className="font-semibold mb-6">Daily Waste ($)</h3>
        <div className="flex items-end gap-3 h-44">
          {dailyData.map((d: any) => (
            <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs font-medium text-[var(--color-sienna)]">
                ${d.total}
              </span>
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-[var(--color-sienna)] to-[var(--color-sienna-light)] hover:opacity-80 transition-opacity min-h-[4px]"
                style={{ height: `${(d.total / max) * 100}%` }}
              />
              <span className="text-[10px] text-[var(--muted-foreground)]">
                {d.date}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* By reason */}
        <div className="bg-white rounded-2xl border border-[var(--border)] p-6">
          <h3 className="font-semibold mb-4">By Reason</h3>
          <div className="space-y-4">
            {byReason.map((r) => (
              <div key={r.reason}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium">{r.reason}</span>
                  <span className="text-[var(--muted-foreground)]">
                    ${r.total.toFixed(2)} ({r.pct}%)
                  </span>
                </div>
                <div className="h-2 rounded-full bg-[var(--accent)]">
                  <div
                    className="h-full rounded-full bg-[var(--color-sienna)]"
                    style={{ width: `${r.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* By product */}
        <div className="bg-white rounded-2xl border border-[var(--border)] p-6">
          <h3 className="font-semibold mb-4">Top Products</h3>
          <div className="space-y-3">
            {byProduct.map((p, i) => (
              <div
                key={p.name}
                className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[var(--color-sienna)]/10 flex items-center justify-center text-xs font-bold text-[var(--color-sienna)]">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{p.name}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      {p.entries} entries
                    </p>
                  </div>
                </div>
                <span className="text-sm font-semibold">${p.total.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
