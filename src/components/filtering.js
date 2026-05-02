import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes)                                    // Получаем ключи из объекта
      .forEach((elementName) => {                        // Перебираем по именам
        elements[elementName].append(                    // в каждый элемент добавляем опции
            ...Object.values(indexes[elementName])        // формируем массив имён, значений опций
                      .map(name => {                        // используйте name как значение и текстовое содержимое
                        const option = document.createElement('option');
                        option.value = name;
                        option.textContent = name;
                        return option;                                // @todo: создать и вернуть тег опции
                      })
        )
     })

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === 'clear') {
      // Находим родительский элемент кнопки
      const parent = action.parentElement;
      // Ищем поле ввода рядом с кнопкой (используем атрибут data-field для определения целевого поля)
      const fieldName = action.getAttribute('data-field');
      if (fieldName) {
        // Находим соответствующий input в форме
        const input = parent.querySelector(`input[name="${fieldName}"], select[name="${fieldName}"]`);
        if (input) {
          // Сбрасываем значение поля ввода
          input.value = '';
          // Обновляем состояние: сбрасываем значение в state для соответствующего поля
          state[fieldName] = '';
        }
      }
    }

        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}