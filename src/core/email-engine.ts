import fs from 'fs-extra'
import path from 'path'
import React from 'react'
import juice from 'juice'
import ReactDOMServer from 'react-dom/server'

export const render = async <TProps>({
  component,
  props
}: {
  component: React.FunctionComponent<TProps>
  props: TProps
}) => {
  const indexTemplateHtml = await fs.readFile(path.resolve(__dirname, '../emails/index.html'), 'utf8')
  const mainCss = await fs.readFile(path.resolve(__dirname, '../emails/main.css'), 'utf8')

  console.log('X--> MAIN CSS:')
  console.log(mainCss)
  
  // get HTML string from the `App` component
  const element = React.createElement(component, props, null)
  const root = ReactDOMServer.renderToString(element)
  
  // populate `#app` element with `appHtml`
  const html = indexTemplateHtml.replace('<div id="root"></div>', `<div id="root">${root}</div>`)
  
  const juiced = juice(html, {
    extraCss: mainCss
  })

  const withoutClasses = juiced.replace(/\sclass=\"(.+?)\"/g, '')

  return withoutClasses
}

export default {
  render
}