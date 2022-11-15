import React from 'react';

import { Loader } from '../loader';
import { ButtonContainer } from './Button.styles';

export const Button = ({
  text,
  color,
  type,
  rightIcon,
  leftIcon,
  handleOnClick,
  fullWidth = true,
  height,
  isLoading,
  restProps,
}) => {
  return (
    <>
      <ButtonContainer
        startIcon={isLoading === false && leftIcon}
        endIcon={isLoading === false && rightIcon}
        color={color}
        onClick={handleOnClick}
        variant="contained"
        type={type}
        fullWidth={fullWidth}
        height={height}
        {...restProps}
      >
        {isLoading ? (
          <Loader loaderSize={18} loaderStyle={{ color: 'inherit' }} />
        ) : (
          text
        )}
      </ButtonContainer>
    </>
  );
};
