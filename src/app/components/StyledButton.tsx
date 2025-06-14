import React from 'react';
import styled from 'styled-components';

interface StyledButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

const StyledButton: React.FC<StyledButtonProps> = ({ children, onClick, type = 'button', disabled, className }) => {
  return (
    <StyledWrapper className={className}>
      <button type={type} onClick={onClick} disabled={disabled}>
        <span className="button_top">{children}</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    /* Variables */
    --button_radius: 0.75em;
    --button_color: #e8e8e8;
    --button_outline_color: #000000;
    font-size: 17px;
    font-weight: bold;
    border: none;
    cursor: pointer;
    border-radius: var(--button_radius);
    background: var(--button_outline_color);
    padding: 0;
    margin: 0;
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .button_top {
    display: block;
    box-sizing: border-box;
    border: 2px solid var(--button_outline_color);
    border-radius: var(--button_radius);
    padding: 0.75em 1.5em;
    background: var(--button_color);
    color: var(--button_outline_color);
    transform: translateY(-0.2em);
    transition: transform 0.1s ease;
  }

  button:hover:not(:disabled) .button_top {
    /* Pull the button upwards when hovered */
    transform: translateY(-0.33em);
  }

  button:active:not(:disabled) .button_top {
    /* Push the button downwards when pressed */
    transform: translateY(0);
  }
`;

export default StyledButton; 