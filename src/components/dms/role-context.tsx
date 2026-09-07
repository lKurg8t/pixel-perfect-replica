import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Role } from "@/lib/dms-data";

type RoleState = { role: Role; setRole: (r: Role) => void };

const RoleCtx = createContext<RoleState>({ role: "Collections Agent", setRole: () => {} });

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>("Collections Agent");
  const value = useMemo(() => ({ role, setRole }), [role]);
  return <RoleCtx.Provider value={value}>{children}</RoleCtx.Provider>;
}

export const useRole = () => useContext(RoleCtx);
