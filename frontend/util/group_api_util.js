export const fetchAllGroupsForUser = () => {
  return $.ajax( {url: "/api/groups", method: "GET"} );
};

export const fetchOneGroup = (id) => {
  return $.ajax( {url: `/api/groups/${id}`, method: "GET"} );

};

export const createGroup = (group) => {
  return $.ajax( {url: "/api/groups", method: "POST", data: group} );
};
