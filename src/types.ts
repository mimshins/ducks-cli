import type { SocialType } from "./constants";

export type Social = {
  title: string;
  url: string;
  type: SocialType;
};

export type TOCTreeNode = {
  title: string;
  reference: string;
  children?: TOCTreeNode[];
};

export type TOCTree = TOCTreeNode[];
