import { generateDates } from '../utils/date-generation';

export const testCases = {
    documentNumber: [
        '1',
        '10',
        '12345',
        '123456',

        '',
        '000000',
        '1234567',
        '123a45',
        '12 34',
        '!@#$%',
        '    ',
        null,

        '2024-08-24',
        '12,34',
        true,
        1,
        123456,
    ],

    documentDate: generateDates(),
    'paymentFormDetails.paymentKind': ['4', '5', '', 4, 5, null, '12', '!@#$%', '1', ' 1', true],
    'paymentFormDetails.amount': [
        1, // Минимальное значение, 1 знак
        1234567890123456, // 16 знаков до разделителя
        1234567890123456.99, // 16 знаков до разделителя и 2 знака после
        1.01, // Минимальное значение с двумя знаками после разделителя
        9999999999999999.99, // Максимальное число с 16 знаками до разделителя и 2 знака после
        12345678.0, // Действительное число с двумя знаками после разделителя

        // ------------------- Негативные Сценарии ------------------- //

        null, // Пустое значение, не должно быть пустым
        0, // Содержит только нули, что недопустимо
        1234567890123456789, // Превышает 16 знаков до разделителя
        123456.789, // 3 знака после разделителя, что недопустимо
        '12345abc', // Содержит буквы, что недопустимо
        '123456.78', // валидное значение в виде строки

        '1,01',
        ' ',
        -0.11,
        '2024-08-06',
        100 - 11,
        true,
    ],
    'paymentFormDetails.name': [
        'A', // Один символ, минимальная длина
        'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz !"#$%&\'()*+,-./0123456789:;<=>?@[]^_{|}~№', // 160 символов
        'Проверка текстового поля на границе максимальной длины, все символы разрешены, 160 символов. Символы: АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ1234567890ABCDEFGHIJKLMNO', // 160 символов
        'Проверка текстового поля на границе максимальной длины, все символы разрешены, 160 символов. Символы: АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ1234567890ABCDEFGHIJKLMN', // 159 символов
        'Company ABC: Leading the future of technology since 2024!', // Пример с различными разрешенными символами, латинскими буквами и спец. знаками
        "ООО 'Технологии XXI века' - инновации для вашего бизнеса.", // Пример с кириллическими буквами, латинскими буквами и спец. знаками
        'Tech Solutions - We provide innovative solutions @ 24/7!', // Пример с латинскими буквами, цифрами и спец. знаками
        "ЗАО 'Будущее' 2024: Новые технологии и разработки для бизнеса.", // Пример с кириллическими буквами, цифрами и спец. знаками

        // ------------------- Негативные Сценарии ------------------- //

        null,
        '', // Пустое поле, не должно быть пустым
        'Invalid characters: \u0000\u001F\u007F', // Использование неразрешенных символов (непечатаемые символы)
        'Special char: ☃☠', // Примеры специальных символов вне разрешенного диапазона
        'Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', // 161 символ
    ],
    'paymentFormDetails.accountNumber': [
        '40506000400000000001',
        '40606000100000000023',
        '40706000800000000045',
        '40825000400000000067',
        '4082500040000000йцу7',
        '40825000400000+-\\у7',
        '000000000000000000000',
        '1',
        '4082500040000000006744444',
        true,
        null,
    ],
    'paymentFormDetails.bankName': [
        'A', // Один допустимый символ
        'Text1', // Пример строки из 5 символов
        'Hello1234', // Пример строки из 10 символов
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:',.<>?/~`№AABCDEFGHIJKLMNOPQRSTUVWXYZabcdefg", // 125 символов
        'Example string with numbers 123 and special characters !@#', // Пример строки с буквами, цифрами и специальными символами

        // ------------------- Негативные Сценарии ------------------- //

        '', // Пустое значение, что недопустимо
        'Invalid©Symbol', // Содержит недопустимый символ ©
        '     ', // Только пробелы, что недопустимо
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:',.<>?/~`№AABCDEFGHIJKLMNOPQRSTUVWXYZabcdefgh", // 126 символов (дополнительный символ в конце)
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:',.<>?/~`№AABCDEFGHIJKLMNOPQRSTUVWXYZabcdefgABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:',.<>?/~`№AABCDEFGHIJKLMNOPQRSTUVWXYZabcdefg", // 250 символов (дополнительный символ в конце)
        '12345@#$%&*()_+|<>?^~`', // Пример строки с неразрешенными символами
        null,
        true,
    ],
    'paymentFormDetails.bankBic': [
        '201000873',
        '045209885',
        '048952750',
        '047501906',
        '045655718',
        null,
        '1',
        '1234567890',
        'авава',
        -141478855,
        '-%4',
        '2024-08-06',
        true,
    ],
    'paymentFormDetails.bankCorrAccountNumber': [
        '30101810400000000716',
        '30102810700000000716',
        '30105810600000000716',
        '30106810900000000716',
        '4082500040000000йцу7',
        '40825000400000+-\\у7',
        '000000000000000000000',
        '1',
        '4082500040000000006744444',
        true,
        null,
    ],
    'paymentFormDetails.operationTypeCode': [0, 1, 9, 10, 23, 99, 999, '9,00', ' ', '@#', null, true],
    'paymentFormDetails.paymentPurposeCode': ['', '1', '2', '3', '4', '5', null, 123, 1, '12', '@#', '9,00'],
    'paymentFormDetails.paymentPriority': [1, 2, 3, 4, 5, null, '1', '12', '@#', true, 999, '9,00'],

    //TODO остановился тут

    // 'paymentFormDetails.paymentPurposeText': [
    //     'Company ABC has approved the new policy on data security and privacy. All employees must review the document by the end of the week and ensure compliance with the new standards by the end of the quarter.',
    //     "Your recent order #1234567890 for the product 'Wireless Headphones' has been successfully processed and is scheduled for delivery on August 15, 2024. Tracking information will be provided once the shipment is on its way.",
    //     'We are excited to announce the upcoming launch of our new product line, featuring innovative designs and cutting-edge technology. Stay tuned for more updates and special offers available exclusively to our loyal customers.',
    //     "Please ensure that all submitted reports are formatted according to the company's guidelines, including the use of approved templates, fonts, and headers. Adherence to these standards is critical for consistency and professionalism.",
    // ],
    // 'paymentFormDetails.originalDocumentOperationType': [
    //     0, 1, 9, 10, 25, 99,
    // ],
    // 'paymentFormDetails.inn': [
    //     '7830002293',
    //     '500100732259',
    //     '12345',
    //     '0',
    //     '',
    // ],
    // 'paymentFormDetails.kpp': [
    //     '1234AB789',
    //     '1023CD456',
    //     '9087EF321',
    //     '0',
    //     '',
    // ],
    // 'paymentFormDetails.payoutCode': ['1', ''],
};
