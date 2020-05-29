import { transform } from './transform'
import * as ts from 'typescript'
interface ConfigSet {
    compilerModule: typeof ts
}

export function factory(cs: ConfigSet) {
    return transform(cs.compilerModule)
}
