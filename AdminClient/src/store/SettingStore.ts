import { defineStore } from "pinia";
import { camelToPascal } from "@/helper/CamelToPascel";
import { AxiosResponse, AxiosError } from "axios";
import API from "./API";

interface SettingState {
  loading: boolean;
  isOverlay: boolean;
  snackbar: boolean;
  snackbarMsg: string;
  allSettings: any[]; // Adjust the type according to your data structure
}

export const useSettingStore = defineStore("settingStore", {
  state: (): SettingState => ({
    loading: false,
    isOverlay: false,
    snackbar: false,
    snackbarMsg: "",
    allSettings: [],
  }),
  getters: {},
  actions: {
    fetchSiteSettings(): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.get(import.meta.env.VITE_API_URL + "/api/Settings/GetSiteSettings")
          .then((response) => {
            this.loading = false;
            this.allSettings = response.data;
            localStorage.setItem("allSettings", JSON.stringify(response.data));
            resolve(response);
          })
          .catch((error) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    welcomeEmailSent(objRequest: any): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.post(
          import.meta.env.VITE_API_URL + "/api/Settings/SendWelcomeMail",
          camelToPascal(objRequest)
        )
          .then((response) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    passwordEmailSent(objRequest: any): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.post(
          import.meta.env.VITE_API_URL + "/api/Settings/SendPasswordMail",
          camelToPascal(objRequest)
        )
          .then((response) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    generalSettingsUpdate(objSettings: any): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.patch(
          import.meta.env.VITE_API_URL + "/api/Settings/UpdateGeneralSetting",
          camelToPascal(objSettings)
        )
          .then((response) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    emailSettingsUpdate(objSettings: any): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.patch(
          import.meta.env.VITE_API_URL + "/api/Settings/UpdateEmailSetting",
          camelToPascal(objSettings)
        )
          .then((response) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    colorSettingsUpdate(objSettings: any): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.patch(
          import.meta.env.VITE_API_URL + "/api/Settings/UpdateColorSetting",
          camelToPascal(objSettings)
        )
          .then((response) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    landingSettingsUpdate(objSettings: any): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.patch(
          import.meta.env.VITE_API_URL + "/api/Settings/UpdateLandingSetting",
          camelToPascal(objSettings)
        )
          .then((response) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    emailTextSettingsUpdate(objSettings: any): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.patch(
          import.meta.env.VITE_API_URL + "/api/Settings/UpdateEmailTextSetting",
          camelToPascal(objSettings)
        )
          .then((response) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    logoUpload(objFormData: FormData): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.post(
          import.meta.env.VITE_API_URL + "/api/Settings/UploadLogo",
          objFormData
        )
          .then((response) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    faviconUpload(objFormData: FormData): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.post(
          import.meta.env.VITE_API_URL + "/api/Settings/UploadFavicon",
          objFormData
        )
          .then((response) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    getAllFaq(): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.get(import.meta.env.VITE_API_URL + "/api/Settings/GetFaqList")
          .then((response) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    getSingleFaq(faqId: number): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.get(
          import.meta.env.VITE_API_URL + `/api/Settings/GetSingleFaq/${faqId}`
        )
          .then((response) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    deleteSingleFaq(faqId: number): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.delete(
          import.meta.env.VITE_API_URL + `/api/Settings/DeleteFaq/${faqId}`
        )
          .then((response) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    createSingleFaq(objFaq: any): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.post(
          import.meta.env.VITE_API_URL + `/api/Settings/CreateFaq`,
          objFaq
        )
          .then((response) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    updateSingleFaq(objFaq: any): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.patch(
          import.meta.env.VITE_API_URL + `/api/Settings/UpdateFaq`,
          objFaq
        )
          .then((response) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    getContacts(): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.get(import.meta.env.VITE_API_URL + "/api/Settings/GetContacts")
          .then((response) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    createContact(objContact: any): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.post(
          import.meta.env.VITE_API_URL + "/api/Settings/CreateContacts",
          camelToPascal(objContact)
        )
          .then((response) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    getAllErrors(): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.get(import.meta.env.VITE_API_URL + "/api/Settings/GetErrorLogList")
          .then((response) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    createErrorLog(objError: any): Promise<AxiosResponse> {
      return new Promise((resolve, reject) => {
        this.loading = true;
        API.post(
          import.meta.env.VITE_API_URL + "/api/Settings/CreateErrorLog",
          camelToPascal(objError)
        )
          .then((response) => {
            this.loading = false;
            resolve(response);
          })
          .catch((error) => {
            this.loading = false;
            reject(error);
          });
      });
    },
    overlayToggle(val: boolean) {
      this.isOverlay = val;
    },
    toggleSnackbar(obj: any) {
      this.snackbar = obj.status;
      this.snackbarMsg = obj.msg;
    },
  },
});
