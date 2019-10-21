import React from 'react'
import TitleCase from 'title-case'
import styled from 'styled-components'

const Tag = styled.li`
  display: inline-block;
  background-color: #d8d8d8;
  color: ${({ theme }) => theme.colors.textLight};
  padding: 6px 12px;
  margin-right: 10px;
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
