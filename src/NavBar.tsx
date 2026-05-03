import React from "react";
import { Box, Text } from "ink";
import Button from "./Button";
import { useNavigate } from "react-router";

export default function NavBar({ title }: { title: string }) {
  const navigate = useNavigate();

  return (
    <Box
      borderStyle="single"
      height={6}
      flexGrow={0}
      flexShrink={0}
      flexDirection="row"
      alignItems="flex-start"
      paddingRight={1}
    >
      <Box flexGrow={1} flexDirection="column" paddingX={1}>
        <Text>{title}</Text>
        <Box flexDirection="row">
          <Button label="Page 1" onClick={() => navigate("/")} />
          <Button label="Page 2" onClick={() => navigate("/page2")} />
        </Box>
      </Box>
      <Button label="X" onClick={() => process.exit()} />
    </Box>
  );
}
