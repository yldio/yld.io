import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

let cachedPathsById = null;
const PagePaths = (props) => {
  if (cachedPathsById) {
    return props.render(cachedPathsById);
  }

  return (
    <StaticQuery
      query={graphql`
        query {
          allSitePage {
            edges {
              node {
                id
                path
                pageContext
              }
            }
          }
        }
      `}
      render={(data) => {
        cachedPathsById = {};
        data.allSitePage.edges.forEach((edge) => {
          // eslint-disable-next-line no-return-assign
          return (
            edge.node.pageContext &&
            (cachedPathsById[edge.node.pageContext.id] = edge.node.path)
          );
        });

        return props.render(cachedPathsById);
      }}
    />
  );
};

export default PagePaths;
