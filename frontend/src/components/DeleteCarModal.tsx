import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Car } from '../models/car';

interface DeleteCarModalProps {
  open: boolean;
  car: Car | null;
  onClose: () => void;
  onConfirm: (carId: number) => void;
}

const DeleteCarModal: React.FC<DeleteCarModalProps> = ({ open, car, onClose, onConfirm }) => {
  const confirmDelete = () => {
    if (car) {
      onConfirm(car.id);
    }
  };

  const cancelDelete = () => {
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={cancelDelete}
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
    >
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-lg">
        <Typography id="delete-modal-title" variant="h6" component="h2">
          Confirm Delete
        </Typography>
        <Typography id="delete-modal-description" sx={{ mt: 2 }}>
          Are you sure you want to delete <b>{car?.carModel.makeName} {car?.carModel.name}</b> with ID <b>{car?.id}</b>?
        </Typography>
        <Box mt={2} className="flex justify-end space-x-2">
          <Button variant="contained" color="primary" onClick={confirmDelete}>
            Yes
          </Button>
          <Button variant="contained" color="error" onClick={cancelDelete}>
            No
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default DeleteCarModal;
