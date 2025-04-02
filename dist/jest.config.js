"use strict";
/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    testEnvironment: "node",
    globalSetup: "./jest.setup.ts",
    transform: {
        "^.+.tsx?$": ["ts-jest", {}],
    },
};
