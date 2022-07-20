import { useContext, createContext, useState, useEffect } from "react";

const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);
const ThemeProvider = ({ children }) => {
  const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
      const getValueFromLocalStorage = localStorage.getItem(key);
      return getValueFromLocalStorage === "null"
        ? defaultValue
        : getValueFromLocalStorage;
    });
    const setLocalStorage = (newValue) => {
      setValue((currentValue) => {
        const result =
          typeof newValue === "function"
            ? newValue(currentValue)
            : currentValue;
        localStorage.setItem(key, result);
        return result;
      });
    };
    return [value, setLocalStorage];
  };

  const [theme, setTheme] = useLocalStorage("theme", "light");
  useEffect(() => {
    changeThemeHandler();
  }, []);
  const changeThemeHandler = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, changeThemeHandler }}>
      {children}
    </ThemeContext.Provider>
  );
};
export { useTheme, ThemeProvider };
