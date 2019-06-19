import React from 'react'
import styled from 'styled-components'
import { BodyStylised } from '../Typography'
import { Link } from 'gatsby'
import { generate } from 'shortid'
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

            return (
              <ListItem key={generate()}>
                {path ? (
                  <Link
                    to={path}
                    style={{ textDecoration: 'underline' }}
                    title={`Speciality - ${item.title.trim()}`}
                  >
                    {item.title.trim()}
                  </Link>
                ) : (
                  item.title.trim()
                )}
              </ListItem>
            )
          })}
        </List>
      )}
    />
  )
}
