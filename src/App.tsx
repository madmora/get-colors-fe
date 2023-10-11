import Footer from 'components/footer'
import GraphqlErrorModal from 'components/graphql-error-modal'
import Navbar from 'components/nav-bar'
import Primitives, { HtmlProps } from 'primitives'
import { AppConstants } from 'utils/constants'

interface AppProps {
  children: React.ReactNode
}

const containerStyled: HtmlProps = {
  minHeight: AppConstants.PAGE_MIN_HEIGHT,
  width: 1,
}

export const App = ({ children }: AppProps) => (
  <>
    <Navbar />
    <Primitives.Flex {...containerStyled}>{children}</Primitives.Flex>
    <Footer />
    <GraphqlErrorModal />
  </>
)
