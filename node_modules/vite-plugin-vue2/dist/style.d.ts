import type { TransformPluginContext } from 'rollup';
import type { SFCDescriptor } from '@vue/component-compiler-utils';
export declare function transformStyle(code: string, filename: string, descriptor: SFCDescriptor, index: number, pluginContext: TransformPluginContext): Promise<{
    code: string;
    map: any;
} | null>;
