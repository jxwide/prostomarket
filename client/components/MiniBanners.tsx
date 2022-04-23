import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

const MiniBanners = () => {
    let [banners, setBanners] = useState([]);

    useEffect(() => {
        axios({
            url: "/banners/mini",
        }).then((response) => {
            let bannersArray = response.data;
            bannersArray.sort(() => Math.random() - 0.5); // shuffle array
            setBanners(bannersArray.slice(0, 4));
        });
    }, []);

    return (
        <div className="mini-banners">
            {banners.map((el) => (
                <div className="mini-banner">
                    <Link href={el.href || "/"}>
                        <Image
                            src={el.image || "/green.png"}
                            width="200px"
                            height="200px"
                        />
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default MiniBanners;
