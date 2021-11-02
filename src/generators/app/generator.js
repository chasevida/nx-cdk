"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addJest = exports.normalizeOptions = void 0;
const tslib_1 = require("tslib");
const devkit_1 = require("@nrwl/devkit");
const path = require("path");
const jest_1 = require("@nrwl/jest");
const init_1 = require("../init/init");
const run_tasks_in_serial_1 = require("@nrwl/workspace/src/utilities/run-tasks-in-serial");
function normalizeOptions(host, options) {
    const name = (0, devkit_1.names)(options.name).fileName;
    const projectDirectory = options.directory
        ? `${(0, devkit_1.names)(options.directory).fileName}/${name}`
        : name;
    const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
    const projectRoot = `${(0, devkit_1.getWorkspaceLayout)(host).appsDir}/${projectDirectory}`;
    const parsedTags = options.tags
        ? options.tags.split(',').map((s) => s.trim())
        : [];
    return Object.assign(Object.assign({}, options), { projectName,
        projectRoot,
        projectDirectory,
        parsedTags });
}
exports.normalizeOptions = normalizeOptions;
function addJest(host, options) {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (options.unitTestRunner !== 'jest') {
            return () => {
                /* do nothing */
            };
        }
        return yield (0, jest_1.jestProjectGenerator)(host, {
            project: options.projectName,
            supportTsx: true,
            skipSerializers: true,
            setupFile: 'none',
            babelJest: true,
        });
    });
}
exports.addJest = addJest;
function addFiles(host, options) {
    const templateOptions = Object.assign(Object.assign(Object.assign({}, options), (0, devkit_1.names)(options.name)), { offsetFromRoot: (0, devkit_1.offsetFromRoot)(options.projectRoot), template: '' });
    (0, devkit_1.generateFiles)(host, path.join(__dirname, 'files'), options.projectRoot, templateOptions);
}
function default_1(host, schema) {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const options = normalizeOptions(host, schema);
        const initTask = yield (0, init_1.default)(host, options);
        const defaultOutputPath = `dist/${options.projectRoot}`;
        const runTarget = (options) => ({
            executor: '@otterdev/nx-cdk:run',
            options: Object.assign({ outputPath: defaultOutputPath }, options),
        });
        const outputs = ['{options.outputPath}'];
        (0, devkit_1.addProjectConfiguration)(host, options.projectName, {
            root: options.projectRoot,
            projectType: 'application',
            targets: {
                list: Object.assign(Object.assign({}, runTarget({ command: 'list' })), { outputs }),
                synth: Object.assign(Object.assign({}, runTarget({ command: 'synth' })), { outputs }),
                build: Object.assign(Object.assign({}, runTarget({ command: 'synth', options: '-q' })), { outputs }),
                bootstrap: runTarget({
                    command: 'bootstrap',
                }),
                deploy: Object.assign(Object.assign({}, runTarget({ command: 'deploy' })), { outputs }),
                destroy: runTarget({ command: 'destroy' }),
                diff: runTarget({ command: 'diff' }),
                metadata: runTarget({ command: 'metadata' }),
                context: runTarget({ command: 'context' }),
                docs: runTarget({ command: 'docs' }),
                doctor: runTarget({ command: 'doctor' }),
            },
            tags: options.parsedTags,
            implicitDependencies: options.project ? [options.project] : undefined,
        });
        addFiles(host, options);
        const jestTask = yield addJest(host, options);
        yield (0, devkit_1.formatFiles)(host);
        return (0, run_tasks_in_serial_1.runTasksInSerial)(initTask, jestTask);
    });
}
exports.default = default_1;
//# sourceMappingURL=generator.js.map