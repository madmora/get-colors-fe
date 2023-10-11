import Primitives, { HtmlProps } from 'primitives'
import { AppConstants } from 'utils/constants'

const wrapperStyled: HtmlProps = {
  width: 1,
  minHeight: AppConstants.PAGE_MIN_HEIGHT,
  justifyContent: 'center',
  alignItems: 'center',
}

const containerStyled: HtmlProps = {
  height: ['100%', '100%', 'inherit'],
  justifyContent: 'space-around',
  maxWidth: '1300px',
  flexDirection: ['column', 'column', 'row'],
}

const leftContent: HtmlProps = {
  width: [1, 1, 1 / 2],
  flexDirection: 'column',
  p: [2, 3, 4],
  textAlign: ['center', 'center', 'inherit'],
}

const rightContent: HtmlProps = {
  width: [1, 1, 1 / 2],
  flexDirection: 'column',
  p: [2, 3, 4],
  alignItems: 'center',
}

const titleStyled: HtmlProps = {
  fontSize: [13, 14, 15],
  m: 0,
  mb: 3,
}

const subtitleStyled: HtmlProps = {
  m: 0,
  fontSize: [7, 8, 9],
  fontWeight: 0,
}

const imageStyled: HtmlProps = {
  maxWidth: '200px',
}

const PageNoFound = () => {
  return (
    <Primitives.Flex {...wrapperStyled}>
      <Primitives.Flex {...containerStyled}>
        <Primitives.Flex {...leftContent}>
          <Primitives.Text as="h2" {...titleStyled}>
            Oops!
          </Primitives.Text>
          <Primitives.Text as="h3" {...subtitleStyled}>
            Parece que no podemos encontrar la página que estás buscando.
          </Primitives.Text>
        </Primitives.Flex>
        <Primitives.Flex {...rightContent}>
          <Primitives.Image src="/img/page-no-found-img.png" {...imageStyled} />
        </Primitives.Flex>
      </Primitives.Flex>
    </Primitives.Flex>
  )
}

export default PageNoFound
