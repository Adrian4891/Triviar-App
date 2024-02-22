const Spinner = () => {
  return (
    <div className="h-screen bg-dark flex justify-center items-center gap-2 flex-column">
      <div class="spinner-grow text-secondary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <p className="text-xl font-semibold text-white">Cargando...</p>
    </div>
  );
};

export default Spinner;
