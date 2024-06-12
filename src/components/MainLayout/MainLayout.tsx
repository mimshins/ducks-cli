"use client";

import { FiraCodeFont, InterFont } from "@/configs";
import { NavMenuOpenStore } from "@/store";
import { clss, useScrollGuard } from "@/utils";
import { Flex, HelixClient, Layout } from "@dot-helix/ui";
import * as React from "react";
import classes from "./MainLayout.module.css";
import { Dimmer, Footer, Header } from "./components";
import Sidebar from "./components/Sidebar";
import { ColorSchemeStore } from "./store";

export type Props = {
  children?: React.ReactNode;
};

const MainLayout = (props: Props) => {
  const { children } = props;

  const colorScheme = ColorSchemeStore.useValue();

  const navMenuOpen = NavMenuOpenStore.useValue();
  const setNavMenuOpen = NavMenuOpenStore.useUpdateValue();

  const { enablePageScroll, disablePageScroll } = useScrollGuard();

  React.useEffect(() => {
    const onOpenChange = (open: boolean) => {
      if (open) disablePageScroll();
      else enablePageScroll();
    };

    return NavMenuOpenStore.subscribe(onOpenChange);
  }, [enablePageScroll, disablePageScroll]);

  const handleDimmerClick = () => {
    setNavMenuOpen(false);
  };

  return (
    <HelixClient
      colorScheme={colorScheme}
      tokensConfiguration={{
        ltrFontFamily: InterFont.style.fontFamily,
        monospaceFontFamily: FiraCodeFont.style.fontFamily,
      }}
    >
      <Dimmer
        visible={navMenuOpen}
        onClick={handleDimmerClick}
      />
      <Flex.Container
        className={classes.root}
        direction="column"
      >
        <Header
          className={classes.header}
          colorScheme={colorScheme}
        />
        <main className={classes.main}>
          <Layout.Container>
            <Flex.Container gap="xlg">
              <Sidebar
                className={clss(classes.sidebar, {
                  [classes["sidebar--open"]!]: navMenuOpen,
                })}
              />
              <section className={classes.content}>{children}</section>
            </Flex.Container>
          </Layout.Container>
        </main>
        <Footer
          colorScheme={colorScheme}
          className={classes.footer}
        />
      </Flex.Container>
    </HelixClient>
  );
};

export default MainLayout;
