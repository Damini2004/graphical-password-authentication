import { Triangle } from "react-loader-spinner";

export default function Loader() {
    return (
        <div
            className="text-white fixed bg-[#000000e5] h-screen w-screen flex overflow-hidden z-50 justify-center items-center"
        >
            <div className="flex flex-col items-center">
                <Triangle
                    height="80"
                    width="80"
                    color="#64ffda" // Cyan-like color for a modern look
                    ariaLabel="triangle-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                />
                <p className="text-xl mt-4 text-center text-gray-300">Loading...</p>
            </div>
        </div>
    );
}