import { DucksAppConfig } from "@/configs";
import { clss } from "@/utils";
import { Flex, FlexLayout, Text, type ColorScheme } from "@dot-helix/ui";
import LogoDarkMode from "@public/logo.darkmode.svg";
import LogoLightMode from "@public/logo.lightmode.svg";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
import classes from "./Footer.module.css";

export type Props = {
  className?: string;
  colorScheme: ColorScheme;
};

const Footer = (props: Props) => {
  const { className, colorScheme } = props;

  const { name, description } = DucksAppConfig;

  const logo = {
    dark: LogoDarkMode as StaticImport,
    light: LogoLightMode as StaticImport,
  }[colorScheme];

  return (
    <footer className={clss(className, classes.root)}>
      <FlexLayout.Container>
        <Flex.Container
          gap="md"
          direction="column"
        >
          <Flex.Item alignSelf="start">
            <Link href="/">
              <Image
                src={logo}
                width={24}
                height={24}
                alt="Logo"
              />
            </Link>
          </Flex.Item>
          <Flex.Container
            gap="xlg"
            direction={{ xxs: "column", sm: "row" }}
          >
            <Flex.Item grow={1}>
              <Text
                variant="subheading2"
                color="neutral-secondary"
                className="hui-pr-1"
              >
                {name}
              </Text>
              <Text
                variant="caption"
                color="neutral-tertiary"
              >
                {description}
              </Text>
            </Flex.Item>
            <Flex.Item
              className={classes["built-with"]}
              alignSelf="center"
              shrink={0}
            >
              <Text
                variant="subheading2"
                color="neutral-secondary"
              >
                Built with{" "}
                <a
                  href="https://github.com/mimshins/ducks-cli"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Ducks-CLI
                </a>
              </Text>
            </Flex.Item>
          </Flex.Container>
        </Flex.Container>
      </FlexLayout.Container>
    </footer>
  );
};

export default Footer;
