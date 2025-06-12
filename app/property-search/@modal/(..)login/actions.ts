"use server";

import { revalidatePath } from "next/cache";

export const onLoginSuccess = async () => {
  revalidatePath("/property-search");
};
