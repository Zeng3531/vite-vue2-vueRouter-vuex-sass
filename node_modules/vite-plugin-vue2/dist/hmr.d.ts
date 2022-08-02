import type { HmrContext, ModuleNode } from 'vite';
import type { ResolvedOptions } from './index';
/**
 * Vite-specific HMR handling
 */
export declare function handleHotUpdate({ file, modules, read }: HmrContext, options: ResolvedOptions): Promise<ModuleNode[] | void>;
