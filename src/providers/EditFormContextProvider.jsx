import { useState } from "react";
import EditFormContext from "../context/EditFormContext";

const EditFormContextProvider = ({ children }) => {
    const [edit, setEdit] = useState(false);
    //edit form data
    let [selectedTask, setSelectedTask] = useState({});
    const getTodo = (todo) => {
        setEdit(true);
        setSelectedTask(todo);
    };
    return (
        <>
            <EditFormContext.Provider
                value={{ edit, setEdit, getTodo, selectedTask, setSelectedTask }}>
                {children}
            </EditFormContext.Provider>
        </>
    );
};

export default EditFormContextProvider;
