import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import App from "./App";
import "./index.css";
import { ReactQueryClientProvider } from "./libs/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthContextProvider } from "./context/auth.context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ReactQueryClientProvider>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            cursorType: "pointer",
            components: {
              Modal: {
                styles: () => ({
                  title: { fontSize: "20px", fontWeight: "bold" },
                }),
              },
              Tabs: {
                styles: () => ({
                  tabLabel: {
                    fontWeight: 600,
                    fontSize: "15px",
                  },
                }),
              },
            },
          }}
        >
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </MantineProvider>
        <ReactQueryDevtools />
      </ReactQueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
