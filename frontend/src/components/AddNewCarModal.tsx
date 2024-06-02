import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Car } from '../models/car';

interface AddNewCarModalProps {
  open: boolean;
  onClose: () => void;
}

const AddNewCarModal: React.FC<AddNewCarModalProps> = ({ open, onClose }) => {
  const cancelAdd = () => {
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={cancelAdd}
      aria-labelledby="new-car-modal-title"
      aria-describedby="new-car-modal-description"
    >
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-lg">
        <Typography id="new-car-modal-title" variant="h6" component="h2">
          New Car
        </Typography>
      </Box>
    </Modal>
  );
}

export default AddNewCarModal;
