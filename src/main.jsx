import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import InputFormContextProvider from "./providers/InputFormContextProvider.jsx";
import TodoContextProvider from "./providers/TodoContextProvider.jsx";
import EditFormContextProvider from "./providers/EditFormContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <InputFormContextProvider>
        <TodoContextProvider>
            <EditFormContextProvider>
                <App />
            </EditFormContextProvider>
        </TodoContextProvider>
    </InputFormContextProvider>
);
