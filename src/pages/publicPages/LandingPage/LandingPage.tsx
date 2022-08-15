import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div>
            <h1>HomePage</h1>
            <Link to="/login">login page</Link>
        </div>
    );
};

export default LandingPage;
