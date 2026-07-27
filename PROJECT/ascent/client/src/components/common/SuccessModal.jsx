import "../../styles/successModal.css";

function SuccessModal({ message, onClose }) {
    return (
        <div className="modal-overlay">
            <div className="success-modal">

                <div className="success-icon">
                    ✓
                </div>

                <h2>Success</h2>

                <p>{message}</p>

                <button onClick={onClose}>
                    Continue
                </button>

            </div>
        </div>
    );
}
export default SuccessModal;

