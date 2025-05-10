import styled from "styled-components/native";

const sizeVariant = {
  small: 1,
  medium: 2,
  large: 3,
  xl: 4,
  xxl: 5,
};

const positionVariant = {
  top: "marginTop",
  bottom: "marginBottom",
  left: "marginLeft",
  right: "marginRight",
};

const getVariant = (position, size, theme) => {
  const sizeIndex = sizeVariant[size];
  const property = positionVariant[position];
  const value = theme.space[sizeIndex];

  return `${property}: ${value};`;
};

export const Spacer = styled.View`
  ${({ position, size, theme }) => getVariant(position, size, theme)}
`;

// const SpacerView = styled.View`
//   ${({ variant }) => variant};
// `;

// export const Spacer = ({ position, size, children }) => {
//   const theme = useTheme();
//   const variant = getVariant(position, size, theme);

//   return <SpacerView variant={variant}>{children}</SpacerView>;
// };

Spacer.defaultProps = {
  position: "top",
  size: "small",
};
