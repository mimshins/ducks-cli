"use client";

import { FiraCodeFont, InterFont } from "@/configs";
import { HelixClient } from "@dot-helix/ui";
import * as React from "react";
import classes from "./MainLayout.module.css";
import { Header } from "./components";
import { ColorSchemeStore } from "./store";

export type Props = {
  children?: React.ReactNode;
};

const MainLayout = (props: Props) => {
  const { children } = props;

  const colorScheme = ColorSchemeStore.useValue();

  return (
    <HelixClient
      colorScheme={colorScheme}
      tokensConfiguration={{
        ltrFontFamily: InterFont.style.fontFamily,
        monospaceFontFamily: FiraCodeFont.style.fontFamily,
      }}
    >
      <Header
        className={classes.header}
        colorScheme={colorScheme}
      />
      <main className={classes.main}>{children}</main>
      <footer className={classes.footer}></footer>
    </HelixClient>
  );
};

export default MainLayout;
