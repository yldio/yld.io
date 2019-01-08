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

const width = scale => (key, n) => {
  if (n === 0) {
    return `
      width: 0;
      position: absolute;
      top: -9999px;
      left: -9999px;
    `
  }

  return `
    ${dec(['width', !num(n) || n > 1 ? px(n) : n * 100 + '%'])}
      position: initial;
      top: 0;
      left: 0;
  `
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
  m: space(spacing),
  p: space(spacing),
  width: width(spacing),
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
    max-width: calc(100% - 62px);

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
    max-width: calc(100% - 84px);
  `}

  ${breakpoint('tablet')`
    max-width: calc(100% - 92px);
  `}

  ${breakpoint('desktop')`
    max-width: 1100px;
  `}

  max-width: calc(100% - 48px);
  position: relative;

  ${props => css(props)}
`

const Flex = styled.div`
  flex-wrap: wrap;
  position: relative;
  overflow: hidden;
  ${props => css(props)};
  display: flex;
  ${props =>
    props.block &&
    `
    display: block;
  `};
`

export const Grid = props => <GridStyled mx="auto" {...props} />

export const Row = props => (
  <Flex mx={[-1, -3, -60, -42, -48, -48]} {...props} />
)

export const Col = props => (
  <Flex block px={[1, 3, 60, 42, 48, 48]} {...props} />
)

export const CompensatedRow = props => <Flex mx={[-1, -1.5, -2]} {...props} />

export const CompensatedCol = props => (
  <Flex block px={[1, 1.5, 2]} {...props} />
)
