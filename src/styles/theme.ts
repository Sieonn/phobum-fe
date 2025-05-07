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
    appBar: 100,
    FAB: 100,
    overlay: 200,
    bottomSheet: 300,
    modal: 400,
    toast: 500,
    popup: 500
  },
  typo: { ...typography },
} as const;

export default theme;
