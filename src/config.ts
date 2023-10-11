interface Config {
  graphqlUri: string
  apiEndpoint: string
}

const config: Config = {
  graphqlUri: process.env.REACT_APP_API_ENDPOINT
    ? `${process.env.REACT_APP_API_ENDPOINT}/graphql`
    : 'http://localhost:3001/graphql',
  apiEndpoint: process.env.REACT_APP_API_ENDPOINT || 'http://localhost:3001',
}

export default config
