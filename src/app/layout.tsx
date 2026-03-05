import type { Metadata } from "next";
import "./globals.css";
import { ConvexClientProvider } from "@/lib/convex";
import { ClerkClientProvider } from "@/lib/clerk";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "WasteTracker — Stop Wasting, Start Saving",
  description:
    "Track bakery waste in seconds. See real-time dollar impact. Cut waste by 20-30% in your first month.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <ClerkClientProvider>
          <ConvexClientProvider>
            {children}
            <Toaster />
          </ConvexClientProvider>
        </ClerkClientProvider>
      </body>
    </html>
  );
}
