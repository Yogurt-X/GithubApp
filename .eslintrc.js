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
        "no-lonely-if": 0
    }
};