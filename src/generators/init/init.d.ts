import { GeneratorCallback, Tree } from '@nrwl/devkit';
import { InitSchema } from './schema';
export default function (tree: Tree, schema: InitSchema): Promise<GeneratorCallback>;
