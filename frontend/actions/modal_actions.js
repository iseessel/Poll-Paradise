export const OPEN_MODAL = "OPEN_MODAL"
export const CLOSE_MODAL = "CLOSE_MODAL"

export const openModalAction = (modal) => {

  return{
    type: OPEN_MODAL,
    modal: modal
  }
}

export const closeModalAction = () => {

  return {
    type: CLOSE_MODAL
  }

}

export const openModal = (modal) => (dispatch) => {
  $('body').addClass('modal-open')
  dispatch(openModalAction(modal))
}

export const closeModal= () => (dispatch) => {
  $('body').removeClass('modal-open')
  dispatch(closeModalAction())
}
