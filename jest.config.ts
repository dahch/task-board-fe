export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "jest-transform-stub",
  },
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": [
      "babel-jest",
      {
        presets: [
          ["@babel/preset-env", { targets: { node: "current" } }],
          "@babel/preset-typescript",
          ["@babel/preset-react", { runtime: "automatic" }],
        ],
      },
    ],
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-dnd|react-dnd-html5-backend|dnd-core|@react-dnd)/.*)",
  ],
  testMatch: ["**/__tests__/**/*.test.(ts|tsx)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  moduleDirectories: ["node_modules", "src"],
};
