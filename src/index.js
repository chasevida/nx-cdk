"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cdkRunExecutor = exports.cdkAppNormalizeOptions = exports.cdkAppGenerator = void 0;
const tslib_1 = require("tslib");
const generator_1 = require("./generators/app/generator");
exports.cdkAppGenerator = generator_1.default;
Object.defineProperty(exports, "cdkAppNormalizeOptions", { enumerable: true, get: function () { return generator_1.normalizeOptions; } });
const executor_1 = require("./executors/run/executor");
exports.cdkRunExecutor = executor_1.default;
(0, tslib_1.__exportStar)(require("./generators/app/schema"), exports);
(0, tslib_1.__exportStar)(require("./executors/run/schema"), exports);
//# sourceMappingURL=index.js.map