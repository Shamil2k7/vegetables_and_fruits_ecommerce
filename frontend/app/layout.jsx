"use client";
import { useRouter } from "next/navigation";

import { usePathname } from "next/navigation";
import Navbar from "../component/Nav/nav.jsx";
import Footer from "../component/Footer/Footer.jsx";
import { checkAuth } from "@/utils/checkAuth";
import { useEffect } from "react";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const router =useRouter();
   useEffect(() => {

    checkAuth(router);

  }, [router]);

  const isAdminPage =
    pathname?.startsWith("/admin")||pathname?.startsWith("/login")

  return (
    
    
    <html>
      <body>
        
      {!isAdminPage && <Navbar />}

      <main className="min-h-screen">
        {children}
      </main>

      {!isAdminPage && <Footer />}
      </body>
    </html>
    
  );
}