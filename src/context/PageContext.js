import { createContext } from 'react';

import { colors } from '../utils/theme';

export const HomePageContext = createContext(/* boolean */ false);

export const ModalPageContext = createContext(/* boolean */ false);

export const logoStyleDefaults = {
  fillColorInitial: colors.blueBg, // CSS color
  fillColorHover: colors.grey, // CSS color

  textColor: colors.white, // CSS color

  serviceColor: undefined, // CSS color | undefined (default fillColorInitial)
};
export const LogoStyleContext = createContext(logoStyleDefaults);
