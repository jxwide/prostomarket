import Link from "next/link";
import React from "react";
import Image from "next/image";
import image_orders from "../public/orders.svg";
import image_my from "../public/account.svg";

const Header = () => {
    return (
        <div className="header">
            <div className="subheader">
                <div className="block">
                    <Link href="/">
                        <h2 className="un-margin-top pointer">
                            <span className="span-bg-red">Prosto</span>Маркет
                            <span className="for-sellers-text">Для продавцов</span>
                        </h2>
                    </Link>
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
                                <a>Мои товары</a>
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
        </div>
    );
};

export default Header;
