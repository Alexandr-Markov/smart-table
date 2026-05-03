import {createComparison, defaultRules} from "../lib/compare.js";


// @todo: #4.3 — настроить компаратор

const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
  // @todo: #4.1 — заполнить выпадающие списки опциями
  Object.keys(indexes)                            // Получаем ключи из объекта
    .forEach((elementName) => {              // Перебираем по именам
        elements[elementName].append(            // в каждый элемент добавляем опции
          ...Object.values(indexes[elementName])        // формируем массив имён, значений опций
            .map(name => {                  // используем name как значение и текстовое содержимое
              const option = document.createElement('option');
              option.value = name;
              option.textContent = name;
              return option;                // создаём и возвращаем тег опции
            })
        );
      }
    );

  return (data, state, action) => {
  // @todo: #4.2 — обработать очистку поля
  if (action && action.name === 'clear') {
    const fieldToClear = action.dataset.field;
    const inputElement = action.parentNode.querySelector('input');

    // Очищаем поле в интерфейсе
    if (inputElement) {
      inputElement.value = '';
    }

    // Обновляем состояние
    if (fieldToClear in state) {
      state[fieldToClear] = '';
    }
  }

  // Создаём диапазон для фильтрации (от и до)
  state.total = [state.totalFrom, state.totalTo];

  // Возвращаем отфильтрованные данные
  return data.filter(item => compare(item, state));
};
}