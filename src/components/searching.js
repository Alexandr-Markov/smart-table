import {rules, createComparison} from "../lib/compare.js";


export function initSearching(searchField) {
    // @todo: #5.1 — настроить компаратор
    const compare = createComparison({
    skipEmptyTargetValues: true // правило: пропускать пустые значения поиска
  });
    
    return (data, state, action) => {
        // @todo: #5.2 — применить компаратор
        if (!state[searchField] || state[searchField].trim() === '') {
      return data;
    }
    return data.filter(row => compare(row, state));
    }
}