import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { API_URL } from "~/constants/env";
export function useGoogleAuthentication() {
  const handleSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    try {
      if ("accessToken" in response) {
        const accessToken = response.accessToken;
        return accessToken;
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return {
    handleSuccess,
  };
}
