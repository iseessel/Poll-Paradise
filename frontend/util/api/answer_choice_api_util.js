export const chooseAnswer = (id) => {
  return $.ajax( {url: `/api/answer_choices/${id}/choose`,
    method: "PATCH"} );
};

export const takeBackAnswer = (id) => {
  return $.ajax( {url: `/api/answer_choices/${id}/takeback`,
    method: "PATCH"} );
};

export const deleteAnswerChoice = (id) => {
  return $.ajax( {url: `/api/answer_choices/${id}`,
     method: "DELETE"} );
};

export const addAnswerChoice = (data) => {
  return $.ajax( {url: `/api/answer_choices/`,
     method: "POST", data: data} );
}
