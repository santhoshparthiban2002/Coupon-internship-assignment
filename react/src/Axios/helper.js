import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


// helper.js
export async function submitFormData(formData) {
  return new Promise((resolve, reject) => {
    axios
      .post('https://django-x0kk.onrender.com/coupons/', formData)
      .then((response) => {
        toast.success('Coupon Successfully registered', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        const data = response.data;
        console.log(data);
        resolve(data);
      })
      .catch((error) => {
        if (!toast.isActive('createStudentToast')) {
          toast.error('Failed to create a Coupon', {
            position: toast.POSITION.BOTTOM_RIGHT,
            toastId: 'createStudentToast',
          });
        }
        console.log(error.response.data);
        reject(error);
      });
  });
}


export const handleDelete = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`https://django-x0kk.onrender.com/coupons/${id}/`)
      .then((response) => {
        toast.success('Coupon Successfully Deleted', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        const data = response.data;
        console.log(data);
        resolve(data);
      })
      .catch((error) => {
        if (!toast.isActive('createStudentToast')) {
          toast.error('Failed to Delete a Coupon', {
            position: toast.POSITION.BOTTOM_RIGHT,
            toastId: 'createStudentToast',
          });
        }
        console.log(error.response.data);
        reject(error);
      });
  });
};

export const handleUpdate = (id,expirationDate,discountAmount) => {
  return new Promise((resolve, reject) => {
    const json = {
      'expirationDate':expirationDate,
      'discountAmount':discountAmount
    }
    const data = JSON.stringify(json)
    axios
      .put(`https://django-x0kk.onrender.com/coupons/${id}/`,data)
      .then((response) => {
        toast.success('Coupon Successfully Updated', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        const data = response.data;
        console.log(data);
        resolve(data);
      })
      .catch((error) => {
        if (!toast.isActive('createStudentToast')) {
          toast.error('Failed to Updat a Coupon', {
            position: toast.POSITION.BOTTOM_RIGHT,
            toastId: 'createStudentToast',
          });
        }
        console.log(error.response.data);
        reject(error);
      });
  });
};

export async function verifyData(formData) {
  return new Promise((resolve, reject) => {
    axios
      .post('https://django-x0kk.onrender.com/verify/', formData)
      .then((response) => {
        toast.success('Coupon Successfully applied', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        const data = response.data;
        console.log(data);
        resolve(data);
      })
      .catch((error) => {
        if (!toast.isActive('createStudentToast')) {
          toast.error(error.response.data.error, {
            position: toast.POSITION.BOTTOM_RIGHT,
            toastId: 'createStudentToast',
          });
        }
        console.log(error.response.data);
        reject(error);
      });
  });
}

export const handleUpdateUsed = (id,expirationDate,discountAmount) => {
  return new Promise((resolve, reject) => {
    const json = {
      'used':true,
      'expirationDate':expirationDate,
      'discountAmount':discountAmount
    }
    const data = JSON.stringify(json)
    axios
      .put(`https://django-x0kk.onrender.com/coupons/${id}/`,data)
      .then((response) => {
        toast.success('Order Successfully Placed', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        const data = response.data;
        console.log(data);
        resolve(data);
      })
      .catch((error) => {
        if (!toast.isActive('createStudentToast')) {
          toast.error('Order Failed', {
            position: toast.POSITION.BOTTOM_RIGHT,
            toastId: 'createStudentToast',
          });
        }
        console.log(error.response.data);
        reject(error);
      });
  });
};
