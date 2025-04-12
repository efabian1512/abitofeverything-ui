import styles from './ConfirmationModal.module.css';

const ConfirmationModal = ({ isModalOpen, message, onCancel, onConfirm }: {isModalOpen: boolean, message: string, onCancel: () => void, onConfirm: () => void}) => {
    
    return <>

                <div className={`modal fade ${isModalOpen ? 'show '+ styles['modal-main-container'] :'' } `}  id="exampleModalCenteredScrollable"
                    tabIndex={-1} aria-labelledby="exampleModalCenteredScrollableTitle" aria-modal="true" role="dialog">
                     <div className={`modal-dialog modal-dialog-centered modal-dialog-scrollable ${isModalOpen ? ' ' : 'collapse' }`} >
                         <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5 fw-bold" id="exampleModalCenteredScrollableTitle">
                                    Eliminar</h1>
                            <button onClick={onCancel} type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                             </div>
                         <div className="modal-body">
                            <p>{message}</p>
                        </div>
                     <div className="modal-footer">
                        <button onClick={onCancel} type="button" className="btn btn-secondary"
                             data-bs-dismiss="modal">Cancelar</button>
                            <button onClick={onConfirm} type="button" className="btn btn-primary">Confirmar</button>
                    </div>
                 </div>
             </div>
        </div>
        {isModalOpen && <div className="modal-backdrop show fade"></div>}
    </>
}

export default ConfirmationModal;

