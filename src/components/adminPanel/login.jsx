import { useEffect } from "react";
import googleIcon from "../../assets/google.svg";

export default function Login() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="h-[100vh] w-[100%] flex justify-center ">
            <div className="w-[400px] h-[120px] shadow-lg flex flex-col items-center">
                <h2 className="text-[20px] p-3 font-bold">
                    Login with your Google account.
                </h2>
                <button className=" border-blue-300 p-1 border-1 rounded-full cursor-pointer">
                    <img src={googleIcon} alt="" />
                </button>
            </div>
        </div>
    );
}
