import { Car } from '../models/car';

export const validateColor = (car: Car, setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>): boolean => {
  if (car.color.trim() === '') {
    setErrors((prev) => ({ ...prev, color: 'Color is required.' }));
    return false;
  } else {
    setErrors((prev) => ({ ...prev, color: '' }));
    return true;
  }
};

export const validateYear = (car: Car, setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>): boolean => {
  if (car.year.toString().trim() === '' || isNaN(Number(car.year)) || Number(car.year) <= 0) {
    setErrors((prev) => ({ ...prev, year: 'Valid year is required.' }));
    return false;
  } else {
    setErrors((prev) => ({ ...prev, year: '' }));
    return true;
  }
};

export const validateMileage = (car: Car, setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>): boolean => {
  if (car.mileage.toString().trim() === '' || isNaN(Number(car.mileage)) || Number(car.mileage) < 0) {
    setErrors((prev) => ({ ...prev, mileage: 'Valid mileage is required.' }));
    return false;
  } else {
    setErrors((prev) => ({ ...prev, mileage: '' }));
    return true;
  }
};

export const validateOwners = (car: Car, setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>): boolean => {
  if (car.owners.toString().trim() === '' || isNaN(Number(car.owners)) || Number(car.owners) < 0) {
    setErrors((prev) => ({ ...prev, owners: 'Valid number of owners is required.' }));
    return false;
  } else {
    setErrors((prev) => ({ ...prev, owners: '' }));
    return true;
  }
};

export const validateHorsepower = (car: Car, setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>): boolean => {
  if (car.horsepower.toString().trim() === '' || isNaN(Number(car.horsepower)) || Number(car.horsepower) <= 0) {
    setErrors((prev) => ({ ...prev, horsepower: 'Valid horsepower is required.' }));
    return false;
  } else {
    setErrors((prev) => ({ ...prev, horsepower: '' }));
    return true;
  }
};

export const validatePrice = (car: Car, setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>): boolean => {
  if (car.price.toString().trim() === '' || isNaN(Number(car.price)) || Number(car.price) <= 0) {
    setErrors((prev) => ({ ...prev, price: 'Valid price is required.' }));
    return false;
  } else {
    setErrors((prev) => ({ ...prev, price: '' }));
    return true;
  }
};
