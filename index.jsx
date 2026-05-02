import React from 'react';
import { render, Box, Text } from 'ink';
import { MemoryRouter } from "react-router";

import App from "./src/App";

const ALT_SCREEN_ENTER = '\x1b[?1049h';
const ALT_SCREEN_EXIT = '\x1b[?1049l';
const CURSOR_HIDE = '\x1b[?25l';
const CURSOR_SHOW = '\x1b[?25h';

process.stdout.write(ALT_SCREEN_ENTER);
process.stdout.write(CURSOR_HIDE);

if (process.env.NODE_ENV !== "debug") {
  process.on('exit', () => {
    process.stdout.write(CURSOR_SHOW);
    process.stdout.write(ALT_SCREEN_EXIT);
  });
}
process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));

const { waitUntilExit } = render(
  <MemoryRouter>
    <App />
  </MemoryRouter>,
  { exitOnCtrlC: true }
);

await waitUntilExit();
process.exit(0);
