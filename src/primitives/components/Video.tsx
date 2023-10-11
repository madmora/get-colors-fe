import styled from 'styled-components/macro'
import { styledSystemCompose, shouldForwardProp } from 'primitives/helpers'
import { HtmlProps } from 'primitives'

const VideoStyled = styled.video.withConfig<any>({
  shouldForwardProp,
})`
  ${styledSystemCompose};
`

const Video = ({ css, ...props }: HtmlProps | any) => (
  <VideoStyled {...props} css={css} />
)

Video.displayName = 'Primitives.Video'

export default Video
