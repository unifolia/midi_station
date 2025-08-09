import styled, { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

export const GlobalStyles = createGlobalStyle`
  :root {
    line-height: 1.4;
    font-weight: 300;
    color-scheme: dark;
    color: ${theme.colors.textPrimary};

    --primary-glow: ${theme.colors.primaryGlow};
    --secondary-glow: ${theme.colors.secondaryGlow};
    --accent-glow: ${theme.colors.accentGlow};
    --surface-glass: ${theme.colors.surfaceGlass};
    --surface-glass-border: ${theme.colors.surfaceGlassBorder};
    --text-primary: ${theme.colors.textPrimary};
    --text-secondary: ${theme.colors.textSecondary};
    --text-glow: ${theme.colors.textGlow};

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background: #031e22a1;
    margin: 0;
    display: flex;
    place-items: center;
    min-width: 320px;
    min-height: 100vh;
    font-family: ${theme.fonts.family};
    overflow-x: hidden;

    &::before {
      content: "";
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(
          circle at 20% 30%,
          rgba(0, 245, 255, 0.15) 0%,
          transparent 40%
        ),
        radial-gradient(
          circle at 80% 70%,
          rgba(255, 0, 255, 0.1) 0%,
          transparent 40%
        ),
        radial-gradient(
          circle at 40% 80%,
          rgba(0, 255, 136, 0.08) 0%,
          transparent 40%
        );
      pointer-events: none;
      z-index: -1;
    }
  }

  #app {
    max-width: 1280px;
    box-sizing: border-box;
    width: 100%;
    margin: 0 auto;
    padding: ${theme.spacing.xl};
    text-align: center;
  }
`;

export const StyledLink = styled.a`
  font-weight: 400;
  color: var(--primary-glow);
  text-decoration: none;
  text-transform: lowercase;
  position: relative;
  padding: 2px ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.sm};
  transition: ${theme.transitions.default};

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      var(--primary-glow),
      var(--secondary-glow)
    );
    transition: width 0.3s ease;
  }

  &:hover::before {
    width: 100%;
  }

  &:hover {
    color: var(--text-primary);
    text-shadow: 0 0 10px var(--primary-glow);
    background: rgba(0, 245, 255, 0.1);
  }
`;

export const Title = styled.h1`
  font-size: ${theme.fonts.sizes.h1};
  line-height: 1.1;
  color: var(--text-primary);
  text-transform: lowercase;
  font-weight: ${theme.fonts.weights.thin};
  letter-spacing: 0.05em;
  background: ${theme.gradients.textGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: ${theme.shadows.textGlow};
  margin: 0 0 ${theme.spacing.xl} 0;
`;

export const FormTitle = styled.h2`
  font-size: ${theme.fonts.sizes.h2};
`;

export const Card = styled.div`
  padding: ${theme.spacing.xl};
  background: var(--surface-glass);
  backdrop-filter: blur(20px);
  border: 1px solid var(--surface-glass-border);
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.glass};
`;

export const BaseButton = styled.button`
  border-radius: ${theme.borderRadius.md};
  border: 1px solid var(--surface-glass-border);
  padding: 0.8em 1.5em;
  font-size: ${theme.fonts.sizes.body};
  font-weight: ${theme.fonts.weights.normal};
  font-family: inherit;
  background: ${theme.gradients.primaryButton};
  color: #000000;
  cursor: pointer;
  transition: ${theme.transitions.default};
  text-transform: lowercase;
  letter-spacing: 0.02em;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  outline: 4px solid #24242480;
  outline-offset: -2px;
  background: white;

  &:hover {
    outline: 4px solid #8e8e8e78;
    background: ${theme.gradients.hoverButton};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.button};
    color: #000000;
  }
`;

export const Label = styled.label`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;
