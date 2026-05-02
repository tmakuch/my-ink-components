import React from 'react';
import { Box, Text } from "ink";

export function RightPanel() {
  return (
    <Box
      flexGrow={3}
      borderStyle="single"
      flexDirection="column"
      paddingX={1}
    >
      <Text bold>Right Panel Home</Text>
    </Box>
  );
}

export function RightPanel2() {
  return (
    <Box
      flexGrow={3}
      borderStyle="single"
      flexDirection="column"
      paddingX={1}
    >
      <Text bold>Right Panel About</Text>
    </Box>
  );
}