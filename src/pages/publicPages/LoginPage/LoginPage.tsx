import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { fetchUsersData } from "../../../api/PMService";
import { setAuth } from "../../../store/Slices/authSlice";
import { selectUser, setCurrentUser } from "../../../store/Slices/userSlice";
import { useAppDispatch } from "../../../store/store";

const LoginPage: FC = () => {
    const dispatch = useAppDispatch();
    const { usersData } = useSelector(selectUser);
    const [showMessage, setShowMessage] = useState(false);

    const formik = useFormik({
        initialValues: {
            userName: "",
            email: "",
            password: "",
        },

        validationSchema: Yup.object({
            userName: Yup.string()
                .matches(
                    /^(\D){3,15}$/,
                    "Ім'я повинне повинне містити від 3 до 15 літер"
                )
                .required("Ім'я обов'язкове"),
            email: Yup.string().email().required("Номер телефону обов'язковий"),
            password: Yup.string().min(4).max(20),
        }),

        onSubmit: (values) => {
            const matchUser = usersData.find(
                (i) =>
                    i.email === values.email &&
                    i.password === values.password &&
                    i.name === values.userName
            );

            if (matchUser) {
                setShowMessage(false);
                localStorage.setItem(
                    "authData",
                    JSON.stringify({
                        id: matchUser.id,
                        name: matchUser.name,
                        email: matchUser.email,
                        password: matchUser.password,
                    })
                );
                dispatch(setCurrentUser(matchUser));
                dispatch(
                    setAuth({
                        id: matchUser.id,
                        name: matchUser.name,
                        email: matchUser.email,
                        password: matchUser.password,
                    })
                );
            } else {
                setShowMessage(true);
            }
        },
    });

    useEffect(() => {
        if (usersData.length === 0) {
            dispatch(fetchUsersData());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h2>Автентифікація</h2>

            <form onSubmit={formik.handleSubmit}>
                <input
                    id="userName"
                    type="text"
                    placeholder="Введіть ваше ім'я"
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.userName && formik.errors.userName && (
                    <p>{formik.errors.userName}</p>
                )}
                <input
                    id="email"
                    type="email"
                    placeholder="Введіть ваш емейл"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <input
                    id="password"
                    type="password"
                    placeholder="Введіть ваш пароль"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                    <p>{formik.errors.email}</p>
                )}

                <button type="submit">Submit</button>

                {showMessage && <h3>wrong data</h3>}
            </form>

            <Link to="/">назад</Link>
        </div>
    );
};

export default LoginPage;
