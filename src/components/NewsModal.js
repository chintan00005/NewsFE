const NewsModal = ({ message, onRetry }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-5 rounded shadow-lg">
          <h2 className="text-xl mb-4">{message}</h2>
          <button onClick={onRetry} className="bg-blue-500 text-white px-4 py-2 rounded">
            Retry
          </button>
        </div>
      </div>
    );
  };
  
  export default NewsModal;
  