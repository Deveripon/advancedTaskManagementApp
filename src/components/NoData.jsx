import NodataImage from "../assets/images/undraw_no_data_re_kwbl.svg";
const NoData = () => {
    return (
        <div className="nodata w-full flex flex-col justify-center items-center">
            <div className="wrapper w-1/6 flex flex-col gap-y-8">
                <img className="w-full" src={NodataImage} alt="no data found" />
            </div>
            <h3 className="text-orange text-paragraph">No Task ! if all done, You may relax 😎 </h3>
        </div>
    );
};

export default NoData;
