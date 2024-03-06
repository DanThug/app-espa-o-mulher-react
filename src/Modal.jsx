import './Modal.css'

const Modal = ({ openModal, setModal, inputValue }) => {
    return (
        openModal
        ? <div className="modal">
            <div className="modal-container">
                <header className="modal-header">
                    <h2>O item <span>"{inputValue}"</span> já consta na lista!</h2>
                </header>
                <main className="modal-main">
                    <button onClick={() => setModal(false)}>Fechar</button>
                </main>
            </div>
        </div>
        : <></>
    )
}

export { Modal }