import { DucksAppConfig } from "@/configs";
import { socialIconPathsMap } from "@/constants";
import { NavMenuOpenStore } from "@/store";
import type { Social } from "@/types";
import { clss, useMediaQuery } from "@/utils";
import {
  Flex,
  FlexLayout,
  Icon,
  IconButton,
  Separator,
  Text,
  ToggleGroup,
  type ColorScheme,
} from "@dot-helix/ui";
import { BreakpointUtils } from "@dot-helix/ui/utils";
import { mdiMenuClose } from "@mdi/js";
import LogoDarkMode from "@public/logo.darkmode.svg";
import LogoLightMode from "@public/logo.lightmode.svg";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
import { ColorSchemeStore } from "../../store";
import classes from "./Header.module.css";

export type Props = {
  className?: string;
  colorScheme: ColorScheme;
};

const Header = (props: Props) => {
  const { className, colorScheme, ...otherProps } = props;

  const { name, socials } = DucksAppConfig;

  const setColorScheme = ColorSchemeStore.useUpdateValue();
  const setNavMenuOpen = NavMenuOpenStore.useUpdateValue();

  const [belowXS] = useMediaQuery(
    BreakpointUtils.down("xs").replace("@media ", ""),
  );

  const logo = {
    dark: LogoDarkMode as StaticImport,
    light: LogoLightMode as StaticImport,
  }[colorScheme];

  const handleColorSchemeToggle = (value: string) => {
    if (value.length === 0) return;

    setColorScheme(value as ColorScheme);
  };

  const renderMenuBtn = () => {
    if (!belowXS) return null;

    return (
      <IconButton
        variant="inlined"
        label={{ screenReaderLabel: "Open content navigation" }}
        icon={<Icon pathData={mdiMenuClose} />}
        onClick={() => setNavMenuOpen(true)}
      />
    );
  };

  const renderSocial = (social: Social) => {
    const socialIcon = (
      <Icon
        className={classes["social-icon"]}
        pathData={socialIconPathsMap[social.type]}
      />
    );

    return (
      <IconButton
        key={social.title + social.type}
        as="a"
        variant="inlined"
        href={social.url}
        target="_blank"
        rel="noopener noreferrer"
        icon={socialIcon}
        label={{ screenReaderLabel: social.title }}
      />
    );
  };

  const renderSocials = () => {
    if (socials.length === 0) return null;

    return (
      <>
        <Flex.Container
          className={classes.socials}
          gap="md"
        >
          {socials.map(renderSocial)}
        </Flex.Container>
        <Flex.Item alignSelf="stretch">
          <Separator
            orientation="vertical"
            size="full"
          />
        </Flex.Item>
      </>
    );
  };

  return (
    <header
      {...otherProps}
      className={clss(className, classes.root)}
    >
      <FlexLayout.Container className={classes.container}>
        <Flex.Container
          alignItems="center"
          gap="md"
          direction={{ xxs: "column", xs: "row" }}
        >
          <nav
            className={classes.nav}
            aria-label="Header navigation"
          >
            <Flex.Container
              gap="md"
              alignItems="center"
            >
              <Link href="/">
                <Image
                  src={logo}
                  width={32}
                  height={32}
                  alt="Logo"
                />
              </Link>
              <Text variant="h6">{name}</Text>
            </Flex.Container>
          </nav>
          <Flex.Item
            autoMarginInlineStart={{ xxs: false, xs: true }}
            alignSelf={{ xxs: "stretch", xs: "auto" }}
          >
            <Flex.Container alignItems="center">
              {renderMenuBtn()}
              <Flex.Item autoMarginInlineStart={{ xxs: true, xs: false }}>
                <Flex.Container alignItems="center">
                  {renderSocials()}
                  <ToggleGroup
                    size="small"
                    selectMode="single"
                    label={{ screenReaderLabel: "Toggle dark mode" }}
                    items={[
                      { title: "Dark", value: "dark" },
                      { title: "Light", value: "light" },
                    ]}
                    value={colorScheme}
                    onValueChange={handleColorSchemeToggle}
                  />
                </Flex.Container>
              </Flex.Item>
            </Flex.Container>
          </Flex.Item>
        </Flex.Container>
      </FlexLayout.Container>
    </header>
  );
};

export default Header;
