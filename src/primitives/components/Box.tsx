import { styledSystemCompose, shouldForwardProp } from 'primitives/helpers'
import styled from 'styled-components/macro'
import { HtmlProps } from 'primitives'

const BoxStyled = styled.div.withConfig<any>({
  shouldForwardProp,
})`
  ${styledSystemCompose};
`

const Box = ({ css, ...props }: HtmlProps | any) => (
  <BoxStyled {...props} css={css} />
)

Box.displayName = 'Primitives.Box'

export default Box
