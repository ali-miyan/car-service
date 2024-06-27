import React, { CSSProperties, useState } from 'react';
import { ButtonProps } from '../../schema/component';

const Button: React.FC<ButtonProps> = ({
  children,
  width = '150px',
  height = '40px',
  bgColor = '#2196F3',
  hoverColor = '#000000',
  onClick,
  ...rest
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle: CSSProperties = {
    height,
    backgroundColor: isHovered ? hoverColor : bgColor,
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <button
      style={buttonStyle}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...rest}
      className={width}
    >
      {children}
    </button>
  );
};

export default Button;
