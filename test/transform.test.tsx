import { resolve } from "path";
import { readFileSync } from "fs-extra";
import * as ReactDOM from 'react-dom'
import * as React from 'react'
import {Foo} from './fixture/El'
import * as ts from 'typescript'
import {transform} from '../src'

describe("transformer", function() {
  it.skip("should hoist el with primitive attributes", function() {
    const fileName = resolve(__dirname, "fixture/El.tsx")
    const {outputText} = ts.transpileModule(
      readFileSync(fileName, 'utf8'),
      {
        transformers: {
          before: [transform(ts)]
        },
        fileName
      }
    )
    expect(outputText).toContain('test/fixture/El.tsx", lineNumber: 9 }');
    expect(outputText).toContain('test/fixture/El.tsx", lineNumber: 11 }');
    expect(outputText).toContain('test/fixture/El.tsx", lineNumber: 12 }');
    
  });
  it('should integrate with ts-jest', function () {
    const el = document.createElement('div')
    document.body.appendChild(el)
    expect(() => ReactDOM.render(<Foo/>, el)).not.toThrow()
  })
});
