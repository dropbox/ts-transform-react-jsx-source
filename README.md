# ts-transform-react-jsx-source

![build status](https://travis-ci.org/dropbox/ts-transform-react-jsx-source.svg?branch=master)

This is a TypeScript AST Transformer that adds source file and line number to JSX elements, similar to [babel-plugin-transform-react-jsx-source](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx-source).

## Usage
### Custom compiler
First of all, you need some level of familiarity with the [TypeScript Compiler API](https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API).

`compile.ts` & tests should have examples of how this works.

### ts-loader
You can add this in your webpack config `ts-loader`.
```
import {transform} from 'ts-transform-react-jsx-source';
// webpack config
...
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              getCustomTransformers() {
                return {
                  before: [transform()],
                };
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
```

## License

Copyright (c) 2018 Dropbox, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.