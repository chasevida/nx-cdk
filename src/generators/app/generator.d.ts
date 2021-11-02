import { Tree } from '@nrwl/devkit';
import { AppGeneratorSchema } from './schema';
export interface NormalizedSchema extends AppGeneratorSchema {
    projectName: string;
    projectRoot: string;
    projectDirectory: string;
    parsedTags: string[];
}
export declare function normalizeOptions(host: Tree, options: AppGeneratorSchema): NormalizedSchema;
export declare function addJest(host: Tree, options: NormalizedSchema): Promise<import("@nrwl/devkit").GeneratorCallback>;
export default function (host: Tree, schema: AppGeneratorSchema): Promise<import("@nrwl/devkit").GeneratorCallback>;
