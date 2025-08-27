"use client";
import { PropsWithChildren } from "react";
import { canAccess, UserRole } from "@/lib/rbac";

export function RoleGate({ allow, currentRole, children }: PropsWithChildren<{ allow: UserRole[] | UserRole; currentRole: UserRole }>) {
  if (!canAccess(allow, currentRole)) return null;
  return <>{children}</>;
}

