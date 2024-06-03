import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Car } from '../models/car';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../config/store';
import { deleteCar, generateExcelForCars, getCars, restoreCar } from '../slices/carSlice';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import LoadingButton from '@mui/lab/LoadingButton';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import DownloadIcon from '@mui/icons-material/Download';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import DeleteCarModal from '../components/DeleteCarModal';
import RestoreCarModal from '../components/RestoreCarModal';
import ViewCarModal from '../components/ViewCarModal';
import { toast } from 'react-toastify';
import { saveAs } from 'file-saver';
import { Button } from '@mui/material';
import AddNewCarModal from '../components/AddNewCarModal';

const Cars: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const carSlice = useSelector((state: RootState) => state.cars);
  const [page, setPage] = useState<number>(carSlice.pageNumber);
  const [pageSize, setPageSize] = useState<number>(carSlice.pageSize);
  const [sortBy, setSortBy] = useState<string>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [restoreModalOpen, setRestoreModalOpen] = useState<boolean>(false);
  const [addNewCarModalOpen, setAddNewCarModalOpen] = useState<boolean>(false);
  const [viewModalOpen, setViewModalOpen] = useState<boolean>(false);
  const [carToDelete, setCarToDelete] = useState<Car | null>(null);
  const [carToRestore, setCarToRestore] = useState<Car | null>(null);
  const [carToView, setCarToView] = useState<Car | null>(null);

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

  const handleViewClick = (car: Car) => {
    setCarToView(car);
    setViewModalOpen(true);
  };

  const handleAddClick = () => {
    setAddNewCarModalOpen(true);
  }

  const handleEditClick = (car: Car) => {
    console.log(`Edit car with ID: ${car.id}`);
  };

  const handleDeleteClick = (car: Car) => {
    setCarToDelete(car);
    setDeleteModalOpen(true);
  };

  const handleRestoreClick = (car: Car) => {
    setCarToRestore(car);
    setRestoreModalOpen(true);
  };

  const confirmDelete = async (carId: number) => {
    toast.success("The car was deleted successfully!");
    await dispatch(deleteCar(carId)).unwrap();
    setDeleteModalOpen(false);
    setCarToDelete(null);
    dispatch(getCars({
      pageId: page,
      numElements: pageSize,
      sortBy: sortBy,
      sortDirection: sortDirection,
    }));
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setCarToDelete(null);
  };

  const cancelAdd = () => {
    setAddNewCarModalOpen(false);
  }

  const closeViewClick = () => {
    setCarToView(null);
    setViewModalOpen(false);
  }

  const confirmRestore = async (carId: number) => {
    toast.success("The car was restored successfully!");
    await dispatch(restoreCar(carId)).unwrap();
    setRestoreModalOpen(false);
    setCarToRestore(null);
    dispatch(getCars({
      pageId: page,
      numElements: pageSize,
      sortBy: sortBy,
      sortDirection: sortDirection,
    }));
  };

  const cancelRestore = () => {
    setRestoreModalOpen(false);
    setCarToRestore(null);
  };

  const downloadExcel = async () => {
    setLoading(true);
    try {
      const action = await dispatch(generateExcelForCars());
      if (generateExcelForCars.fulfilled.match(action)) {
        const blob = new Blob([action.payload], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, "cars.xlsx");
      } else {
        console.error('Error downloading the file', action.payload);
      }
    } catch (error) {
      console.error('Error downloading the file', error);
    } finally {
      setLoading(false);
    }
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
          <Button 
            variant="contained"
            color="success"
            onClick={() => handleAddClick()}
          >
            <AddIcon /> 
            New Car
          </Button>
          <LoadingButton
            size="large"
            startIcon={<DownloadIcon />}
            loading={loading}
            loadingPosition="start"
            variant="contained"
            color="secondary"
            onClick={downloadExcel}
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
                <tr key={car.id} className={`h-12 hover:bg-gray-100 ${!car.active ? 'hover:bg-red-300 line-through bg-red-200' : ''}`}>
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
                      <RemoveRedEyeIcon fontSize='small' onClick={() => handleViewClick(car)} />
                      <EditIcon color="primary" fontSize='small' onClick={() => handleEditClick(car)} />
                      {car.active
                        ? <DeleteIcon color="error" fontSize='small' onClick={() => handleDeleteClick(car)} />
                        : <RestoreFromTrashIcon color="success" fontSize='small' onClick={() => handleRestoreClick(car)} />
                      }
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
      <DeleteCarModal
        open={deleteModalOpen}
        car={carToDelete}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
      />
      <RestoreCarModal
        open={restoreModalOpen}
        car={carToRestore}
        onClose={cancelRestore}
        onConfirm={confirmRestore}
      />
      <ViewCarModal
        open={viewModalOpen}
        car={carToView}
        onClose={closeViewClick}
      />
      <AddNewCarModal
        open={addNewCarModalOpen}
        onClose={cancelAdd}
      />

    </div>
  );
}

export default Cars;
