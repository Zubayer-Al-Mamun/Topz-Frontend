export default function Loading() {
    return (
        <div className=" flex justify-center items-center w-full h-[80vh] absolute z-50">
            <div className="flex items-center">
                <div className=" m-2 w-8 h-8 border-4 border-[#e2af4e] border-t-transparent rounded-full animate-spin"></div>
                <div className="font-semibold text-2xl text-[#e2af4e] ">
                    Loading...
                </div>
            </div>
        </div>
    );
}
