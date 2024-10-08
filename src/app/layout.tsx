import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/layout/SideBar";
import TopBar from "@/components/layout/TopBar";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Techinnover",
  description: "The productivity app you've been looking for",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} h-svh max-h-[100svh] overflow-hidden flex flex-col`}
      >
        <div className="flex flex-1 max-h-full overflow-hidden">
          <aside className="sm:block hidden lg:w-[17rem] max-w-full max-h-full overflow-x-hidden overflow-y-auto">
            <SideBar />
          </aside>
          <main className="flex flex-col flex-1 p-3 lg:p-8 max-h-full overflow-hidden">
            <TopBar />
            <div className="flex-1 pt-4 overflow-hidden">{children}</div>
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
