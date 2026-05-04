import React, { useMemo, useRef, useState } from "react";
import { Box, Text } from "ink";
import { useOnMouseHover, useOnMouseClick } from "@zenobius/ink-mouse";

type ButtonProps = {
  label: string;
  onClick?: () => void;
} & (typeof Box)["propTypes"];

export default function Button({ label, onClick, ...props }: ButtonProps) {
  const ref = useRef(null);

  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  useOnMouseClick(ref, (event) => {
    setClicking(event);
    if (event && typeof onClick === "function") {
      onClick();
    }
  });
  useOnMouseHover(ref, setHovering);

  const border = useMemo(() => {
    if (clicking) {
      return "double";
    }

    if (hovering) {
      return "singleDouble";
    }

    return "single";
  }, [clicking, hovering]);

  return (
    <Box
      gap={props.gap ?? 1}
      paddingX={props.paddingX ?? 1}
      ref={ref}
      borderStyle={props.border ?? border}
      {...props}
    >
      <Text>{label}</Text>
    </Box>
  );
}
