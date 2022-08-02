import type { SFCBlock } from '@vue/component-compiler-utils';
import type { TransformPluginContext } from 'rollup';
import type { ResolvedOptions } from './index';
export declare function compileSFCTemplate(source: string, block: SFCBlock, filename: string, { isProduction, vueTemplateOptions }: ResolvedOptions, pluginContext: TransformPluginContext): {
    code: string;
    map: null;
};
export declare function transformRequireToImport(code: string): string;
