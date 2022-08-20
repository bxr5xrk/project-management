import { Link } from "react-router-dom";
import st from "./LandingPage.module.scss";

const LandingPage = () => {
    return (
        <>
            <h1 className={st.title}>
                PROJECT <span>MANAGEMENT</span>
            </h1>
            <div className={st.buttons}>
                <Link to="/register" className={st.button}>
                    Sign Up
                </Link>
                <Link to="/login" className={st.button}>
                    Log In
                </Link>
            </div>
        </>
    );
};

export default LandingPage;
