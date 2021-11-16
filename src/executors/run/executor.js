"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nx_exec_1 = require("@otterdev/nx-exec");
function runExecutor(options, context) {
    var _a, _b, _c;
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const projectRoot = context.workspace.projects[context.projectName].root;
        const parameters = (_b = (_a = options.parameters) === null || _a === void 0 ? void 0 : _a.join(' ')) !== null && _b !== void 0 ? _b : '';
        const opt = (_c = options.options) !== null && _c !== void 0 ? _c : '';
        const appPath = `apps/${context.projectName}`;
        const binPath = `${appPath}/bin/${context.projectName}.ts`;
        const outPath = options.outputPath || `dist/apps/${context.projectName}`;
        const profile = (options === null || options === void 0 ? void 0 : options.profile) ? `--profile ${options.profile}` : '';
        const stage = (options === null || options === void 0 ? void 0 : options.stage) ? `stage=${options.stage}` : '';
        const ctx = stage ? `--context='${stage}'` : '';
        const app = `--app "npx ts-node --prefer-ts-exts ${binPath}"`;
        const cmd = `cdk ${options.command} ${app} ${parameters} ${opt} -o ${outPath} ${ctx} ${profile}`;
        return (0, nx_exec_1.runExecutor)({
            command: cmd,
            cwd: projectRoot,
        });
    });
}
exports.default = runExecutor;
//# sourceMappingURL=executor.js.map
