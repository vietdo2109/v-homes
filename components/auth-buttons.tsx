"use client";

import { useAuth } from "@/context/auth";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AuthButtons = () => {
  const auth = useAuth();
  const router = useRouter();
  return (
    <div className="flex items-center">
      {!!auth?.currentUser && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              {!!auth?.currentUser.photoURL && (
                <Image
                  src={auth.currentUser.photoURL}
                  alt={`${auth.currentUser.displayName} avatar`}
                  width={70}
                  height={70}
                ></Image>
              )}
              <AvatarFallback>
                {(auth.currentUser.displayName || auth.currentUser.email)?.[0]}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <div>{auth.currentUser.displayName}</div>
              <div className="font-normal text-xs">
                {auth.currentUser.email}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator></DropdownMenuSeparator>
            <DropdownMenuItem asChild>
              <Link href="/account">My Account</Link>
            </DropdownMenuItem>
            {!!auth.customClaims?.admin ? (
              <>
                <DropdownMenuSeparator></DropdownMenuSeparator>
                <DropdownMenuItem asChild>
                  <Link href="/admin-dashboard">Admin Dashboard</Link>
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuSeparator></DropdownMenuSeparator>
                <DropdownMenuItem asChild>
                  <Link href="/account/favourites">My Favourite</Link>
                </DropdownMenuItem>
              </>
            )}

            <DropdownMenuSeparator></DropdownMenuSeparator>
            <DropdownMenuItem
              onClick={async () => {
                await auth.logout();
                router.refresh();
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {!auth?.currentUser && (
        <div className="flex gap-2 items-center">
          <Link
            href="/login"
            className="uppercase tracking-wide hover:underline"
          >
            Login
          </Link>
          <div className="h-6 w-[1px] bg-white/50"></div>
          <Link
            href="/register"
            className="uppercase tracking-wide hover:underline"
          >
            Signup
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthButtons;
