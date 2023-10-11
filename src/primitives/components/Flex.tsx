import styled from 'styled-components/macro'
import { styledSystemCompose, shouldForwardProp } from 'primitives/helpers'
import { HtmlProps } from 'primitives'

const FlexStyled = styled.div.withConfig<any>({
  shouldForwardProp,
})`
  display: flex;
  ${styledSystemCompose};
`
const Flex = ({ css, ...props }: HtmlProps | any) => (
  <FlexStyled {...props} css={css} />
)

Flex.displayName = 'Primitives.Flex'

export default Flex
