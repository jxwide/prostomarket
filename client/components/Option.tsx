import React from "react";

const Option = ({ title, value }) => {
    return (
        <div className="option">
            <p className="option-title">{title}</p>
            <p className="option-value">{value}</p>
        </div>
    );
};

export default Option;
