import { Link } from "react-router-dom";
import logoImg from "../../../assets/main_logo.png"

export default function Logo(){
    return (
        <Link to="/" className="h-full flex items-center py-1 ml-1">
            <img src={logoImg} className="h-full mr-1" alt="Shari Gift Logo..." />
            {/* <b className="text-3xl text-[#3a8397]">TOPz</b> */}
        </Link>
    );
}