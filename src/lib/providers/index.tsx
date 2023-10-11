/* eslint-disable react/prop-types */
import React from 'react'
import ThemeDecorator from 'lib/theme'
import { createClient } from 'lib/apollo/client'
import { ApolloProvider } from '@apollo/client'

interface ProvidersProps {
  children: React.ReactNode
}

export const Providers = ({ children }: ProvidersProps) => {
  const client = createClient()
  return (
    <ApolloProvider client={client}>
      <ThemeDecorator>{children}</ThemeDecorator>
    </ApolloProvider>
  )
}

export default Providers
