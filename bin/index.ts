#!/usr/bin/env node
/* eslint-disable no-console */

import { Command } from "@commander-js/extra-typings";
import { sync as syncSpawn } from "cross-spawn";
import * as Path from "node:path";
import * as Process from "node:process";
import FMT from "picocolors";
import packageJson from "../package.json";
import { getDirname } from "./utils";

process.on("SIGINT", () => Process.exit(0));
process.on("SIGTERM", () => Process.exit(0));

const { name, version } = packageJson;

const program = new Command();

program
  .name(name)
  .version(version)
  .usage(`${FMT.green("<command>")} ${FMT.green("[argument]")}`);

program
  .command("build")
  .description("Creates an optimized static build of your application.")
  .argument(
    "[directory]",
    [
      "A directory on which to build the application.",
      "If no directory is provided, the current directory will be used.",
    ].join(" "),
  )
  .usage(`${FMT.green("[argument]")}`)
  .action(async directory => {
    const build = (await import("./build")).default;

    await build(directory);
  })
  .hook("postAction", () => {
    const dirname = getDirname();
    const root = Path.resolve(dirname, "..");

    syncSpawn("rm", ["-rf", Path.join(root, "out")], {
      stdio: "inherit",
      cwd: root,
    });
  });

program
  .command("preview")
  .description(
    [
      "Starts your built application in production mode.",
      "The application should be compiled with `ducks-cli build` first.",
    ].join(" "),
  )
  .argument(
    "[directory]",
    [
      "A directory on which to build the application.",
      "If no directory is provided, the current directory will be used.",
    ].join(" "),
  )
  .usage(`${FMT.green("[argument]")}`)
  .action(async directory => {
    const preview = (await import("./preview")).default;

    await preview(directory);
  });

void (async () => {
  await program.parseAsync();
})();
