import React from 'react';
import SearchBox from '../SearchBox';
import { render, fireEvent } from '@testing-library/react';
import { wrapper } from '../../../utils/tests/react';

test('<SearchBox/>', () => {
  const ref = React.createRef();
  const results = [
    { title: 'Blog Post', slug: '/blog/blog-post/' },
    { title: 'Blog Post 2', slug: '/blog/blog-post-2/' },
  ];
  const searchedData = jest.fn().mockReturnValue(results);
  const { getByTestId, queryByRole, queryAllByText } = render(
    <SearchBox ref={ref} searchedData={searchedData} />,
    { wrapper },
  );

  expect(queryByRole('listbox')).not.toBeInTheDocument();

  fireEvent.change(getByTestId(/search/i), {
    target: { value: 'blog' },
  });

  expect(searchedData).toHaveBeenCalledTimes(1);
  expect(searchedData).toHaveLastReturnedWith(results);

  const anchors = queryAllByText(/blog/i);

  expect(queryByRole('listbox')).toBeInTheDocument();
  expect(anchors).toHaveLength(2);

  anchors.forEach((anchor, idx) => {
    const title = results[idx].title;
    const href = results[idx].slug;
    expect(anchor.getAttribute('href')).toEqual(href);
    expect(anchor).toHaveTextContent(title);
  });
});
