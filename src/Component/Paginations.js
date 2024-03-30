export const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav className="flex items-center justify-between ">
        <ul className='pagination flex gap-2 m-2 font-semibold'>
          {pageNumbers.map(number => (
            <li key={number} className={currentPage === number ? 'bg-blue-300 p-2 rounded-lg focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none  ' : 'bg-blue-300 p-2 rounded-lg focus:bg-blue-300 disabled:opacity-50 disabled:pointer-events-none '}>
             <button> <a onClick={() => paginate(number)}>
                {number}
              </a> </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  };
  