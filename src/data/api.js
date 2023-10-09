import axios from "axios";
import { URL } from "./axios";

export const login = async (userName, password) => {
  const res = await URL.request({
    method: "POST",
    url: "/smart_rack/api/login",
    data: {
      token: "",
      user: userName,
      pass: password,
    },
    timeout: 2000,
  });
  return res.data;
};

export const getInfo = async () => {
  const res = await URL.request({
    method: "GET",
    url: "/smart_rack/api/sys_info",
    timeout: 2000,
  });
  return res.data;
  // return {
  //   humidity: 70,
  //   temperature: 20,
  //   energy: 500,
  //   fire: false,
  //   smoke: false,
  //   water: false,
  //   door: false,
  // };
};

export const getAlarm = async () => {
    const res = await URL.request({
      method: "GET",
      url: "/smart_rack/api/sys_alarm",
      timeout: 2000,
    });
    return res.data;
  // return {
  //   has_alarm: true,
  //   alarm_message: "xxxxxxxxxx",
  // };
};

export const getPower = async () => {
    const res = await URL.request({
      method: "GET",
      url: "/smart_rack/api/sys_power",
      timeout: 2000,
    });
    return res.data;
  // return {
  //   channel_cnt: 8,
  //   info: [
  //     {
  //       cnt: 1,
  //       current: 4,
  //       power: 188,
  //       voltage: 47,
  //     },
  //     {
  //       cnt: 2,
  //       current: 3,
  //       power: 150,
  //       voltage: 50,
  //     },
  //     {
  //       cnt: 3,
  //       current: 3,
  //       power: 150,
  //       voltage: 50,
  //     },
  //     {
  //       cnt: 4,
  //       current: 3,
  //       power: 147,
  //       voltage: 49,
  //     },
  //     {
  //       cnt: 5,
  //       current: 3,
  //       power: 144,
  //       voltage: 48,
  //     },
  //     {
  //       cnt: 6,
  //       current: 4,
  //       power: 184,
  //       voltage: 46,
  //     },
  //     {
  //       cnt: 7,
  //       current: 4,
  //       power: 188,
  //       voltage: 47,
  //     },
  //     {
  //       cnt: 8,
  //       current: 4,
  //       power: 400,
  //       voltage: 47,
  //     },
  //   ],
  // };
};
