import React, { useEffect, useState } from 'react';
import { Car } from '../models/car';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../config/store';
import { getCars } from '../slices/carSlice';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import LoadingButton from '@mui/lab/LoadingButton';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import DownloadIcon from '@mui/icons-material/Download';


const Cars: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const carSlice = useSelector((state: RootState) => state.cars);
  const [page, setPage] = useState<number>(carSlice.pageNumber);
  const [pageSize, setPageSize] = useState<number>(carSlice.pageSize);
  const [sortBy, setSortBy] = useState<string>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      await dispatch(getCars({
        pageId: page,
        numElements: pageSize,
        sortBy: sortBy,
        sortDirection: sortDirection,
      })).unwrap();
      setLoading(false);
    };

    fetchCars();
  }, [dispatch, page, pageSize, sortBy, sortDirection]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < carSlice.totalPages) {
      setPage(newPage);
    }
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(event.target.value));
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  const renderSortIcon = (column: string) => {
    if (sortBy === column) {
      return sortDirection === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />;
    }
    return null;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="container mx-auto p-2 flex-grow flex flex-col cursor-default">
        <div className="flex mb-4 mt-4 flex justify-between">
          <div>
            <span className="text-lg">Page Size:</span>
            <select value={pageSize} onChange={handlePageSizeChange} className="border rounded px-2 py-1">
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>
            <LoadingButton
            size="large"
            endIcon={<DownloadIcon />}
            loading={loading}
            loadingPosition="end"
            variant="contained"
            color="secondary"
          >
            Download
          </LoadingButton>
        </div>
        <div className="flex-grow overflow-auto">
          <table className="table-fixed w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="w-1/9 py-2 px-4 border-b text-center cursor-pointer" onClick={() => handleSort('id')}>
                  Id {renderSortIcon('id')}
                </th>
                <th className="w-1/9 py-2 px-4 border-b text-center cursor-pointer" onClick={() => handleSort('carModel.carMake.name')}>
                  Make {renderSortIcon('carModel.carMake.name')}
                </th>
                <th className="w-1/9 py-2 px-4 border-b text-center cursor-pointer" onClick={() => handleSort('carModel.name')}>
                  Model {renderSortIcon('carModel.name')}
                </th>
                <th className="w-1/9 py-2 px-4 border-b text-center cursor-pointer" onClick={() => handleSort('color')}>
                  Color {renderSortIcon('color')}
                </th>
                <th className="w-1/9 py-2 px-4 border-b text-center cursor-pointer" onClick={() => handleSort('year')}>
                  Year {renderSortIcon('year')}
                </th>
                <th className="w-1/9 py-2 px-4 border-b text-center cursor-pointer" onClick={() => handleSort('owners')}>
                  Owners {renderSortIcon('owners')}
                </th>
                <th className="w-1/9 py-2 px-4 border-b text-center cursor-pointer" onClick={() => handleSort('horsepower')}>
                  HP {renderSortIcon('horsepower')}
                </th>
                <th className="w-1/9 py-2 px-4 border-b text-center cursor-pointer" onClick={() => handleSort('price')}>
                  Price {renderSortIcon('price')}
                </th>
                <th className="w-1/9 py-2 px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {carSlice.cars.map((car: Car) => (
                <tr key={car.id} className="h-12 hover:bg-gray-100">
                  <td className="py-2 px-4 border-b text-center">{car.id}</td>
                  <td className="py-2 px-4 border-b text-center">{car.carModel.makeName}</td>
                  <td className="py-2 px-4 border-b text-center">{car.carModel.name}</td>
                  <td className="py-2 px-4 border-b text-center">{car.color}</td>
                  <td className="py-2 px-4 border-b text-center">{car.year}</td>
                  <td className="py-2 px-4 border-b text-center">{car.owners}</td>
                  <td className="py-2 px-4 border-b text-center">{car.horsepower}</td>
                  <td className="py-2 px-4 border-b text-center">{car.price}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <div className="flex justify-center items-center space-x-2 cursor-pointer">
                      <RemoveRedEyeIcon fontSize='small'/>
                      <EditIcon color="primary" fontSize='small'/>
                      <DeleteIcon color="error" fontSize='small'/>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center items-center mt-4 sticky bottom-0 bg-white py-2 space-x-4">
      <LoadingButton
          size="small"
          onClick={() => handlePageChange(page - 1)}
          startIcon={<NavigateBeforeIcon />}
          loading={loading}
          loadingPosition="start"
          variant="contained"
        >
          Back
        </LoadingButton>
        <span>Page {page + 1} of {carSlice.totalPages}</span>
        <LoadingButton
          size="small"
          onClick={() => handlePageChange(page + 1)}
          endIcon={<NavigateNextIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          Next
        </LoadingButton>
      </div>
    </div>
  );
}

export default Cars;
