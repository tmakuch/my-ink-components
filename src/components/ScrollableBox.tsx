import React, { useRef, useEffect } from "react";
import { Box, useStderr } from "ink";
import type { DOMElement } from "ink";
import { ScrollView, ScrollViewRef } from "ink-scroll-view";
import { useMouse, useOnMouseHover } from "@zenobius/ink-mouse";

type NavBarProps = {
  children: Array<React.ReactNode>;
} & (typeof Box)["propTypes"];

export default function ScrollableBox({ children, ...props }: NavBarProps) {
  const ref = useRef<ScrollViewRef>(null);
  const containerRef = useRef<DOMElement>(null);
  const mouse = useMouse();
  const { stdout } = useStderr();
  const isHoveringRef = useRef(false);

  function handleScroll(
    position: ReturnType<typeof useMouse>["position"],
    action: ReturnType<typeof useMouse>["scroll"],
  ) {
    if (!isHoveringRef.current) {
      return;
    }
    switch (action) {
      case "scrolldown":
        ref.current?.scrollBy(1);
        break;
      case "scrollup":
        ref.current?.scrollBy(-1);
        break;
    }
  }

  useOnMouseHover(containerRef, (isHovering: boolean) => {
    isHoveringRef.current = isHovering;
  });

  useEffect(() => {
    const handleResize = () => ref.current?.remeasure();
    stdout?.on("resize", handleResize);
    mouse.events.on("scroll", handleScroll);
    return () => {
      stdout?.off("resize", handleResize);
      mouse.events.off("scroll", handleScroll);
    };
  }, [stdout]);

  return (
    <Box ref={containerRef} flexDirection="row" {...props}>
      <ScrollView
        ref={ref}
        flexGrow={1}
        borderStyle="single"
        flexDirection="column"
        paddingX={1}
      >
        {children}
      </ScrollView>
    </Box>
  );
}
