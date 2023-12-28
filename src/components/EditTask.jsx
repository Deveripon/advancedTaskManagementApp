import { useContext } from "react";
import Divider from "./Divider";
import EditFormContext from "../context/EditFormContext";
import axios from "axios";
import { toast } from "react-toastify";
import TodoContext from "../context/TodoContext";
const TASK_API_KEY = import.meta.env.VITE_TASK_API_URL;

const EditTask = () => {
    const { edit, setEdit, selectedTask, setSelectedTask } = useContext(EditFormContext);
    const { getAllTodos } = useContext(TodoContext);
    //<!-- ==========  Managing Task Add Form ========== -->//
    const handleInputValue = (e) => {
        setSelectedTask((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const updateTodoData = (todo) => {
        axios
            .patch(`${TASK_API_KEY}/${todo.id}`, selectedTask)
            .then((res) => {
                toast.success("Task Updated");
                setEdit(false);
                getAllTodos();
            })
            .catch((err) => {
                console.log(err);
            });
    };
    //<!-- ==========  Managing Task Add Form ========== -->//
    return (
        <div className="task-input-section w-full ">
            <h3>/Edit Task</h3>
            <div className="task-input-wrapper my-3 flex flex-col rounded-md border">
                <div className="input-group flex flex-col rounded-md p-3">
                    <input
                        onChange={handleInputValue}
                        value={selectedTask.title}
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Title"
                        className="text-heading p-2 outline-none"
                    />
                    <textarea
                        onChange={handleInputValue}
                        value={selectedTask.desc}
                        placeholder="Description"
                        name="desc"
                        className="text-paragraph p-2 outline-none"
                        id="desc"
                        cols="30"
                        rows="2"></textarea>
                </div>
                <div className="buttons-group p-3 flex flex-wrap gap-y-2 justify-start items-center gap-x-3">
                    <div className="date-selector flex bg-blue-light justify-start items-center  rounded-md text-[12px] font-paragraph border-dashed border">
                        <label className=" mt-[-6px] ml-1 text-buttonText border-r" htmlFor="date">
                            Due Date
                        </label>
                        <input
                            onChange={handleInputValue}
                            value={selectedTask.date}
                            className=" ml-3 mr-3 text-buttonText bg-blue-light my-1 text-pink cursor-pointer outline-none"
                            type="date"
                            name="date"
                            id="date"
                        />
                    </div>
                    <div className="priority-selector text-buttonText outline-none ">
                        <select
                            onChange={handleInputValue}
                            // bg should change on state change of select value
                            className={`p-2 ${
                                selectedTask.priority === "Important" ? "bg-pink" : "bg-accent"
                            }
                            text-white outline-none cursor-pointer  rounded-md`}
                            name="priority"
                            id="priority">
                            <option
                                selected={selectedTask.priority === "Important"}
                                className="outline-none"
                                value="Important">
                                Important
                            </option>
                            <option
                                selected={selectedTask.priority === "Not Important"}
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
                                    onChange={handleInputValue}
                                    checked={selectedTask.priorityLabel === "Urgent"}
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
                                    onChange={handleInputValue}
                                    checked={selectedTask.priorityLabel === "Not Urgent"}
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
                        onClick={() => {
                            setEdit(false);
                        }}
                        className="bg-gray-300 text-buttonText flex justify-center items-center font-paragraph py-2 px-4 rounded-sm text-white ">
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            updateTodoData(selectedTask);
                        }}
                        className="bg-orange text-buttonText flex justify-center items-center font-paragraph py-2 px-4 rounded-sm text-white ">
                        Update task
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditTask;
