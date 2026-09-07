import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel } from "@/components/dms/kit";

export const Route = createFileRoute("/_app/module")({
  component: ModuleIndex,
});

function ModuleIndex() {
  return (
    <>
      <PageHeader
        title="Modules"
        subtitle="System modules and configuration"
        breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Modules" }]}
      />
      <Panel className="text-center py-12">
        <p className="text-muted-foreground mb-4">Select a module from the navigation menu</p>
      </Panel>
    </>
  );
}
