import { URL } from "node:url";

export const getDirname = () => {
  return new URL(".", import.meta.url).pathname;
};
