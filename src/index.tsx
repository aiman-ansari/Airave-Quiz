import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QuizProvider } from "./Context/QuizContext";
import { AuthProvider } from "./Context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QuizProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QuizProvider>
    </BrowserRouter>
  </React.StrictMode>
);