import {
  SUCCESS,
  FAIL,
  LOGIN,
  LOGOUT,
  GET_PRODUCT_LIST,
  GET_CERTIFICATE_LIST,
  GET_PRODUCT_BY_CATEGORY,
  DELETE_PRODUCT_LIST,
  POST_PRODUCT_LIST,
  GET_PRODUCT_BY_ID,
  IMAGE_UPLOAD,
  GET_LATEST_PRODUCT,
  GET_CATEGORY_LIST,
  POST_CONTACT_LIST,
} from "../../action-types";

export const logIn = (payloadData) => (dispatch) =>
  dispatch({
    type: LOGIN,
    payload: {
      request: {
        url: "api/v1/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: payloadData,
      },
      options: {
        onSuccess({ response }) {
          const { data, error } = response;
          if (data.status === 200) {
            dispatch({
              type: `${LOGIN}_${SUCCESS}`,
              payload: { ...data, ...payloadData },
            });

            return Promise.resolve({ ...data });
          }
          dispatch({
            type: `${LOGIN}_${FAIL}`,
            payload: { ...data },
          });
          return Promise.reject(data);
        },
        onError(exception) {
          if (exception.error.isAxiosError) {
            const {
              response: { data: dataError },
            } = exception.error;
            dispatch({ type: `${LOGIN}_${FAIL}`, payload: { dataError } });
            return Promise.reject(dataError);
          }
          dispatch({ type: `${LOGIN}_${FAIL}`, payload: {} });
          return Promise.reject();
        },
      },
    },
  });

export const Logout = () => (dispatch) => {
  dispatch({
    type: `${LOGOUT}_${SUCCESS}`,
  });
};

export const getListOfProduct = (payloadData) => (dispatch) =>
  dispatch({
    type: GET_PRODUCT_LIST,
    payload: {
      request: {
        url: "/api/bio-organics/v1/products",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: payloadData,
      },
      options: {
        onSuccess({ response }) {
          const { data, error } = response;
          if (data.status === 200) {
            dispatch({
              type: `${GET_PRODUCT_LIST}_${SUCCESS}`,
              payload: { ...data, ...payloadData },
            });

            return Promise.resolve({ ...data });
          }
          dispatch({
            type: `${GET_PRODUCT_LIST}_${FAIL}`,
            payload: { ...data },
          });
          return Promise.reject(data);
        },
        onError(exception) {
          if (exception.error.isAxiosError) {
            const {
              response: { data: dataError },
            } = exception.error;
            dispatch({
              type: `${GET_PRODUCT_LIST}_${FAIL}`,
              payload: { dataError },
            });
            return Promise.reject(dataError);
          }
          dispatch({ type: `${GET_PRODUCT_LIST}_${FAIL}`, payload: {} });
          return Promise.reject();
        },
      },
    },
  });

export const getCertificateList = (payloadData) => (dispatch) =>
  dispatch({
    type: GET_CERTIFICATE_LIST,
    payload: {
      request: {
        url: "/api/bio-organics/v1/certificates",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: payloadData,
      },
      options: {
        onSuccess({ response }) {
          const { data, error } = response;
          console.log("response", response);
          if (data.status === 200) {
            dispatch({
              type: `${GET_CERTIFICATE_LIST}_${SUCCESS}`,
              payload: { ...data, ...payloadData },
            });

            return Promise.resolve({ ...data });
          }
          dispatch({
            type: `${GET_CERTIFICATE_LIST}_${FAIL}`,
            payload: { ...data },
          });
          return Promise.reject(data);
        },
        onError(exception) {
          if (exception.error.isAxiosError) {
            const {
              response: { data: dataError },
            } = exception.error;
            dispatch({
              type: `${GET_CERTIFICATE_LIST}_${FAIL}`,
              payload: { dataError },
            });
            return Promise.reject(dataError);
          }
          dispatch({ type: `${GET_CERTIFICATE_LIST}_${FAIL}`, payload: {} });
          return Promise.reject();
        },
      },
    },
  });

export const getProductByCategory = (payloadData) => (dispatch) =>
  dispatch({
    type: GET_PRODUCT_BY_CATEGORY,
    payload: {
      request: {
        url: "/api/bio-organics/v1/products",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: payloadData,
      },
      options: {
        onSuccess({ response }) {
          const { data, error } = response;
          console.log("response", response);
          if (data.status === 200) {
            dispatch({
              type: `${GET_PRODUCT_BY_CATEGORY}_${SUCCESS}`,
              payload: { ...data, ...payloadData },
            });

            return Promise.resolve({ ...data });
          }
          dispatch({
            type: `${GET_PRODUCT_BY_CATEGORY}_${FAIL}`,
            payload: { ...data },
          });
          return Promise.reject(data);
        },
        onError(exception) {
          if (exception.error.isAxiosError) {
            const {
              response: { data: dataError },
            } = exception.error;
            dispatch({
              type: `${GET_PRODUCT_BY_CATEGORY}_${FAIL}`,
              payload: { dataError },
            });
            return Promise.reject(dataError);
          }
          dispatch({ type: `${GET_PRODUCT_BY_CATEGORY}_${FAIL}`, payload: {} });
          return Promise.reject();
        },
      },
    },
  });

export const postEnquiryList = (payload) => (dispatch) =>
  dispatch({
    type: POST_PRODUCT_LIST,
    payload: {
      request: {
        url: "api/bio-organics/v1/user/enquiry",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: payload,
      },
      options: {
        onSuccess({ response }) {
          const { data, error } = response;
          if (data.status === 200) {
            dispatch({
              type: `${POST_PRODUCT_LIST}_${SUCCESS}`,
              payload: { ...data, ...payload },
            });

            return Promise.resolve({ ...data });
          }
          dispatch({
            type: `${POST_PRODUCT_LIST}_${FAIL}`,
            payload: { ...data },
          });
          return Promise.reject(data);
        },
        onError(exception) {
          if (exception.error.isAxiosError) {
            const {
              response: { data: dataError },
            } = exception.error;
            dispatch({
              type: `${POST_PRODUCT_LIST}_${FAIL}`,
              payload: { dataError },
            });
            return Promise.reject(dataError);
          }
          dispatch({ type: `${POST_PRODUCT_LIST}_${FAIL}`, payload: {} });
          return Promise.reject();
        },
      },
    },
  });

export const deleteListOfProductList = (payloadData) => (dispatch) =>
  dispatch({
    type: DELETE_PRODUCT_LIST,
    payload: {
      request: {
        url: "/api/bio-organics/v1/delete/product",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        data: payloadData,
      },
      options: {
        onSuccess({ response }) {
          const { data, error } = response;
          if (data.status === 200) {
            dispatch({
              type: `${DELETE_PRODUCT_LIST}_${SUCCESS}`,
              payload: { ...data, ...payloadData },
            });

            return Promise.resolve({ ...data });
          }
          dispatch({
            type: `${DELETE_PRODUCT_LIST}_${FAIL}`,
            payload: { ...data },
          });
          return Promise.reject(data);
        },
        onError(exception) {
          if (exception.error.isAxiosError) {
            const {
              response: { data: dataError },
            } = exception.error;
            dispatch({
              type: `${DELETE_PRODUCT_LIST}_${FAIL}`,
              payload: { dataError },
            });
            return Promise.reject(dataError);
          }
          dispatch({ type: `${DELETE_PRODUCT_LIST}_${FAIL}`, payload: {} });
          return Promise.reject();
        },
      },
    },
  });

export const getProductById = (productId) => (dispatch) =>
  dispatch({
    type: GET_PRODUCT_BY_ID,
    payload: {
      request: {
        url: `/api/bio-organics/v1/product/${productId}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      options: {
        onSuccess({ response }) {
          const { data, error } = response;
          if (data.status === 200) {
            dispatch({
              type: `${GET_PRODUCT_BY_ID}_${SUCCESS}`,
              payload: { ...data },
            });

            return Promise.resolve({ ...data });
          }
          dispatch({
            type: `${GET_PRODUCT_BY_ID}_${FAIL}`,
            payload: { ...data },
          });
          return Promise.reject(data);
        },
        onError(exception) {
          if (exception.error.isAxiosError) {
            const {
              response: { data: dataError },
            } = exception.error;
            dispatch({
              type: `${GET_PRODUCT_BY_ID}_${FAIL}`,
              payload: { dataError },
            });
            return Promise.reject(dataError);
          }
          dispatch({ type: `${GET_PRODUCT_BY_ID}_${FAIL}`, payload: {} });
          return Promise.reject();
        },
      },
    },
  });
export const imgUpload = (productID, payloadData) => (dispatch) =>
  dispatch({
    type: IMAGE_UPLOAD,
    payload: {
      request: {
        url: `/api/bio-organics/v1/product/image?productId=${productID}`,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: payloadData,
      },
      options: {
        onSuccess({ response }) {
          const { data, error } = response;
          if (data.status === 200) {
            dispatch({
              type: `${IMAGE_UPLOAD}_${SUCCESS}`,
              payload: { ...data },
            });

            return Promise.resolve({ ...data });
          }
          dispatch({
            type: `${IMAGE_UPLOAD}_${FAIL}`,
            payload: { ...data },
          });
          return Promise.reject(data);
        },
        onError(exception) {
          if (exception.error.isAxiosError) {
            const {
              response: { data: dataError },
            } = exception.error;
            dispatch({
              type: `${IMAGE_UPLOAD}_${FAIL}`,
              payload: { dataError },
            });
            return Promise.reject(dataError);
          }
          dispatch({ type: `${IMAGE_UPLOAD}_${FAIL}`, payload: {} });
          return Promise.reject();
        },
      },
    },
  });
  export const getLatestProduct = (payloadData) => (dispatch) =>
  dispatch({
    type: GET_LATEST_PRODUCT,
    payload: {
      request: {
        url: "/api/bio-organics/v1/latest/products",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: payloadData,
      },
      options: {
        onSuccess({ response }) {
          const { data, error } = response;
          console.log("response", response);
          if (data.status === 200) {
            dispatch({
              type: `${GET_LATEST_PRODUCT}_${SUCCESS}`,
              payload: { ...data, ...payloadData },
            });
            return Promise.resolve({ ...data });
          }
          dispatch({
            type: `${GET_LATEST_PRODUCT}_${FAIL}`,
            payload: { ...data },
          });
          return Promise.reject(data);
        },
        onError(exception) {
          if (exception.error.isAxiosError) {
            const {
              response: { data: dataError },
            } = exception.error;
            dispatch({
              type: `${GET_LATEST_PRODUCT}_${FAIL}`,
              payload: { dataError },
            });
            return Promise.reject(dataError);
          }
          dispatch({ type: `${GET_LATEST_PRODUCT}_${FAIL}`, payload: {} });
          return Promise.reject();
        },

      },

    },

  });

export const getCategoryList = (payloadData) => (dispatch) =>
  dispatch({
    type: GET_CATEGORY_LIST,
    payload: {
      request: {
        url: "/api/bio-organics/v1/categories",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: payloadData,
      },
      options: {
        onSuccess({ response }) {
          const { data, error } = response;
          console.log("response", response);
          if (data.status === 200) {
            dispatch({
              type: `${GET_CATEGORY_LIST}_${SUCCESS}`,
              payload: { ...data, ...payloadData },
            });

            return Promise.resolve({ ...data });
          }
          dispatch({
            type: `${GET_CATEGORY_LIST}_${FAIL}`,
            payload: { ...data },
          });
          return Promise.reject(data);
        },
        onError(exception) {
          if (exception.error.isAxiosError) {
            const {
              response: { data: dataError },
            } = exception.error;
            dispatch({
              type: `${GET_CATEGORY_LIST}_${FAIL}`,
              payload: { dataError },
            });
            return Promise.reject(dataError);
          }
          dispatch({ type: `${GET_CATEGORY_LIST}_${FAIL}`, payload: {} });
          return Promise.reject();
        },
      },
    },
  });
export const postContactList = (payload) => (dispatch) =>
  dispatch({
    type: POST_CONTACT_LIST,
    payload: {
      request: {
        url: "api/bio-organics/v1/user/contact",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: payload,
      },
      options: {
        onSuccess({ response }) {
          const { data, error } = response;
          console.log("dataaaaa", data);
          console.log("error", error);
          if (data.status === 200) {
            dispatch({
              type: `${POST_CONTACT_LIST}_${SUCCESS}`,
              payload: { ...data, ...payload },
            });

            return Promise.resolve({ ...data });
          }
          dispatch({
            type: `${POST_CONTACT_LIST}_${FAIL}`,
            payload: { ...data },
          });
          return Promise.reject(data);
        },
        onError(exception) {
          if (exception.error.isAxiosError) {
            const {
              response: { data: dataError },
            } = exception.error;
            dispatch({
              type: `${POST_CONTACT_LIST}_${FAIL}`,
              payload: { dataError },
            });
            return Promise.reject(dataError);
          }
          dispatch({ type: `${POST_CONTACT_LIST}_${FAIL}`, payload: {} });
          return Promise.reject();
        },
      },
    },
  });
