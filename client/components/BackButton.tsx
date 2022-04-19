import React from "react";
import { useRouter } from "next/router";

const BackButton = () => {
    let router = useRouter();

    const backOnClick = () => {
        router.back();
    };

    return (
        <div className="back" onClick={backOnClick}>
            <a className="back">Назад</a>
        </div>
    );
};

export default BackButton;
