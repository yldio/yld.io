import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

const JOBS_BY_LOCATION = graphql`
  query JOBS_BY_CITY {
    allLever(limit: 40) {
      group(field: { categories: { team: SELECT } }) {
        edges {
          node {
            id
            categories {
              location
              commitment
              team
            }
            text
            hostedUrl
          }
        }
      }
    }
  }
`;

const sortJobs = (jobsByCategory, limit) => {
  const sortedJobs = [];
  jobsByCategory.forEach((group) => {
    const { team } = group.edges[0].node.categories;
    const limitedJobs = group.edges.slice(0, limit);

    sortedJobs.push({
      team,
      jobs: limitedJobs,
    });
  });

  return sortedJobs;
};

/**
 * Aux function for adjusting the group ordering.
 * The current sorting brought from the query is alphabetical but
 * it seems London is suppposed to come first in the list.
 */

const JobsByLocation = ({ children, sort = sortJobs, limit }) => (
  <StaticQuery
    query={JOBS_BY_LOCATION}
    render={({ allLever }) => children(sort(allLever.group, limit))}
  />
);

export default JobsByLocation;
