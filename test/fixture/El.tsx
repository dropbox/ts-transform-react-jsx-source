import * as React from "react";
import {Deep1} from './Deep1'
import {Deep2} from './Deep2'
import {Deep3} from './Deep3'
export interface Props {
  className?: string;
}
export function Foo(props: Props) {
  return (
    <div className={props.className}>
      <img src="" hidden={false} width={1} srcSet={"test 200px"} />
      <p>
        <Deep3>
          <Deep2 items={['foo', 'bar'].map(t => <span>{t}</span>)}>
            <Deep1/>
          </Deep2>
        </Deep3>
      </p>
    </div>
  );
}
