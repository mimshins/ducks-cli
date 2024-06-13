/* eslint-disable no-console */
import type { DucksConfig } from "@shared-types";
import FMT from "picocolors";
import { z } from "zod";
import { CONFIG_FILE_NAME } from "./constants";

export const sidebarSchema: z.ZodType<DucksConfig["sidebar"]> = z.array(
  z.union([
    z.object({
      title: z.string(),
      routePath: z.string(),
    }),
    z.object({
      title: z.string(),
      children: z.lazy(() => sidebarSchema),
    }),
  ]),
);

export const configSchema: z.ZodType<DucksConfig> = z.object({
  name: z.string(),
  description: z.string(),
  sidebar: sidebarSchema,
  socials: z
    .object({
      twitter: z.string().optional(),
      github: z.string(),
    })
    .optional(),
  manifest: z
    .object({
      name: z.string(),
      theme_color: z.string().optional(),
      short_name: z.string(),
      description: z.string().optional(),
      start_url: z.string().optional(),
      display: z.enum(["fullscreen", "standalone", "minimal-ui", "browser"]),
      icons: z.array(
        z.object({
          src: z.string(),
          sizes: z.string(),
          type: z.string().optional(),
          purpose: z.enum(["monochrome", "maskable", "any"]).optional(),
        }),
      ),
    })
    .optional(),
});

export const validate = (config: DucksConfig) => {
  try {
    configSchema.parse(config);
    return true;
  } catch (err) {
    if (!(err instanceof z.ZodError)) throw err;

    console.log(
      `${FMT.bgRed("ERROR")}: Invalid \`${FMT.green(CONFIG_FILE_NAME)}\`.`,
    );
    err.issues.forEach(issue => {
      console.log(
        `${FMT.red("config.".concat(issue.path.join(".")))}: ${issue.message}`,
      );
    });

    return false;
  }
};
