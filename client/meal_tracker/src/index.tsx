import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";

import Login from "./components/Login";
import NotFound from "./components/NotFound";
import SignUp from "./components/SignUp";
import { Provider } from "react-redux";
import store, { persistedStore } from "./store/store";

import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistedStore}>
            <Routes>
              <Route path="/" element={<App />} />

              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>
);

reportWebVitals();
