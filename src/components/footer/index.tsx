import Primitives, { HtmlProps } from 'primitives'

const wrapperStyled: HtmlProps = {
  minHeight: '64px',
  width: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'brown',
}

const Footer = () => {
  return (
    <Primitives.Flex {...wrapperStyled}>
      <Primitives.Text color="orange" fontWeight="bold">
        Get Colors
      </Primitives.Text>
    </Primitives.Flex>
  )
}

export default Footer
