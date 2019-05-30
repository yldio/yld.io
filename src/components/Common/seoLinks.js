import React from 'react'
import styled from 'styled-components'
import { BodyStylised } from '../Typography'
import { Link } from 'gatsby'
import PagePaths from '../pagePaths'

const List = props => React.createElement(BodyStylised, props)

const ListItem = styled.li`
  display: inline-block;
  :not(:last-of-type) {
    :after {
      content: '/';
      padding: 0 8px;
    }
  }
`

export default function SeoLinks({ items, ...props }) {
  return (
    <PagePaths
      render={pathsById => (
        <List as="ul" {...props}>
          {(items || []).map(item => {
            const path = pathsById[item.id]
            if (path) {
              return (
                <ListItem key={item.id}>
                  <Link to={path} style={{ textDecoration: 'underline' }}>
                    {item.title.trim()}
                  </Link>
                </ListItem>
              )
            }

            return <ListItem key={item.id}>{item.title}</ListItem>
          })}
        </List>
      )}
    />
  )
}
