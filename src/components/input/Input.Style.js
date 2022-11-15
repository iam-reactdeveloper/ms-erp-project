import styled from "styled-components";
import { TextField } from "@mui/material";
import ChipInput from "material-ui-chip-input";

export const InputField = styled(TextField)`
  margin-bottom: 0 !important;
`;
export const Span = styled.span`
  color: red;
  font-size: small;
`;

export const MainInputField = styled(ChipInput)`
  max-width: 80% !important;
  margin-bottom: 15px !important;
`;
