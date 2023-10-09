import React from "react";
import styled from "styled-components";
import { getInfo } from "../../data/api";
import * as Fa6Icon from "react-icons/fa6";
import * as Io5Icon from "react-icons/io5";
import * as RxIcon from "react-icons/rx";
import * as BsIcon from "react-icons/bs";
import * as GiIcon from "react-icons/gi";
import * as WiIcon from "react-icons/wi";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Container = styled.div`
  width: 100%;
  /* height: 100rem; */
  display: flex;
  /* scroll-behavior: inherit; */
  flex-direction: column;
  align-items: center;
  /* overflow: auto; */
  background-color: rgba(55, 55, 55, 1);
`;

const Card = styled.section`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  border-radius: 16px;
  background-color: rgba(45, 45, 45, 1);
`;

const CircleContainer = styled.svg`
  width: 100;
  height: 200;
`;

const CircleBackground = styled.circle`
  fill: none;
  stroke: rgba(49, 49, 49, 1);
  stroke-width: 8px;
`;

const CircleProgress = styled.circle`
  fill: none;
  /* rgba(32, 140, 1, 1) */
  stroke: ${(props) => props.color};
  stroke-width: 8px;
`;

const MyTitle = styled.span`
  margin-top: 8px;
  color: #fff;
`;

const Counter = styled.span`
  font-size: 15px;
  margin-left: 5px;
  color: rgba(32, 190, 1, 1);
`;

const IconContainer = styled.div`
  position: absolute;
  top: ${(props) => `${props.size / 1.55}px`};

  svg {
    width: 30px;
    height: 30px;
    top: 40px;
    color: rgba(41, 41, 41, 1);
  }
`;

const SensorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  svg {
    width: 40px;
    height: 40px;
    color: ${(props) => (props.active ? "green" : "red")};
  }
`;

export default function SensorPages() {
  const labels = Array(24)
    .fill(1)
    .map((_, i) => i + 1);
  // const chartData = {
  //   labels: labels,
  //   datasets: [
  //     {
  //       // label: "Dataset 1",
  //       data: tempDataForChart,
  //       borderColor: "rgba(102,168,160,1)",
  //       backgroundColor: "rgba(102,168,160,.5)",
  //       fill: true,
  //       circle: false,
  //     },
  //     {
  //       // label: "Dataset 2",
  //       data: energyDataForChart,
  //       borderColor: "rgba(118,110,162,1)",
  //       backgroundColor: "rgba(118,110,162,.5)",
  //     },
  //     {
  //       // label: "Dataset 2",
  //       data: humDataForChart,
  //       borderColor: "rgba(214,157,70,1)",
  //       backgroundColor: "rgba(214,157,70,.5)",
  //     },
  //   ],
  // };
  const CIRCLE_WIDTH = 160;
  const RADIUS = CIRCLE_WIDTH / 2 - 10;
  const dashArray = RADIUS * Math.PI * 2;
  const dashOffset = (progress, divided) => {
    return dashArray - (dashArray * progress) / divided;
  };
  const tempAndHumAndEnergyData = [
    {
      name: "temperature",
      icon: Fa6Icon.FaTemperatureHalf,
      color: "rgba(102,168,160,1)",
    },
    { name: "energy", icon: Fa6Icon.FaBolt, color: "rgba(214,157,70,1)" },
    {
      name: "humidity",
      icon: Io5Icon.IoWaterOutline,

      color: "rgba(118,110,162,1)",
    },
  ];
  const [temp, setTemp] = React.useState(0);
  const [hum, setHum] = React.useState(0);
  const [energy, setEnergy] = React.useState(0);
  const [fire, setFire] = React.useState(true);
  const [door, setDoor] = React.useState(true);
  const [smoke, setSmoke] = React.useState(true);
  const [water, setWater] = React.useState(true);
  const [tempDataForChart, setTempDataForChart] = React.useState([]);
  const [humDataForChart, setHumDataForChart] = React.useState([]);
  const [energyDataForChart, setEnergyDataForChart] = React.useState([]);

  const [sensors, setSensor] = React.useState([
    {
      name: "fire",
      icon: BsIcon.BsFire,
    },
    {
      name: "water",
      icon: GiIcon.GiWaterDrop,
    },
    {
      name: "door",
      icon: Fa6Icon.FaDoorOpen,
    },
    {
      name: "smoke",
      icon: WiIcon.WiSmoke,
    },
  ]);
  const [chartData, setChartData] = React.useState({
    labels: labels,
    datasets: [
      {
        // label: "Dataset 1",
        data: tempDataForChart,
        borderColor: "rgba(102,168,160,1)",
        backgroundColor: "rgba(102,168,160,.5)",
        fill: true,
        circle: false,
      },
      {
        // label: "Dataset 2",
        data: energyDataForChart,
        borderColor: "rgba(118,110,162,1)",
        backgroundColor: "rgba(118,110,162,.5)",
      },
      {
        // label: "Dataset 2",
        data: humDataForChart,
        borderColor: "rgba(214,157,70,1)",
        backgroundColor: "rgba(214,157,70,.5)",
      },
    ],
  });
  const myFunction = React.useCallback(() => {
    getInfo().then((res) => {
      setTemp(res.temperature);
      setHum(res.humidity);
      setEnergy(res.energy);
      setFire(res.fire);
      setSmoke(res.smoke);
      setWater(res.water);
      setDoor(res.door);
      setTempDataForChart(res.temp_dataset.data);
      setHumDataForChart(res.humidity_dataset.data);
      setEnergyDataForChart(res.power_dataset.data);
      setChartData({
        labels: labels,
        datasets: [
          {
            // label: "Dataset 1",
            data: tempDataForChart,
            borderColor: "rgba(102,168,160,1)",
            backgroundColor: "rgba(102,168,160,.5)",
            fill: true,
            circle: false,
          },
          {
            // label: "Dataset 2",
            data: energyDataForChart,
            borderColor: "rgba(118,110,162,1)",
            backgroundColor: "rgba(118,110,162,.5)",
          },
          {
            // label: "Dataset 2",
            data: humDataForChart,
            borderColor: "rgba(214,157,70,1)",
            backgroundColor: "rgba(214,157,70,.5)",
          },
        ],
      });
    });
  }, [temp && hum && energy]);
  React.useEffect(() => {
    // setData([]);
    const timer = setTimeout(() => {
      myFunction();
    }, 5000);
    return () => clearTimeout(timer);
  }, [temp && hum && energy]);

  React.useEffect(() => {
    getInfo().then((res) => {
      setTemp(res.temperature);
      setHum(res.humidity);
      setEnergy(res.energy);
      setFire(res.fire);
      setSmoke(res.smoke);
      setWater(res.water);
      setDoor(res.door);
      setTempDataForChart(res.temp_dataset.data);
      setHumDataForChart(res.humidity_dataset.data);
      setEnergyDataForChart(res.power_dataset.data);
      setChartData({
        labels: labels,
        datasets: [
          {
            // label: "Dataset 1",
            data: tempDataForChart,
            borderColor: "rgba(102,168,160,1)",
            backgroundColor: "rgba(102,168,160,.5)",
            fill: true,
            circle: false,
          },
          {
            // label: "Dataset 2",
            data: energyDataForChart,
            borderColor: "rgba(118,110,162,1)",
            backgroundColor: "rgba(118,110,162,.5)",
          },
          {
            // label: "Dataset 2",
            data: humDataForChart,
            borderColor: "rgba(214,157,70,1)",
            backgroundColor: "rgba(214,157,70,.5)",
          },
        ],
      });
    });
  }, []);
  return (
    <Container>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          width: "97%",
          height: "50rem",
          borderRadius: "16px",
          backgroundColor: "rgba(45, 45, 45, 1)",
          // backgroundColor: "red",
          marginTop: "10px",
          marginBottom: "10px",
          padding: "0px 0px 0px 0px",
        }}
      >
        <div
          style={{
            width: "27rem",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            padding: "10px 10px 10px 10px",
          }}
        >
          {tempAndHumAndEnergyData.map((item, index) => {
            return (
              <Card
                key={index}
                width={"22rem"}
                height={"29%"}
                style={{
                  flexDirection: "row",
                  backgroundColor: "rgba(59,59,59,1)",
                }}
              >
                <div
                  style={{
                    width: "65%",
                    height: "100%",
                    display: "flex",
                    position: "relative",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                  }}
                >
                  <svg
                    width={CIRCLE_WIDTH}
                    height={CIRCLE_WIDTH}
                    viewBox={`0 0 ${CIRCLE_WIDTH} ${CIRCLE_WIDTH}`}
                  >
                    <CircleBackground
                      cx={CIRCLE_WIDTH / 2}
                      cy={CIRCLE_WIDTH / 2}
                      r={RADIUS}
                    />
                    <CircleProgress
                      cx={CIRCLE_WIDTH / 2}
                      cy={CIRCLE_WIDTH / 2}
                      r={RADIUS}
                      color={item.color}
                      style={{
                        strokeDasharray: dashArray,
                        strokeDashoffset: dashOffset(
                          item.name === "temperature"
                            ? temp
                            : item.name === "humidity"
                            ? hum
                            : energy,
                          item.name === "temperature"
                            ? 100
                            : item.name === "humidity"
                            ? 100
                            : 2000
                        ),
                      }}
                      transform={`rotate(-180 ${CIRCLE_WIDTH / 2} ${
                        CIRCLE_WIDTH / 2
                      })`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <IconContainer size={CIRCLE_WIDTH}>
                    <item.icon style={{ color: item.color }} />
                  </IconContainer>
                </div>
                <div
                  style={{
                    width: "45%",
                    display: "flex",
                    height: "100%",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    marginLeft: "20px",
                  }}
                >
                  <MyTitle
                    style={{
                      color: "rgba(105,105,105,1)",
                      fontSize: "22px",
                    }}
                  >
                    {item.name}
                  </MyTitle>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "5px",
                    }}
                  >
                    <RxIcon.RxValue
                      style={{
                        width: "15px",
                        height: "15px",
                        color: "rgba(41,41,41,1)",
                      }}
                    />
                    <Counter
                      style={{
                        color:
                          item.name === "temperature"
                            ? "rgba(102,168,160,1)"
                            : item.name === "humidity"
                            ? "rgba(118,110,162,1)"
                            : "rgba(214,157,70,1)",
                      }}
                    >
                      {item.name === "temperature"
                        ? `${temp}°C`
                        : item.name === "humidity"
                        ? `${hum}%`
                        : `${energy}W`}
                    </Counter>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
        <div
          style={{
            width: "80rem",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px 10px 10px 10px",
          }}
        >
          <Card width={"98%"} height={"95%"} style={{}}>
            <Line
              data={chartData}
              options={{
                animation: false,
                datasets: {
                  line: {
                    pointBorderColor: "transparent",
                    pointBackgroundColor: "transparent",
                    fill: true,
                    capBezierPoints: false,
                    cubicInterpolationMode: "monotone",
                    borderCapStyle: "round",
                  },
                },
                plugins: false,
                layout: {
                  padding: 10,
                },
                scales: {
                  x: {
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      maxRotation: 0,
                      minRotation: 0,
                    },
                  },
                  y: {
                    position: "top",

                    grid: {
                      display: true,
                    },
                    ticks: {
                      mirror: false,
                      stepSize: 50,
                      beginAtZero: true,
                    },
                  },
                },
                maintainAspectRatio: false,
              }}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignSelf: "center",
              }}
            />
          </Card>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "32rem",
        }}
      >
        <Card
          width={"97%"}
          height={"90%"}
          justifyContent={"center"}
          alignItems={"flex-start"}
        >
          <MyTitle
            style={{ marginLeft: "20px", marginTop: "20px", fontSize: "32px" }}
          >
            Sensors
          </MyTitle>
          <div
            style={{
              width: "100%",
              height: "80%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: "20px",
              overflow: "auto",
            }}
          >
            {sensors.map((sensors, index) => {
              return (
                <Card
                  key={index}
                  width={"23%"}
                  height={"80%"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  style={{ backgroundColor: "rgba(59,59,59,1)" }}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      padding: "0px 0px 0px 30px",
                    }}
                  >
                    <MyTitle
                      style={{ color: "rgba(105,105,105,1)", fontSize: "28px" }}
                    >
                      {sensors.name}
                    </MyTitle>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "75%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "50%",
                        height: "80%",
                        borderRadius: "10rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        // backgroundColor: "red",
                        borderStyle: "solid",
                        borderWidth: "4px",
                        borderColor:
                          sensors.name === "fire"
                            ? fire
                              ? "green"
                              : "red"
                            : sensors.name === "water"
                            ? water
                              ? "green"
                              : "red"
                            : sensors.name === "door"
                            ? door
                              ? "green"
                              : "red"
                            : smoke
                            ? "green"
                            : "red",
                      }}
                    >
                      <SensorContainer
                        active={
                          sensors.name === "fire"
                            ? fire
                            : sensors.name === "water"
                            ? water
                            : sensors.name === "door"
                            ? door
                            : smoke
                        }
                      >
                        <sensors.icon />
                      </SensorContainer>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </Card>
      </div>
    </Container>
  );
}
