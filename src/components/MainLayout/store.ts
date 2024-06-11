import type { ColorScheme } from "@dot-helix/ui";
import { createStateContainer } from "react-containerized-state";

export const ColorSchemeStore = createStateContainer<ColorScheme>("dark");
