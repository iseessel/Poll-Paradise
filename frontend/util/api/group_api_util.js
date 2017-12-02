//This request will fetch group, questions, and all answer_choices
export const fetchGroups = () => {
  return $.ajax( {url: "/api/groups",
  method: "GET"} );
};

export const fetchOneGroup = (id) => {
  return $.ajax( {url: `/api/groups/${id}`,
    method: "GET"} );

};

export const createGroup = (data) => {
  return $.ajax( {url: "/api/groups",
  method: "POST", data: data} );
};

export const groupQuestions = (id, data) => {
  return $.ajax( { url: `/api/groups/${id}/group_questions`,
    method: "PATCH", data: data } )
}

export const deleteGroup = (id) => {
  return $.ajax( {url: `/api/groups/${id}`,
    method: "DELETE"} );
};
