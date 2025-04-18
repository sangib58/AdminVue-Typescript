import axios, { AxiosRequestConfig } from "axios";

const API = axios.create({ baseURL: process.env.APIURL });

API.interceptors.request.use((req: any) => {
  const profile = localStorage.getItem("profile");
  if (profile) {
    try {
      const parsedProfile: { token: string } = JSON.parse(profile);
      //console.log("parsedProfile", parsedProfile);
      if (parsedProfile.token) {
        req.headers = {
          ...req.headers,
          Authorization: `Bearer ${parsedProfile.token}`,
        };
      }
    } catch (error) {
      console.error("Failed to parse profile from localStorage:", error);
    }
  }

  return req;
});

export default API;
