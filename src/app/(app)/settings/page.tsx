"use client";

import { useState } from "react";
import { Building2, CreditCard, Users, Check } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/lib/convex-api";
import { useApp } from "@/lib/app-context";
import { toast } from "sonner";

export default function SettingsPage() {
  const { bakeryId, bakeryName, plan, trialDaysLeft, isDemo } = useApp();
  const [name, setName] = useState(bakeryName);
  const [saved, setSaved] = useState(false);

  const updatePlan = useMutation(api.bakeries.updatePlan);

  function handleSave() {
    // In production: mutation to update bakery name
    // For now: just show saved confirmation
    setSaved(true);
    toast.success("Settings saved!");
    setTimeout(() => setSaved(false), 2000);
  }

  async function handleUpgrade(selectedPlan: string) {
    if (isDemo) {
      toast.info("Stripe integration coming soon — this is a demo.");
      return;
    }
    if (bakeryId) {
      try {
        await updatePlan({ bakeryId, plan: selectedPlan });
        toast.success(`Upgraded to ${selectedPlan}!`);
      } catch (err) {
        toast.error("Upgrade failed. Please try again.");
      }
    }
  }

  function handleInvite() {
    toast.info("Team invites coming soon!");
  }

  function handleDelete() {
    if (confirm("Are you sure you want to delete your bakery? This cannot be undone.")) {
      toast.info("Account deletion coming soon — contact support.");
    }
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1
          className="text-2xl md:text-3xl font-bold"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Settings
        </h1>
        <p className="text-sm text-[var(--muted-foreground)] mt-1">
          Manage your bakery profile and subscription.
        </p>
      </div>

      {/* Bakery Profile */}
      <div className="bg-white rounded-2xl border border-[var(--border)] p-6 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-green-organic)]/10 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-[var(--color-green-organic)]" />
          </div>
          <h3 className="font-semibold">Bakery Profile</h3>
        </div>
        <div>
          <label className="text-sm font-medium text-[var(--muted-foreground)] mb-1 block">
            Bakery Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full max-w-md px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--cream)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-sienna)]/30"
          />
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-sienna)] text-white text-sm font-semibold hover:bg-[var(--color-sienna-dark)] transition-colors"
        >
          {saved ? (
            <>
              <Check className="w-4 h-4" />
              Saved!
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>

      {/* Subscription */}
      <div className="bg-white rounded-2xl border border-[var(--border)] p-6 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-sienna)]/10 flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-[var(--color-sienna)]" />
          </div>
          <h3 className="font-semibold">Subscription</h3>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold uppercase">
            {plan === "trial" ? "Free Trial" : plan}
          </span>
          {plan === "trial" && (
            <span className="text-sm text-[var(--muted-foreground)]">
              {trialDaysLeft} days remaining
            </span>
          )}
        </div>

        {plan === "trial" && (
          <div className="w-full bg-[var(--accent)] rounded-full h-2 mt-2">
            <div
              className="bg-[var(--color-sienna)] h-2 rounded-full transition-all"
              style={{ width: `${((14 - trialDaysLeft) / 14) * 100}%` }}
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          <button
            onClick={() => handleUpgrade("starter")}
            className="p-4 rounded-xl border-2 border-[var(--border)] hover:border-[var(--color-sienna)] transition-colors text-left"
          >
            <p className="font-semibold">Starter — $29/mo</p>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">
              Unlimited products, CSV export, 3 team members
            </p>
          </button>
          <button
            onClick={() => handleUpgrade("pro")}
            className="p-4 rounded-xl border-2 border-[var(--color-sienna)] bg-[var(--color-sienna)]/5 text-left"
          >
            <p className="font-semibold">Pro — $79/mo</p>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">
              Multi-location, unlimited team, API access
            </p>
          </button>
        </div>

        <button
          onClick={() => handleUpgrade("pro")}
          className="px-5 py-2.5 rounded-xl bg-[var(--color-sienna)] text-white text-sm font-semibold hover:bg-[var(--color-sienna-dark)] transition-colors shadow-lg shadow-[var(--color-sienna)]/25"
        >
          Upgrade Now
        </button>
      </div>

      {/* Team */}
      <div className="bg-white rounded-2xl border border-[var(--border)] p-6 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-green-organic)]/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-[var(--color-green-organic)]" />
          </div>
          <h3 className="font-semibold">Team</h3>
        </div>
        <div className="flex items-center justify-between py-3 border-b border-[var(--border)]">
          <div>
            <p className="text-sm font-medium">You (Owner)</p>
            <p className="text-xs text-[var(--muted-foreground)]">owner@goldencrust.com</p>
          </div>
          <span className="px-2 py-1 rounded-full bg-[var(--color-green-organic)]/10 text-[var(--color-green-organic)] text-xs font-medium">
            Owner
          </span>
        </div>
        <button
          onClick={handleInvite}
          className="text-sm text-[var(--color-sienna)] font-medium hover:underline"
        >
          + Invite team member
        </button>
      </div>

      {/* Danger zone */}
      <div className="bg-white rounded-2xl border border-red-200 p-6">
        <h3 className="font-semibold text-red-600 mb-2">Danger Zone</h3>
        <p className="text-sm text-[var(--muted-foreground)] mb-4">
          Permanently delete your bakery and all waste data. This cannot be undone.
        </p>
        <button
          onClick={handleDelete}
          className="px-4 py-2 rounded-xl border border-red-300 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors"
        >
          Delete Bakery
        </button>
      </div>
    </div>
  );
}
