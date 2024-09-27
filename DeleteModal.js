import React from 'react';
import './DeleteModal.css';

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirmar Exclusão</h2>
        <p>Você tem certeza de que deseja excluir este produto?</p>
        <button onClick={onConfirm}>Excluir</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default DeleteModal;
