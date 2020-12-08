import * as React from 'react'
export function Deep3(props: any) {
  const foo = {style: {}}
  return <span {...foo}>Deep3{props.children}</span>
}
