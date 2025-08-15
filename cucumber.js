export default {
  default: {
    requireModule: ["ts-node/register"],
    require: ["tests/steps/**/*.ts", "tests/support/**/*.ts"],
    publishQuiet: true, // opcional, versões novas aceitam via config; se der erro, remova.
    format: ["progress", "json:reports/cucumber-report.json"],
    tags: "not @wip",
    parallel: 2,
    worldParameters: { baseURL: "https://www.amazon.com.br" },
  },
};
