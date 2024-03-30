import React ,{useState} from 'react'
import  {Pagination} from './Paginations.js'

const StockData = {
  "Macrosoft": [
    { "date": "Mar 1, 2024", "open": 10, "close": 11 },
    { "date": "Mar 2, 2024", "open": 12, "close": 11 },
    { "date": "Mar 3, 2024", "open": 10, "close": 5 },
    { "date": "Mar 4, 2024", "open": 5, "close": 9 },
    { "date": "Mar 5, 2024", "open": 10, "close": 13 },
    { "date": "Mar 6, 2024", "open": 14, "close": 7 },
    { "date": "Mar 7, 2024", "open": 5, "close": 11 },
    { "date": "Mar 8, 2024", "open": 10, "close": 11 },
    { "date": "Mar 9, 2024", "open": 11, "close": 10 },
    { "date": "Mar 10, 2024", "open": 10, "close": 11 },
    { "date": "Mar 11, 2024", "open": 11, "close": 11 }
  ],
  "Doogle": [
    { "date": "Mar 1, 2024", "open": 20, "close": 21 },
    { "date": "Mar 2, 2024", "open": 21, "close": 21 },
    { "date": "Mar 3, 2024", "open": 21, "close": 21 },
    { "date": "Mar 4, 2024", "open": 21, "close": 18 },
    { "date": "Mar 5, 2024", "open": 17, "close": 15 },
    { "date": "Mar 6, 2024", "open": 16, "close": 15 },
    { "date": "Mar 7, 2024", "open": 16, "close": 18 },
    { "date": "Mar 8, 2024", "open": 22, "close": 18 },
    { "date": "Mar 9, 2024", "open": 19, "close": 19 },
    { "date": "Mar 10, 2024", "open": 16, "close": 17 },
    { "date": "Mar 11, 2024", "open": 17, "close": 19 }
  ]
};

const StockDisplay = ({ stockName, data, days }) => {
  const filteredData = data.slice(0, days);

  return (
    <div className='bg-gradient-to-r from-pink-200 to-fuchsia-100'>
      <h2>{stockName}</h2>
      <div className='border-slate-600 rounded-lg shadow overflow-hidden border-2 dark:shadow-gray-900'>
      <table className="min-w-full divide-y divide-gray-900  dark:divide-gray-700">
        <thead>
          <tr className='border-slate-600'>
            <th scope="col" className='px-6 py-3 text-start text-sm lg:text-xl md:text-xl font-mediumuppercase font-bold'>Date</th>
            <th scope="col" className='px-6 py-3 text-start text-sm lg:text-xl md:text-xl font-mediumuppercase'>Open</th>
            <th scope="col" className='px-6 py-3 text-start text-sm lg:text-xl md:text-xl font-mediumuppercase'>Close</th>
          </tr>
        </thead>
        <tbody className='divide-y dark:divide-gray-700'>
          {filteredData.map((item, index) => {
            const previousClose = index > 0 ? filteredData[index - 1].close : null;
            const openColor = previousClose !== null && item.open > previousClose ? 'text-green-500' : 'text-red-500';
            const closeColor = item.close > item.open ? 'text-green-500' : 'text-red-500';

            return (
              <tr key={index} className='hover:bg-gray-100 text-lg md:text-xl border-slate-600 '>
                <td className='px-6 py-4 whitespace-nowrap text-sm lg:text-xl md:text-xl font-semibold '>{item.date}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm lg:text-xl md:text-xl font-semibold  ${openColor}`}>{item.open}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm lg:text-xl md:text-xl font-semibold  ${closeColor}`}>{item.close}</td>
              </tr>
            );

          })}
        </tbody>
      </table>
      </div>
    </div>
  );
};

const Stocks = () => {
  const [selectedStock, setSelectedStock] = useState("Macrosoft");
  const [displayDays, setDisplayDays] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);


  const handleStockChange = (e) => {
    setSelectedStock(e.target.value);
    setCurrentPage(1); 
  };
  
  const handleDaysChange = (e) => {
    const selectedDays = parseInt(e.target.value);
    setDisplayDays(selectedDays);
    setCurrentPage(1);
    setItemsPerPage(selectedDays);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = StockData[selectedStock].slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (

    <div className='bg-gradient-to-r from-pink-200 to-fuchsia-100 min-h-screen'>
       <div className='p-3'>
        <div className='flex gap-10 justify-center'>
          <div>
            <label htmlFor="stock" className='font-bold text-slate-600 text-sm lg:text-xl md:text-xl'>Select Stock:&nbsp;</label>
            <select id="stock" value={selectedStock} onChange={handleStockChange} className='border-2 border-blue-200 rounded-md'>
              <option value="Macrosoft" className='text-purple-600 font-medium p-1'>Macrosoft</option>
              <option value="Doogle" className='text-purple-600 font-medium p-1'>Doogle</option>
            </select>
          </div>
      
          <div>
            <label htmlFor="days" className='font-bold text-slate-600 text-sm lg:text-xl md:text-xl'>Number of Days:&nbsp;</label>
            <select id="days" value={displayDays} onChange={handleDaysChange} className='border-2 border-blue-200 rounded-md'>
              <option value={3} className='text-red-500 font-normal p-1'>3</option>
              <option value={5} className='text-green-500 font-normal p-1'>5</option>
              <option value={10} className='text-green-500 font-normal p-1'>10</option>
            </select>
          </div>
        </div>
      
        <div className='font-bold sm:mt-6 mt-6'>
          <div className='text-purple-500  p-2 text-xl lg:text-3xl md:text-3xl'>{selectedStock}</div>
          <StockDisplay 
            data={currentItems}
            days={displayDays}
          />
        </div>
        
        {/* Pagination */}
        <div className='flex justify-center'>
          {StockData[selectedStock].length > itemsPerPage && (
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={StockData[selectedStock].length}
              paginate={paginate}
              currentPage={currentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
  
};
export default Stocks