import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import {categorySchema} from '../../../formValidation/categorySchema.js'
import { baseUrl } from '../../../baseURL.js';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCategory } from '../../../redux/reducers/CategorySlice.js';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600, 
    height: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
  

const EditCategory = ({id}) => {
  const dispatch=useDispatch()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

const token=localStorage.getItem("adminLogin")
  // formik validation
  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting
  } = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: categorySchema,
    onSubmit: (values) => {
      const category = {
        title: values.title,
        description: values.description
      };
      axios.put(`${baseUrl}/api/v1/admin/editCategory/${id}`, category,{
        headers: { 
          Authorization: token,
        },
      })
        .then((res) => {
          console.log("category",res.data.categories)
          dispatch(setCategory(res?.data?.categories));
          alert(res.data.message)
        })
        .catch(error => {
          console.error('Error editing category:', error);
          alert("Alert Unique Category !")
        });
        handleClose();
    }
        
  });
  return (
    <div>
    <Button onClick={handleOpen}>Edit</Button>
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <form onSubmit={handleSubmit} className='w-[100%] h-full flex flex-col justify-center items-center gap-4'>
            <div className='font-Playfair font-bold text-[18px]'>ADD CATEGORY</div>
            <div className='flex flex-col gap-2 w-[80%] '>
              <div className='font-Josefin font-bold'>TITLE</div>
              <input
                id='title'
                type="text"
                placeholder='Enter title...'
                className={`bg-[#FAFAFA] border h-[40px] w-[90%] rounded-lg ${errors.title && touched.title ? 'outline-red-400 ' : 'outline-none'
                  }`}
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.title && touched.title && <div className="text-red-500">{errors.title}</div>}
            </div>

            <div className='flex flex-col gap-2 w-[80%] '>
              <div className='font-Josefin font-bold'>DESCRIPTION</div>
              <input
                id='description'
                type="text"
                placeholder='Description...'
                className={`bg-[#FAFAFA] border h-[90px] w-[90%] rounded-lg ${errors.description && touched.description ? 'outline-red-400 ' : 'outline-none'
                  }`}
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.description && touched.description && <div className="text-red-500">{errors.description}</div>}
            </div>
            <button disabled={isSubmitting}  type="submit" className='w-[100px] h-[40px] flex justify-center items-center bg-[#696CFF] text-[#ffff] rounded-md mr-5 font-Playfair cursor-pointer'>Edit</button>
          </form>
        </Box>
      </Fade>
    </Modal>
  </div>
  )
}

export default EditCategory