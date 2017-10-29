import { OPEN_MODAL, CLOSE_MODAL } from '../../actions/modal_actions.js'

const _defaultState = null

function ModalReducer(state = _defaultState, action){

  switch(action.type){

    case OPEN_MODAL:
      return action.modal

    case CLOSE_MODAL:
      return null

    default:
      return state
  }
}

export default ModalReducer
