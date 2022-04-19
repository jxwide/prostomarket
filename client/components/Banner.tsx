import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const Banner = () => {
    let [banner, setBanner] = useState({ image: "", href: "" });

    useEffect(() => {
        axios({
            url: "/banners/superheader",
        }).then((response) => {
            let banners = response.data;

            let rand = Math.floor(Math.random() * banners.length);
            setBanner(banners[rand]);
        });
    }, []);

    return (
        <div className="banner">
            <Link href={banner.href}>
                <img src={banner.image} alt="" />
            </Link>
        </div>
    );
};

export default Banner;
