import React from "react";
import { Box, Text, useApp } from "ink";
import { useNavigate } from "react-router";
import Button from "./Button";

interface NavBarProps {
  title: string;
  navButtons: Array<{
    label: string;
    path: string;
  }>;
}

export default function NavBar({ title, navButtons }: NavBarProps) {
  const navigate = useNavigate();
  const app = useApp();

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
          {navButtons.map((meta) => (
            <Button
              label={meta.label}
              onClick={() => navigate(meta.path)}
            ></Button>
          ))}
        </Box>
      </Box>
      <Button label="X" onClick={() => app.exit()} />
    </Box>
  );
}
