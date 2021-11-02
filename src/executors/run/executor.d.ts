import { CDKRunExecutorSchema } from './schema';
import { ExecutorContext } from '@nrwl/devkit';
export default function runExecutor(options: CDKRunExecutorSchema, context: ExecutorContext): Promise<{
    success: boolean;
}>;
