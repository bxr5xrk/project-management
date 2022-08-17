import React, { FC } from "react";

interface TaskProps {
    id: number;
    title: string;
    isComplated: boolean;
    totalTime: string;
    deleteTask: (id: number) => void;
}

const TaskItem: FC<TaskProps> = ({
    id,
    title,
    isComplated,
    totalTime,
    deleteTask,
}) => {
    return (
        <div style={{ border: "1px solid #111" }}>
            <button onClick={() => deleteTask(id)}>delete</button>
            <h4>{title}</h4>
            <p>{!isComplated ? "active" : "done"}</p>
            <p>totalTime: {totalTime}</p>
        </div>
    );
};

export default TaskItem;
