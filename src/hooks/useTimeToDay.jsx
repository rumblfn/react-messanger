const now = new Date();
let day = "0" + now.getDate();
let month = "0" + (now.getMonth() + 1);
let year = now.getFullYear();

const todayDate = new Date(year, now.getMonth(), now.getDate());
const yesterdayDate = new Date(todayDate.valueOf() - 86400000);

const today = `${day.substr(-2)}.${month.substr(-2)}.${year}`;

day = "0" + yesterdayDate.getDate();
month = "0" + (yesterdayDate.getMonth() + 1);
year = yesterdayDate.getFullYear();

const yesterday = `${day.substr(-2)}.${month.substr(-2)}.${year}`;

export const useTimeToDay = (date) => {
    if (!date) return "00.00.1970";

    if (date === today) return "Today";
    if (date === yesterday) return "Yesterday";

    return date;
};
