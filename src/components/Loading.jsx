export default function Loading() {
    return (
        <div className=" flex justify-center items-center w-full h-full absolute bg-[#00000087] z-50">
            <div className="flex items-center">
                <div className=" m-2 w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="font-semibold text-3xl text-white">
                    Loading...
                </div>
            </div>
        </div>
    );
}
