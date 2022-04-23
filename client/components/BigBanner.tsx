import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const BigBanner = () => {
    let [banner, setBanner] = useState({ image: "", href: "" });

    useEffect(() => {
        axios({
            url: "/banners/bigbanner",
        }).then((response) => {
            let banners = response.data;
            if (banners.length) {
                let rand = Math.floor(Math.random() * banners.length);
                setBanner(banners[rand]);
            }
        });
    }, []);

    return (
        <Image
            src={banner.image || "/green.png"}
            width="1440px"
            height="300px"
        />
    );
};

export default BigBanner;
