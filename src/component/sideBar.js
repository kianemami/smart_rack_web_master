import React from "react";
import styled from "styled-components";
import { useIcon } from "../hooks/useIcon";
import { MonitoringIcon, SettingIcon, iconPack } from "../assets/icons/icons";
import { BoltIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import CompanyLogo from "../assets/images/logo.png";
import userImage from "../assets/images/bg.jpg";

const Container = styled.div`
  width: 15%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgba(49, 49, 49, 1);
  padding: 0px 0px 0px 0px;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: "auto";
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Logo = styled.div`
  width: 80%;
  height: 4rem;
  align-self: center;
  background-image: url(${CompanyLogo});
  background-size: 80% 4rem;
  background-repeat: no-repeat;
`;

const UserPicAndNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin: 40px 0px 40px 0px;
`;

const UserPick = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 8rem;
  background-image: url(${userImage});
  background-size: 8rem 8rem;
  background-repeat: no-repeat;
  align-self: center;
  margin: 10px 0px 20px 0px;
`;

const Items = styled.div`
  width: 90%;
  height: 5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: ${(props) =>
    props.active ? "0px 0px 0px 15px" : "0px 0px 0px 20px"};
  margin: 10px 0px 0px 0px;
  border-style: groove;
  border-left-width: ${(props) => (props.active ? "5px" : "0px")};
  border-top: 0px;
  border-bottom: 0px;
  border-right: 0px;
  border-color: rgba(32, 140, 1, 1);
  &:hover {
    width: 90%;
    height: 5rem;
    margin: 10px 0px 0px 0px;
    padding: ${(props) =>
      props.active ? "0px 0px 0px 15px" : "0px 0px 0px 20px"};
    background-color: rgba(21, 21, 21, 0.2);
  }
  &:hover span {
    color: rgba(32, 140, 1, 1);
  }
  &:hover svg {
    color: rgba(32, 140, 1, 1);
  }

  span {
    color: ${(props) =>
      props.active ? "rgba(32, 140, 1, 1)" : "rgba(39, 39, 39, 1)"};
    font-size: 25px;
    user-select: none;
    transition: color 0.5s ease;
  }
  svg {
    color: ${(props) =>
      props.active ? "rgba(32, 140, 1, 1)" : "rgba(39, 39, 39, 1)"};
    width: 30px;
    height: 30px;
    margin-right: 15px;
    transition: color 0.5s ease;
  }
`;

const Text = styled.span`
  color: whitesmoke;
  user-select: none;
`;

export default function SideBar({ data, selectedItem, setSelectedItem }) {
  const navigate = useNavigate();

  return (
    <Container>
      <Logo />
      <UserPicAndNameContainer>
        <UserPick />
        <Text>admin</Text>
      </UserPicAndNameContainer>
      {data.map((item, index) => {
        if (item.name === "log out") {
          return (
            <Items
              key={index}
              onClick={() => {
                navigate("/dashboard", { replace: true });
              }}
              active={selectedItem === item.name}
              style={{
                width: "16rem",
                position: "absolute",
                bottom: "40px",
              }}
            >
              <item.icon />
              <Text>{item.name}</Text>
            </Items>
          );
        } else {
          return (
            <Items
              key={index}
              called={SettingIcon}
              active={selectedItem === item.name}
              onClick={() => {
                setSelectedItem({
                  name: item.name,
                  page: item.page,
                });
              }}
            >
              <item.icon />
              <Text>{item.name}</Text>
            </Items>
          );
        }
      })}
    </Container>
  );
}
