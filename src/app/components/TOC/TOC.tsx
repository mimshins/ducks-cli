import { type TOCTree, type TOCTreeNode } from "@/configs";
import { clss } from "@/utils";
import { Flex, Text } from "@dot-helix/ui";
import Link from "next/link";
import * as React from "react";
import classes from "./TOC.module.css";

export type Props = {
  className?: string;
  tocTree: TOCTree;
};

const TOC = (props: Props) => {
  const { className, tocTree } = props;

  const renderTOCNode = (node: TOCTreeNode) => {
    const isLeaf = !("children" in node);

    return (
      <React.Fragment key={node.title + node.reference}>
        <Text
          as={Link}
          href={`#${node.reference}`}
          variant="subheading2"
          color="neutral-secondary"
          weight={400}
          data-for={node.reference}
          className={clss(classes["nav__item"], classes["nav__item--leaf"])}
        >
          {node.title}
        </Text>
        {!isLeaf ? (
          <Flex.Container
            direction="column"
            gap="md"
            key={node.title + node.reference}
            className={clss(classes["nav__item"], classes["nav__item--group"])}
          >
            {node.children!.map(renderTOCNode)}
          </Flex.Container>
        ) : null}
      </React.Fragment>
    );
  };

  return (
    <aside className={clss(className, classes.root)}>
      <Flex.Container
        as="nav"
        direction="column"
        gap="md"
        aria-labelledby="toc"
      >
        <Text
          id="toc"
          as="strong"
          variant="subheading1"
          color="neutral-normal"
          weight={500}
        >
          On This Page
        </Text>
        {tocTree.map(renderTOCNode)}
      </Flex.Container>
    </aside>
  );
};

export default TOC;
