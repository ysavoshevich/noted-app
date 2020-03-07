import styled from "styled-components";

export const StyledEntryForm = styled.form`
  width: ${props => (props.small ? "100vw" : "500px")};
  height: ${props => {
    if (props.small) {
      return "100vh";
    }
    if (props.medium) {
      return "60%";
    }
    return "80%";
  }};
  background: rgba(255, 255, 255);
`;

export const ButtonWrapper = styled.div`
  margin: auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 230px;
`;
