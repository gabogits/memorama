export const catchError = (error) => {
  let errorMsg = "";
  if (error.response) {
    errorMsg = error.response.data?.msg;
    if (error.response?.data?.error) {
      errorMsg = error.response.data.error.msg;
    }
  } else {
    errorMsg = error.msg;
  }

  return errorMsg;
};
