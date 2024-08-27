import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/layout/SideBar";
import TopBar from "@/components/layout/TopBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} h-svh overflow-hidden flex flex-col font-lato`}
      >
        <div className="flex flex-1 max-h-full overflow-hidden">
          <aside className="w-[17rem] max-w-full max-h-full overflow-x-hidden overflow-y-auto">
            <SideBar />
          </aside>
          <main className="flex-1 p-8 max-h-full overflow-x-hidden overflow-y-auto">
            <TopBar />
            <div className="">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
