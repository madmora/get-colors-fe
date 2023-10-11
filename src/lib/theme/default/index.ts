interface Colors {
  white: string
  error: string
  brown: string
  orange: string
  grey: string
  greyLight: string
}
interface DefaultTheme {
  breakpoints: string[]
  space: number[]
  fontWeights: number[]
  fontSizes: number[]
  lineHeights: number[]
  colors: Colors
}

const defaultTheme: DefaultTheme = {
  breakpoints: ['600px', '900px', '1200px', '1536px'],
  space: [
    0, // 0
    8, // 1
    16, // 2
    24, // 3
    32, // 4
    48, // 5
    96, // 6
    130, // 7
  ],
  fontWeights: [200, 400, 600],
  fontSizes: [
    10, // 0
    12, // 1
    14, // 2
    16, // 3
    18, // 4
    20, // 5
    24, // 6
    28, // 7
    32, // 8
    36, // 9
    42, // 10
    48, // 11
    54, // 12
    60, // 13
    66, // 14
    72, // 15
    78, // 16
    84, // 17
    90, // 18
    96, // 19
    100, // 20
  ],
  lineHeights: [
    1, // 0
    1.125, // 1
    1.25, // 2
    1.5, // 3
    1.75, // 4
  ],
  colors: {
    white: '#FFFFFF',
    error: '#D32F2F',
    brown: '#281705',
    orange: '#FFA000',
    grey: '#808080',
    greyLight: '#f1f1f1',
  },
}

export default defaultTheme
