

function EmptyState({ title, message }) {
  return (
    <div className="bg-white rounded-2xl shadow p-10 text-center">
      <h2 className="text-2xl font-semibold text-gray-700">
        {title}
      </h2>

      <p className="text-gray-500 mt-2">
        {message}
      </p>
    </div>
  );
}

export default EmptyState;