import assert from "node:assert/strict";
import test from "node:test";
import { Linter } from "eslint";
import react from "eslint-plugin-react";

// Exercise the glob-matching paths covered by the eslint-plugin-react patch.
// A normal lint run does not necessarily execute these optional rule settings.
const cases = [
  [
    "no-danger",
    { customComponentNames: ["Html*"] },
    'const x = <HtmlBlock dangerouslySetInnerHTML={{__html:"x"}} />;',
    1,
  ],
  [
    "forbid-component-props",
    { forbid: [{ propNamePattern: "data-*" }] },
    'const x = <Widget data-secret="x" />;',
    1,
  ],
  ["jsx-pascal-case", { ignore: ["BAD_*"] }, "const x = <BAD_NAME />;", 0],
  [
    "jsx-handler-names",
    { ignoreComponentNames: ["Widget*"] },
    "const x = <WidgetButton onClick={handleClick} />;",
    0,
  ],
  [
    "no-unstable-nested-components",
    { propNamePattern: "render*" },
    "function App() { return <Widget renderItem={() => <div />} />; }",
    0,
  ],
];

for (const [rule, options, code, expectedCount] of cases) {
  test(`react/${rule} supports the patched minimatch version`, () => {
    const messages = new Linter().verify(code, [
      {
        languageOptions: {
          ecmaVersion: "latest",
          sourceType: "module",
          parserOptions: { ecmaFeatures: { jsx: true } },
        },
        plugins: { react },
        settings: { react: { version: "detect" } },
        rules: { [`react/${rule}`]: ["error", options] },
      },
    ]);

    assert.equal(messages.length, expectedCount, JSON.stringify(messages));
    assert.ok(messages.every((message) => message.ruleId === `react/${rule}`));
  });
}
