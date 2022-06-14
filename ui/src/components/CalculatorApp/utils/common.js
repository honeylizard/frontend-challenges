const THEME_LIGHT = "light";
const THEME_DARK = "dark";
const THEME_HIGH_CONTRAST = "high contrast";

const ACTION_RESET = "reset";
const ACTION_CALCULATE = "calculate";
const ACTION_DELETE = "del";
const ACTION_DECIMAL_PERIOD = "period";
const OPERATOR_ADD = "add";
const OPERATOR_MINUS = "minus";
const OPERATOR_DIVIDE = "divide";
const OPERATOR_MULTIPLY = "multiply";

const THEMES = [THEME_LIGHT, THEME_DARK, THEME_HIGH_CONTRAST];

const isNumber = (value) => {
    return !isNaN(Number(value));
};

const addAfter = (list, index, newItem) => {
    return [...list.slice(0, index), newItem, ...list.slice(index)];
};

const OPERATORS = [
    OPERATOR_ADD,
    OPERATOR_MINUS,
    OPERATOR_DIVIDE,
    OPERATOR_MULTIPLY,
];

const ACTIONS = [
    ACTION_DELETE,
    ACTION_DECIMAL_PERIOD,
    ACTION_RESET,
    ACTION_CALCULATE,
];

export {
    THEMES,
    THEME_LIGHT,
    THEME_DARK,
    THEME_HIGH_CONTRAST,
    isNumber,
    OPERATOR_ADD,
    OPERATOR_MINUS,
    OPERATOR_DIVIDE,
    OPERATOR_MULTIPLY,
    OPERATORS,
    ACTION_DECIMAL_PERIOD,
    ACTION_DELETE,
    ACTION_RESET,
    ACTION_CALCULATE,
    ACTIONS,
    addAfter,
};
