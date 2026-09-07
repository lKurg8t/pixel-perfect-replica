import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/dms/app-shell";
import { RoleProvider } from "@/components/dms/role-context";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <RoleProvider>
      <AppShell>
        <Outlet />
      </AppShell>
    </RoleProvider>
  );
}
