import {darkTheme, GlobalStyle, lightTheme} from "@/styles/theme";
import {createContext, PropsWithChildren, useState} from "react";
import {ThemeProvider as Theme} from "styled-components";

export const ThemeContext = createContext<{
  theme: string;
  switchTheme: () => void;
} | null>(null);

export const ThemeProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [theme, setTheme] = useState("dark");

  const switchTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <ThemeContext.Provider value={{theme, switchTheme}}>
      <Theme theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyle></GlobalStyle>
        {children}
      </Theme>
    </ThemeContext.Provider>
  );
};
