import Link from "next/link";
import React, {useEffect, useState} from "react";
import SearchInput from "./SearchInput";
import Image from "next/image";
import image_orders from "../public/orders.svg";
import image_favorite from "../public/favorite.svg";
import image_cart from "../public/cart.svg";
import image_my from "../public/account.svg";
import axios from "axios";

const Header = () => {
    let [cats, setCats] = useState([]);

    useEffect(() => {
        axios({
            url: "/cats",
        }).then((response) => {
            let cats = response.data;
            cats.sort(() => Math.random() - 0.5); // shuffle categories
            setCats(cats);
        });
    }, []);

    return (
        <div className="header">
            <div className="subheader">
                <div className="block">
                    <Link href="/">
                        <h2 className="un-margin-top pointer">
                            <span className="span-bg-red">Prosto</span>Маркет
                        </h2>
                    </Link>
                </div>

                <div className="block search-input-block">
                    <SearchInput/>
                </div>

                <div className="block">
                    <div className="account-nav">
                        <Link href="/me/orders">
                            <div className="nav-link-w-image">
                                <Image
                                    src={image_orders}
                                    width="20px"
                                    height="20px"
                                />
                                <a>Заказы</a>
                            </div>
                        </Link>
                        <Link href="/me/favorite">
                            <div className="nav-link-w-image">
                                <Image
                                    src={image_favorite}
                                    width="20px"
                                    height="20px"
                                />
                                <a>Избранное</a>
                            </div>
                        </Link>
                        <Link href="/me/cart">
                            <div className="nav-link-w-image">
                                <Image
                                    src={image_cart}
                                    width="20px"
                                    height="20px"
                                />
                                <a>Корзина</a>
                            </div>
                        </Link>
                        <Link href="/me">
                            <div className="nav-link-w-image">
                                <Image
                                    src={image_my}
                                    width="20px"
                                    height="20px"
                                />
                                <a>Я</a>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="cats-header">
                {cats.map((el) => (
                    <Link href={"/category/" + el.name} key={el.id}>
                        <a className="cats-header-link">{el.name}</a>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Header;
