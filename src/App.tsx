import React from "react";
import { Box, useApp, useInput, useStdout, Text, useWindowSize } from "ink";
import { Routes, Route, useNavigate } from "react-router";

import NavBar from "./NavBar";
import LeftPanel from "./LeftPanel";
import { RightPanel, RightPanel2 } from "./RightPanel";

export default function App() {
  const { exit } = useApp();
  const { columns, rows } = useWindowSize();

  const width = columns ?? 80;
  const height = rows ?? 24;

  useInput((input, key) => {
    if (input === "q" || (key.ctrl && input === "c")) {
      exit();
    }
  });

  return (
    <Box width={width} height={height} flexDirection="column">
      <NavBar title="Terminal App" />
      <Box flexDirection="row" flexGrow={1}>
        <LeftPanel width={30} />
        <Routes>
          <Route path="/" element={<RightPanel />} />
          <Route path="/page2" element={<RightPanel2 />} />
        </Routes>
      </Box>
    </Box>
  );
}
