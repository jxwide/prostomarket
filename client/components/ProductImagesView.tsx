import React, { useEffect, useState } from "react";

const ProductImagesView = ({ images }) => {
    let [choosedPhoto, setChoosedPhoto] = useState("");
    let [allImages, setAllImages] = useState([]);

    useEffect(() => {
        if (images.length != 0 || !images) {
            if (choosedPhoto == "") setChoosedPhoto(images[0].source);
            setAllImages(images);
        }
    }, [images]);

    const changePhoto = (e) => {
        setChoosedPhoto(e.target.src);
    };

    return (
        <>
            <div className="images-view-all-photos-block">
                {allImages.map((el) => (
                    <img
                        src={el.source}
                        onClick={(e) => changePhoto(e)}
                        alt=""
                        className="product-view-photo"
                    />
                ))}
            </div>
            <div className="images-view-view">
                <img src={choosedPhoto} alt="" className="view-choosed-photo" />
            </div>
        </>
    );
};

export default ProductImagesView;
