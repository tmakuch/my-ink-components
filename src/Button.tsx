import React, { useMemo, useRef, useState } from "react";
import { Box, DOMElement, Text, render } from "ink";
import { useOnMouseHover, useOnMouseClick } from "@zenobius/ink-mouse";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  width?: number;
  height?: number;
  marginRight?: number;
}

export default function Button({
  label,
  onClick,
  height,
  width,
  marginRight,
}: ButtonProps) {
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
      gap={1}
      paddingX={1}
      ref={ref}
      borderStyle={border}
      height={height}
      width={width}
      marginRight={marginRight}
    >
      <Text>{label}</Text>
    </Box>
  );
}
