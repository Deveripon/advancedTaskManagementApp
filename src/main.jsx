import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import InputFormContextProvider from "./providers/InputFormContextProvider.jsx";
import TodoContextProvider from "./providers/TodoContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <InputFormContextProvider>
        <TodoContextProvider>
            <App />
        </TodoContextProvider>
    </InputFormContextProvider>
);
