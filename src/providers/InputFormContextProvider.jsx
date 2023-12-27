import { useContext, useState } from "react";
import InputFormContext from "../context/InputFormContext";
const InputFormContextProvider = ({ children }) => {
    const [showForm, setShowForm] = useState(false);
    const handleFormShow = () => {
        setShowForm(true);
    };
    const handleFormHide = () => {
        setShowForm(false);
    };

    return (
        <>
            <InputFormContext.Provider
                value={{
                    showForm,
                    setShowForm,
                    handleFormHide,
                    handleFormShow,
                }}>
                {children}
            </InputFormContext.Provider>
        </>
    );
};

export default InputFormContextProvider;
