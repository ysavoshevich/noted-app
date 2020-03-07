import styled from "styled-components";

export const StyledAuthForm = styled.div`
  width: 100%;
  height: ${props => (props.small ? "85%" : "70%")};
`;

export const ErrorMessage = styled.div`
  background: #e73827;
  color: white;
  width: 100%;
  padding: 8px 20px;
  word-wrap: break-word;
  text-align: center;
`;

export const StyledFormWrapper = styled.div`
  width: ${props => (props.small ? "100vw" : "500px")};
  height: ${props => {
    if (props.small) {
      return "100vh";
    }
    if (props.medium) {
      return "45%";
    }
    return "45%";
  }};
  padding: 20px;
  background: rgba(255, 255, 255);
  display: flex;
  flex-direction: column;
  justify-content: ${props =>
    props.small ? "space-between" : "space-between"};
  align-items: center;
  border-radius: 5px;
`;

export const ButtonWrapper = styled.div`
  margin: auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 230px;
`;
