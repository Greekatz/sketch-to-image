import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Correctly compute directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...compat.config({
    extends: ["next", "prettier"],
    rules: {
      // Disable or relax rules here
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-explicit-any": "warn", // or "off"
      "@next/next/no-img-element": "off",
      "@typescript-eslint/no-empty-object-type": "off",
    },
  }),
];

export default eslintConfig;
