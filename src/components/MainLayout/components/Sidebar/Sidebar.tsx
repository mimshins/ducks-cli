import { AppSidebarTree, type SidebarTreeNode } from "@/configs";
import { clss, isAbsoluteUrl } from "@/utils";
import { Flex, Text } from "@dot-helix/ui";
import Link from "next/link";
import classes from "./Sidebar.module.css";

export type Props = {
  className?: string;
};

const Sidebar = (props: Props) => {
  const { className } = props;

  const renderNavNode = (node: SidebarTreeNode) => {
    const isLeaf = !("children" in node);

    if (isLeaf) {
      const otherProps: Omit<React.ComponentPropsWithoutRef<"a">, "color"> = {};

      if (isAbsoluteUrl(node.routePath)) {
        otherProps.target = "_blank";
        otherProps.rel = "noreferrer noopenner";
      }

      return (
        <Text
          {...otherProps}
          key={node.title + node.routePath}
          as={Link}
          href={node.routePath}
          variant="subheading2"
          color="neutral-secondary"
          weight={400}
          className={clss(classes["nav__item"], classes["nav__item--leaf"])}
        >
          {node.title}
        </Text>
      );
    }

    return (
      <Flex.Container
        direction="column"
        gap="md"
        key={node.title + node.children.length}
        className={clss(classes["nav__item"], classes["nav__item--group"])}
      >
        <Text
          as="strong"
          variant="subheading1"
          color="neutral-normal"
          weight={500}
        >
          {node.title}
        </Text>
        {node.children.map(renderNavNode)}
      </Flex.Container>
    );
  };

  return (
    <aside className={clss(className, classes.root)}>
      <Flex.Container
        as="nav"
        gap="md"
        direction="column"
        aria-label="Main content navigation on the sidebar"
      >
        {AppSidebarTree.map(renderNavNode)}
      </Flex.Container>
    </aside>
  );
};

export default Sidebar;
