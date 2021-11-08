// @ts-nocheck
import { Compiler } from 'webpack';
import { writeFileSync } from 'fs';
import fg from 'fast-glob';

class FindUnusedFiles {
    unused: Set<string>

    constructor(src: string) {
        this.unused = new Set(fg.sync(src, { absolute: true }))
    }

    apply(compiler: Compiler) {
        compiler.hooks.normalModuleFactory.tap('FindUnusedFiles', normalModuleFactory => {
            normalModuleFactory.hooks.module.tap('FindUnusedFiles', (_module, _createData) => {
                if (!_createData.resource.includes('node_modules')) {
                    const path = _createData.resource.toString();
                    if (this.unused.has(path)) {
                        this.unused.delete(path);
                    } else {
                        writeFileSync('unused', JSON.stringify(Array.from(this.unused), null, '\t'));
                    }
                }

                return _module;
            });
        });
    }
}

export default FindUnusedFiles;