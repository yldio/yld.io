import { createContext } from 'react';

import { colors } from '../utils/theme';

export const HomePageContext = createContext(/* boolean */ false);

export const ModalPageContext = createContext(/* boolean */ false);

export const logoStyleDefaults = {
  type: 'default', // 'default' | 'squared'

  fillColorInitial: colors.text, // CSS color
  fillColorHover: undefined, // CSS color | undefined (default fillColorInitial)

  textColor: colors.white, // CSS color (squared only)

  serviceColor: undefined, // CSS color | undefined (default fillColorInitial)
};
export const LogoStyleContext = createContext(logoStyleDefaults);
