import React from "react";
import { Box, useApp, useInput, useWindowSize } from "ink";
import { Routes, Route } from "react-router";
import NavBar from "./components/NavBar";
import { LeftPanel, RightPanel, RightPanel2 } from "./mockElements";

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
  const navButtons = [
    {
      label: "Page 1",
      path: "/",
    },
    {
      label: "Page 2",
      path: "/page2",
    },
  ];

  return (
    <Box width={width} height={height} flexDirection="column">
      <NavBar title="Terminal App" navButtons={navButtons} />
      <Box flexDirection="row" flexGrow={1}>
        <LeftPanel />
        <Routes>
          <Route path="/" element={<RightPanel />} />
          <Route path="/page2" element={<RightPanel2 />} />
        </Routes>
      </Box>
    </Box>
  );
}
