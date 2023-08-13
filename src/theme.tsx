import { PaletteMode, ThemeProvider, createTheme } from "@mui/material";
import React, { ReactNode, createContext, useMemo, useState } from "react";

interface Props {
  children: ReactNode;
}

export const ThemeContext = createContext({
  toggleColorMode: () => {},
});

export default function ThemeWrapper({ children }: Props) {
  const [mode, setMode] = useState<PaletteMode>("light");
  const wrapperUtils = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        // palette: mode === "light" ? palette.light : palette.dark,
        palette:{
            mode: mode,
            background:  {
                default: mode === 'light' ? '#fff' : '#161C24',
                paper: mode === 'light' ? '#fff' : '#212B36',
                // neutral: mode === 'light' ? '#fff' : '#161C24',
            },
        }
      }),
    [mode]
  );

  //   return (
  //     <ThemeContext.Provider value={wrapperUtils}>
  //         <ThemeProvider theme={theme}>{children}</ThemeProvider>
  //     </ThemeContext.Provider>
  //   )

  return (
    <ThemeProvider theme={theme}>
      <ThemeContext.Provider value={wrapperUtils}>
        {children}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}
