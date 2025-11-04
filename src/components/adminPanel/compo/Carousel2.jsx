import { useRef } from "react";
import leftArrow from "../../assets/arrow-sm-left-svgrepo-com.svg";
import rightArrow from "../../assets/arrow-sm-right-svgrepo-com.svg";
import bannar from "../../assets/bannar.png";

export default function Carousel2() {
    const carouselRef = useRef(null);

    function CorScroll(){
        carouselRef.current[3].scrollIntoView();
    }


    function getMap(){
        if(!carouselRef.current){
            carouselRef.current = new Map();
        }
        return carouselRef.current;
    }
    const datas = [{
        id : 1,
        bannar
    }, {
        id : 2,
        bannar
    },{
        id : 3,
        bannar
    }];



    return (
        <div className="w-[100%] flex relative items-center">
            <img
                className="h-6 w-8 bg-[#ffffffc9] rounded-full absolute cursor-pointer"
                src={leftArrow}
                alt=""
            />
            <div ref={carouselRef} className="w-full flex overflow-x-hidden">



                {datas.map((data, idx) => (
                    <img key={idx} ref={(node) => {
                        const map = getMap();
                        if(node){
                            map.set(data.id, data.bannar);
                        }
                        else{
                            map.delete(data.id);
                        }
                    }}
                        className="h-full w-full object-cover"
                        src={bannar}
                        alt="sharigift bannar"
                    />
                ))}

                {/* <img
                    className="h-full w-full object-cover"
                    src={bannar}
                    alt="sharigift bannar"
                />
                <img
                    className="h-full w-full object-cover"
                    src={bannar}
                    alt="sharigift bannar"
                />
                <img
                    className="h-full w-full object-cover"
                    src={bannar}
                    alt="sharigift bannar"
                /> */}
            </div>
            <img
                onClick={CorScroll}
                className="h-6 w-8 bg-[#ffffffc9] rounded-full absolute right-0 cursor-pointer"
                src={rightArrow}
                alt=""
            />
        </div>
    );
}
