import { colors } from './colors';
import { typography } from './typography';

const theme = {
  colors,
  size: {
    minWidth: '300px',
    maxWidth: '480px',
    appBarHeight: '72px',
    radius: '30px',
  },
  zIndex: {
    overlay: 5,
    appBar: 10,
    bottomSheet: 30,
    dialog: 40,
    card: 40,
  },
  typo: { ...typography },
} as const;

export default theme;
