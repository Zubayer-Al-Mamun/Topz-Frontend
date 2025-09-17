import { useRef, useState } from "react";
import Header from "./home/header/Header";
import SideNavbar from "./home/SideNavbar";
import { Outlet } from "react-router-dom";
// import bg from "../assets/leather_black.png"

export default function Page() {
    const [showSideNavbar, setShowSideNavbar] = useState(false);
    const [showCategory, setShowCategory] = useState(true);
    const scrollRef = useRef(0);

    return (
        <>
            <div
                className="bg-[#ECEEDF] w-[100%] relative flex flex-col items-center "
                onWheel={(e) => {
                    if (scrollRef.current < e.pageY) {
                        scrollRef.current = e.pageY;
                        setShowCategory(false);
                    } else if (scrollRef.current > e.pageY) {
                        scrollRef.current = e.pageY;
                        setShowCategory(true);
                    }
                }}
            >


                <Header setShowSideNavbar={setShowSideNavbar} showCategory={showCategory} />
                {
                    showSideNavbar && <SideNavbar setShowSideNavbar={setShowSideNavbar} />
                }

                <div className="w-full mt-[60px] max-sm:mt-[110px] h-[100%] ">
                    <div className=" h-full w-full flex flex-col items-center">

                        <Outlet/>

                        {/* <div className="w-full h-full">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Aperiam recusandae accusantium voluptates
                            ducimus corporis porro totam cum reiciendis sed
                            magnam rerum possimus, non velit similique
                            distinctio illo minima, excepturi nisi? Lorem ipsum
                            dolor sit amet consectetur adipisicing elit. Eos
                            veniam, aliquid deleniti cum a quos nobis. Beatae
                            eaque quo in perferendis dicta unde saepe iure
                            soluta. Dicta consequuntur id, laboriosam hic
                            dignissimos corporis iure recusandae, esse, pariatur
                            sint eius laudantium praesentium possimus voluptatum
                            deleniti! Pariatur aliquid obcaecati odit mollitia.
                            Nostrum, similique, reiciendis sit animi
                            perspiciatis alias voluptas, rem esse eum ad commodi
                            voluptatibus explicabo. Optio, earum dolores
                            corporis minima vero facilis, autem mollitia
                            similique quaerat provident voluptatum eius quis?
                            Est porro in quia pariatur saepe sit praesentium,
                            libero hic veniam aspernatur aut at tenetur sapiente
                            esse, necessitatibus recusandae magnam quam quo,
                            labore ab ex ut a enim. Repudiandae, rem sequi?
                            Culpa voluptas quas et debitis dolorum molestiae
                            laborum iure exercitationem eius, quaerat dicta,
                            similique reprehenderit ullam. Nesciunt unde earum
                            voluptas molestias voluptatibus. Voluptatibus, sunt
                            itaque? Quod minima ut nulla animi sed similique
                            facere numquam molestias sapiente amet veritatis
                            nemo officia adipisci esse blanditiis ducimus earum
                            deleniti, nostrum magni. Quos fugiat sit quibusdam
                            autem ut! Similique atque quae saepe officiis
                            praesentium, quibusdam ipsa dolores inventore,
                            voluptates at velit, earum iste! Culpa iusto ratione
                            sint unde consequatur laborum cupiditate. Dolore,
                            itaque dicta voluptatum quae, necessitatibus a harum
                            nesciunt asperiores saepe accusantium repellendus?
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quis dicta et alias eum. Nisi in voluptas
                            fugit asperiores quasi eum, dolor, architecto magnam
                            natus velit voluptatibus recusandae totam reiciendis
                            quam minima fugiat! Odio accusantium illo veritatis
                            voluptatum, mollitia nam necessitatibus, voluptas
                            facere sit est sapiente aliquid suscipit quibusdam,
                            officiis sunt maiores harum nemo quasi ipsum natus
                            ipsam laborum molestias repudiandae rem? Commodi
                            maiores reprehenderit blanditiis pariatur quas,
                            minima velit sequi sapiente at porro ut quibusdam
                            quos impedit accusamus eum ad animi voluptatibus
                            necessitatibus doloribus minus omnis suscipit! Odio
                            eius velit ipsam nesciunt ea sapiente? Quis,
                            tenetur, suscipit aliquam enim accusamus debitis
                            modi voluptatem, nam sit animi repudiandae
                            consectetur voluptas officiis? Iusto, deserunt id
                            consequuntur in soluta, amet atque molestias
                            asperiores beatae possimus dolorem qui sequi
                            nesciunt? Sit sapiente aut officia eligendi ea
                            possimus beatae ut molestias illo labore eius ex
                            provident repellendus laborum eveniet nobis
                            obcaecati, quasi quia. Neque praesentium molestiae
                            quae ducimus amet mollitia ullam quasi rerum dolore,
                            explicabo cum consequuntur magnam, a quia,
                            temporibus porro deleniti quam animi libero quod sit
                            nulla. A eveniet quia nulla ullam saepe ratione
                            autem, vero quam dolores soluta numquam, labore,
                            blanditiis sequi magnam est quo! Ab dolorum velit
                            atque iste reprehenderit excepturi dignissimos optio
                            vitae dolores aut facilis deserunt expedita, rerum
                            et eos impedit debitis unde distinctio libero quidem
                            aliquam! Sed labore accusantium natus deserunt
                            perferendis quo cum cumque. Cum laudantium esse at
                            odit ipsa perferendis non nam est, minima voluptate
                            nostrum labore magnam, dignissimos recusandae
                            ducimus. Quas velit veniam et quia mollitia, cum
                            asperiores minima itaque rerum ipsam sequi quo
                            molestiae deserunt reiciendis! Eius nemo, officiis
                            dignissimos animi numquam a est dolor temporibus
                            perspiciatis. Qui, assumenda, corporis deleniti ex
                            repudiandae laborum illo officiis corrupti
                            dignissimos facilis culpa quo nulla distinctio
                            praesentium nisi possimus reprehenderit at officia
                            fugit odit, eaque molestias unde vel. Soluta harum,
                            sint minus mollitia voluptatibus vel at dicta vitae
                            optio voluptate. Nihil neque magni quam iste
                            expedita, excepturi consequuntur! Temporibus nobis
                            at voluptate cum? Repellat mollitia a iusto rerum
                            aut recusandae odit dolorum dicta ex velit. Eum aut
                            atque cum fuga eveniet fugiat soluta iure dolor eos!
                            Suscipit assumenda, ducimus nam necessitatibus
                            ratione animi sunt, repellendus aliquam aspernatur
                            doloribus quia, facere unde ut debitis consectetur
                            sed corporis numquam quidem impedit? Ut pariatur
                            quos numquam ullam quam repellendus optio nobis cum
                            magnam asperiores porro iusto atque fugiat
                            laboriosam voluptatem minima necessitatibus non,
                            ipsa nulla commodi deserunt. Aperiam, libero
                            molestiae.
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
}
