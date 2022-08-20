import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { fetchNewUser, fetchUsersData } from "../../../api/PMService";
import { setAuth } from "../../../store/Slices/authSlice";
import { selectUser, setCurrentUser } from "../../../store/Slices/userSlice";
import { useAppDispatch } from "../../../store/store";
import st from "../LandingPage/LandingPage.module.scss";

const RegisterPage: FC = () => {
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
                    "Name must contain from 3 to 15 letters"
                )
                .required("Name required"),
            email: Yup.string().email().required("Email required"),
            password: Yup.string().min(4).max(20).required("Password required"),
        }),

        onSubmit: (values) => {
            const matchUser = usersData.find((i) => i.email === values.email);

            if (matchUser) {
                setShowMessage(true);
                return;
            } else {
                setShowMessage(false);
                const userId = usersData[usersData.length - 1].id + 1;

                fetchNewUser({
                    email: values.email,
                    name: values.userName,
                    password: values.password,
                });
                localStorage.setItem(
                    "authData",
                    JSON.stringify({
                        id: userId,
                        email: values.email,
                        password: values.password,
                    })
                );
                dispatch(
                    setCurrentUser({
                        name: values.userName,
                        id: userId,
                        email: values.email,
                        password: values.password,
                        projects: [],
                    })
                );
                dispatch(
                    setAuth({
                        id: userId,
                        email: values.email,
                        password: values.password,
                    })
                );
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
        <div className={st.form}>
            <form onSubmit={formik.handleSubmit}>
                <h2>Sign Up</h2>
                <input
                    id="userName"
                    type="text"
                    placeholder="enter your name"
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
                    placeholder="enter your email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                    <p>{formik.errors.email}</p>
                )}
                <input
                    id="password"
                    type="password"
                    placeholder="enter password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                    <p>{formik.errors.password}</p>
                )}

                <button type="submit">Create an account</button>

                {showMessage && (
                    <p className={st.wrong}>
                        User already exists <Link to="/login">Log In</Link>
                    </p>
                )}
            </form>
            <Link to="/">Back</Link>
        </div>
    );
};

export default RegisterPage;
