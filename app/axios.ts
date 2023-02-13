import axios from "axios";
import { getCookieByName } from "./utils/cookie";

const jwtInterceoptor = axios.create({});

jwtInterceoptor.interceptors.request.use((config) => {
  let token = document.cookie;
  let newToken = token.split(";")[1].split("=")[1];
  //   const token = getCookieByName(
  //     config.headers.get("cookie") as string,
  //     "access_token"
  //   );
  //   console.log("token ne : ", token);
  console.log(config.headers);
  console.log("config ne ", config.headers.get("access_token"));
  config.headers.Authorization = `Bearer ${newToken}`;
  return config;
});

export default jwtInterceoptor;
