import React from "react";

const RetryModal = ({ onRetry, onCancel }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Failed to Fetch News</h2>
        <button onClick={onRetry} style={{ width: "100%", marginBottom: "1rem" }}>
          Retry
        </button>
        <button
          onClick={onCancel}
          style={{
            width: "100%",
            backgroundColor: "#e53e3e",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RetryModal;
