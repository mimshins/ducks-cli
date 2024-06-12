import { Flex } from "@dot-helix/ui";
import { Content, TOC } from "./components";
import classes from "./page.module.css";

const Page = () => {
  return (
    <Flex.Container className={classes.root}>
      <Content
        renderedJSX={<></>}
        className={classes.content}
      />
      <TOC
        className={classes.toc}
        tocTree={[]}
      />
    </Flex.Container>
  );
};

export default Page;
