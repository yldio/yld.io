import React from 'react'
import styled from 'styled-components'
import { H6 } from '../Typography'
import { Link } from 'gatsby'
import PagePaths from '../pagePaths'

const List = props => React.createElement(H6.withComponent('ul'), props)

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
        <List {...props}>
          {(items || []).map((item, i) => {
            const path = pathsById[item.id]
            if (path) {
              return (
                <ListItem>
                  <Link
                    key={item.id}
                    to={path}
                    style={{ textDecoration: 'underline' }}
                  >
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
