import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NewPropertyForm from "./new-property-form";

const name = () => {
  return (
    <div className="w-[900px]">
      <Breadcrumbs
        items={[
          {
            label: "Dashboard",
            href: "/admin-dashboard",
          },
          {
            label: "New Property",
          },
        ]}
      />
      <Card className="w-full  mt-3">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">New Property</CardTitle>
        </CardHeader>
        <CardContent>
          <NewPropertyForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default name;
