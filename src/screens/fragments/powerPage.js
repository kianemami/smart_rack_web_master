import React from "react";
import { PieChart } from "react-minimal-pie-chart";
import styled from "styled-components";
import { getPower } from "../../data/api";

const Container = styled.div`
  width: 100%;
  /* height: 100rem; */
  display: flex;
  /* scroll-behavior: inherit; */
  flex-direction: column;
  align-items: center;
  position: relative;
  /* overflow: auto; */
  background-color: rgba(55, 55, 55, 1);
  /* scroll-behavior: inherit; */
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
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
  margin-block: 10px;
`;

const CircleBackground = styled.circle`
  fill: none;
  stroke: rgba(49, 49, 49, 1);
  stroke-width: 15px;
`;

const CircleProgress = styled.circle`
  fill: none;
  /* stroke: rgba(32, 140, 1, 1); */
  stroke-width: 15px;
`;

const Title = styled.span`
  color: #fff;
`;

const Counter = styled.span`
  position: absolute;
  font-size: 45px;
  top: ${(props) => `${props.size / 3}px`};
  color: rgba(32, 190, 1, 1);
`;

// const data = [
//   { name: "ch-1" },
//   { name: "ch-2" },
//   { name: "ch-3" },
//   { name: "ch-4" },
//   { name: "ch-5" },
//   { name: "ch-6" },
//   { name: "ch-7" },
//   { name: "ch-8" },
// ];

const data2 = [
  { title: "Group A", value: 2400, color: "#E38627" },
  { title: "Group C", value: 1398, color: "#C13C37" },
  { title: "Group D", value: 9800, color: "#6A2135" },
];

const PowerPage = () => {
  const [data, setData] = React.useState([]);
  const CIRCLE_WIDTH = 300;
  const RADIUS = CIRCLE_WIDTH / 2 - 10;
  const dashArray = RADIUS * Math.PI * 2;
  const dashOffset = (progress, divided) => {
    return dashArray - (dashArray * progress) / divided;
  };

  React.useEffect(() => {
    getPower().then((res) => {
      setData([]);
      const length = Object.keys(res.info).length;
      for (let index = 0; index < length; index++) {
        setData((prv) => {
          return [...prv, res.info[index]];
        });
      }
    });
  }, []);
  const myFunction = React.useCallback(() => {
    getPower().then((res) => {
      const length = Object.keys(res.info).length;
      setData([]);
      for (let index = 0; index < length; index++) {
        setData((prv) => {
          return [...prv, res.info[index]];
        });
      }
    });
  }, [data]);
  React.useEffect(() => {
    // setData([]);
    const timer = setTimeout(() => {
      myFunction();
    }, 5000);
    return () => clearTimeout(timer);
  }, [data]);
  return (
    <Container>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {data.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "97%",
              }}
            >
              <Card
                key={index}
                width={"100%"}
                height={"30rem"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <div
                  style={{
                    width: "100%",
                    height: "15%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    padding: "0px 0px 0px 50px",
                  }}
                >
                  <Title
                    style={{
                      fontSize: "40px",
                      color: "rgba(105,105,105,1)",
                    }}
                  >{`Channel ${index + 1}`}</Title>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "85%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      position: "relative",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
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
                        style={{
                          strokeDasharray: dashArray,
                          strokeDashoffset: dashOffset(item.voltage, 100),
                        }}
                        transform={`rotate(-180 ${CIRCLE_WIDTH / 2} ${
                          CIRCLE_WIDTH / 2
                        })`}
                        strokeLinecap="round"
                        stroke={"rgba(102,168,160,1)"}
                      />
                    </svg>
                    <Title
                      style={{
                        marginTop: "20px",
                        fontSize: "30px",
                        color: "rgba(105,105,105,1)",
                      }}
                    >
                      Voltage
                    </Title>
                    <Counter
                      size={CIRCLE_WIDTH * 1.7}
                      style={{
                        alignSelf: "center",
                        color: "rgba(102,168,160,1)",
                      }}
                    >
                      {`${item.voltage}V`}
                    </Counter>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      position: "relative",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
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
                        style={{
                          strokeDasharray: dashArray,
                          strokeDashoffset: dashOffset(item.current, 20),
                        }}
                        transform={`rotate(-180 ${CIRCLE_WIDTH / 2} ${
                          CIRCLE_WIDTH / 2
                        })`}
                        strokeLinecap="round"
                        stroke={"rgba(118,110,162,1)"}
                      />
                    </svg>
                    <Title
                      style={{
                        marginTop: "20px",
                        fontSize: "30px",
                        color: "rgba(105,105,105,1)",
                      }}
                    >
                      Current
                    </Title>
                    <Counter
                      size={CIRCLE_WIDTH * 1.7}
                      style={{
                        alignSelf: "center",
                        color: "rgba(118,110,162,1)",
                      }}
                    >
                      {`${item.current}A`}
                    </Counter>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      position: "relative",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
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
                        style={{
                          strokeDasharray: dashArray,
                          strokeDashoffset: dashOffset(item.power, 500),
                        }}
                        transform={`rotate(-180 ${CIRCLE_WIDTH / 2} ${
                          CIRCLE_WIDTH / 2
                        })`}
                        strokeLinecap="round"
                        stroke={"rgba(214,157,70,1)"}
                      />
                    </svg>
                    <Title
                      style={{
                        marginTop: "20px",
                        fontSize: "30px",
                        color: "rgba(105,105,105,1)",
                      }}
                    >
                      Power
                    </Title>
                    <Counter
                      size={CIRCLE_WIDTH * 1.7}
                      style={{
                        alignSelf: "center",
                        color: "rgba(214,157,70,1)",
                      }}
                    >
                      {`${item.power}W`}
                    </Counter>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default PowerPage;
