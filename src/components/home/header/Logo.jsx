import logoImg from "../../../assets/main_logo.png"

export default function Logo(){
    return (
        <div className="h-[55%] flex items-center">
            <img src={logoImg} className="h-full mr-1" alt="Shari Gift Logo..." />
            <b className="text-3xl text-[#3a8397]">TOPz</b>
        </div>
    );
}