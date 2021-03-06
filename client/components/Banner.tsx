import React, {useEffect, useState} from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import {IBanner} from '../models/IBanner';

const Banner = () => {
    let [banner, setBanner] = useState<IBanner>();

    useEffect(() => {
        axios({
            url: "/banners/superheader",
        }).then((response) => {
            let banners = response.data;
            if (banners.length) {
                let rand = Math.floor(Math.random() * banners.length);
                setBanner(banners[rand]);
            }
        });
    }, []);

    return (
        <div className="banner">
            <Link href={banner?.href || '/'}>
                <Image
                    src={banner?.image || "/green.png"}
                    width="1920px"
                    height="52px"
                />
            </Link>
        </div>
    );
};

export default Banner;
