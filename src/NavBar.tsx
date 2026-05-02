import React from "react";
import { Box, Text } from "ink";
import Button from "./Button";
import { useNavigate } from "react-router";

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <Box borderStyle="single" height={6} flexGrow={0} flexDirection="row">
      <Box flexGrow={1} flexDirection="column" paddingX={1}>
        <Text>Terminal App</Text>
        <Box flexDirection="row">
          <Button label="Page 1" onClick={() => navigate("/")} />
          <Button label="Page 2" onClick={() => navigate("/page2")} />
        </Box>
      </Box>
      <Button
        label="X"
        height={3}
        marginRight={1}
        onClick={() => process.exit()}
      />
    </Box>
  );
}
