import React from 'react';
import { titleCase as TitleCase } from 'title-case';
import { Tag } from './Typography';

const TagGroup = ({ tags }) => {
  return (
    <ul>
      {tags.map((tag) => (
        <Tag key={tag}>{TitleCase(tag)}</Tag>
      ))}
    </ul>
  );
};

export { Tag, TagGroup };
