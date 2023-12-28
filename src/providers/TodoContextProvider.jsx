import { useEffect, useReducer, useState } from "react";
import TodoContext from "../context/TodoContext";
import axios from "axios";
import { toast } from "react-toastify";
const TASK_API_KEY = import.meta.env.VITE_TASK_API_URL;

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
            .get(`${TASK_API_KEY}?isCompleted=false&isTrashed=${false}`)
            .then((res) => {
                dispatch({
                    actionType: "success",
                    payload: res.data.reverse(),
                    todoType: "All Inbox",
                });
            })
            .catch((err) => {
                dispatch({ actionType: "error", payload: err.message, todoType: "All Inbox" });
            });
    };
    //get todays todos
    const getTodaysTodos = () => {
        axios
            .get(`${TASK_API_KEY}?date=${today}&isCompleted=false&isTrashed=${false}`)
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
            .get(`${TASK_API_KEY}?priority=Important&isCompleted=false&isTrashed=${false}`)
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
            .get(`${TASK_API_KEY}?priority=Not Important&isCompleted=false&isTrashed=${false}`)
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
            .get(`${TASK_API_KEY}?priorityLabel=Urgent&isCompleted=false&isTrashed=${false}`)
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
            .get(`${TASK_API_KEY}?priorityLabel=Not Urgent&isCompleted=false&isTrashed=${false}`)
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
            .get(`${TASK_API_KEY}?isCompleted=${true}&isTrashed=${false}`)
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
                .get(`${TASK_API_KEY}?isTrashed=${false}&isCompleted=${false}&q=${e.target.value}`)
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
    //get trashed task
    const getTrashedTodos = () => {
        axios
            .get(`${TASK_API_KEY}?isTrashed=${true}`)
            .then((res) => {
                dispatch({
                    actionType: "success",
                    payload: res.data,
                    todoType: "Trashed Items",
                });
            })
            .catch((err) => {
                dispatch({
                    actionType: "success",
                    payload: err.message,
                    todoType: "Trashed Items",
                });
            });
    };

    //mark as completed to do option
    const markAsCompleted = (todo) => {
        axios
            .patch(`${TASK_API_KEY}/${todo.id}`, { isCompleted: true })
            .then((res) => {
                getAllTodos();
                toast.success("Marked as completed");
            })
            .catch((err) => {
                console.log(err);
            });
    };
    //mark as completed to do option
    const markAsUnCompleted = (todo) => {
        axios
            .patch(`${TASK_API_KEY}/${todo.id}`, { isCompleted: false })
            .then((res) => {
                toast.success("Restored as Pending");
                getCompletedTodos();
            })
            .catch((err) => {
                console.log(err);
            });
    };
    //move to trash bin
    const moveToTrash = (todo) => {
        axios
            .patch(`${TASK_API_KEY}/${todo.id}`, { isTrashed: true })
            .then((res) => {
                toast.success("Trashed successfully");
                getAllTodos();
            })
            .catch((err) => {});
    };

    //restore to do
    const restoreTodo = (todo) => {
        axios
            .patch(`${TASK_API_KEY}/${todo.id}`, { isTrashed: false })
            .then((res) => {
                toast.success("Restored successfully");
                getTrashedTodos();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //delete todo
    const deleteTodo = (todo) => {
        axios
            .delete(`${TASK_API_KEY}/${todo.id}`)
            .then((res) => {
                toast.success("Deleted Permanently");
                getTrashedTodos();
            })
            .catch((err) => {
                console.log(err);
            });
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
                    markAsCompleted,
                    markAsUnCompleted,
                    moveToTrash,
                    getTrashedTodos,
                    restoreTodo,
                    deleteTodo,
                }}>
                {children}
            </TodoContext.Provider>
        </>
    );
};

export default TodoContextProvider;
