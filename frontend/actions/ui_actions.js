export const TOGGLE_SELECTED = "TOGGLE_SELECTED"


export const toggleSelected = (groupId) => {
  return {
    type: TOGGLE_SELECTED,
    groupId: groupId
  }
}
