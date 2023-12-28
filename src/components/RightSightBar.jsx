import { BsPlusLg } from "react-icons/bs";
import Divider from "./Divider";
import Task from "./Task";
import TaskInput from "./TaskInput";
import { useContext } from "react";
import InputFormContext from "../context/InputFormContext";
import NoData from "./NoData";
import TodoContext from "../context/TodoContext";
import Skeleton from "./Skeleton";

const RightSightBar = () => {
    //here is controlling open and close todo add form by using context
    const { handleFormShow, showForm } = useContext(InputFormContext);
    const { todoList } = useContext(TodoContext);
    return (
        <>
            <div className="right-side-bar-wrapper flex flex-col w-full lg:w-[80%]  lg:pl-[80px]  p-5">
                <div className="header">
                    <h3 className="text-dark text-heading font-heading">{todoList.todoType}</h3>
                </div>
                <Divider />
                {/* task wrapper */}
                <div className="task-list max-h-[75dvh] w-full overflow-y-scroll">
                    <div className="task-wrapper py-3 flex flex-col gap-y-3">
                        {todoList.loading ? (
                            <Skeleton />
                        ) : todoList.data.length > 0 ? (
                            todoList.data.map((item, index) => {
                                return <Task key={index} todo={item} />;
                            })
                        ) : (
                            ""
                        )}
                    </div>
                </div>
                {/* task wrapper */}
                {showForm ? <TaskInput /> : ""}
                <button
                    onClick={handleFormShow}
                    className="flex task-add-button justify-start my-2 px-3 hover:text-orange text-gray-400 font-paragraph text-heading items-center gap-1 py-6 w-full">
                    <BsPlusLg className="text-orange mt-[-8px] hover:bg-orange rounded-full hover:text-white" />
                    Add task
                </button>

                {/* //nodat display massage */}
                {todoList.data ? "" : <NoData />}
            </div>
        </>
    );
};

export default RightSightBar;
