import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Main from './Main';

export default function App() {
    const theme = createMuiTheme({
        palette: {
            type: 'dark',
            primary: {
                main: '#1976d2',
            },
            secondary: {
                main: '#ff6f00',
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Main />
        </ThemeProvider>
    );
}
