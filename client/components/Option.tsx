import React from "react";

interface OptionProps {
    title: string,
    value: string,
}

const Option: React.FC<OptionProps> = ({title, value}) => {
    return (
        <div className="option">
            <p className="option-title">{title}</p>
            <p className="option-value">{value}</p>
        </div>
    );
};

export default Option;
