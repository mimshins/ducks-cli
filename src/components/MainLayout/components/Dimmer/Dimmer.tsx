import { clss } from "@/utils";
import type * as React from "react";
import classes from "./Dimmer.module.css";

export type Props = {
  className?: string;
  visible: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const Dimmer = (props: Props) => {
  const { className, visible, onClick } = props;

  return (
    <div
      tabIndex={-1}
      aria-hidden="true"
      onClick={onClick}
      className={clss(className, classes.root, {
        [classes["root--visible"]!]: visible,
      })}
    />
  );
};

export default Dimmer;
