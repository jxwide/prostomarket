import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

const RightBanners = () => {
    let [banners, setBanners] = useState([]);

    useEffect(() => {
        axios({
            url: "/banners/right",
        }).then((response) => {
            let bannersArray = response.data;
            bannersArray.sort(() => Math.random() - 0.5); // shuffle array
            setBanners(bannersArray.slice(0, 2));
        });
    }, []);

    return (
        <div className="right-banners">
            {banners.map((el) => (
                <div className="right-banner">
                    <Link href={el.href || "/"}>
                        <Image
                            src={el.image || "/green.png"}
                            width="300px"
                            height="380px"
                        />
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default RightBanners;
