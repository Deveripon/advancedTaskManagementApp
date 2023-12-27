import { useState } from "react";
import LeftSideBar from "../components/LeftSideBar";
import RightSightBar from "../components/RightSightBar";
import { LuPanelRight } from "react-icons/lu";
import { CiLight } from "react-icons/ci";
import { MdNightlight } from "react-icons/md";
import { GrSystem } from "react-icons/gr";

const Home = () => {
    //set toggle intaraction for fullscreen
    const [fullScreen, setFullScreen] = useState(false);

    //set toggle intaraction for dark mode
    const [dark, setDark] = useState();
    if (dark === true) {
        localStorage.setItem("theme", "dark");
        document.documentElement.classList.add("dark");
    } else if (dark === false) {
        localStorage.setItem("theme", "light");
        document.documentElement.classList.remove("dark");
    } else {
        localStorage.removeItem("theme");
    }

    return (
        <>
            <div className="home-page w-full h-svh bg-white">
                <div className="home-page-wrapper flex max-md:flex-col  justify-between items-center">
                    <div
                        className={`left-side-bar  max-md:w-full max-md:h-fit max-xl:w-[40%] w-[23%] left-0 h-svh bg-primary transform duration-500 ${
                            fullScreen
                                ? "m-[-23%]"
                                : "m-[0%]"
                        }`}>
                        <LeftSideBar
                            fullScreen={fullScreen}
                            setFullScreen={setFullScreen}
                        />
                    </div>
                    <div
                        className={`right-side-bar h-svh flex max-md:w-full justify-start transform duration-500 ${
                            fullScreen
                                ? "w-[100%]"
                                : "w-[77%]"
                        }`}>
                        {fullScreen ? (
                            <div className="toggoler m-5">
                                <button
                                    onClick={() => {
                                        setFullScreen(
                                            (prevState) =>
                                                !prevState
                                        );
                                    }}>
                                    <LuPanelRight className="text-icon text-dark hover:text-orange transform duration-300" />
                                </button>
                            </div>
                        ) : (
                            ""
                        )}

                        <RightSightBar />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
