import type { TransformPluginContext } from 'rollup';
import type { RawSourceMap } from 'source-map';
import type { ResolvedOptions } from './index';
export declare function transformMain(code: string, filePath: string, options: ResolvedOptions, pluginContext: TransformPluginContext): Promise<{
    code: string;
    map: RawSourceMap | undefined;
}>;
export declare const FS_PREFIX = "/@fs/";
export declare const queryRE: RegExp;
export declare const hashRE: RegExp;
export declare function cleanUrl(url: string): string;
