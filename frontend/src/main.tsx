import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import '@utils/amplify.ts';

import { AuthProvider } from "./context/AuthContext.tsx";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "./context/themeContext.tsx";

import "@ukic/fonts/dist/fonts.css";
import "@ukic/react/dist/core/core.css";
import "@ukic/react/dist/core/normalize.css";
import "@styles/reset.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
);
