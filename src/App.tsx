import React from 'react';
import { Box, useApp, useInput, useStdout } from "ink";
import { Routes, Route, useNavigate } from 'react-router';

import NavBar from "./NavBar";
import LeftPanel from "./LeftPanel";
import { RightPanel, RightPanel2 } from "./RightPanel";

export default function App() {
    const { exit } = useApp();
    const { stdout } = useStdout();
    const navigate = useNavigate();

    const width = stdout.columns ?? 80;
    const height = stdout.rows ?? 24;

    useInput((input, key) => {
        if (input === 'q' || (key.ctrl && input === 'c')) {
            exit();
        }
        if (input === 'h') {
            navigate('/');
        }
        if (input === 'a') {
            navigate('/about');
        }
    });

    return <Box width={width} height={height} flexDirection="column">
        <NavBar/>
        <Box flexDirection="row" flexGrow="1">
            <LeftPanel/>
            <Routes>
                <Route path="/" element={<RightPanel/>}/>
                <Route path="/about" element={<RightPanel2/>}/>
            </Routes>
        </Box>
    </Box>;
}