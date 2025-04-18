import { defineStore } from "pinia";
//import { camelToPascal } from "@/helper/CamelToPascel.ts";
import { camelToPascal } from "@/helper/CamelToPascel";
import axios, { AxiosResponse, AxiosError } from "axios";
import API from "./API";

interface UserState {
  loading: boolean;
  visible: boolean | string;
  registrationOpen: boolean;
  componentKey: number;
}

export const useUserStore = defineStore("userStore", {
  state: (): UserState => ({
    loading: false,
    visible: localStorage.getItem("visible") || false,
    registrationOpen: false,
    componentKey: 0,
  }),
  getters: {},
  actions: {
    userSignIn(objUser: any): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.post(
          import.meta.env.VITE_API_URL + "/api/Users/GetLoginInfo",
          camelToPascal(objUser)
        )
          .then((response: AxiosResponse) => {
            if (response.status == 200) {
              localStorage.setItem("userId", response.data.obj.userId);
              localStorage.setItem("userRoleId", response.data.obj.userRoleId);
              localStorage.setItem(
                "profile",
                JSON.stringify({ ...response.data })
              );
            }
            this.loading = false;
            resolve(response);
          })
          .catch((error: AxiosError) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    checkPassword(objUser: any): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.post(
          import.meta.env.VITE_API_URL + "/api/Users/GetLoginInfo",
          camelToPascal(objUser)
        )
          .then((response: AxiosResponse) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error: AxiosError) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    getUserIp(): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        axios
          .get("https://api.ipify.org?format=json")
          .then((response: AxiosResponse) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error: AxiosError) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    userInfoForForgetPassword(email: string): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.get(
          import.meta.env.VITE_API_URL +
            `/api/Users/GetUserInfoForForgetPassword/${email}`
        )
          .then((response: AxiosResponse) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error: AxiosError) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    createRegistration(objUser: any): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.post(
          import.meta.env.VITE_API_URL + "/api/Users/StudentRegistration",
          camelToPascal(objUser)
        )
          .then((response: AxiosResponse) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error: AxiosError) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    createHistory(objHistory: any): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.post(
          import.meta.env.VITE_API_URL + `/api/Users/CreateLoginHistory`,
          camelToPascal(objHistory)
        )
          .then((response: AxiosResponse) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error: AxiosError) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    updateHistory(logCode: string): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.patch(
          import.meta.env.VITE_API_URL +
            `/api/Users/UpdateLoginHistory/${logCode}`
        )
          .then((response: AxiosResponse) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error: AxiosError) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    getDateChart(userId: number): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.get(
          import.meta.env.VITE_API_URL +
            `/api/Users/GetLogInSummaryByDate/${userId}`
        )
          .then((response: AxiosResponse) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error: AxiosError) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    getMonthChart(userId: number): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.get(
          import.meta.env.VITE_API_URL +
            `/api/Users/GetLogInSummaryByMonth/${userId}`
        )
          .then((response: AxiosResponse) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error: AxiosError) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    getYearChart(userId: number): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.get(
          import.meta.env.VITE_API_URL +
            `/api/Users/GetLogInSummaryByYear/${userId}`
        )
          .then((response: AxiosResponse) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error: AxiosError) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    getBrowserChart(userId: number): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.get(
          import.meta.env.VITE_API_URL + `/api/Users/GetBrowserCount/${userId}`
        )
          .then((response: AxiosResponse) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error: AxiosError) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    getRoleChart(): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.get(import.meta.env.VITE_API_URL + `/api/Users/GetRoleWiseUser`)
          .then((response: AxiosResponse) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error: AxiosError) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    getUserRoles(): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.get(import.meta.env.VITE_API_URL + "/api/Users/GetUserRoleList")
          .then((response: AxiosResponse) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error: AxiosError) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    getSingleRole(roleId: number): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.get(
          import.meta.env.VITE_API_URL + `/api/Users/GetSingleRole/${roleId}`
        )
          .then((response: AxiosResponse) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error: AxiosError) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    deleteSingleRole(roleId: number): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.delete(
          import.meta.env.VITE_API_URL + `/api/Users/DeleteSingleRole/${roleId}`
        )
          .then((response: AxiosResponse) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error: AxiosError) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    createSingleRole(objRole: any): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.post(
          import.meta.env.VITE_API_URL + `/api/Users/CreateUserRole`,
          camelToPascal(objRole)
        )
          .then((response: AxiosResponse) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error: AxiosError) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    updateSingleRole(objRole: any): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.patch(
          import.meta.env.VITE_API_URL + `/api/Users/UpdateUserRole`,
          camelToPascal(objRole)
        )
          .then((response: AxiosResponse) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error: AxiosError) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    getUsers(): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.get(import.meta.env.VITE_API_URL + `/api/Users/GetUserList`)
          .then((response: AxiosResponse) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error: AxiosError) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    getSingleUser(userId: number): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.get(
          import.meta.env.VITE_API_URL + `/api/Users/GetSingleUser/${userId}`
        )
          .then((response: AxiosResponse) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error: AxiosError) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    getSingleUserByRef(passwordRef: string): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.get(
          import.meta.env.VITE_API_URL +
            `/api/Users/GetSingleUserByHash/${passwordRef}`
        )
          .then((response: AxiosResponse) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error: AxiosError) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    deleteSingleUser(userId: number): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.delete(
          import.meta.env.VITE_API_URL + `/api/Users/DeleteSingleUser/${userId}`
        )
          .then((response: AxiosResponse) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error: AxiosError) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    createSingleUser(objUser: any): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.post(
          import.meta.env.VITE_API_URL + `/api/Users/CreateUser`,
          camelToPascal(objUser)
        )
          .then((response: AxiosResponse) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error: AxiosError) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    updateSingleUser(objUser: any): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.patch(
          import.meta.env.VITE_API_URL + `/api/Users/UpdateUser`,
          camelToPascal(objUser)
        )
          .then((response: AxiosResponse) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error: AxiosError) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    updateProfile(objUser: any): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.patch(
          import.meta.env.VITE_API_URL + `/api/Users/UpdateUserProfile`,
          camelToPascal(objUser)
        )
          .then((response: AxiosResponse) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error: AxiosError) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    passwordChange(objUser: any): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.patch(
          import.meta.env.VITE_API_URL + `/api/Users/ChangeUserPassword`,
          camelToPascal(objUser)
        )
          .then((response: AxiosResponse) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error: AxiosError) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    getUserStatus(): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.get(import.meta.env.VITE_API_URL + "/api/Users/UserStatus")
          .then((response: AxiosResponse) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error: AxiosError) => {
            console.log("error thrown");
            this.loading = false;
            reject(error);
          });
      });
    },
    getBrowseList(userId: number): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.get(
          import.meta.env.VITE_API_URL + `/api/Users/GetBrowseList/${userId}`
        )
          .then((response: AxiosResponse) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error: AxiosError) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    getNotifications(userId: number): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.get(
          import.meta.env.VITE_API_URL +
            `/api/Users/GetNotificationList/${userId}`
        )
          .then((response: AxiosResponse) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error: AxiosError) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    imageUpload(objFormData: FormData): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.post(
          import.meta.env.VITE_API_URL + `/api/Users/Upload`,
          objFormData
        )
          .then((response: AxiosResponse) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error: AxiosError) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    signOut() {
      this.componentKey += 1;
      this.registrationOpen = false;
      this.visible = false;
      localStorage.clear();
      delete API.defaults.headers.common["Authorization"];
    },
    setRegistration() {
      this.registrationOpen = !this.registrationOpen;
    },
    setVisibility(val: boolean) {
      this.componentKey += 1;
      this.visible = val;
      localStorage.setItem("visible", val.toString());
    },
  },
});
