export const TOGGLE_SELECTED = "TOGGLE_SELECTED"
export const DISABLE_LOADING = "DISABLE_LOADING"

export const disableLoading = () => {
  return {
    type: DISABLE_LOADING
  }

}

export const toggleSelected = (groupId) => {
  return {
    type: TOGGLE_SELECTED,
    groupId: groupId
  }
}
