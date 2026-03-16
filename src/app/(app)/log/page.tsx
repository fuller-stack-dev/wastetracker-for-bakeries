"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/lib/convex-api";
import { useApp } from "@/lib/app-context";

const demoProducts = [
  { id: "1", name: "Sourdough Boule", unit: "loaves", costPerUnit: 6.0, category: "bread" },
  { id: "2", name: "Almond Croissant", unit: "units", costPerUnit: 2.5, category: "pastry" },
  { id: "3", name: "Rye Bread", unit: "loaves", costPerUnit: 4.5, category: "bread" },
  { id: "4", name: "Pain au Chocolat", unit: "units", costPerUnit: 2.0, category: "pastry" },
  { id: "5", name: "Baguette", unit: "units", costPerUnit: 3.0, category: "bread" },
  { id: "6", name: "Cinnamon Roll", unit: "units", costPerUnit: 3.5, category: "pastry" },
  { id: "7", name: "Whole Wheat Loaf", unit: "loaves", costPerUnit: 5.0, category: "bread" },
  { id: "8", name: "Butter Croissant", unit: "units", costPerUnit: 2.25, category: "pastry" },
];

const reasons = [
  { value: "overproduction", label: "Overproduction", emoji: "📦" },
  { value: "spoilage", label: "Spoilage", emoji: "🦠" },
  { value: "damage", label: "Damage", emoji: "💥" },
  { value: "returned", label: "Returned", emoji: "↩️" },
  { value: "expired", label: "Expired", emoji: "⏰" },
];

export default function LogWastePage() {
  const { bakeryId, userId, isDemo } = useApp();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [search, setSearch] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Wire to Convex
  const convexProducts = useQuery(
    api.products.listProducts,
    bakeryId ? { bakeryId } : "skip"
  );
  const logWasteMutation = useMutation(api.wasteEntries.logWaste);

  // Use Convex products when available, else demo
  const productList = (!isDemo && convexProducts)
    ? convexProducts.map((p: any) => ({
        id: p._id,
        name: p.name,
        unit: p.unit,
        costPerUnit: p.costPerUnit,
        category: p.category,
      }))
    : demoProducts;

  const product = productList.find((p) => p.id === selectedProduct);
  const dollarValue = product ? quantity * product.costPerUnit : 0;

  const filtered = productList.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  async function handleSubmit() {
    if (!selectedProduct || !reason) return;

    if (!isDemo && bakeryId && userId) {
      setIsSubmitting(true);
      try {
        await logWasteMutation({
          bakeryId,
          productId: selectedProduct as any,
          quantity,
          reason,
          loggedBy: userId,
        });
      } catch (err) {
        console.error("Failed to log waste:", err);
      }
      setIsSubmitting(false);
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedProduct(null);
      setQuantity(1);
      setReason(null);
      setSearch("");
    }, 2000);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-slide-up">
        <div className="w-16 h-16 rounded-full bg-[var(--color-green-organic)]/10 flex items-center justify-center mb-4">
          <Check className="w-8 h-8 text-[var(--color-green-organic)]" />
        </div>
        <h2
          className="text-2xl font-bold mb-2"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Logged!
        </h2>
        <p className="text-[var(--muted-foreground)]">
          {product?.name} · {quantity} {product?.unit} · ${dollarValue.toFixed(2)}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1
          className="text-2xl md:text-3xl font-bold"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Log Waste
        </h1>
        <p className="text-sm text-[var(--muted-foreground)] mt-1">
          Tap, select, done — under 10 seconds.
        </p>
      </div>

      {/* Step 1: Select product */}
      <div className="bg-white rounded-2xl border border-[var(--border)] p-6">
        <h3 className="font-semibold mb-3">1. What was wasted?</h3>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--cream)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-sienna)]/30 mb-3"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {filtered.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedProduct(p.id)}
              className={`p-3 rounded-xl border text-left text-sm transition-all ${
                selectedProduct === p.id
                  ? "border-[var(--color-sienna)] bg-[var(--color-sienna)]/5 ring-2 ring-[var(--color-sienna)]/20"
                  : "border-[var(--border)] hover:border-[var(--color-sienna)]/50"
              }`}
            >
              <p className="font-medium truncate">{p.name}</p>
              <p className="text-xs text-[var(--muted-foreground)]">
                ${p.costPerUnit.toFixed(2)}/{p.unit}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Quantity */}
      <div className="bg-white rounded-2xl border border-[var(--border)] p-6">
        <h3 className="font-semibold mb-3">2. How much?</h3>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-12 h-12 rounded-xl border border-[var(--border)] flex items-center justify-center text-lg font-bold hover:bg-[var(--accent)] transition-colors"
          >
            −
          </button>
          <div className="flex-1 text-center">
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              className="text-3xl font-bold text-center w-24 bg-transparent focus:outline-none"
              style={{ fontFamily: "var(--font-playfair)" }}
            />
            <p className="text-xs text-[var(--muted-foreground)]">
              {product ? product.unit : "units"}
            </p>
          </div>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-12 h-12 rounded-xl border border-[var(--border)] flex items-center justify-center text-lg font-bold hover:bg-[var(--accent)] transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        {product && (
          <div className="mt-4 text-center">
            <span className="text-lg font-semibold text-[var(--color-sienna)]">
              = ${dollarValue.toFixed(2)}
            </span>
          </div>
        )}
      </div>

      {/* Step 3: Reason */}
      <div className="bg-white rounded-2xl border border-[var(--border)] p-6">
        <h3 className="font-semibold mb-3">3. Why?</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {reasons.map((r) => (
            <button
              key={r.value}
              onClick={() => setReason(r.value)}
              className={`p-3 rounded-xl border text-sm transition-all ${
                reason === r.value
                  ? "border-[var(--color-sienna)] bg-[var(--color-sienna)]/5 ring-2 ring-[var(--color-sienna)]/20"
                  : "border-[var(--border)] hover:border-[var(--color-sienna)]/50"
              }`}
            >
              <span className="text-lg">{r.emoji}</span>
              <p className="font-medium mt-1">{r.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!selectedProduct || !reason || isSubmitting}
        className="w-full py-4 rounded-xl bg-[var(--color-sienna)] text-white font-semibold text-base hover:bg-[var(--color-sienna-dark)] transition-all shadow-lg shadow-[var(--color-sienna)]/25 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Logging..." : `Log Waste ${dollarValue > 0 ? `— $${dollarValue.toFixed(2)}` : ""}`}
      </button>
    </div>
  );
}
