const getNextFiveDays = () => {
    const fiveDaysArray = [];
    for(let i = 0; i < 5; i++) {
        let day = new Date();
        day.setDate(day.getDate() + i);
        fiveDaysArray.push(day.getDate() + '/' + (day.getMonth() + 1))
    }
    return fiveDaysArray;
}

export default getNextFiveDays;