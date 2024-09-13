const fs = require('fs');
// Интерфейсы для определения структуры данных
interface File1Item {
    test_case: string;
    key: string;
    value: string;
    requestId: string;
}

interface File2Item {
    requestid: string;
    status: string;
    errormessage: string | null;
}

interface MergedItem extends File1Item, File2Item {
    requestId: string; // Используем только requestId
    expectedResult: string; // Добавляем поле expectedResult
}

// Функция для объединения данных из двух файлов
function mergeJsonFiles(file1Path: string, file2Path: string, outputPath: string): void {
    // Чтение содержимого первого файла
    const data1: File1Item[] = JSON.parse(fs.readFileSync(file1Path, 'utf-8'));

    // Чтение содержимого второго файла
    const data2: File2Item[] = JSON.parse(fs.readFileSync(file2Path, 'utf-8'));

    // Создание словаря для быстрого поиска по requestid
    const statusDict: { [key: string]: File2Item } = {};
    data2.forEach((item) => {
        statusDict[item.requestid] = item;
    });

    // Результирующий список
    const result: MergedItem[] = [];

    // Множество всех requestId из первого файла
    const allRequestIds = new Set(data1.map((item) => item.requestId));

    // Множество всех requestId из второго файла
    const statusRequestIds = new Set<string>();
    data2.forEach((item) => statusRequestIds.add(item.requestid));

    // Сопоставление данных и добавление в результат
    data1.forEach((item) => {
        const requestId = item.requestId;
        if (statusDict[requestId]) {
            const mergedItem: MergedItem = {
                ...item,
                ...statusDict[requestId],
                requestId, // Убедимся, что используем только requestId
                expectedResult: '', // Добавляем поле expectedResult со значением по умолчанию
            };
            delete mergedItem.requestid; // Удаляем дублирующее поле
            result.push(mergedItem);
        } else {
            console.log(`RequestId ${requestId} не найден во втором файле и требует ручной проверки.`);
        }
    });

    // Поиск requestId, которые есть во втором файле, но отсутствуют в первом
    const missingInFirst: string[] = [];
    statusRequestIds.forEach((id) => {
        if (!allRequestIds.has(id)) {
            missingInFirst.push(id);
        }
    });
    missingInFirst.forEach((missingId) => {
        console.log(
            `RequestId ${missingId} найден во втором файле, но отсутствует в первом файле и требует ручной проверки.`,
        );
    });

    // Запись результата в новый файл
    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf-8');
}

// Пример использования функции// Пример использования функции
mergeJsonFiles('test-cases/all_test_cases.json', 'outgoing_payment_message.json', 'output.json');
