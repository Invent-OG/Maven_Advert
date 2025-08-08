"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "@/components/admin/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const authStatus = sessionStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);

    if (!authStatus && !isLoginPage) {
      router.push("/admin/login");
    }
  }, [isLoginPage, router]);

  // Avoid rendering layout until we've confirmed auth status
  if (isAuthenticated === null && !isLoginPage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <style jsx global>{`
        header,
        footer {
          display: none !important;
        }
      `}</style>
      {!isLoginPage && isAuthenticated && <Sidebar />}
      <main
        className={
          !isLoginPage && isAuthenticated ? "ml-0 lg:ml-64 p-4 md:p-8" : ""
        }
      >
        {children}
      </main>
    </div>
  );
}
