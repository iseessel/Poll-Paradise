export const TOGGLE_SELECTED = "TOGGLE_SELECTED"
export const DISABLE_LOADING = "DISABLE_LOADING"
export const ENSURE_SELECTED = "ENSURE_SELECTED"
export const TOGGLE_QUESTION_TO_BE_GROUPED = "TOGGLE_QUESTION_TO_BE_GROUPED"
export const CLEAR_SELECTED = "CLEAR_SELECTED"

export const disableLoading = () => {
  return {
    type: DISABLE_LOADING
  }
}

export const ensureSelected = (groupId) => {

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

export const clearSelected = () => {
  return {
    type: CLEAR_SELECTED,
    groupId: groupId
  }
}


export const toggleQuestionToBeGrouped = (questionId) => {

  return{
    type: TOGGLE_QUESTION_TO_BE_GROUPED,
    questionId: questionId
  }
}
