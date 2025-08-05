import styled from "styled-components";
import { theme } from "./theme";
import { BaseButton } from "./GlobalStyles";

// Navigation Components
export const NavBar = styled.nav`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background: var(--surface-glass);
  backdrop-filter: blur(20px);
  border: 1px solid var(--surface-glass-border);
  border-radius: ${theme.borderRadius.lg};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
`;

export const NavButton = styled(BaseButton)`
  margin: 0;
  min-width: 120px;
`;

export const LoadButton = styled(NavButton)`
  position: relative;

  input {
    position: absolute;
    height: 100%;
    width: 100%;
    opacity: 0;
    top: 0;
    left: 0;
    cursor: pointer;
  }
`;

export const GlobalChannelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin: 0;
`;

// Form Components
export const FormsContainer = styled.div`
  // display: grid;
  // grid-template-columns: repeat(auto-fit, minmax(280px, 1f2r));
  gap: ${theme.spacing.lg};
  margin: ${theme.spacing.xl} 0;
  display: flex;
  flex-wrap: wrap;
`;

export const MidiFormContainer = styled.div`
  width: calc(33% - 1rem);
  box-sizing: border-box;
  background: var(--surface-glass);
  backdrop-filter: blur(20px);
  border: 1px solid var(--surface-glass-border);
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.glass};
  position: relative;
  overflow: hidden;

  &:hover {
    box-shadow: ${theme.shadows.glassHover};
    border-color: rgba(0, 245, 255, 0.3);
  }

  @media (max-width: 700px) {
    width: 100%;
  }
`;

export const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.lg};
  padding-bottom: ${theme.spacing.md};
  border-bottom: 1px solid var(--surface-glass-border);
`;

export const FormHeaderContent = styled.div`
  flex: 1;
  margin-right: ${theme.spacing.md};
  min-height: 60px;
`;

export const FormTitleDisplay = styled.h3`
  margin: 0;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  font-size: ${theme.fonts.sizes.form};
  font-weight: ${theme.fonts.weights.normal};
  color: var(--text-primary);
  text-transform: lowercase;
  letter-spacing: 0.02em;
  cursor: pointer;
  border-radius: 6px;
  transition: ${theme.transitions.default};
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid transparent;
  box-sizing: border-box;
  text-align: center;

  &:hover {
    background: rgba(0, 245, 255, 0.05);
    border-color: var(--surface-glass-border);
    color: var(--primary-glow);
    text-shadow: 0 0 10px rgba(0, 245, 255, 0.3);
  }

  &.header {
    font-size: 1.8rem;
  }
`;

export const FormTitleInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  font-size: ${theme.fonts.sizes.form};
  font-weight: ${theme.fonts.weights.normal};
  font-family: inherit;
  color: var(--text-primary);
  background: rgba(0, 245, 255, 0.08);
  border: 1px solid var(--primary-glow);
  border-radius: 6px;
  outline: none;
  text-transform: lowercase;
  letter-spacing: 0.02em;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 20px rgba(0, 245, 255, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  text-align: center;

  &.header {
    font-size: 1.8rem;
  }
`;

export const RemoveButton = styled.button`
  width: 32px;
  height: 32px;
  min-width: 32px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: ${theme.fonts.weights.light};
  color: var(--text-secondary);
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--surface-glass-border);
  border-radius: 6px;
  cursor: pointer;
  transition: ${theme.transitions.default};
  backdrop-filter: blur(10px);
  text-transform: none;
  letter-spacing: 0;
  line-height: 1;
  padding-top: 2px;

  &:hover {
    color: #ff4757;
    background: rgba(255, 71, 87, 0.1);
    border-color: rgba(255, 71, 87, 0.3);
    box-shadow: 0 4px 15px rgba(255, 71, 87, 0.2),
      0 0 10px rgba(255, 71, 87, 0.1);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const FormClickable = styled.div`
  min-height: 65px;
`;

export const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

export const FormLabel = styled.label`
  color: var(--text-secondary);
  font-size: ${theme.fonts.sizes.label};
  font-weight: ${theme.fonts.weights.normal};
  text-transform: lowercase;
  letter-spacing: 0.02em;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};

  &::before {
    content: "";
    width: 4px;
    height: 4px;
    background: var(--primary-glow);
    border-radius: 50%;
    box-shadow: 0 0 8px var(--primary-glow);
  }
`;

export const Select = styled.select`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--surface-glass-border);
  border-radius: ${theme.borderRadius.md};
  padding: 0.8rem ${theme.spacing.md};
  color: var(--text-primary);
  font-family: inherit;
  font-size: ${theme.fonts.sizes.body};
  backdrop-filter: blur(10px);
  transition: ${theme.transitions.default};
  cursor: pointer;

  &:hover {
    border-color: var(--primary-glow);
    background: rgba(0, 245, 255, 0.05);
    box-shadow: 0 0 15px rgba(0, 245, 255, 0.1);
  }

  &:focus {
    outline: none;
    border-color: var(--primary-glow);
    background: rgba(0, 245, 255, 0.08);
    box-shadow: 0 0 20px rgba(0, 245, 255, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  option {
    background: #1a1a2e;
    color: var(--text-primary);
    padding: ${theme.spacing.xs};
  }
`;

export const RangeInput = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  background: ${theme.gradients.rangeTrack};
  border-radius: 3px;
  outline: none;
  cursor: pointer;
  position: relative;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: ${theme.gradients.rangeThumb};
    border-radius: 50%;
    cursor: pointer;
    box-shadow: ${theme.shadows.rangeThumb};
    transition: ${theme.transitions.fast};

    &:hover {
      transform: scale(1.1);
      box-shadow: ${theme.shadows.rangeThumbHover};
    }
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: ${theme.gradients.rangeThumb};
    border-radius: 50%;
    cursor: pointer;
    border: none;
    box-shadow: ${theme.shadows.rangeThumb};
    transition: ${theme.transitions.fast};

    &:hover {
      transform: scale(1.1);
      box-shadow: ${theme.shadows.rangeThumbHover};
    }
  }
`;

export const SendButton = styled(BaseButton)`
  width: 100%;
  margin-top: ${theme.spacing.xs};
  font-weight: ${theme.fonts.weights.medium};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const GlobalChannelLabel = styled(FormLabel)`
  margin: 0;
  font-size: ${theme.fonts.sizes.body};
  color: var(--text-primary);

  &::before {
    display: none;
  }
`;

export const GlobalChannelSelect = styled(Select)`
  min-width: 80px;
  margin: 0;
  background: #fff;
  color: #000;

  &:focus {
    background: #fff;
    color: #000;
  }

  &:hover {
    outline: 4px solid #8e8e8e78;
    background: linear-gradient(
      135deg,
      var(--accent-glow),
      var(--primary-glow)
    );
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 245, 255, 0.3),
      0 0 20px rgba(0, 245, 255, 0.2);
    color: #000000;
  }

  outline: 4px solid #24242480;
  outline-offset: -2px;
`;

export const Input = styled.input`
  cursor: pointer;
`;
