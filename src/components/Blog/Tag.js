import React from 'react'
import TitleCase from 'title-case'
import styled from 'styled-components'
import remcalc from 'remcalc'

const Tag = styled.li`
  display: inline-block;
  background-color: #d8d8d8;
  color: ${({ theme }) => theme.colors.textLight};
  padding: ${remcalc(6)} ${remcalc(12)};
  margin-right: ${remcalc(10)};
  margin-bottom: ${remcalc(24)};
  font-family: 'PT Mono';
`

const TagGroup = ({ tags }) => {
  return (
    <ul>
      {tags.map(tag => (
        <Tag key={tag}>{TitleCase(tag)}</Tag>
      ))}
    </ul>
  )
}

export { Tag, TagGroup }
