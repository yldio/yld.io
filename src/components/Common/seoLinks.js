import React from 'react';
import styled from 'styled-components';
import { BodyStylised } from '../Typography';
import InternalAnchor from '../Common/InternalAnchor';
import { generate } from 'shortid';
import PagePaths from '../pagePaths';

const List = styled(BodyStylised)`
  line-height: 2rem;
`;

const ListItem = styled.li`
  display: inline-block;
  :not(:last-of-type) {
    :after {
      content: '/';
      padding: 0 8px;
    }
  }
`;

const SeoLinks = ({ items, ...props }) => {
  return (
    <PagePaths
      render={(pathsById) => (
        <List as="ul" {...props}>
          {(items || []).map((item) => {
            const path = pathsById[item.id];

            return (
              <ListItem key={generate()}>
                {path ? (
                  <InternalAnchor
                    to={path}
                    style={{ textDecoration: 'underline' }}
                    title={`Speciality - ${item.title.trim()}`}
                  >
                    {item.title.trim()}
                  </InternalAnchor>
                ) : (
                  item.title.trim()
                )}
              </ListItem>
            );
          })}
        </List>
      )}
    />
  );
};

export default SeoLinks;
