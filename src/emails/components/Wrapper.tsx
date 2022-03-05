import * as React from 'react'

declare global {
  namespace JSX {
      interface IntrinsicElements {
        center: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
      }
  }
}

export default function Wrapper({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <center className="w-full table-fixed bg-gray-200 pb-16">
      {children}
    </center>
  )
}