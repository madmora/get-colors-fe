import Primitives, { HtmlProps } from 'primitives'

const containerStyled: HtmlProps = {
  justifyContent: 'center',
  alignItems: 'center',
  width: 1,
  p: 2,
  backgroundImage: 'url(/img/banner.jpg)',
  backgroundPosition: '50% 50%',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
}

export const Home = () => {
  return <Primitives.Flex {...containerStyled} />
}
