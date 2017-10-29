import React from 'react';


export default function MyModal({ modal, component: Component, closeModal }) {

  let content;
  if (modal) {
    content = (
      <div className="modal-backdrop">
        <Component closeModal={closeModal}/>
      </div>
    );
  } else {
    content = null;
  }
  return content;
}
