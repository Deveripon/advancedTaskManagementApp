import { IoNotificationsOutline } from "react-icons/io5";
import { LuPanelLeft } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";
import Divider from "./Divider";
import { Link } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";
import { TfiSearch } from "react-icons/tfi";
import { FaTasks } from "react-icons/fa";
import { MdLabelImportant } from "react-icons/md";
import { FcCalendar } from "react-icons/fc";
import { useContext, useState } from "react";
import InputFormContext from "../context/InputFormContext";
import { MdOutlineArrowDropDown } from "react-icons/md";
import TodoContextProvider from "../providers/TodoContextProvider";
import TodoContext from "../context/TodoContext";
const LeftSideBar = ({ setFullScreen, fullScreen }) => {
    const { showForm, setShowForm, handleFormShow } =
        useContext(InputFormContext);
    const { getImportantTodo, actionDispatcher } =
        useContext(TodoContext);
    return (
        <>
            <div className="left-side-bar-wrapper">
                <div
                    className={`heading flex justify-between p-5 z-[9999] items-center ${
                        fullScreen ? "hidden" : "visible"
                    }`}>
                    <div className="h-left flex justify-between items-center">
                        <div className="user-info flex gap-2 justify-between items-center">
                            <div className="user-image">
                                <FaUserCircle className="text-accent text-icon ring-2 ring-accent ring-offset-2 rounded-full" />
                            </div>
                            <div className="user-name">
                                <h3
                                    className={`text-dark text-paragraph font-semibold`}>
                                    Shahdat Hussain
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="h-right flex gap-2 ">
                        <button>
                            <IoNotificationsOutline className="text-dark text-icon" />
                        </button>
                        <button
                            className="max-md:hidden"
                            onClick={() => {
                                setFullScreen(
                                    (prevState) =>
                                        !prevState
                                );
                            }}>
                            <LuPanelLeft className="text-dark text-icon transform duration-200 hover:text-orange" />
                        </button>
                    </div>
                </div>
                <Divider />

                <div className={`action-button-list p-2`}>
                    <ul
                        className={`*:rounded-md *:py-[10px] *:px-3 *:text-paragraph *:font-paragraph overflow-hidden transform duration-700 flex gap-2 flex-wrap`}>
                        <li className="hover:bg-blue-light md:w-full bg-gray-50 text-paragraph transform duration-100 hover:text-orange text-gray-500">
                            <button
                                onClick={handleFormShow}
                                className="flex justify-start w-full  items-center gap-1">
                                <BsPlusLg />
                                Add task
                            </button>
                        </li>

                        <li className="hover:bg-blue-light md:w-full bg-gray-50 text-paragraph transform duration-100 hover:text-orange text-gray-500">
                            <button className="flex justify-start w-full items-center gap-1">
                                <TfiSearch />
                                Search
                            </button>
                        </li>
                        <li className="active-action  md:w-full transform duration-100 hover:text-orange ">
                            <button className="flex justify-start w-full items-center gap-1">
                                <FaTasks />
                                Inbox
                            </button>
                        </li>
                        <li className="hover:bg-blue-light md:w-full bg-gray-50 text-paragraph transform duration-100 hover:text-orange text-gray-500">
                            <button className="flex justify-start w-full items-center gap-1">
                                <FcCalendar />
                                Today
                            </button>
                        </li>
                        <li className="hover:bg-blue-light md:w-full  bg-gray-50 text-paragraph transform duration-100 hover:text-orange text-gray-500">
                            <button
                                onClick={getImportantTodo}
                                className="flex justify-start w-full items-center gap-1">
                                <MdLabelImportant className="text-red-500" />
                                Important
                            </button>
                        </li>

                        <li className="hover:bg-blue-light md:w-full  bg-gray-50 text-paragraph transform duration-100 hover:text-orange text-gray-500">
                            <button
                                onClick={() => {
                                    actionDispatcher({
                                        actionType:
                                            "getUrgentTodos",
                                        payload: "Urgent",
                                    });
                                }}
                                className="flex justify-start w-full items-center gap-1">
                                <MdLabelImportant className="text-orange" />
                                Urgent
                            </button>
                        </li>
                        <li className="hover:bg-blue-light md:w-full  bg-gray-50 text-paragraph transform duration-100 hover:text-orange text-gray-500">
                            <button className="flex justify-start w-full items-center gap-1">
                                <MdLabelImportant className="text-blue-harder" />
                                Not important
                            </button>
                        </li>
                        <li className="hover:bg-blue-light md:w-full bg-gray-50 text-paragraph transform duration-100 hover:text-orange text-gray-500">
                            <button className="flex justify-start w-full items-center gap-1">
                                <MdLabelImportant className="text-green" />
                                Completed
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default LeftSideBar;
