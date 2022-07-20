import "./App.css";
import { Header } from "./Components/Header/Header";
import { useTheme } from "./Context/ThemeContext";
import { Routers } from "./Routers";
function App() {
  const { theme } = useTheme();
  return (
    <div className='app' id={theme}>
      <Header />
      <div className='app-container'>
        <Routers />
      </div>
    </div>
  );
}

export default App;
