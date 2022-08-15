import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/Slices/userSlice";

const OverviewPage = () => {
    const { currentUser } = useSelector(selectUser);

    // also calculate complaten / uncomplated
    const tasksCount = () => {
        const total = currentUser?.projects.map((i) => i.tasks.length);
        return total && total.reduce((a, b) => a + b, 0);
    };

    return (
        <div>
            {currentUser && (
                <>
                    <div>
                        <h4>Total projects</h4>
                        {currentUser.projects.length}
                    </div>
                    <div>
                        <h4>Total Tasks</h4>
                        {tasksCount()}
                    </div>
                </>
            )}
        </div>
    );
};

export default OverviewPage;
