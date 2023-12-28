import { FcCalendar } from "react-icons/fc";
import { MdLabelImportant } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaRegTrashCan } from "react-icons/fa6";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdRestore } from "react-icons/md";
import { useContext, useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import TodoContext from "../context/TodoContext";
import EditFormContext from "../context/EditFormContext";
const Task = ({ todo }) => {
    const [hover, setHover] = useState(false);
    const { getTodo } = useContext(EditFormContext);
    const { markAsCompleted, markAsUnCompleted, moveToTrash,restoreTodo,deleteTodo } = useContext(TodoContext);

    return (
        <>
            <div
                onMouseOver={() => {
                    setHover(true);
                }}
                onMouseOut={() => {
                    setHover(false);
                }}
                className={`task cursor-pointer ${
                    todo.isTrashed
                        ? "bg-gray-300"
                        : todo.isCompleted
                        ? "bg-greenLight"
                        : todo.priority === "Important"
                        ? "bg-importantPInk"
                        : "bg-gray-300"
                }  py-[5px]  px-[20px] relative overflow-hidden shadow rounded-md`}>
                <div className="heding flex justify-between items-center">
                    <div className="task-title">
                        <h2
                            className={`title text-[20px] text-pink ${
                                todo.isTrashed ? "line-through" : ""
                            }`}>
                            {todo.title}
                        </h2>
                    </div>
                    <div
                        className={`task-action  transform duration-300 ${
                            hover ? "m-[0px]" : "m-[-300px]"
                        } flex justify-end gap-2 items-center text-[18px]`}>
                        {todo.isTrashed ? (
                            <>
                                <button
                                    onClick={() => {
                                        restoreTodo(todo);
                                    }}
                                    className="checked-action p-2 flex justify-start items-center text-gray-900 hover:bg-gray-600/30 rounded-full ">
                                    <MdRestore title="Restore" />
                                </button>
                                <button
                                    onClick={() => {
                                        deleteTodo(todo);
                                    }}
                                    className="checked-action p-2 flex justify-start items-center text-gray-900 hover:bg-gray-600/30 rounded-full ">
                                    <FaTrash title="Delete Permanently" />
                                </button>
                            </>
                        ) : (
                            <>
                                {todo.isCompleted ? (
                                    <button
                                        onClick={() => {
                                            markAsUnCompleted(todo);
                                        }}
                                        className="checked-action p-2 flex justify-start items-center text-gray-900 hover:bg-gray-600/30 rounded-full ">
                                        <MdRestore title="Mark as Uncomplete" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            markAsCompleted(todo);
                                        }}
                                        className="checked-action p-2 flex justify-start items-center text-gray-900 hover:bg-gray-600/30 rounded-full ">
                                        <IoMdCheckmarkCircleOutline title="Mark as completed" />
                                    </button>
                                )}
                                <button
                                    onClick={() => {
                                        getTodo(todo);
                                    }}
                                    className="edit-action p-2 text-gray-900  hover:bg-gray-600/30 rounded-full ">
                                    <BiSolidEditAlt className="" title="Edit Task" />
                                </button>
                                <button
                                    onClick={() => {
                                        moveToTrash(todo);
                                    }}
                                    className="more-action p-2 text-gray-900  hover:bg-gray-600/30 rounded-full ">
                                    <FaRegTrashCan className="" title="Move to trash" />
                                </button>
                            </>
                        )}
                    </div>
                </div>
                <div className="task-deadline py-[5px] flex">
                    <div className="deadline text-gray-500 flex justify-start items-center gap-3 text-paragraph">
                        <FcCalendar /> <p className="text-sm">{todo.date}</p>
                    </div>
                </div>
                <div className="task-desc">
                    <p
                        className={`desc text-gray-600 text-paragraph text-pretty ${
                            todo.isTrashed ? "line-through" : ""
                        }`}>
                        {todo.desc}
                    </p>
                </div>
                {/* //priority */}
                {/* //completed tag */}
                {todo.isTrashed ? (
                    <p className="completed-flag bg-red-100 max-w-36  p-2 rounded-md  shadow-md flex justify-start items-center gap-1">
                        <RiDeleteBin6Line className="text-red-600" />
                        Trashed
                    </p>
                ) : (
                    <>
                        {todo.isCompleted ? (
                            <p className="completed-flag bg-[#9ADE7B] max-w-36  p-2 rounded-md  shadow-md flex justify-start items-center gap-1">
                                <MdLabelImportant className="text-green" />
                                Completed
                            </p>
                        ) : (
                            <div className="task-flag flex flex-wrap mt-2 mb-2 justify-start items-center gap-x-3 gap-y-3">
                                {todo.priority === "Important" ? (
                                    <p className="important-flag bg-[#DF826C]  p-2 rounded-md shadow-md flex justify-start items-center gap-1">
                                        <MdLabelImportant className="text-red-500" />
                                        Important
                                    </p>
                                ) : (
                                    ""
                                )}
                                {todo.priority === "Not Important" ? (
                                    <p className="not-important-flag bg-blue-light p-2 rounded-md shadow-md flex justify-start items-center gap-1 ">
                                        <MdLabelImportant className="text-accent" />
                                        Not Important
                                    </p>
                                ) : (
                                    ""
                                )}
                                {/* priorityalabe */}
                                {todo.priorityLabel === "Urgent" ? (
                                    <p className="urgent-flag  p-2 rounded-md bg-red-300 shadow-md flex justify-start items-center gap-1">
                                        <MdLabelImportant className="text-orange" />
                                        Urgent
                                    </p>
                                ) : (
                                    ""
                                )}
                                {todo.priorityLabel === "Not Urgent" ? (
                                    <p className="not-urgent-flag bg-accent p-2 rounded-md  shadow-md flex justify-start items-center gap-1">
                                        <MdLabelImportant className="text-white" />
                                        Not Urgent
                                    </p>
                                ) : (
                                    ""
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default Task;
