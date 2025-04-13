"use client";

import { FileCheck2 } from "lucide-react";
import { FaWpforms } from "react-icons/fa";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();

  const data = useMemo(() => {
    const menu = {
      user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
      },
      projects: [
        {
          name: "Registration",
          url: "/registration",
          icon: FileCheck2,
        },
      ],
    };
    if (session?.user.role !== "STUDENT")
      menu.projects.push({
        name: "Registered Students",
        url: "/registered-students",
        // @ts-ignore
        icon: FaWpforms,
      });
    return menu;
  }, [session?.user.role]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser />
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={data.navMain} /> */}
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
