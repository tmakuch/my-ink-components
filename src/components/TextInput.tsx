import React, { useEffect, useRef, useState, useId } from "react";
import { Box, Text, useInput, useFocus } from "ink";
import { useOnMouseClick } from "@zenobius/ink-mouse";

type TextInputProps = {
  label: string;
} & (typeof Box)["propTypes"];

export default function TextInput({ label, ...props }: TextInputProps) {
  const ref = useRef(null);
  const id = useId();

  const [value, setValue] = useState<string>("");
  const [blinker, setBlinker] = useState("");
  const { isFocused, focus } = useFocus({ id });

  useOnMouseClick(ref, (ev) => ev && focus(id));

  useInput(
    (character, key) => {
      if (key.return) {
        if (value) {
          setValue("");
        }
      } else if (key.backspace || key.delete) {
        setValue((current) => current.slice(0, -1));
      } else if (character.length === 1) {
        //mouse movement is character input with length >4
        setValue((current) => current + character);
      }
    },
    { isActive: isFocused },
  );

  useEffect(() => {
    let pid;
    if (isFocused) {
      setBlinker("_");
      pid = setInterval(() => {
        setBlinker((prev) => (prev.length > 0 ? "" : "_"));
      }, 500);
    }

    return () => {
      if (pid !== undefined) {
        clearInterval(pid);
        setBlinker("");
      }
    };
  }, [isFocused]);

  return (
    <Box
      gap={props.gap ?? 1}
      ref={ref}
      flexDirection="column"
      height={3}
      width={props.width ?? "100%"}
      {...props}
    >
      <Box position="relative" borderStyle="single" top={0} width={"100%"}>
        <Text>
          {" "}
          {value}
          {blinker}
        </Text>
      </Box>
      <Box position="relative" top={-4} left={1}>
        <Text>
          {" "}
          {label} ({id})
        </Text>
      </Box>
    </Box>
  );
}
