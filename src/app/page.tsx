"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "./ClientProvider";

export default function RootPage() {
  const { state } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (state?.loggedIn) {
      router.replace("/home");
    } else {
      router.replace("/auth");
    }
  }, [state, router]);

  return <div className="w-full h-full flex items-center justify-center">Loading...</div>;
}
