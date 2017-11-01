//This will also return associated answer choices
export const fetchOneQuestion = (id) => {
  return $.ajax( {url: `/api/questions/${id}`,
    method: "GET"} );
};

//Note: will be responsible for creating associated answer choices
export const createQuestion = (data) => {
  return $.ajax( {
    url: `/api/questions`,
    method: "POST",
    data: data,
    contentType: false,
    processData: false
  } );
}

export const updateQuestion = (id, data) => {
  return $.ajax( {url: `/api/questions/${id}`,
    method: "PATCH", data: data} );
};

export const deleteQuestion = (id) => {
  return $.ajax( {url: `/api/questions/${id}`,
     method: "DELETE"} );
};

export const activateQuestion = (id) => {
  return $.ajax({url: `/api/questions/${id}/activate`,
    method: "PATCH"})
}

export const fetchUsersActiveQuestion = (username) => {
  return $.ajax({url: `/api/active_question/${username}`,
    method: "GET"})
}
