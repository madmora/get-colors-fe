import Primitives, { HtmlProps } from 'primitives'

const containerStyled: HtmlProps = {
  flexDirection: 'column',
  alignItems: 'flex-start',
}

const Policy = () => {
  return (
    <Primitives.Flex {...containerStyled}>
      <Primitives.Text>Políticas de seguridad:</Primitives.Text>
      <Primitives.Text>1. Mayúsculas</Primitives.Text>
      <Primitives.Text>2. Minúsculas</Primitives.Text>
      <Primitives.Text>3. Números</Primitives.Text>
      <Primitives.Text>4. Caracteres especiales</Primitives.Text>
      <Primitives.Text>5. Mínimo 10 caracteres</Primitives.Text>
    </Primitives.Flex>
  )
}

export default Policy
