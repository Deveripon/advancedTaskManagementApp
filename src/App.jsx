import Home from "./Pages/Home";
import { Helmet } from "react-helmet";
import Favicon from "./assets/images/task-done-flat.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
    return (
        <>
            <Helmet>
                <link
                    rel="shortcut icon"
                    href={Favicon}
                    type="image/x-icon"
                />
            </Helmet>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <Home />
        </>
    );
};

export default App;
