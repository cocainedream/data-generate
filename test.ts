const updateJsonValue = (obj, path, value) => {
    // Выполняем глубокое клонирование объекта внутри функции
    const clonedObj = JSON.parse(JSON.stringify(obj));

    const keys = path.split('.');
    let current = clonedObj;

    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (current[key] === undefined || current[key] === null) {
            current[key] = {};
        }
        current = current[key];
    }

    const lastKey = keys[keys.length - 1];
    current[lastKey] = value;

    return clonedObj;
};

// Пример вызова функции
const jsonObject = {
    id: '',
    foo: 123,
    bar: {
        q: 123,
        b: 123,
    },
};

const values = [null, true, 99];
const keyInput = 'bar.q';

const updatedObjects = values.map((value) => {
    // Теперь не нужно вручную вызывать deepClone
    return updateJsonValue(jsonObject, keyInput, value);
});

console.log(updatedObjects.map((obj) => JSON.stringify(obj, null, 2)).join('\n\n'));
