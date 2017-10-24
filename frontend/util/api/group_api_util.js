//This request will fetch group, questions, and all answer_choices
//Data will be NORMALIZED
export const fetchGroups= () => {
  return $.ajax( {url: "/api/groups",
  method: "GET"} );
};

export const fetchOneGroup = (id) => {
  return $.ajax( {url: `/api/groups/${id}`,
    method: "GET"} );

};

export const createGroup = (group) => {
  return $.ajax( {url: "/api/groups",
  method: "POST", data: group} );
};

export const deleteGroup = (id) => {
  return $.ajax( {url: `/api/groups/${id}`,
    method: "DELETE"} );
};
