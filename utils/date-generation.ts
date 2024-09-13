export function generateDates(): (string | null | boolean)[] {
    const currentDate = new Date();

    // Форматирует дату в строку формата YYYY-MM-DD
    const formatDate = (date: Date): string => {
        return date.toISOString().split('T')[0];
    };

    // Дата более чем через 10 дней от текущей
    const dateMoreThan10Days = new Date();
    dateMoreThan10Days.setDate(currentDate.getDate() + 11); // Устанавливаем дату более чем через 10 дней

    // Дата 10 дней назад от текущей
    const date10DaysAgo = new Date();
    date10DaysAgo.setDate(currentDate.getDate() - 10); // Устанавливаем дату 10 дней назад

    // Возвращаем массив с необходимыми значениями
    return [
        formatDate(dateMoreThan10Days), // Дата более чем через 10 дней
        formatDate(date10DaysAgo), // Дата 10 дней назад
        '', // Пустая строка
        null, // Значение null
        true,
        '0001-08-03',
        '2027-08-03',
        '2024-13-03',
        '2024-08-44',
        '2024-08-030',
        '2024-08-00',
        '2024-0803',
        '2024-08-3',
        '2024-08-а3',
    ];
}

export function getCurrentDate(): string {
    const today = new Date();

    // Форматируем дату в формате YYYY-MM-DD
    return today.toISOString().split('T')[0];
}
