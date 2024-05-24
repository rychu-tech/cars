import React, { useEffect, useState } from 'react';
import { Car } from '../models/car';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../config/store';
import { getCars } from '../slices/carSlice';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Cars: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const carSlice = useSelector((state: RootState) => state.cars);
  const [page, setPage] = useState<number>(carSlice.pageNumber);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      await dispatch(getCars({
        pageId: page,
        numElements: carSlice.pageSize,
        sortBy: "id",
        sortDirection: "asc",
      })).unwrap();
      setLoading(false);
    };

    fetchCars();
  }, [dispatch, page, carSlice.pageSize]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < carSlice.totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="container mx-auto p-2">
      <h1 className="text-2xl font-bold mb-4">Cars</h1>
      <table className="table-fixed w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="w-1/9 py-2 px-4 border-b text-center">Id</th>
            <th className="w-1/9 py-2 px-4 border-b text-center">Make</th>
            <th className="w-1/9 py-2 px-4 border-b text-center">Model</th>
            <th className="w-1/9 py-2 px-4 border-b text-center">Color</th>
            <th className="w-1/9 py-2 px-4 border-b text-center">Year</th>
            <th className="w-1/9 py-2 px-4 border-b text-center">Owners</th>
            <th className="w-1/9 py-2 px-4 border-b text-center">HP</th>
            <th className="w-1/9 py-2 px-4 border-b text-center">Price</th>
            <th className="w-1/9 py-2 px-4 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {carSlice.cars.map((car: Car) => (
            <tr key={car.id} className="h-12">
              <td className="py-2 px-4 border-b text-center">{car.id}</td>
              <td className="py-2 px-4 border-b text-center">{car.carModel.makeName}</td>
              <td className="py-2 px-4 border-b text-center">{car.carModel.name}</td>
              <td className="py-2 px-4 border-b text-center">{car.color}</td>
              <td className="py-2 px-4 border-b text-center">{car.year}</td>
              <td className="py-2 px-4 border-b text-center">{car.owners}</td>
              <td className="py-2 px-4 border-b text-center">{car.horsepower}</td>
              <td className="py-2 px-4 border-b text-center">{car.price}</td>
              <td className="py-2 px-4 border-b text-center">
                <div className="flex justify-center items-center space-x-2">
                  <RemoveRedEyeIcon fontSize='small'/>
                  <EditIcon color="primary" fontSize='small'/>
                  <DeleteIcon color="error" fontSize='small'/>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button 
          onClick={() => handlePageChange(page - 1)} 
          disabled={carSlice.first || loading}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 flex items-center"
        >
          {loading && <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>}
          Previous
        </button>
        <span>Page {page + 1} of {carSlice.totalPages}</span>
        <button 
          onClick={() => handlePageChange(page + 1)} 
          disabled={carSlice.last || loading}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 flex items-center"
        >
          {loading && <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>}
          Next
        </button>
      </div>
      {carSlice.error && <p className="text-red-500 mt-2">Error: {carSlice.error}</p>}
    </div>
  );
}

export default Cars;
