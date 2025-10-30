import menuIcon from "../../../assets/menu.svg"

export default function Menu({setShowSideNavbar}){
    return (
        <div onClick={()=>{setShowSideNavbar(true)}} className=" h-full p-3 flex justify-center items-center sm:hidden">
            <img className="h-[90%]" src={menuIcon} alt="" />
        </div>    
    );
}