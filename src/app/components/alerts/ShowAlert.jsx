import React from 'react'
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const ShowAlert = ({open, alertType, alertText, handleClose}) => {
  
  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} >
        <Alert
          onClose={handleClose}
          severity={alertType}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alertText}
        </Alert>
      </Snackbar>
    </>
  )
}

export default ShowAlert