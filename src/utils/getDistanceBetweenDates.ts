import { format } from "date-fns";

export const getDistanceBetweenDates = (receivedDate: string) => {
    const nowDateStr = format(Date.now(), "yyyy:MM:dd:HH");
    const date = {
        year: Number(nowDateStr.slice(0, 4)) - Number(receivedDate.slice(0, 4)),
        month:
            Number(nowDateStr.slice(5, 7)) - Number(receivedDate.slice(5, 7)),
        day:
            Number(nowDateStr.slice(8, 10)) - Number(receivedDate.slice(8, 10)),
    };

    const years =
        date.year === 0
            ? ""
            : date.year === 1
            ? `${date.year} year, `
            : `${date.year} years and `;
    const months =
        date.month === 0
            ? ""
            : date.month === 1
            ? `${date.month} month and `
            : `${date.month} months and `;
    const days =
        date.day === 0
            ? "today"
            : date.day === 1 && date.month === 0
            ? "tomorrow"
            : date.day === 1 && date.month !== 0
            ? `${date.day} day ago`
            : `${date.day} days ago`;

    return `Created ${years}${months}${days}`;
};
