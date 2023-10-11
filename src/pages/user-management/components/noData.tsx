import defaultTheme from 'lib/theme/default'
import Primitives, { HtmlProps } from 'primitives'

const containerStyled: HtmlProps = {
  width: 1,
  justifyContent: 'center',
  alignItems: 'center',
  p: 4,
  minHeight: '200px',
}

const textStyled: HtmlProps = {
  fontSize: [8, 9, 10, 11, 12],
  color: defaultTheme.colors.brown,
  fontWeight: 2,
  textAlign: 'center',
}

const NoData = () => {
  return (
    <Primitives.Flex {...containerStyled}>
      <Primitives.Text {...textStyled}>
        No se han encontrado resultados.
      </Primitives.Text>
    </Primitives.Flex>
  )
}

export default NoData
