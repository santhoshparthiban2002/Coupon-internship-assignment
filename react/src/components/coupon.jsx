import React, { useState,useEffect } from 'react';
import {
  FormControl,
  Button,
  Grid,
  Box,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { DataGrid } from '@mui/x-data-grid';
import { ToastContainer } from 'react-toastify';
import { submitFormData,handleDelete,handleUpdate } from '../Axios/helper';
import 'react-toastify/dist/ReactToastify.css';
const validationSchema = yup.object().shape({
  expirationDate: yup.date().required('Expiration Date is required'),
  discountAmount: yup.string().required('Discount Amount is required'),
});
 
const initialValues = {
  expirationDate: '',
  discountAmount: '',
};

const Coupon = () => {
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await fetch('https://django-x0kk.onrender.com/coupons/');
          const data = await response.json();
          setSubmittedData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);


const formik = useFormik({
  initialValues,
  validationSchema,
  onSubmit: async (values) => {
    const json = {
      expirationDate: values.expirationDate,
      discountAmount: values.discountAmount,
    };

    try {
      const updatedData = await submitFormData(JSON.stringify(json));
      setSubmittedData((prevSubmittedData) => {
        if (prevSubmittedData === null) {
          return [updatedData];
        } else {
          return [...prevSubmittedData, updatedData];
        }
      });
      formik.resetForm(); 

    } catch (error) {
      console.error(error);
    }
  },
});


const handleDeleteData =  async  (id) => {
  try {
    await handleDelete(id)
    setSubmittedData((prevSubmittedData) => {
        return [...prevSubmittedData.filter((data) => data.id !== id)];
    });
  } catch (error) {
    console.error(error);
  }
};

const handleUpdateData = async (id,expirationDate,discountAmount) => {
  try {
    await handleUpdate(id,expirationDate,discountAmount);
    setSubmittedData((prevSubmittedData) => {
      return [
        ...prevSubmittedData.filter((data) => data.id !== id),
        { id, expirationDate, discountAmount },
      ];
    });
  } catch (error) {
    console.error(error);
  }
};


const columns = [
  {
    field: 'id', 
    headerName: 'ID',
    editable: false,
    flex:1,
  },
  {
    field: 'couponCode',
    headerName: 'Coupon Code',
    editable: false,
    flex:1,
   
  },
  {
    field: 'expirationDate',
    headerName: 'Expiration Date',
    editable: true,
    flex:1,
  },
  {
    field: 'discountAmount',
    headerName: 'Discount Amount',
    editable: true,
    flex:1,
    
  },
  {
    field: 'used',
    headerName: 'used',
    editable: false,
    flex:1,
  },
  {
    field: 'update',
    headerName: 'Update',
    width: 120,
    renderCell: (params) => (
      <button id={`update${params.row.id}`}  name={`update${params.row.id}`} className='btn btn-primary w-100' onClick={()=>handleUpdateData(params.row.id,params.row.expirationDate,params.row.discountAmount)} >
        Update
      </button>
    ),
  },
  {
    field: 'delete',
    headerName: 'Delete',
    width: 120,
    renderCell: (params) => (
      <button  id={`delete${params.row.id}`}  name={`delete${params.row.id}`} className='btn btn-danger w-100' onClick={()=>handleDeleteData(params.row.id)}>
        Delete
      </button>
    ),
  },
]

  const { handleSubmit, handleChange, values, touched, errors } = formik;

  return (
    
    <Box
      
      height="100%"
      style={{ backgroundColor: 'white' }}
      width="100%"
      justifyContent="space-between"
      p={2}
    >
      <Typography className='my-3 mx-2' variant='h4'> Register Coupon </Typography>
      <ToastContainer />
      <form className='mt-4' onSubmit={handleSubmit} noValidate autoComplete="off">
        <Grid container direction="column" spacing={2}>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  id="expirationDate"
                  className="w-100"
                  name="expirationDate"
                  label="Expiration Date"
                  type="date"
                  value={values.expirationDate}
                  onChange={handleChange}
                  error={touched.expirationDate && !!errors.expirationDate}
                  helperText={touched.expirationDate && errors.expirationDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="discountAmount"
                className="w-100"
                name="discountAmount"
                label="Discount Amount"
                type="number"
                value={values.discountAmount}
                onChange={handleChange}
                error={touched.discountAmount && !!errors.discountAmount}
                helperText={touched.discountAmount && errors.discountAmount}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
            </Grid>
          <Grid item xs={12} className='d-flex justify-content-end' sm={12}>
          <Button variant="contained" className="mb-4 " type="submit">
          Submit
        </Button></Grid>
          </Grid>
        </Grid>
      </form>
      <div className='w-100 '>
      <Typography className='my-3 mx-2' variant='h4'>  Coupon Codes </Typography>
      <p className=' mx-2' >
        Double click on Expiration Date and  Discount Amount to edit the values and click the Update button. 
      </p>
      {submittedData ? (
          <Box  sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-root .MuiDataGrid-withBorderColor" : {
              borderColor: "transparent",
            }, 
            "& .MuiDataGrid-root .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-root .MuiDataGrid-cell:focus" : {
               outline: "transparent" ,
            }, 
            "& .MuiDataGrid-root .MuiDataGrid-row.Mui-selected" : {
               backgroundColor: "transparent",
            },
        
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
            
            },
            "& .MuiDataGrid-columnHeaders": {
            
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
            
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
          
             
            },
            "& .MuiDataGrid-footerContainer .MuiButton-text": {
             
            },
            "& .MuiTablePagination-displayedRows" : {
              marginTop:"18px"
            },
            "& .MuiTablePagination-selectLabel" : {
              marginTop:"15px"
            },
            "& .MuiDataGrid-root .MuiDataGrid-cell:focus": {
              outline: "none"
          },
          "& .MuiDataGrid-root .MuiDataGrid-cell:focus-with": {
            outline: "none"
        },
        
          }} >
              <DataGrid
                rows={submittedData}
                columns={columns}
                loading={submittedData.length === 0}
                editMode="row"
              /></Box>
) : (
  <p>Loading...</p>
)}
    </div>
    </Box>
 
  );
};

export default Coupon;
