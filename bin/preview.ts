/* eslint-disable no-console */

import { sync as spawnSync } from "cross-spawn";
import { detect as detectPackageManager } from "detect-package-manager";
import * as FS from "node:fs";
import * as Path from "node:path";
import * as Process from "node:process";
import FMT from "picocolors";
import { TARGET_OUTPUT_DIR_NAME } from "./constants";
import { getDirname } from "./utils";

const preview = async (cwd = Process.cwd()) => {
  const dirname = getDirname();
  const root = Path.resolve(dirname, "..");
  const directory = Path.resolve(cwd);

  const packageManager = await detectPackageManager({ cwd: root });

  const outFile = Path.resolve(directory, TARGET_OUTPUT_DIR_NAME);

  if (!FS.existsSync(outFile)) {
    console.log(
      [
        `${FMT.bgRed("ERROR")}: No \`${FMT.cyan(TARGET_OUTPUT_DIR_NAME)}\` directory found in \`${FMT.cyan(directory)}\`.`,
        `You have to build the application first. To build the project, run: \`${FMT.bgMagenta(`${packageManager} build`)}\``,
      ].join(" "),
    );

    Process.exit(1);
  }

  let args: string[] = [];
  let cmd: string;

  if (packageManager === "yarn") {
    cmd = "yarn";
    args = ["dlx", "serve", outFile];
  } else if (packageManager === "pnpm") {
    cmd = "pnpm";
    args = ["dlx", "serve", outFile];
  } else if (packageManager === "npm") {
    cmd = "npx";
    args = ["serve", outFile];
  } else {
    cmd = "bunx";
    args = ["serve", outFile];
  }

  spawnSync(cmd, args, {
    stdio: "inherit",
    cwd: root,
  });
};

export default preview;
