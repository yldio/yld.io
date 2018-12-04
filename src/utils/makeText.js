import React from 'react'

export const makeText = content => content.split('\n').filter(c => c.length)

export const makeTextComponents = Component => content =>
  makeText(content).map(cont => <Component key={cont}>{cont}</Component>)
