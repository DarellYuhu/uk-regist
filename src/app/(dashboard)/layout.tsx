"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Button, buttonVariants } from "@/components/ui/button";
import { IoMdArrowBack } from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/navigation";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const route = useRouter();
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
                <Button onClick={() => route.back()} variant={"outline"}>
                  <IoMdArrowBack /> Back
                </Button>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
}
