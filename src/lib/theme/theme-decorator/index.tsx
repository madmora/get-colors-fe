import React from 'react'
import { ThemeProvider } from 'styled-components/macro'
import defaultTheme from '../default'
import GlobalStyle from '../global-style'

type ThemeDecoratorProps = {
  children: React.ReactNode
}
const ThemeDecorator = ({ children }: ThemeDecoratorProps) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      {children}
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default ThemeDecorator
