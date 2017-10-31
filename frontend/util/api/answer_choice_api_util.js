export const updateTimesChosen = (id, diff) => {
  return $.ajax( {
            url: `/api/answer_choices/${id}/update_times_chosen`,
            method: "PATCH",
            data: {differential: diff}
            }
          )
      }

export const deleteAnswerChoice = (id) => {
  return $.ajax( {url: `/api/answer_choices/${id}`,
     method: "DELETE"} );
};

export const addAnswerChoice = (data) => {
  return $.ajax( {url: `/api/answer_choices/`,
     method: "POST", data: data} );
}
