module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "react-native"
    ],
    "globals": {
        "__DEV__": true,
        "fetch": true
    },
    "parser": "babel-eslint",
    "rules": {
        "max-len": ["error", 120],
        "no-console": 0,
        "react/forbid-prop-types": [0, { "forbid": ["any", "array", "object"] }],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/no-multi-comp": 0,
        "react/sort-comp": 0,
        'no-use-before-define': 0,
        'class-methods-use-this': 0,
        'react/destructuring-assignment': 0,
        'default-case': 0,
        'react/prop-types': 0,
        'no-unused-expressions': 0,
        'react/require-default-props': 0,
        "react/jsx-no-bind": 0,
        "no-underscore-dangle": 0,
        "no-lonely-if": 0,
        "indent": ["error", 4],
        "react/jsx-indent": 0,
        "react/jsx-indent-props": 0,
        "global-require": 0,
        "no-plusplus": 0,
        "prefer-const": 0,
    }
};
/**
 * “rules”中的每一项即是一条规则。其中,“:”之前的事规则的名称（如上面的”semi” 和 “quotes”），“:”后面的数组中，第一个项用于指定规则的错误级别，它有 3 个可选的取值：
 * “off” 或者 0 - 关闭规则
 * “warn” or 1 - 不符合规则时作为一个警告（不会影响退出码）
 * “error” or 2 - 不符合规则时视作一个错误 (退出码为1)
 */
