import React, { useEffect, useMemo, useRef, useState } from "react";
import { Box, Text, useFocus, useInput } from "ink";
import { useOnMouseHover, useOnMouseClick } from "@zenobius/ink-mouse";

type ButtonProps = {
  label: string;
  onClick?: () => void;
} & (typeof Box)["propTypes"];

export default function Button({ label, onClick, ...props }: ButtonProps) {
  const ref = useRef(null);
  const { isFocused } = useFocus();

  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  useOnMouseClick(ref, (event) => {
    setClicking(event);
    if (event && typeof onClick === "function") {
      onClick();
    }
  });
  useOnMouseHover(ref, setHovering);
  useEffect(() => {
    setHovering(isFocused);
  }, [isFocused]);
  useInput(
    (character, key) => {
      if ((key.return || character === " ") && typeof onClick === "function") {
        onClick();
      }
    },
    { isActive: isFocused },
  );

  const border = useMemo(() => {
    if (clicking) {
      return "double";
    }

    if (hovering || isFocused) {
      return "singleDouble";
    }

    return "single";
  }, [clicking, hovering, isFocused]);

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
