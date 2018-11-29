import styled from 'styled-components'
import remcalc from 'remcalc'
import is from 'styled-is'

export default styled.section`
    border: 1px solid;
    width: ${remcalc(301)};
    height: ${remcalc(360)};
    margin-right:20px;
     ${is('red')`
        border-color:#e92c2c;
     `}

    ${is('blue')`
        border-color: #2c49e9;
    `}

     ${is('violet')`
        border-color: #9500de;
     `}
`
