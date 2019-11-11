import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';

const AllTheProviders = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export const wrapper = AllTheProviders;
