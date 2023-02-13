import axios from "axios";
import jwtInterceoptor from "~/axios";
import { API_URL } from "~/constants/env";
import { GoogleResponse, User } from "~/models/user";

export const googleAuthLoginAPI = async (
  token: string
): Promise<GoogleResponse | { statusCode: number; message: string }> => {
  try {
    const data = await fetch(`${API_URL}/google-authentication`, {
      method: "POST",
      body: JSON.stringify({
        token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await data.json();
  } catch (error) {
    console.log(error);
    return { statusCode: 500, message: `${error}` };
  }
};

export const getUserByToken = async (
  token: string
): Promise<{ user: User } | { statusCode: number; message: string }> => {
  console.log(token);
  const bearer = "Bearer " + token;
  const data = await fetch(`${API_URL}/authen/userWithToken`, {
    method: "GET",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: bearer,
    },
  });

  return await data.json();
};

export const getUserByTokenByAxios = async (token: string) => {
  const bearer = "Bearer " + token;
  const data = await axios.get(`${API_URL}/authen/userWithToken`, {
    method: "GET",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: bearer,
    },
  });

  return data;
};

export const getUserByTokenByAxiosNoNeedToken = async (token: string) => {
  const bearer = "Bearer " + token;
  const data = await jwtInterceoptor.get(`${API_URL}/authen/ahihi`);

  return data;
};
