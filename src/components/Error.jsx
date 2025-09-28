import { useNavigate } from "react-router-dom";

export default function AdminError() {
    const navigate = useNavigate();
    function handleBack() {
        navigate(-1);
        console.log(navigator);
    }
    return (
        <div className="flex flex-col items-center p-20">
            <h1 className="p-3 text-red-700">
                This page is under construction.
            </h1>
            <button
                className="px-10 py-5 bg-amber-200 rounded-lg text-2xl"
                onClick={handleBack}
            >
                Go to back
            </button>
        </div>
    );
}
