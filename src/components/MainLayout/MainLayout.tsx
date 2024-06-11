"use client";

import { FiraCodeFont, InterFont } from "@/configs";
import { Flex, HelixClient } from "@dot-helix/ui";
import * as React from "react";
import classes from "./MainLayout.module.css";
import { Footer, Header } from "./components";
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
      <Flex.Container
        className={classes.root}
        direction="column"
      >
        <Header
          className={classes.header}
          colorScheme={colorScheme}
        />
        <main className={classes.main}>{children}</main>
        <Footer
          className={classes.footer}
          colorScheme={colorScheme}
        />
      </Flex.Container>
    </HelixClient>
  );
};

export default MainLayout;
