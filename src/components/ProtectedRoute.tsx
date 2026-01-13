"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
  allowedRole,
}: {
  children: React.ReactNode;
  allowedRole?: string | string[];
}) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user) {
      if (pathname !== "/login") router.push("/login");
      return;
    }

    if (allowedRole) {
      const roles = Array.isArray(allowedRole) ? allowedRole : [allowedRole];
      if (!roles.includes(user.role) && pathname !== "/products") {
        router.push("/products");
      }
    }
  }, [user, router, allowedRole, pathname]);

  if (!user) return null;

  return <>{children}</>;
}
