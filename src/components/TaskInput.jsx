import Divider from "./Divider";
import { useContext } from "react";
import InputFormContext from "../context/InputFormContext";
import TodoContext from "../context/TodoContext";
import axios from "axios";
import { toast } from "react-toastify";
const TaskInput = () => {
    const { handleFormHide } = useContext(InputFormContext);
    const { todos, setTodos, initialTodoFormState } =
        useContext(TodoContext);

    //<!-- ==========  Managing Task Add Form ========== -->//
    const handleInputValue = (e) => {
        setTodos((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleTodoSubmit = (e) => {
        axios
            .post("http://localhost:5050/tasks", todos)
            .then((res) => {
                handleFormHide();
                setTodos(initialTodoFormState);
                toast.success("Task added successfully");
            })
            .catch((err) => {
                console.log(err);
            });
    };
    //<!-- ==========  Managing Task Add Form ========== -->//

    return (
        <div className="task-input-section w-full ">
            <div className="task-input-wrapper my-3 flex flex-col rounded-md border">
                <div className="input-group flex flex-col rounded-md p-3">
                    <input
                        onChange={handleInputValue}
                        value={todos.title}
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Title"
                        className="text-heading p-2 outline-none"
                    />
                    <textarea
                        onChange={handleInputValue}
                        value={todos.desc}
                        placeholder="Description"
                        name="desc"
                        className="text-paragraph p-2 outline-none"
                        id="desc"
                        cols="30"
                        rows="2"></textarea>
                </div>
                <div className="buttons-group p-3 flex flex-wrap gap-y-2 justify-start items-center gap-x-3">
                    <div className="date-selector flex bg-blue-light justify-start items-center  rounded-md text-[12px] font-paragraph border-dashed border">
                        <label
                            className=" mt-[-6px] ml-1 text-buttonText border-r"
                            htmlFor="date">
                            Due Date
                        </label>
                        <input
                            onChange={handleInputValue}
                            value={todos.date}
                            className=" ml-3 mr-3 text-buttonText bg-blue-light my-1 text-pink cursor-pointer outline-none"
                            type="date"
                            name="date"
                            id="date"
                        />
                    </div>
                    <div className="priority-selector text-buttonText outline-none ">
                        <select
                            // bg should change on state change of select value
                            className={`p-2 ${
                                todos.priority ===
                                "Important"
                                    ? "bg-pink"
                                    : "bg-accent"
                            }
                            text-white outline-none cursor-pointer  rounded-md`}
                            onChange={handleInputValue}
                            name="priority"
                            id="priority">
                            <option
                                selected={
                                    todos.priority ===
                                    "Important"
                                }
                                className="outline-none"
                                value="Important">
                                Important
                            </option>
                            <option
                                selected={
                                    todos.priority ===
                                    "Not Important"
                                }
                                className="outline-none"
                                value="Not Important">
                                Not Important
                            </option>
                        </select>
                    </div>
                    <div className="label-tag flex gap-2">
                        <div className="urgent  rounded-md">
                            <label
                                className="flex gap-2 bg-red-300 has-[:checked]:bg-gray-200 has-[:checked]:border-gray-300 has-[:checked]:border cursor-pointer rounded-md p-2 "
                                htmlFor="urgent">
                                <input
                                    onChange={
                                        handleInputValue
                                    }
                                    checked={
                                        todos.priorityLabel ===
                                        "Urgent"
                                    }
                                    className=""
                                    type="radio"
                                    name="priorityLabel"
                                    id="urgent"
                                    value="Urgent"
                                />
                                Urgent
                            </label>
                        </div>
                        <div className="not-urgent">
                            <label
                                className="flex gap-2 bg-red-300 has-[:checked]:bg-gray-200 has-[:checked]:border-gray-300 has-[:checked]:border cursor-pointer rounded-md p-2"
                                htmlFor="noturgent">
                                <input
                                    onChange={
                                        handleInputValue
                                    }
                                    checked={
                                        todos.priorityLabel ===
                                        "Not Urgent"
                                    }
                                    type="radio"
                                    name="priorityLabel"
                                    id="noturgent"
                                    value="Not Urgent"
                                />
                                Not Urgent
                            </label>
                        </div>
                    </div>
                </div>
                <Divider />
                <div className="submit-button-group gap-2 flex  justify-end items-center m-2">
                    <button
                        onClick={handleFormHide}
                        className="bg-gray-300 text-buttonText flex justify-center items-center font-paragraph py-2 px-4 rounded-sm text-white ">
                        Cancel
                    </button>
                    <button
                        onClick={handleTodoSubmit}
                        className="bg-orange text-buttonText flex justify-center items-center font-paragraph py-2 px-4 rounded-sm text-white ">
                        Add task
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskInput;
