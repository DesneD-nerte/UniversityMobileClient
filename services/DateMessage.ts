class DateMessage {
    static CheckDateMessage (currentDate: Date, previousDate: Date) : boolean {//Проверка что разные дни
        if(currentDate.getFullYear() === previousDate.getFullYear() &&
            currentDate.getMonth() === previousDate.getMonth() &&
            currentDate.getDate() === previousDate.getDate()) {
                return false;
        }

        return true;
    }
}

export default DateMessage;