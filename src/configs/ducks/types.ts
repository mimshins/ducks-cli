import type { Social } from "@/types";
import type { SidebarTree } from "@shared-types";

export type AppConfig = {
  name: string;
  description: string;
  socials: Social[];
  sidebar: SidebarTree;
};
