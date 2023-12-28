import { useEffect, useReducer, useState } from "react";
import TodoContext from "../context/TodoContext";
import axios from "axios";

const TodoContextProvider = ({ children }) => {
    //manage todos form data
    const date = new Date();
    const today = date.toISOString().split("T")[0];
    const initialTodoFormState = {
        title: "",
        desc: "",
        date: today,
        priority: "Important",
        priorityLabel: "Urgent",
        isCompleted: false,
        isTrashed: false,
    };
    const [todos, setTodos] = useState(initialTodoFormState);

    return (
        <>
            <TodoContext.Provider
                value={{
                    todos,
                    setTodos,
                }}>
                {children}
            </TodoContext.Provider>
        </>
    );
};

export default TodoContextProvider;
