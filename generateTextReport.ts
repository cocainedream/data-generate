const fs = require('fs');
const path = require('path');

// Интерфейс для описания структуры данных
interface TestCase {
    test_case: string;
    key: string;
    value: string;
    requestId: string;
    status: string;
    errormessage: string | null;
}

// Функция для генерации текстового документа
function generateTextDocument(testCases: TestCase[]): string {
    return testCases
        .map((testCase, index) => {
            const errorMessage = testCase.errormessage ? testCase.errormessage : 'Нет';
            return `${index + 1}. Тест кейс ${testCase.test_case} Поле: ${testCase.key}, Значение Поля: ${testCase.value} Результат: ${testCase.status}, Сообщение об ошибке: ${errorMessage}`;
        })
        .join('\n');
}

// Функция для чтения JSON-файла и генерации документа
async function generateDocumentFromFile(filePath: string): Promise<void> {
    try {
        // Чтение содержимого файла
        const data = fs.readFileSync(filePath, 'utf8');
        // Парсинг содержимого как JSON
        const testCases: TestCase[] = JSON.parse(data);

        // Генерация текстового документа
        const documentText = generateTextDocument(testCases);

        // Определение пути для выходного файла
        const outputFilePath = path.join(path.dirname(filePath), 'output.txt');

        // Запись текста в выходной файл
        fs.writeFileSync(outputFilePath, documentText, 'utf8');
        console.log(`Документ был успешно создан: ${outputFilePath}`);
    } catch (error) {
        console.error('Произошла ошибка при обработке файла:', error);
    }
}

// Пример использования: передайте путь к вашему JSON-файлу
generateDocumentFromFile('output.json');
