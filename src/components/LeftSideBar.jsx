import { IoNotificationsOutline } from "react-icons/io5";
import { LuPanelLeft } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";
import Divider from "./Divider";
import { BsPlusLg } from "react-icons/bs";
import { TfiSearch } from "react-icons/tfi";
import { FaTasks } from "react-icons/fa";
import { MdLabelImportant } from "react-icons/md";
import { FcCalendar } from "react-icons/fc";
import { IoTrashBinSharp } from "react-icons/io5";
import { useContext, useState } from "react";
import InputFormContext from "../context/InputFormContext";
import TodoContext from "../context/TodoContext";
import { Link, NavLink, useLocation } from "react-router-dom";
const LeftSideBar = ({ setFullScreen, fullScreen }) => {
    const { showForm, setShowForm, handleFormShow } = useContext(InputFormContext);
    const {
        getAllTodos,
        getTodaysTodos,
        getImportantTodos,
        getNotImportantTodos,
        getUrgentTodos,
        getNotUrgentTodos,
        getCompletedTodos,
        getSearchedTodos,
        getTrashedTodos,
    } = useContext(TodoContext);

    const location = useLocation();

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
                                <h3 className={`text-dark text-paragraph font-semibold`}>
                                    Shahdat Hussain
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="h-right flex gap-2 ">
                        <p>
                            <IoNotificationsOutline className="text-dark text-icon" />
                        </p>
                        <p
                            className="max-md:hidden"
                            onClick={() => {
                                setFullScreen((prevState) => !prevState);
                            }}>
                            <LuPanelLeft className="text-dark text-icon transform duration-200 hover:text-orange" />
                        </p>
                    </div>
                </div>
                <Divider />

                <div className={`action-p-list p-2`}>
                    <ul
                        className={`*:rounded-md *:py-[10px] *:px-3 *:text-paragraph *:font-paragraph overflow-hidden transform duration-700 flex gap-2 flex-wrap`}>
                        <li
                            onClick={handleFormShow}
                            className="hover:bg-blue-light md:w-full bg-gray-50 text-paragraph transform duration-100 hover:text-orange text-gray-500">
                            <button className="flex justify-start w-full  items-center gap-1">
                                <BsPlusLg />
                                Add task
                            </button>
                        </li>

                        <li className="hover:bg-blue-light md:w-full bg-gray-50 text-paragraph transform duration-100 hover:text-orange text-gray-500">
                            <div className="search flex w-fit md:w-full justify-start items-center gap-1">
                                <TfiSearch />
                                <input
                                    onChange={getSearchedTodos}
                                    className="outline-none w-full rounded-md bg-gray-50 hover:bg-blue-light"
                                    type="search"
                                    name="search"
                                    id="search"
                                    placeholder="Search"
                                />
                            </div>
                        </li>
                        <NavLink
                            onClick={getAllTodos}
                            to="/inbox"
                            className={`hover:bg-blue-light md:w-full ${
                                location.pathname === "/inbox" || location.pathname === "/"
                                    ? "bg-blue-light text-orange"
                                    : "bg-gray-50"
                            }  text-paragraph transform duration-100 hover:text-orange text-gray-500`}>
                            <p className="flex justify-start w-full items-center gap-1">
                                <FaTasks />
                                Inbox
                            </p>
                        </NavLink>
                        <NavLink
                            onClick={getTodaysTodos}
                            to="/today"
                            className={`hover:bg-blue-light md:w-full ${
                                location.pathname === "/today"
                                    ? "bg-blue-light text-orange"
                                    : "bg-gray-50"
                            } text-paragraph transform duration-100 hover:text-orange text-gray-500`}>
                            <p className="flex justify-start w-full items-center gap-1">
                                <FcCalendar /> Today
                            </p>
                        </NavLink>
                        <NavLink
                            onClick={getImportantTodos}
                            to="/important"
                            className={`hover:bg-blue-light md:w-full ${
                                location.pathname === "/important"
                                    ? "bg-blue-light text-orange"
                                    : "bg-gray-50"
                            } text-paragraph transform duration-100 hover:text-orange text-gray-500`}>
                            <p className="flex justify-start w-full items-center gap-1">
                                <MdLabelImportant className="text-red-500" />
                                Important
                            </p>
                        </NavLink>

                        <NavLink
                            onClick={getUrgentTodos}
                            to="/urgent"
                            className={`hover:bg-blue-light md:w-full ${
                                location.pathname === "/urgent"
                                    ? "bg-blue-light text-orange"
                                    : "bg-gray-50"
                            } text-paragraph transform duration-100 hover:text-orange text-gray-500`}>
                            <p className="flex justify-start w-full items-center gap-1">
                                <MdLabelImportant className="text-orange" />
                                Urgent
                            </p>
                        </NavLink>
                        <NavLink
                            onClick={getNotImportantTodos}
                            to="/not-important"
                            className={`hover:bg-blue-light md:w-full ${
                                location.pathname === "/not-important"
                                    ? "bg-blue-light text-orange"
                                    : "bg-gray-50"
                            } text-paragraph transform duration-100 hover:text-orange text-gray-500`}>
                            <p className="flex justify-start w-full items-center gap-1">
                                <MdLabelImportant className="text-blue-harder" />
                                Not important
                            </p>
                        </NavLink>
                        <NavLink
                            onClick={getNotUrgentTodos}
                            to="/not-urgent"
                            className={`hover:bg-blue-light md:w-full ${
                                location.pathname === "/not-urgent"
                                    ? "bg-blue-light text-orange"
                                    : "bg-gray-50"
                            } text-paragraph transform duration-100 hover:text-orange text-gray-500`}>
                            <p className="flex justify-start w-full items-center gap-1">
                                <MdLabelImportant className="text-accent" />
                                Not Urgent
                            </p>
                        </NavLink>
                        <NavLink
                            onClick={getCompletedTodos}
                            to="/completed"
                            className={`hover:bg-blue-light md:w-full ${
                                location.pathname === "/completed"
                                    ? "bg-blue-light text-orange"
                                    : "bg-gray-50"
                            } text-paragraph transform duration-100 hover:text-orange text-gray-500`}>
                            <p className="flex justify-start w-full items-center gap-1">
                                <MdLabelImportant className="text-green" />
                                Completed
                            </p>
                        </NavLink>
                        <NavLink
                            onClick={getTrashedTodos}
                            to="/bin"
                            className={`hover:bg-blue-light md:w-full ${
                                location.pathname === "/bin"
                                    ? "bg-blue-light text-orange"
                                    : "bg-gray-50"
                            } text-paragraph transform duration-100 hover:text-orange text-gray-500`}>
                            <p className="flex justify-start w-full items-center gap-1">
                                <IoTrashBinSharp className="text-red-600" />
                                Trash Bin
                            </p>
                        </NavLink>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default LeftSideBar;
