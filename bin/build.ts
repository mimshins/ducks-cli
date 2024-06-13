/* eslint-disable no-console */

import type { DucksConfig, RoutesMap } from "@shared-types";
import { sync as spawnSync } from "cross-spawn";
import { detect as detectPackageManager } from "detect-package-manager";
import glob from "fast-glob";
import * as FS from "node:fs";
import * as Path from "node:path";
import * as Process from "node:process";
import FMT from "picocolors";
import { validate as validateConfig } from "./config.schema";
import {
  CONFIG_FILE_NAME,
  NEXT_APP_DUCKS_CONFIG_FILE_NAME,
  NEXT_APP_ROUTES_MAP_FILE_NAME,
  TARGET_OUTPUT_DIR_NAME,
  VIEWS_DIR_NAME,
} from "./constants";
import { getDirname } from "./utils";

const build = async (cwd = Process.cwd()) => {
  const dirname = getDirname();
  const root = Path.resolve(dirname, "..");
  const directory = Path.resolve(cwd);

  const configFile = Path.resolve(directory, CONFIG_FILE_NAME);

  if (!FS.existsSync(configFile)) {
    console.log(
      `${FMT.bgRed("ERROR")}: No \`${FMT.green(CONFIG_FILE_NAME)}\` file found in \`${FMT.cyan(directory)}\`.`,
    );

    Process.exit(1);
  }

  const viewsDir = Path.resolve(directory, VIEWS_DIR_NAME);

  if (!FS.existsSync(viewsDir)) {
    console.log(
      `${FMT.bgRed("ERROR")}: There is no \`${FMT.green(VIEWS_DIR_NAME)}\` directory found in \`${FMT.cyan(directory)}\`.`,
    );

    Process.exit(1);
  }

  const markdownGlobPath = Path.resolve(viewsDir, "**/*.md");

  const mds = await glob.async(markdownGlobPath, { absolute: true });

  if (mds.length === 0) {
    console.log(
      `${FMT.bgRed("ERROR")}: No markdown content found in \`${FMT.cyan(viewsDir)}\` directory.`,
    );
  }

  const routesMap = mds.reduce((result, md) => {
    const relativePath = Path.relative(viewsDir, md);
    const pathSegments = relativePath.split("/");
    const lastSegment = pathSegments[pathSegments.length - 1]!;

    if (lastSegment === "index.md") {
      pathSegments.pop();
    } else {
      pathSegments[pathSegments.length - 1] = lastSegment?.replace(".md", "");
    }

    result[pathSegments.join("/") || "/"] = md;

    return result;
  }, {} as RoutesMap);

  const configRaw = await FS.promises.readFile(configFile, {
    encoding: "utf-8",
  });

  const configParsed = JSON.parse(configRaw) as DucksConfig;

  if (!validateConfig(configParsed)) Process.exit(1);

  const appDucksConfigDir = Path.resolve(dirname, "..", "src/configs/ducks");

  await FS.promises.writeFile(
    Path.join(appDucksConfigDir, NEXT_APP_DUCKS_CONFIG_FILE_NAME),
    configRaw,
    { encoding: "utf-8" },
  );

  await FS.promises.writeFile(
    Path.join(appDucksConfigDir, NEXT_APP_ROUTES_MAP_FILE_NAME),
    JSON.stringify({ routesMap }, null, 2),
    { encoding: "utf-8" },
  );

  const packageManager = await detectPackageManager({ cwd: root });

  spawnSync(packageManager, ["ducks:build"], {
    stdio: "inherit",
    cwd: root,
  });

  await FS.promises.cp(
    Path.join(root, "out"),
    Path.join(directory, TARGET_OUTPUT_DIR_NAME),
    {
      recursive: true,
      force: true,
    },
  );
};

export default build;
