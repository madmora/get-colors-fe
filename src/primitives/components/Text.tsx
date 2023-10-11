import styled from 'styled-components/macro'
import { styledSystemCompose, shouldForwardProp } from 'primitives/helpers'
import { HtmlProps } from 'primitives'

const TextStyled = styled.span.withConfig<any>({
  shouldForwardProp,
})`
  ${styledSystemCompose};
`

const Text = ({ css, ...props }: HtmlProps | any) => (
  <TextStyled {...props} css={css} />
)

Text.displayName = 'Primitives.Text'

export default Text
