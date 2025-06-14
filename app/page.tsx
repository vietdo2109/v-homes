import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen -mt-24 p-24 flex items-center justify-center relative">
      <Image fill className="object-cover" src="/hero.webp" alt="hero img" />
      <div className="absolute top-0 left-0 size-full bg-black/50 backdrop-blur-xs"></div>
      <div className="flex flex-col gap-10 text-white z-10">
        <h1 className="uppercase tracking-widest text-center font-semibold text-5xl max-w-screen-md">
          Find your new home with VHOMES
        </h1>
        <Button asChild className="rounded-0 mx-auto p-8 px-8 text-lg gap-3">
          <Link href="/property-search">
            <SearchIcon /> Search Properties
          </Link>
        </Button>
      </div>
    </main>
  );
}
