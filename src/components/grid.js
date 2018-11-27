import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'
import { spacing, breakpoints } from '../utils/theme'

const css = props => {
  const breaks = [null, ...Object.values(breakpoints)]
  const sx = stylers()
  const rules = []

  for (let key in props) {
    const val = props[key]
    const cx = createRule(breaks, sx)(key, val)

    rules.push(cx)
  }

  return rules.map(r => Array.from(new Set(r)))
}

const createRule = (breaks, sx) => (key, val) => {
  const k = key.charAt(0)
  const style = sx[key] || sx[k] || null

  return toArr(val)
    .map((v, i) => {
      if (style) {
        const bp = breaks[i]
        const decs = style(key, v)
        const body = `${decs};`
        const rule = media(bp, body)
        return rule
      }

      return null
    })
    .filter(r => r !== null)
}

const toArr = n => (Array.isArray(n) ? n : [n])
const num = n => typeof n === 'number' && !isNaN(n)

const dec = args => args.join(':')
const rule = args => args.join(';')
const media = (bp, body) =>
  bp ? `@media screen and (min-width:${remcalc(bp)}){${body}}` : body

const width = (key, n) => {
  return dec(['width', !num(n) || n > 1 ? px(n) : n * 100 + '%'])
}
const px = n => (num(n) ? n + 'px' : n)

const space = scale => (key, n) => {
  const [a, b] = key.split('')
  const prop = a === 'm' ? 'margin' : 'padding'
  const dirs = directions[b] || ['']
  const neg = n < 0 ? '-' : ''
  const val = !num(n) ? n : neg + (scale[Math.abs(n)] || Math.abs(n))
  const rules = rule(dirs.map(d => dec([prop + d, val])))

  return rules
}

const directions = {
  t: ['-top'],
  r: ['-right'],
  b: ['-bottom'],
  l: ['-left'],
  x: ['-left', '-right'],
  y: ['-top', '-bottom']
}

const block = (key, n) => dec(['display', n ? 'block' : 'flex'])
const wrap = (key, n) => dec(['flex-wrap', n ? 'wrap' : 'nowrap'])
const auto = (key, n) => dec(['flex', '1 1 auto'])
const column = (key, n) => dec(['flex-direction', n ? 'column' : 'row'])
const align = (key, n) => dec(['align-items', n])
const justify = (key, n) => dec(['justify-content', n])
const order = (key, n) => dec(['order', n])

const stylers = () => ({
  width,
  m: space(spacing),
  p: space(spacing),
  block,
  wrap,
  auto,
  column,
  align,
  justify,
  order
})

const GridStyled = styled.div`
  ${breakpoint('phone')`
    max-width: 408px;

    p {
      max-width: 390px;
    }
  `}
    ${breakpoint('largePhone')`
    max-width: 480px;
    p {
      max-width: 390px;
    }
  `}
   ${breakpoint('smallTablet')`
    max-width: 683px;
 `}
   ${breakpoint('tablet')`
    max-width: 982px;
 `}
   ${breakpoint('desktop')`
    max-width: 1100px;
  `}

  max-width: 272px;

  ${props => css(props)}
`

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${props => css(props)};
  /* ${props => console.log(css(props))} */
`

export const Grid = props => <GridStyled {...props} mx="auto" />

export const Row = props => (
  <Flex {...props} mx={[-2, -3, -60, -42, -48, -48]} />
)

export const Col = props => (
  <Flex block {...props} px={[2, 3, 60, 42, 48, 48]} />
)
