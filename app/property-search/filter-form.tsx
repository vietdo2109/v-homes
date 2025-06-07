"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  Form,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

const schema = z.object({
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  minBedrooms: z.string().optional(),
});
const FilterForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      minPrice: searchParams.get("minPrice") ?? "",
      maxPrice: searchParams.get("maxPrice") ?? "",
      minBedrooms: searchParams.get("minBedrooms") ?? "",
    },
  });

  const handleSubmit = (data: z.infer<typeof schema>) => {
    console.log(data);
    const newSearchParams = new URLSearchParams();

    if (data.minPrice) {
      newSearchParams.set("minPrice", data.minPrice);
    }
    if (data.maxPrice) {
      newSearchParams.set("maxPrice", data.maxPrice);
    }
    if (data.minBedrooms) {
      newSearchParams.set("minBedrooms", data.minBedrooms);
    }

    newSearchParams.set("page", "1");
    router.push(`/property-search?${newSearchParams.toString()}`);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid grid-cols-4 gap-2 "
      >
        <FormField
          control={form.control}
          name="minPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Min price</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Min price"
                  min={0}
                  type="number"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max price</FormLabel>

              <FormControl>
                <Input
                  {...field}
                  placeholder="Max price"
                  min={0}
                  type="number"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="minBedrooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Min bedrooms</FormLabel>

              <FormControl>
                <Input
                  {...field}
                  placeholder="Min bedrooms"
                  min={0}
                  type="number"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-auto">
          Search
        </Button>
      </form>
    </Form>
  );
};

export default FilterForm;
