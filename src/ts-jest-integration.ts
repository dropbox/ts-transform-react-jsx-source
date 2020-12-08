import {transform} from './transform'
import * as ts from 'typescript'
interface ConfigSet {
  compilerModule: typeof ts
}
export const name = 'ts-transform-react-jsx-source'
export const version = 1

export function factory(cs: ConfigSet) {
  return transform(cs.compilerModule)
}
