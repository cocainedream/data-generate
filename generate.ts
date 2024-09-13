const fs = require('fs');
const path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { testCases } from './consts/test-cases';
import { jsonObject } from './consts/example-json';

export function generateTestCases(jsonObject: any, positiveCases: any, fieldsToReplace: string[]) {
    const testCasesDir = path.join(__dirname, 'test-cases');

    // Если папка test-cases существует, удалить все её содержимое
    if (fs.existsSync(testCasesDir)) {
        fs.readdirSync(testCasesDir).forEach((file) => {
            fs.unlinkSync(path.join(testCasesDir, file));
        });
    } else {
        fs.mkdirSync(testCasesDir);
    }

    let testCaseCounter = 1;
    let allJsonObjects = '';
    let uuids = []; // Массив для хранения UUID
    let testCasesArray: Array<{ test_case: string; key: string; value: any; requestId: string }> = []; // Массив для хранения тестов в формате JSON

    const generateTestCase = (field: string, value: any) => {
        const newRequestId = uuidv4();
        uuids.push(newRequestId); // Сохранение UUID в массив
        const modifiedJson = JSON.parse(JSON.stringify(jsonObject));

        const fieldPath = field.split('.');
        let obj = modifiedJson;
        for (let i = 0; i < fieldPath.length - 1; i++) {
            obj = obj[fieldPath[i]];
        }
        obj[fieldPath[fieldPath.length - 1]] = value;

        // Генерация нового значения для requestId и documentId.id
        modifiedJson.requestId = newRequestId;
        modifiedJson.documentId.id = uuidv4();

        // Создание JSON файла с маской
        const jsonFileName = `test_case_${testCaseCounter}_${field}_${newRequestId}.json`;
        const jsonFilePath = path.join(testCasesDir, jsonFileName);
        fs.writeFileSync(jsonFilePath, JSON.stringify(modifiedJson, null, 2));

        // Добавление тест-кейса в массив
        testCasesArray.push({
            test_case: `${testCaseCounter}`,
            key: field,
            value: value,
            requestId: newRequestId,
        });

        // Запись JSON объекта в allJsonObjects
        allJsonObjects += JSON.stringify(modifiedJson) + '\n';

        // Увеличение счетчика
        testCaseCounter++;
    };

    for (const field in positiveCases) {
        const values = positiveCases[field];
        const fullPathField = fieldsToReplace.find((f) => f.endsWith(field));
        if (fullPathField) {
            for (let i = 0; i < values.length; i++) {
                generateTestCase(fullPathField, values[i]);
            }
        } else {
            console.log(`Поле ${field} отсутствует в fieldsToReplace`);
        }
    }

    // Формирование SQL-запроса
    const sqlQuery = `
SELECT
    message_data::jsonb ->> 'correlationId' AS requestId,
    message_data::jsonb ->> 'status' AS status,
    CASE
        WHEN message_data::jsonb ->> 'status' = 'REJECTED' THEN
            (message_data::jsonb -> 'failedPaymentChecks' ->> 'errorMessage')::text
        ELSE
            NULL
    END AS errorMessage
FROM
    outgoing_payment_message
WHERE
    message_data::jsonb ->> 'correlationId' IN (
        ${uuids.map((id) => `'${id}'`).join(',\n')}
    ) AND message_type = 'CHECK_DECISION';
    `;

    // Сохранение тестовых кейсов в формате JSON
    const testCasesJsonPath = path.join(testCasesDir, 'all_test_cases.json');
    fs.writeFileSync(testCasesJsonPath, JSON.stringify(testCasesArray, null, 2));

    // Сохранение всех JSON объектов
    const allJsonObjectsPath = path.join(testCasesDir, 'all_json_objects.txt');
    fs.writeFileSync(allJsonObjectsPath, allJsonObjects);

    // Сохранение SQL-запроса
    const sqlQueryPath = path.join(testCasesDir, 'sql_query.sql');
    fs.writeFileSync(sqlQueryPath, sqlQuery);
}

generateTestCases(jsonObject, testCases, [
    'paymentFormDetails.documentNumber',
    // 'documentDate',
    // 'paymentFormDetails.paymentKind',
    // 'paymentFormDetails.amount',
    // 'paymentFormDetails.name',
    // 'paymentFormDetails.accountNumber',
    // 'paymentFormDetails.bankName',
    // 'paymentFormDetails.bankBic',
    // 'paymentFormDetails.bankCorrAccountNumber',
    // 'paymentFormDetails.operationTypeCode',
    // 'paymentFormDetails.paymentPurposeCode',
    // 'paymentFormDetails.paymentPriority',
]);
