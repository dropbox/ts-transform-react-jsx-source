import * as React from 'react'
export function Deep2(props: any) {
  return (
    <span>
      Deep2{props.children}
      {props.items}
    </span>
  )
}
