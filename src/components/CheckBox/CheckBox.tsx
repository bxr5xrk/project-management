import React, { FC } from "react";
import st from "./CheckBox.module.scss";

interface CheckBoxProps {
    title: string;
    checked: boolean;
    setChecked: (check: boolean) => void;
}

const CheckBox: FC<CheckBoxProps> = ({ title, checked, setChecked }) => {
    return (
        <div className={st.status} onClick={() => setChecked(!checked)}>
            <input
                type="checkbox"
                className={st.checkbox}
                checked={checked}
                onChange={() => setChecked(!checked)}
            />
            {checked && (
                <svg
                    className={st.check}
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                >
                    <rect width="24" height="24" opacity="0" />
                    <path d="M9.86 18a1 1 0 0 1-.73-.32l-4.86-5.17a1 1 0 1 1 1.46-1.37l4.12 4.39 8.41-9.2a1 1 0 1 1 1.48 1.34l-9.14 10a1 1 0 0 1-.73.33z" />
                </svg>
            )}
            <p>{title}</p>
        </div>
    );
};

export default CheckBox;
