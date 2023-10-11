import Primitives, { HtmlProps } from 'primitives'

const wrapperStyled: HtmlProps = {
  color: 'red',
}

const About = () => <Primitives.Flex {...wrapperStyled}>About</Primitives.Flex>

export default About
