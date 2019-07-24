import styled from 'styled-components'

export default styled.section`
  /* I know text should not be used here but black: colorVariables.darkBlack...  */
  background-color: ${({ theme }) => theme.colors.text};
`
