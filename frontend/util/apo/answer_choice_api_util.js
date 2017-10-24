export const updateAnswerchoice = (id) => {
  return $.ajax( {url: `/api/answer_choices/${id}`,
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
