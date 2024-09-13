function generateAccountNumbers(): string[] {
    const prefixes = ['40506', '40606', '40706', '40825'];
    const length = 20; // Общая длина счета

    // Функция для генерации случайной части
    const generateRandomPart = (prefix: string): string => {
        const remainingLength = length - prefix.length;
        const randomPart = Array(remainingLength)
            .fill(0)
            .map(() => Math.floor(Math.random() * 10))
            .join('');
        return prefix + randomPart;
    };

    // Генерация счета для каждого префикса
    return prefixes.map(generateRandomPart);
}

// Пример использования
const accountNumbers = generateAccountNumbers();
console.log(accountNumbers);
