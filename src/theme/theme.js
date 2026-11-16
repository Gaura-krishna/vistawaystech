'use client';
import { createTheme } from '@mui/material/styles';
import { breakpoints, colors } from './tokens';

const theme = createTheme({
  breakpoints: { values: { xs: breakpoints.xs, sm: breakpoints.sm, md: breakpoints.md, lg: breakpoints.lg, xl: breakpoints.xl } },
  cssVariables: false,
  palette: {
    primary: { main: colors.navy900 },
    secondary: { main: colors.orange500, contrastText: colors.navy900 },
    background: { default: colors.bg, paper: colors.surface },
    text: { primary: colors.text, secondary: colors.textMuted },
    divider: colors.border,
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: 'var(--font-inter), system-ui, sans-serif',
    h1: { fontFamily: 'var(--font-manrope), system-ui, sans-serif', fontWeight: 800 },
    h2: { fontFamily: 'var(--font-manrope), system-ui, sans-serif', fontWeight: 800 },
    h3: { fontFamily: 'var(--font-manrope), system-ui, sans-serif', fontWeight: 700 },
    button: { fontFamily: 'var(--font-manrope), system-ui, sans-serif', fontWeight: 700, textTransform: 'none' },
  },
  components: {
    MuiTextField: { defaultProps: { variant: 'outlined', fullWidth: true } },
  },
});
export default theme;
