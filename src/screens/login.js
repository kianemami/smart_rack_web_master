import React from "react";
import styled from "styled-components";
import { login } from "../data/api";
import { useNavigate } from "react-router-dom";
import Bg from "../assets/images/bg.jpg";
import { FingerPrintIcon } from "../assets/icons/icons";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-image: url(${Bg});
  background-size: cover;
  justify-content: center;
  align-items: center;
  filter: blur(10px);
`;

const Cover = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
`;

const ChildrenContainer = styled.div`
  width: 60vw;
  height: 60vh;
  display: flex;
  flex-direction: row;
  background-color: rgba(55, 55, 55, 0.5);
  border-radius: 20px;
`;

const FingerPrintContainer = styled.div`
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FingerPrintText = styled.span`
  color: rgba(193, 193, 191, 1);
  font-size: 17px;
  text-align: center;
  margin: 0px 0px 50px 0px;
`;

const FingerPrintButton = styled.div`
  width: 50%;
  height: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  border-style: solid;
  border-width: 2px;
  border-color: rgba(193, 193, 191, 1);
  margin: 40px 0px 0px 0px;
`;

const FingerPrintButtonText = styled.span`
  color: rgba(193, 193, 191, 1);
  font-size: 12px;
  text-align: center;
`;

const UserAndPassContainer = styled.div`
  width: 55%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  background-color: rgba(255, 255, 255, 1);
`;

const UserName = styled.input`
  width: 40%;
  height: 3.5rem;
  padding-left: 20px;
  border-width: 0px 0px 2px 0px;
`;

const Password = styled.input`
  width: 40%;
  height: 3.5rem;
  border-width: 0px 0px 2px 0px;
  margin-top: 20px;
  padding-left: 20px;
`;

const Button = styled.div`
  width: 42%;
  height: 3.5rem;
  border-radius: 1.2rem;
  background-color: rgba(32, 140, 1, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const Login = () => {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const sendCheck = () => {
    login(userName, password).then((res) => {
      if (res.access === "granted") {
        navigate("/dashboard", { replace: true });
      }
    });
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container>
        <Cover />
      </Container>
      <div style={{ position: "absolute" }}>
        <ChildrenContainer>
          <UserAndPassContainer>
            <UserName
              placeholder="userName"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <Password
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              onClick={() => {
                sendCheck();
              }}
            >
              <span
                style={{ fontWeight: "bold", fontSize: "20px", color: "white" }}
              >
                login
              </span>
            </Button>
          </UserAndPassContainer>
          <FingerPrintContainer>
            <FingerPrintText>Start Using Your Fingerprint</FingerPrintText>
            <FingerPrintIcon width={"6rem"} height={"6rem"} />
            <FingerPrintButton>
              <FingerPrintButtonText>Use Fingerprint</FingerPrintButtonText>
            </FingerPrintButton>
          </FingerPrintContainer>
        </ChildrenContainer>
      </div>
    </div>
  );
};

export default Login;
