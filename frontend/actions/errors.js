export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

export const receiveErrors = (errors) => {
  
  return {
    type: RECEIVE_ERRORS,
    errors: errors,
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
}
