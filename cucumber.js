import { setDefaultTimeout } from "@cucumber/cucumber";

module.exports = {
    default: {
      require: ["./tests/steps/*.ts", "./tests/support/*.ts"],
      publishQuiet: true,
      format: ["progress", "html:cucumber-report.html"],
      paths: ["./tests/features/*.feature"],
      requireModule: ["ts-node/register"],
      timeout: 50000
    }
  };  