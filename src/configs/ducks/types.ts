import type { Social } from "@/types";

export type AppConfig = {
  name: string;
  description: string;
  socials: Social[];
};

export type RoutesMap = Record<string, string>;

export type SidebarTreeNode =
  | {
      title: string;
      children: SidebarTreeNode[];
    }
  | {
      title: string;
      routePath: string;
    };

export type SidebarTree = SidebarTreeNode[];
