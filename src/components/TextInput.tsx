import React, { useEffect, useRef, useState, useId } from "react";
import { Box, Text, useInput, useFocus } from "ink";
import { useOnMouseClick } from "@zenobius/ink-mouse";

type TextInputProps = {
  label: string;
  value?: string;
  onChange?: (value: string, wasSubmitted: boolean) => void;
} & (typeof Box)["propTypes"];

export default function TextInput({
  label,
  value: initialValue,
  onChange,
  ...props
}: TextInputProps) {
  const ref = useRef(null);
  const id = useId();

  const [value, setValue] = useState<string>(initialValue ?? "");
  const [blinker, setBlinker] = useState("");
  const { isFocused, focus } = useFocus({ id });

  useOnMouseClick(ref, (ev) => ev && focus(id));

  useInput(
    (character, key) => {
      if (key.return) {
        //TODO support multiline at some point
        onChange?.(value, true);
        return;
      }
      let nextValue: string;
      if (key.backspace || key.delete) {
        nextValue = value.slice(0, -1);
      } else if (character.length === 1) {
        //TODO what about chinese/asian characters
        //mouse movement is character input with length >4
        nextValue = value + character;
      } else {
        return;
      }
      setValue(nextValue);
      onChange?.(nextValue, false);
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
      <Box
        position="relative"
        borderStyle="single"
        top={0}
        width={"100%"}
        height={3}
        paddingX={1}
      >
        <Text>
          {value}
          {blinker}
        </Text>
      </Box>
      <Box position="relative" top={-4} left={1}>
        <Text> {label} </Text>
      </Box>
    </Box>
  );
}
