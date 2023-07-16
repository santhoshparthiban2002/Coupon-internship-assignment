import React from 'react';
import { useState } from 'react';
import {
  Button,
  Grid,
  Box,Typography,
  TextField,
  Divider
} from '@mui/material';
import { useFormik } from 'formik';
import { ToastContainer,toast } from 'react-toastify';
import { verifyData,handleUpdateUsed } from '../Axios/helper';
import 'react-toastify/dist/ReactToastify.css';
import {  Modal } from 'react-bootstrap';
 
const initialValues = {
  couponCode: '',
};


const CheckOut = () => {
  const [verifyButtonClicked, setVerifyButtonClicked] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const [dataValues, setDataValues] = useState([]);
  const [item1Amount, setItem1Amount] = useState('2000');
  const [item2Amount, setItem2Amount] = useState('15000');
  const [item3Amount, setItem3Amount] = useState('100');
  const [item4Amount, setItem4Amount] = useState('20000');
  const [discounted, setDiscounted] = useState('0');
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { setSubmitting }) => {
      const json = {
        couponCode: values.couponCode,
      };

      try {
        if (verifyButtonClicked) {
          
          const verificationResult = await verifyData(JSON.stringify(json));
          setDataValues(verificationResult)
          setCouponApplied(true)
          setDiscounted(verificationResult.discountAmount)
        } 
        else if(couponApplied){
         
          const updatedUsed= await handleUpdateUsed(dataValues.id,dataValues.expirationDate,dataValues.discountAmount);
          handleCloseModal();
          setDiscounted(0)
        }
        else{
          toast.success('Order Successfully Placed', {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          handleCloseModal();
        }
    
      } catch (error) {
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const { handleSubmit, handleChange, values } = formik;

  const dis = () => {
    const a=calculateTotalAmount()
    const  b=parseFloat(discounted)
    console.log(a,b)
    const c=a-b
    if(c>0){
      return c;
    }
    else{
      return "shop more items to apply coupon code";
    }
   
  };

  const calculateTotalAmount = () => {
    const amount1 = parseFloat(item1Amount) || 0;
    const amount2 = parseFloat(item2Amount) || 0;
    const amount3 = parseFloat(item3Amount) || 0;
    const amount4 = parseFloat(item4Amount) || 0;

    return amount1 + amount2 + amount3 + amount4;
  };
  return (
    <Box  height="100%"  style={{  backgroundColor: "white",}}  width="100%"  p={2}>
        <ToastContainer />



<Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Order Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div className='w-100 d-flex flex-row'> <p className='w-50'>Item 1</p><p className='w-50'>₹ {item1Amount}</p></div>
         <div className='w-100 d-flex flex-row'> <p className='w-50'>Item 2</p><p className='w-50'>₹ {item2Amount}</p></div>
         <div className='w-100 d-flex flex-row'> <p className='w-50'>Item 3</p><p className='w-50'>₹ {item3Amount}</p></div>
         <div className='w-100 d-flex flex-row'> <p className='w-50'>Item 4</p><p className='w-50'>₹ {item4Amount}</p></div>
         <Divider/>
         <div className='w-100 d-flex flex-row mt-4'> <p className='w-50'>Total Amount</p><p className='w-50'> ₹ {couponApplied ?  dis()  : calculateTotalAmount()} </p></div>
         <Divider/>
        </Modal.Body>
        <Modal.Footer>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <button className="btn btn-success mx-2  h-100"  id="checkOut" name="checkOut" onClick={() => setVerifyButtonClicked(false)}  type="submit">
          Place Order
        </button>
        </form>
        </Modal.Footer>
      </Modal>



        <Typography className='my-3 mx-2' variant='h4'>  Coupon Validation </Typography>
<form onSubmit={handleSubmit} noValidate autoComplete="off">
<Grid container direction="column" spacing={2}>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={4}>
            <TextField
          type="text"
          id="outlined-disabled"
          label="Customer Name"
          className="w-100"
          value="Santhosh"
          InputLabelProps={{
            shrink: true,
          }}
        />
            </Grid>
            <Grid item xs={12} sm={4}>
            <TextField
           type="text"
          id="outlined-disabled"
          label="Customer email"
          className="w-100"
          value="santhoshparthiban2002@gmail.com"
          InputLabelProps={{
            shrink: true,
          }}
        />
            </Grid>
            <Grid item xs={12} sm={4}>
            <TextField
           type="text"
          id="outlined-disabled"
          label="Customer phone"
          className="w-100"
          value="+91 7395992097"
          InputLabelProps={{
            shrink: true,
          }}
        />
           </Grid>
           <Grid item xs={12} sm={6}>
           <Typography className='my-2 mx-2' variant='h5'>  Amount of Item No 1 </Typography>
           </Grid>
           <Grid item xs={12} sm={6}>
           <TextField
           type="number"
          id="outlined-disabled"
          value={item1Amount}
          onChange={(e) => setItem1Amount(e.target.value)}
          className="w-100"
        />
           </Grid>
           <Grid item xs={12} sm={6}>
           <Typography className='my-2 mx-2' variant='h5'> Amount of Item No 2 </Typography>
           </Grid>
           <Grid item xs={12} sm={6}>
           <TextField
                     value={item2Amount}
                     onChange={(e) => setItem2Amount(e.target.value)}
          id="outlined-disabled"
         className="w-100"
          
        />
           </Grid>
           <Grid item xs={12} sm={6}>
           <Typography className='my-2 mx-2' variant='h5'>  Amount of Item No 3  </Typography>
           </Grid>
           <Grid item xs={12} sm={6}>
           <TextField
                 value={item3Amount}
                 onChange={(e) => setItem3Amount(e.target.value)}
          id="outlined-disabled"
         className="w-100"
          
        />
           </Grid>
           <Grid item xs={12} sm={6}>
           <Typography className='my-2 mx-2' variant='h5'>  Amount of Item No 4  </Typography>
           </Grid>
           <Grid item xs={12} sm={6}>
           <TextField
           type="number"
           value={item4Amount}
           onChange={(e) => setItem4Amount(e.target.value)}
          id="outlined-disabled"
          className="w-100"
          
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <Typography className='my-2 mx-2' variant='h5'>Total Amount  </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
        {couponApplied ? (
  <Typography className='my-2 mx-2' variant='h5'>
    ₹ {dis()} 
  </Typography>
) : (
  <Typography className='my-2 mx-2' variant='h5'>
    ₹ {calculateTotalAmount() }
  </Typography>
)} 
     </Grid>
        <Grid item xs={12} sm={10}>
        <TextField
                id="couponCode"
                className="w-100"
                name="couponCode"
                label="couponCode"
                type="text"
                value={values.couponCode}
                onChange={handleChange}
            
                fullWidth
              />
        </Grid>
        <Grid item xs={12} sm={2}>
         
        <Button variant="contained" id="apply" name="apply" onClick={() => setVerifyButtonClicked(true)} className="mb-4 h-100 w-100 px-5" type="submit">
          Apply
        </Button>
     </Grid>
          <Grid item xs={12} className='d-flex justify-content-end' sm={12}>

          
        <button type="button" className="btn btn-primary mx-2 mt-3 h-100" onClick={handleShowModal}>
        Place Order
  </button>
        </Grid>
          </Grid>
        </Grid>
          

     
      
      </form>

    </Box>
  );
};

export default CheckOut;
