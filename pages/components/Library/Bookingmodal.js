import React,{ useState, useEffect, useContext } from 'react';

import Dialog from '@mui/material/Dialog';

import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({SeatData}) {
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
   console.log(SeatData)


}, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
     
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        
       
      </Dialog>
    </React.Fragment>
  );
}
