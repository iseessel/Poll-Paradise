export const TOGGLE_SELECTED = "TOGGLE_SELECTED"
export const DISABLE_LOADING = "DISABLE_LOADING"
export const ENSURE_SELECTED = "ENSURE_SELECTED"

export const disableLoading = () => {
  return {
    type: DISABLE_LOADING
  }
}

export const ensureSelected = (groupId) => {
  debugger;
  return {
    type: ENSURE_SELECTED,
    groupId: groupId
  }
}

export const toggleSelected = (groupId) => {
  return {
    type: TOGGLE_SELECTED,
    groupId: groupId
  }
}
