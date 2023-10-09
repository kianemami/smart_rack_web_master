import React from "react";
import styled from "styled-components";
import SideBar from "../component/sideBar";
import { MonitoringIcon, PowerIcon, SettingIcon } from "../assets/icons/icons";
import {
  ArrowLeftOnRectangleIcon,
  BoltIcon,
  Cog6ToothIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";
import PowerPage from "./fragments/powerPage";
import SettingPage from "./fragments/settingPage";
import HomePage from "./fragments/homePage";
import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";
import * as AiIcons from "react-icons/ai";
import * as ImIcons from "react-icons/im";
import * as MdIcons from "react-icons/md";
import * as HiIcon from "react-icons/hi";
import * as SiIcon from "react-icons/si";
import * as IoIcon from "react-icons/io";
import SensorPages from "./fragments/sensorPages";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
  background-color: rgba(55, 55, 55, 1);
  user-select: none;
`;

const Pages = styled.div`
  width: 100%;
  height: 90vh;
  background-color: rgba(55, 55, 55, 1);
`;

const IconContainer = styled.div`
  width: 4rem;
  height: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  /* background-color: blue; */
  margin: 0px 40px 0px 0px;

  svg {
    width: 50%;
    height: 50%;
    color: rgba(101, 126, 148, 1);
  }
`;

const Circle = styled.div`
  position: absolute;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 0.8rem;
  top: 1rem;
  right: 1.1rem;
  background-color: rgba(31, 142, 249, 1);
`;

const data = [
  {
    name: "home",
    iconName: "MonitoringIcon",
    // icon: ComputerDesktopIcon,
    icon: AiIcons.AiFillHome,
    page: <HomePage />,
  },
  {
    name: "power",
    iconName: "PowerIcon",
    icon: SiIcon.SiPowerbi,
    page: <PowerPage />,
  },
  {
    name: "sensors",
    iconName: "SensorIcon",
    icon: MdIcons.MdDeviceHub,
    page: <SensorPages />,
  },
  {
    name: "setting",
    iconName: "SettingIcon",
    icon: AiIcons.AiTwotoneSetting,
    page: <SettingPage />,
  },
  {
    name: "log out",
    iconName: "MonitoringIcon",
    icon: HiIcon.HiLogout,
  },
];

export default function Dashboard() {
  const [selectedItem, setSelectedItem] = React.useState({
    name: "home",
    page: <HomePage />,
  });

  return (
    <ScrollSync>
      <Container>
        <ScrollSyncPane>
          <SideBar
            class="sidebar"
            data={data}
            selectedItem={selectedItem.name}
            setSelectedItem={setSelectedItem}
          />
        </ScrollSyncPane>
        <ScrollSyncPane>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "85%",
              height: "100%",
              overflow: "auto",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "6%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <IconContainer>
                <IoIcon.IoMdMail />
              </IconContainer>
              <IconContainer>
                <Circle />
                <IoIcon.IoMdNotifications />
              </IconContainer>
            </div>
            <Pages>{selectedItem.page}</Pages>
          </div>
        </ScrollSyncPane>
      </Container>
    </ScrollSync>
  );
}
