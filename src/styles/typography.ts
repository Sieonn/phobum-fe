import { css } from "styled-components";

export const typography = {
  title100: css`
    font-family: 'Galmuri9';
    font-size: 20px;
  `,

  title200: css`
    font-family: 'Galmuri14';
    font-size: 20px;
  `,

  title300: css`
    font-family: 'Galmuri14';
    font-size: 14px;
  `,

  subtitle100: css`
    font-family: 'Galmuri9';
    font-size: 18px;
  `,

  subtitle200: css`
    font-family: 'Galmuri11';
    font-size: 16px;
  `,

  body100: css`
    font-family: 'Galmuri9';
    font-size: 12px;
  `,

  body200: css`
    font-family: 'Galmuri11';
    font-size: 10px;
  `,
} as const;
