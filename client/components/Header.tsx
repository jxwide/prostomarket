import Link from "next/link";
import React from "react";
import SearchInput from "./SearchInput";
import Image from "next/image";
import image_orders from "../public/orders.svg";
import image_favorite from "../public/favorite.svg";
import image_cart from "../public/cart.svg";
import image_my from "../public/account.svg";

const Header = () => {
    return (
        <div className="header">
            <div className="subheader">
                <div className="block">
                    <Link href="/">
                        <h2>
                            <span className="span-bg-red">Prosto</span>Маркет
                        </h2>
                    </Link>
                </div>

                <div className="block search-input-block">
                    <SearchInput />
                </div>

                <div className="block">
                    <div className="account-nav">
                        <Link href="">
                            <div className="nav-link-w-image">
                                <Image
                                    src={image_orders}
                                    width="20px"
                                    height="20px"
                                />
                                <a>Заказы</a>
                            </div>
                        </Link>
                        <Link href="">
                            <div className="nav-link-w-image">
                                <Image
                                    src={image_favorite}
                                    width="20px"
                                    height="20px"
                                />
                                <a>Избранное</a>
                            </div>
                        </Link>
                        <Link href="">
                            <div className="nav-link-w-image">
                                <Image
                                    src={image_cart}
                                    width="20px"
                                    height="20px"
                                />
                                <a>Корзина</a>
                            </div>
                        </Link>
                        <Link href="">
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
        </div>
    );
};

export default Header;
