import styled from 'styled-components/macro'
import { styledSystemCompose, shouldForwardProp } from 'primitives/helpers'
import { HtmlProps } from 'primitives'

const ImageStyled = styled.img.withConfig<any>({
  shouldForwardProp,
})`
  ${styledSystemCompose};
`

const Image = ({ css, ...props }: HtmlProps | any) => (
  <ImageStyled {...props} css={css} />
)

Image.displayName = 'Primitives.Image'

export default Image
