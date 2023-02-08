import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import groupBy from 'lodash.groupby';

const JOBS_BY_LOCATION = graphql`
  query JOBS_BY_CITY {
    allGreenhouseJob {
      edges {
        node {
          id
          internal_job_id
          title
          absolute_url
          content
          location {
            name
          }
          departments {
            name
          }
        }
      }
    }
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
  return Object.entries(
    groupBy(jobsByCategory, ({ edges = [], node = {} }) => {
      return edges.length
        ? edges[0]?.node?.categories?.team
        : node.departments[0].name;
    }),
  ).map(([team, jobs]) => {
    return {
      team,
      jobs: jobs
        .map(({ edges = [], node }) => {
          return edges.length ? edges[0].node : node;
        })
        .map(
          ({
            id,
            text,
            title,
            hostedUrl,
            absolute_url,
            categories,
            departments = [],
            location,
          }) => {
            return {
              // eslint-disable-next-line camelcase
              hostedUrl: hostedUrl || absolute_url,
              id,
              text: text || title,
              categories: {
                commitment: categories?.commitment,
                location: categories?.location || location?.name,
                team: categories?.team || departments[0]?.name,
              },
            };
          },
        ),
    };
  });
};

/**
 * Aux function for adjusting the group ordering.
 * The current sorting brought from the query is alphabetical but
 * it seems London is suppposed to come first in the list.
 */

const JobsByLocation = ({ children, sort = sortJobs }) => (
  <StaticQuery
    query={JOBS_BY_LOCATION}
    render={({ allLever, allGreenhouseJob }) =>
      children(sort(allLever.group.concat(allGreenhouseJob.edges)))
    }
  />
);

export default JobsByLocation;
