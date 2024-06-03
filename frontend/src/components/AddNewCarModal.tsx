import React, { ReactNode, useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {
  validateColor,
  validateYear,
  validateMileage,
  validateOwners,
  validateHorsepower,
  validatePrice
} from '../utils/validationHelper';
import { Car, CarMake } from '../models/car';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../config/store';
import { createCar, getCarMakes, getCarModelsForMake } from '../slices/carSlice';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { toast } from 'react-toastify';

interface AddNewCarModalProps {
  open: boolean;
  onClose: () => void;
}

const initialCar: Car = {
  id: 0,
  year: new Date().getFullYear(),
  color: '',
  mileage: 0,
  price: 0,
  owners: 0,
  horsepower: 0,
  carModel: { id: 0, name: '', makeId: 0, makeName: '' },
  fuelType: { id: 0, name: '' },
  engine: { id: 0, name: '' },
  transmission: { id: 0, name: '' },
  active: true
};

const AddNewCarModal: React.FC<AddNewCarModalProps> = ({ open, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const carState = useSelector((state: RootState) => state.cars);
  const [car, setCar] = useState<Car>(initialCar);
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    color: '',
    year: '',
    mileage: '',
    owners: '',
    horsepower: '',
    price: ''
  });

  const fetchCarMakes = async () => {
    await dispatch(getCarMakes());
  };

  const fetchCarModelsForMake = async () => {
    await dispatch(getCarModelsForMake(car.carModel.makeId));
  };

  useEffect(() => {
    fetchCarMakes();
  }, []);

  useEffect(() => {
    if (carState.carMakes.length > 0) {
      setCar({
        ...car,
        carModel: {
          ...car.carModel,
          makeId: carState.carMakes[0].id,
          makeName: carState.carMakes[0].name,
        }
      });
    }
  }, [carState.carMakes]);

  useEffect(() => {
    if (carState.carModels.length > 0) {
      setCar({
        ...car,
        carModel: {
          ...car.carModel,
          id: carState.carModels[0].id,
          name: carState.carModels[0].name,
        }
      });
    }
  }, [carState.carModels]);

  useEffect(() => {
    if (car.carModel.makeId !== 0) {
      fetchCarModelsForMake();
    }
  }, [car.carModel.makeId]);

  const handleSelectCarMakeChange = (event: SelectChangeEvent<number>, child: ReactNode) => {
    const selectedMake = carState.carMakes.find(model => model.id === event.target.value);
    if (selectedMake) {
      setCar((prev) => ({ ...prev, carModel: { id: 0, name: '', makeId: selectedMake.id, makeName: selectedMake.name } }));
    }
  };

  const handleSelectCarModelChange = (event: SelectChangeEvent<number>, child: ReactNode) => {
    const selectedModel = carState.carModels.find(model => model.id === event.target.value);
    if (selectedModel) {
      setCar((prev) => ({ ...prev, carModel: { ...prev.carModel, id: selectedModel.id, name: selectedModel.name } }));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const isValid =
      validateColor(car, setErrors) &&
      validateYear(car, setErrors) &&
      validateMileage(car, setErrors) &&
      validateOwners(car, setErrors) &&
      validateHorsepower(car, setErrors) &&
      validatePrice(car, setErrors);
    if (isValid) {
      dispatch(createCar(car))
      .then((result) => {
          if (result.meta.requestStatus === 'fulfilled') {
              toast.success("Successfully added car!");
              onClose();
          } else {
              toast.error("Please check form values!");
          }
      });
    }
  };

  const handleChange = (field: keyof Car, value: string) => {
    const numberFields = ['year', 'mileage', 'owners', 'horsepower', 'price'];
    const updatedValue = numberFields.includes(field) ? parseInt(value, 10) : value;
    setCar((prev) => ({ ...prev, [field]: updatedValue || 0 }));
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="new-car-modal-title"
      aria-describedby="new-car-modal-description"
    >
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-lg">
        <Typography id="new-car-modal-title" variant="h6" component="h2">
          New Car
        </Typography>
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          gap={2}
          onSubmit={handleSubmit}
          className='mt-10'
        >
          <Box display="flex" gap={2}>
            <Box flex={1} display="flex" flexDirection="column" gap={2}>
              <FormControl required size='small'>
                <InputLabel id="car-make-select-label">Make</InputLabel>
                <Select
                  id="car-make-select"
                  labelId="car-make-select-label"
                  value={car.carModel.makeId !== 0 ? car.carModel.makeId : carState.carMakes[0]?.id}
                  onChange={handleSelectCarMakeChange}
                  label="Make"
                >
                  {carState.carMakes.map((make) => (
                    <MenuItem key={make.id} value={make.id}>
                      {make.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl required size='small'>
                <InputLabel id="car-model-select-label">Model</InputLabel>
                <Select
                  id="car-model-select"
                  labelId="car-model-select-label"
                  value={car.carModel.id !== 0 ? car.carModel.id : carState.carModels[0]?.id}
                  onChange={handleSelectCarModelChange}
                  label="Model"
                >
                  {carState.carModels.map((model) => (
                    <MenuItem key={model.id} value={model.id}>
                      {model.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                id="year"
                label="Year"
                type="number"
                variant="outlined"
                value={car.year}
                onChange={(e) => handleChange('year', e.target.value)}
                onBlur={() => validateYear(car, setErrors)}
                error={!!errors.year}
                helperText={errors.year}
                required
                size='small'
              />
              <TextField
                id="color"
                label="Color"
                variant="outlined"
                value={car.color}
                onChange={(e) => handleChange('color', e.target.value)}
                onBlur={() => validateColor(car, setErrors)}
                error={!!errors.color}
                helperText={errors.color}
                required
                size='small'
              />
            </Box>
            <Box flex={1} display="flex" flexDirection="column" gap={2}>
              <TextField
                id="mileage"
                label="Mileage"
                type="number"
                variant="outlined"
                value={car.mileage}
                onChange={(e) => handleChange('mileage', e.target.value)}
                onBlur={() => validateMileage(car, setErrors)}
                error={!!errors.mileage}
                helperText={errors.mileage}
                required
                size='small'
              />
              <TextField
                id="owners"
                label="Owners"
                type="number"
                variant="outlined"
                value={car.owners}
                onChange={(e) => handleChange('owners', e.target.value)}
                onBlur={() => validateOwners(car, setErrors)}
                error={!!errors.owners}
                helperText={errors.owners}
                required
                size='small'
              />
              <TextField
                id="horsepower"
                label="Horsepower"
                type="number"
                variant="outlined"
                value={car.horsepower}
                onChange={(e) => handleChange('horsepower', e.target.value)}
                onBlur={() => validateHorsepower(car, setErrors)}
                error={!!errors.horsepower}
                helperText={errors.horsepower}
                required
                size='small'
              />
              <TextField
                id="price"
                label="Price"
                type="number"
                variant="outlined"
                value={car.price}
                onChange={(e) => handleChange('price', e.target.value)}
                onBlur={() => validatePrice(car, setErrors)}
                error={!!errors.price}
                helperText={errors.price}
                required
                size='small'
              />
            </Box>
          </Box>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddNewCarModal;
