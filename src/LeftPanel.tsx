import React from 'react';
import { Box, Text } from "ink";

export default function LeftPanel() {
  return (
    <Box
      flexGrow={1}
      borderStyle="single"
      flexDirection="column"
      paddingX={1}
    >
      <Text bold>Left Panel</Text>
    </Box>
  );
}