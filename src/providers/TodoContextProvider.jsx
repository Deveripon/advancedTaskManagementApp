import { useEffect, useReducer, useState } from "react";
import TodoContext from "../context/TodoContext";
import axios from "axios";
import { TASK_API_KEY } from "../API";

//set todo list initial value
const initialState = {
    todoType: "All Inbox",
    loading: true,
    error: null,
    data: [],
};
const reducer = (state, { actionType, payload, todoType }) => {
    switch (actionType) {
        case "success":
            return {
                loading: false,
                error: null,
                data: payload,
                todoType,
            };
        case "error":
            return {
                data: [],
                loading: false,
                error: payload,
                todoType,
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
    const [todos, setTodos] = useState(initialTodoFormState);
    // manage todos by reducer hook
    const [todoList, dispatch] = useReducer(reducer, initialState);
    //get all todos
    const getAllTodos = () => {
        axios
            .get(`${TASK_API_KEY}?isCompleted=false`)
            .then((res) => {
                dispatch({ actionType: "success", payload: res.data, todoType: "All Inbox" });
            })
            .catch((err) => {
                dispatch({ actionType: "error", payload: err.message, todoType: "All Inbox" });
            });
    };
    //get todays todos
    const getTodaysTodos = () => {
        axios
            .get(`${TASK_API_KEY}?date=${today}`)
            .then((res) => {
                dispatch({ actionType: "success", payload: res.data, todoType: "Today's Task" });
            })
            .catch((err) => {
                dispatch({ actionType: "error", payload: err.message, todoType: "Today's Task" });
            });
    };
    //get Important Todos
    const getImportantTodos = () => {
        axios
            .get(`${TASK_API_KEY}?priority=Important`)
            .then((res) => {
                dispatch({ actionType: "success", payload: res.data, todoType: "Important Task" });
            })
            .catch((err) => {
                dispatch({ actionType: "error", payload: err.message, todoType: "Important Task" });
            });
    };

    //get not important tasks
    const getNotImportantTodos = () => {
        axios
            .get(`${TASK_API_KEY}?priority=Not Important`)
            .then((res) => {
                dispatch({
                    actionType: "success",
                    payload: res.data,
                    todoType: "Not Important Task",
                });
            })
            .catch((err) => {
                dispatch({
                    actionType: "success",
                    payload: err.message,
                    todoType: "Not Important Task",
                });
            });
    };
    //get Urgent tasks
    const getUrgentTodos = () => {
        axios
            .get(`${TASK_API_KEY}?priorityLabel=Urgent`)
            .then((res) => {
                dispatch({
                    actionType: "success",
                    payload: res.data,
                    todoType: "Urgent Task",
                });
            })
            .catch((err) => {
                dispatch({
                    actionType: "success",
                    payload: err.message,
                    todoType: "Urgent Task",
                });
            });
    };
    //get Not Urgent tasks
    const getNotUrgentTodos = () => {
        axios
            .get(`${TASK_API_KEY}?priorityLabel=Not Urgent`)
            .then((res) => {
                dispatch({
                    actionType: "success",
                    payload: res.data,
                    todoType: "Not Urgent Task",
                });
            })
            .catch((err) => {
                dispatch({
                    actionType: "success",
                    payload: err.message,
                    todoType: "Not Urgent Task",
                });
            });
    };
    //get Completed tasks
    const getCompletedTodos = () => {
        axios
            .get(`${TASK_API_KEY}?isCompleted=${true}`)
            .then((res) => {
                dispatch({
                    actionType: "success",
                    payload: res.data,
                    todoType: "Completed Task",
                });
            })
            .catch((err) => {
                dispatch({
                    actionType: "success",
                    payload: err.message,
                    todoType: "Completed Task",
                });
            });
    };
    //get searched tasks
    const getSearchedTodos = (e) => {
        if (e.target.value.length > 0) {
            axios
                .get(`${TASK_API_KEY}?q=${e.target.value}`)
                .then((res) => {
                    dispatch({
                        actionType: "success",
                        payload: res.data,
                        todoType: "Searched Items",
                    });
                })
                .catch((err) => {
                    dispatch({
                        actionType: "success",
                        payload: err.message,
                        todoType: "Searched Items",
                    });
                });
        } else {
            getAllTodos();
        }
    };

    //stop unusual re render
    useEffect(() => {
        getAllTodos();
    }, []);

    return (
        <>
            <TodoContext.Provider
                value={{
                    todos,
                    setTodos,
                    initialTodoFormState,
                    todoList,
                    getAllTodos,
                    getTodaysTodos,
                    getImportantTodos,
                    getNotImportantTodos,
                    getUrgentTodos,
                    getNotUrgentTodos,
                    getCompletedTodos,
                    getSearchedTodos,
                }}>
                {children}
            </TodoContext.Provider>
        </>
    );
};

export default TodoContextProvider;
