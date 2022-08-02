import type { ASTNode } from './utils';
import type { TransformAssetUrlsOptions } from './assetUrl';
declare const _default: (transformAssetUrlsOptions?: TransformAssetUrlsOptions | undefined) => {
    postTransformNode: (node: ASTNode) => void;
};
export default _default;
