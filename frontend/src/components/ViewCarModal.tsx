import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Car } from '../models/car';
import HistoryIcon from '@mui/icons-material/History';

interface ViewCarModalProps {
  open: boolean;
  car: Car | null;
  onClose: () => void;
}

const ViewCarModal: React.FC<ViewCarModalProps> = ({ open, car, onClose }) => {
  const closeModal = () => {
    onClose();
  };

  const handleHistoryClick = () => {
  };

  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby="view-modal-title"
      aria-describedby="view-modal-description"
    >
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg w-96">
        <Box className="flex justify-between items-center">
          <Typography id="view-modal-title" variant="h6" component="h2" className="text-center">
            No. {car?.id} Details
          </Typography>
          <HistoryIcon className="cursor-pointer" onClick={handleHistoryClick} />
        </Box>
        <Typography id="view-modal-description" sx={{ mt: 2 }} className="text-left">
          <b>{car?.carModel.makeName} {car?.carModel.name}</b>
          <br />
          Color: {car?.color}
          <br />
          Engine type: {car?.engine.name}
          <br />
          Fuel type: {car?.fuelType.name}
          <br />
          Horse Power: {car?.horsepower}
          <br />
          Mileage: {car?.mileage}
          <br />
          Previous owners: {car?.owners}
          <br />
          Transmission: {car?.transmission.name}
          <br />
          Year: {car?.year}
          <br />
          Total price: {car?.price}
        </Typography>
        <Box mt={4} className="flex justify-center">
          <Button variant="contained" color="primary" onClick={closeModal}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ViewCarModal;
