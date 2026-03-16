"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Search, Package, Loader2 } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/lib/convex-api";
import { useApp } from "@/lib/app-context";
import { Id } from "@/lib/convex-api";

interface Product {
  id: string;
  name: string;
  unit: string;
  costPerUnit: number;
  category: string;
}

const initialProducts: Product[] = [
  { id: "1", name: "Sourdough Boule", unit: "loaves", costPerUnit: 6.0, category: "bread" },
  { id: "2", name: "Almond Croissant", unit: "units", costPerUnit: 2.5, category: "pastry" },
  { id: "3", name: "Rye Bread", unit: "loaves", costPerUnit: 4.5, category: "bread" },
  { id: "4", name: "Pain au Chocolat", unit: "units", costPerUnit: 2.0, category: "pastry" },
  { id: "5", name: "Baguette", unit: "units", costPerUnit: 3.0, category: "bread" },
  { id: "6", name: "Cinnamon Roll", unit: "units", costPerUnit: 3.5, category: "pastry" },
  { id: "7", name: "Whole Wheat Loaf", unit: "loaves", costPerUnit: 5.0, category: "bread" },
  { id: "8", name: "Butter Croissant", unit: "units", costPerUnit: 2.25, category: "pastry" },
];

const categories = ["bread", "pastry", "cake", "ingredient", "other"];
const units = ["kg", "units", "loaves", "dozen"];

function ProductForm({
  product,
  onSave,
  onCancel,
}: {
  product?: Product;
  onSave: (p: Omit<Product, "id">) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(product?.name || "");
  const [unit, setUnit] = useState(product?.unit || "units");
  const [cost, setCost] = useState(product?.costPerUnit?.toString() || "");
  const [category, setCategory] = useState(product?.category || "bread");

  return (
    <div className="bg-white rounded-2xl border border-[var(--border)] p-6 space-y-4">
      <h3 className="font-semibold">{product ? "Edit Product" : "Add Product"}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-[var(--muted-foreground)] mb-1 block">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Sourdough Boule"
            className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--cream)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-sienna)]/30"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-[var(--muted-foreground)] mb-1 block">
            Cost per unit ($)
          </label>
          <input
            type="number"
            step="0.01"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="6.00"
            className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--cream)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-sienna)]/30"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-[var(--muted-foreground)] mb-1 block">
            Unit
          </label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--cream)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-sienna)]/30"
          >
            {units.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-[var(--muted-foreground)] mb-1 block">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--cream)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-sienna)]/30"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex gap-3 justify-end">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-xl border border-[var(--border)] text-sm font-medium hover:bg-[var(--accent)] transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            if (!name || !cost) return;
            onSave({ name, unit, costPerUnit: parseFloat(cost), category });
          }}
          className="px-4 py-2 rounded-xl bg-[var(--color-sienna)] text-white text-sm font-semibold hover:bg-[var(--color-sienna-dark)] transition-colors"
        >
          {product ? "Save Changes" : "Add Product"}
        </button>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const { bakeryId, isDemo } = useApp();
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [filterCat, setFilterCat] = useState<string>("all");

  // Wire to Convex
  const convexProducts = useQuery(
    api.products.listProducts,
    bakeryId ? { bakeryId } : "skip"
  );
  const createProduct = useMutation(api.products.createProduct);
  const updateProduct = useMutation(api.products.updateProduct);
  const deleteProduct = useMutation(api.products.deleteProduct);

  // Local state for demo mode
  const [demoProducts, setDemoProducts] = useState<Product[]>(initialProducts);

  const products: Product[] = (!isDemo && convexProducts)
    ? convexProducts.map((p: any) => ({
        id: p._id,
        name: p.name,
        unit: p.unit,
        costPerUnit: p.costPerUnit,
        category: p.category,
      }))
    : demoProducts;

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterCat === "all" || p.category === filterCat)
  );

  async function handleAdd(data: Omit<Product, "id">) {
    if (!isDemo && bakeryId) {
      await createProduct({ bakeryId, ...data });
    } else {
      setDemoProducts([...demoProducts, { ...data, id: String(Date.now()) }]);
    }
    setShowForm(false);
  }

  async function handleEdit(data: Omit<Product, "id">) {
    if (!editing) return;
    if (!isDemo) {
      await updateProduct({
        productId: editing.id as Id<"products">,
        ...data,
      });
    } else {
      setDemoProducts(demoProducts.map((p) => (p.id === editing.id ? { ...p, ...data } : p)));
    }
    setEditing(null);
  }

  async function handleDelete(id: string) {
    if (!isDemo) {
      await deleteProduct({ productId: id as Id<"products"> });
    } else {
      setDemoProducts(demoProducts.filter((p) => p.id !== id));
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1
            className="text-2xl md:text-3xl font-bold"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Products
          </h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">
            Manage your bakery&apos;s product catalog.
          </p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-sienna)] text-white text-sm font-semibold hover:bg-[var(--color-sienna-dark)] transition-colors shadow-lg shadow-[var(--color-sienna)]/25"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {(showForm || editing) && (
        <ProductForm
          product={editing || undefined}
          onSave={editing ? handleEdit : handleAdd}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-sienna)]/30"
          />
        </div>
        <div className="flex rounded-xl border border-[var(--border)] overflow-hidden">
          {["all", ...categories].map((c) => (
            <button
              key={c}
              onClick={() => setFilterCat(c)}
              className={`px-3 py-2 text-xs font-semibold transition-colors ${
                filterCat === c
                  ? "bg-[var(--color-sienna)] text-white"
                  : "bg-white text-[var(--muted-foreground)] hover:bg-[var(--accent)]"
              }`}
            >
              {c === "all" ? "All" : c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Products table */}
      <div className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--border)] text-sm text-[var(--muted-foreground)]">
              <th className="text-left px-6 py-3 font-medium">Product</th>
              <th className="text-left px-6 py-3 font-medium hidden sm:table-cell">Category</th>
              <th className="text-left px-6 py-3 font-medium">Cost</th>
              <th className="text-left px-6 py-3 font-medium hidden sm:table-cell">Unit</th>
              <th className="text-right px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr
                key={p.id}
                className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--cream)]/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--color-green-organic)]/10 flex items-center justify-center">
                      <Package className="w-4 h-4 text-[var(--color-green-organic)]" />
                    </div>
                    <span className="font-medium text-sm">{p.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 hidden sm:table-cell">
                  <span className="px-2 py-1 rounded-full bg-[var(--accent)] text-xs font-medium capitalize">
                    {p.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  ${p.costPerUnit.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-sm text-[var(--muted-foreground)] hidden sm:table-cell">
                  {p.unit}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => {
                        setShowForm(false);
                        setEditing(p);
                      }}
                      className="p-2 rounded-lg hover:bg-[var(--accent)] transition-colors"
                    >
                      <Pencil className="w-4 h-4 text-[var(--muted-foreground)]" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="p-12 text-center text-[var(--muted-foreground)]">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
}
