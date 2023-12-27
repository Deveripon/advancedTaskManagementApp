import { useEffect, useReducer, useState } from "react";
import TodoContext from "../context/TodoContext";
import axios from "axios";

//set ruducer function
const initialState = {
    loading: true,
    error: "",
    data: {},
};
const reducer = (state, { actionType, payload }) => {
    let result;
    switch (actionType) {
        case "getAllTodos":
            return {
                loading: false,
                error: "",
                data: payload,
            };
        case "getImportantTodos":
            return {
                loading: false,
                error: "",
                data: payload,
            };

        default:
            return state;
    }
};

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
    const [todos, setTodos] = useState(
        initialTodoFormState
    );

    //managing API call
    const [todoList, dispatch] = useReducer(
        reducer,
        initialState
    );
    //get all todos
    const getTodos = () => {
        axios
            .get(`http://localhost:5050/tasks`)
            .then((res) => {
                dispatch({
                    actionType: "getAllTodos",
                    payload: res.data,
                });
            })
            .catch((err) => {
                dispatch({
                    actionType: "getError",
                    payload: err,
                });
            });
    };
    const getImportantTodo = () => {
        axios
            .get(
                "http://localhost:5050/tasks?priority=Important"
            )
            .then((res) => {
                dispatch({
                    actionType: "getImportantTodos",
                    payload: res.data,
                });
            })
            .catch((err) => {});
    };
    useEffect(() => {
        getTodos();
    }, []);

    return (
        <>
            <TodoContext.Provider
                value={{
                    todos,
                    setTodos,
                    initialTodoFormState,
                    todoList,
                    getImportantTodo,
                    actionDispatcher: dispatch,
                }}>
                {children}
            </TodoContext.Provider>
        </>
    );
};

export default TodoContextProvider;
