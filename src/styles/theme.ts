import { colors } from './colors';
import { typography } from './typography';

const theme = {
  colors,
  size: {
    minWidth: '300px',
    maxWidth: '480px',
    appBarHeight: '72px',
    radius: '10px',
  },
  zIndex: {
    appBar: 1000,
    FAB: 1000,
    overlay: 2000,
    bottomSheet: 3000,
    modal: 4000,
    toast: 5000,
    popup: 5000
},
  typo: { ...typography },
} as const;

export default theme;
