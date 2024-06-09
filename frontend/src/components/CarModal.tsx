import React, { useEffect, useState } from 'react';
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
  validatePrice,
} from '../utils/validationHelper';
import { Car } from '../models/car';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../config/store';
import {
  createCar,
  updateCar,
  getCarMakes,
  getCarModelsForMake,
  getEngines,
  getFuelTypes,
  getTransmissions,
} from '../slices/carSlice';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { toast } from 'react-toastify';

interface CarModalProps {
  open: boolean;
  onClose: () => void;
  car?: Car;
  onSave: () => void;
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
  active: true,
};

const CarModal: React.FC<CarModalProps> = ({ open, onClose, car: editCar, onSave }) => {
  const dispatch = useDispatch<AppDispatch>();
  const carState = useSelector((state: RootState) => state.cars);
  const [car, setCar] = useState<Car>(editCar || initialCar);
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    color: '',
    year: '',
    mileage: '',
    owners: '',
    horsepower: '',
    price: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getCarMakes());
      await dispatch(getEngines());
      await dispatch(getFuelTypes());
      await dispatch(getTransmissions());
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (carState.carMakes.length > 0 && !editCar) {
      setCar((prevCar) => ({
        ...prevCar,
        carModel: {
          ...prevCar.carModel,
          makeId: carState.carMakes[0].id,
          makeName: carState.carMakes[0].name,
        },
      }));
    }
  }, [carState.carMakes, editCar]);

  useEffect(() => {
    if (editCar) {
      dispatch(getCarModelsForMake(editCar.carModel.makeId));
    }
  }, [editCar, dispatch]);

  useEffect(() => {
    if (car.carModel.makeId !== 0) {
      dispatch(getCarModelsForMake(car.carModel.makeId));
    }
  }, [car.carModel.makeId, dispatch]);

  useEffect(() => {
    if (carState.carModels.length > 0 && !editCar) {
      setCar((prevCar) => ({
        ...prevCar,
        carModel: {
          ...prevCar.carModel,
          id: carState.carModels[0].id,
          name: carState.carModels[0].name,
        },
      }));
    }
  }, [carState.carModels, editCar]);

  useEffect(() => {
    if (carState.transmissions.length > 0 && !editCar) {
      setCar((prevCar) => ({
        ...prevCar,
        transmission: {
          id: carState.transmissions[0].id,
          name: carState.transmissions[0].name,
        },
      }));
    }
  }, [carState.transmissions, editCar]);

  useEffect(() => {
    if (carState.fuelTypes.length > 0 && !editCar) {
      setCar((prevCar) => ({
        ...prevCar,
        fuelType: {
          id: carState.fuelTypes[0].id,
          name: carState.fuelTypes[0].name,
        },
      }));
    }
  }, [carState.fuelTypes, editCar]);

  useEffect(() => {
    if (carState.engines.length > 0 && !editCar) {
      setCar((prevCar) => ({
        ...prevCar,
        engine: {
          id: carState.engines[0].id,
          name: carState.engines[0].name,
        },
      }));
    }
  }, [carState.engines, editCar]);

  useEffect(() => {
    if (editCar !== undefined) {
      setCar(editCar as Car);
    }
  }, [editCar]);

  type CarStateKey = 'carMakes' | 'carModels' | 'engines' | 'fuelTypes' | 'transmissions';

  const handleSelectChange = (
    event: SelectChangeEvent<number>,
    field: keyof Car,
    key: CarStateKey
  ) => {
    const value = event.target.value as number;
    const selectedItem = carState[key].find((item: any) => item.id === value);
    
    if (selectedItem) {
      if (key === 'carMakes') {
        setCar((prev) => ({
          ...prev,
          carModel: { ...prev.carModel, makeId: selectedItem.id, makeName: selectedItem.name, id: 0, name: '' }
        }));
      } else if (key === 'carModels') {
        setCar((prev) => ({
          ...prev,
          carModel: { ...prev.carModel, id: selectedItem.id, name: selectedItem.name }
        }));
      } else {
        setCar((prev) => ({
          ...prev,
          [field]: { id: selectedItem.id, name: selectedItem.name },
        }));
      }
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
      const action = editCar ? updateCar : createCar;
      dispatch(action(car)).then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          toast.success(`Successfully ${editCar ? 'updated' : 'added'} car!`);
          onClose();
          onSave(); // Call the onSave callback
        } else {
          toast.error('Please check form values!');
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
      <Box
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-lg"
      >
        <Typography id="new-car-modal-title" variant="h6" component="h2">
          {editCar ? 'Edit Car' : 'New Car'}
        </Typography>
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          gap={2}
          onSubmit={handleSubmit}
          className="mt-10"
        >
          <Box display="flex" gap={2}>
            <Box flex={1} display="flex" flexDirection="column" gap={2}>
              <FormControl required size="small">
                <InputLabel id="car-make-select-label">Make</InputLabel>
                <Select
                  id="car-make-select"
                  labelId="car-make-select-label"
                  value={car.carModel.makeId}
                  onChange={(e) => handleSelectChange(e, 'carModel', 'carMakes')}
                  label="Make"
                >
                  {carState.carMakes.map((make) => (
                    <MenuItem key={make.id} value={make.id}>
                      {make.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl required size="small">
                <InputLabel id="car-model-select-label">Model</InputLabel>
                <Select
                  id="car-model-select"
                  labelId="car-model-select-label"
                  value={car.carModel.id}
                  onChange={(e) => handleSelectChange(e, 'carModel', 'carModels')}
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
                size="small"
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
                size="small"
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
                size="small"
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
                size="small"
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
                size="small"
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
                size="small"
              />
            </Box>
          </Box>
          <FormControl required size="small">
            <InputLabel id="fuel-type-select-label">Fuel Type</InputLabel>
            <Select
              id="fuel-type-select"
              labelId="fuel-type-select-label"
              value={car.fuelType.id}
              onChange={(e) => handleSelectChange(e, 'fuelType', 'fuelTypes')}
              label="Fuel Type"
            >
              {carState.fuelTypes.map((fuelType) => (
                <MenuItem key={fuelType.id} value={fuelType.id}>
                  {fuelType.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl required size="small">
            <InputLabel id="engine-select-label">Engine</InputLabel>
            <Select
              id="engine-select"
              labelId="engine-select-label"
              value={car.engine.id}
              onChange={(e) => handleSelectChange(e, 'engine', 'engines')}
              label="Engine"
            >
              {carState.engines.map((engine) => (
                <MenuItem key={engine.id} value={engine.id}>
                  {engine.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl required size="small">
            <InputLabel id="transmission-select-label">Transmission</InputLabel>
            <Select
              id="transmission-select"
              labelId="transmission-select-label"
              value={car.transmission.id}
              onChange={(e) => handleSelectChange(e, 'transmission', 'transmissions')}
              label="Transmission"
            >
              {carState.transmissions.map((transmission) => (
                <MenuItem key={transmission.id} value={transmission.id}>
                  {transmission.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CarModal;
