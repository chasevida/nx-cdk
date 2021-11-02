"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const devkit_1 = require("@nrwl/devkit");
const jest_1 = require("@nrwl/jest");
const run_tasks_in_serial_1 = require("@nrwl/workspace/src/utilities/run-tasks-in-serial");
function addIfNotExists(arr, item) {
    if (arr && !arr.includes(item)) {
        arr.push(item);
    }
}
function updateCacheableTasks(tree) {
    (0, devkit_1.updateJson)(tree, 'nx.json', (json) => {
        var _a, _b, _c;
        const defaultCacheableOperations = (_c = (_b = (_a = json.tasksRunnerOptions) === null || _a === void 0 ? void 0 : _a.default) === null || _b === void 0 ? void 0 : _b.options) === null || _c === void 0 ? void 0 : _c.cacheableOperations;
        addIfNotExists(defaultCacheableOperations, 'synth');
        return json;
    });
}
function updateDependencies(tree) {
    (0, devkit_1.updateJson)(tree, 'package.json', (json) => {
        if (json.dependencies && json.dependencies['nx-cdk']) {
            delete json.dependencies['nx-cdk'];
        }
        return json;
    });
    return (0, devkit_1.addDependenciesToPackageJson)(tree, {
        '@aws-cdk/core': '^1.124.0',
        'source-map-support': '^0.5.20',
    }, {
        '@aws-cdk/assert': '^1.124.0',
        '@types/node': '^12.20.26',
        'ts-node': '^10.2.1',
        '@otterdev/nx-cdk': '^0.0.11',
    });
}
function default_1(tree, schema) {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const tasks = [];
        if (!schema.unitTestRunner || schema.unitTestRunner === 'jest') {
            const jestTask = (0, jest_1.jestInitGenerator)(tree, {});
            tasks.push(jestTask);
        }
        const installTask = updateDependencies(tree);
        tasks.push(installTask);
        updateCacheableTasks(tree);
        yield (0, devkit_1.formatFiles)(tree);
        return (0, run_tasks_in_serial_1.runTasksInSerial)(...tasks);
    });
}
exports.default = default_1;
//# sourceMappingURL=init.js.map