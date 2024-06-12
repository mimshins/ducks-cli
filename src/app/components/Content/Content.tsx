import { clss } from "@/utils";
import type * as React from "react";
import classes from "./Content.module.css";

export type Props = {
  className?: string;
  renderedJSX: React.ReactNode;
};

const Content = (props: Props) => {
  const { className, renderedJSX } = props;

  return (
    <article className={clss(className, classes.root)}>{renderedJSX}</article>
  );
};

export default Content;
