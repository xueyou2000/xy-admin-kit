module.exports = {
    preset: "ts-jest",
    transform: {
        "^.+\\.js$": "babel-jest",
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
    testMatch: ["<rootDir>/tests/**/*.(spec|test).ts?(x)", "<rootDir>/src/**/*.(spec|test).ts?(x)", "**/__tests__/**/*.(spec|test).ts?(x)"],
};
