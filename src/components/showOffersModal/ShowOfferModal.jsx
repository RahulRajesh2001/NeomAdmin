import React, { useState, useEffect } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import axios from 'axios'
import { baseUrl } from '../../../baseURL.js'
import { MdDelete } from 'react-icons/md'
import Swal from 'sweetalert2'
import { MdAddCircleOutline } from "react-icons/md";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 700,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}

const ShowOfferModal = ({ varientId }) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const token=localStorage.getItem('adminLogin')

  //updateing the offers
  const [update, setUpdate] = useState(false)

  const [offers, setOffers] = useState([])


  useEffect(() => {
    axios
      .get(`${baseUrl}/api/v1/admin/getAllOffers`,{headers:{Authorization:token}})
      .then((res) => {
        setOffers(res?.data?.offers)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [open, update])




  //for applyoffer
  const applyOffer = (id,varientId,offertype,offeramount) => {
    const data={id,varientId,offertype,offeramount}
    axios
      .post(`${baseUrl}/api/v1/admin/applyOffer`,data, {
        headers:{Authorization:token}
      })
      .then((res) => {
        console.log("offer applied",res)
        Swal.fire({
          text: res?.data?.message,
          icon: "success"
        });
        setUpdate(!update);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          text:err?.response?.data?.message,
          icon: "error"
        });
      });
  };
  

  return (
    <div>
      <Button className='text-[#FFFF]' onClick={handleOpen}>
        Show
      </Button>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
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
            <div className=' h-full w-[100%]'>
              {/*upper part */}
              <div className='font-Playfair font-bold mt-5 text-[22px]'>Offers</div>
              <div className=' h-[100%]  overflow-auto '>
                
                {offers?.map((offer) =>
                  offer?.offerType == 'Product' ? (
                    <div className=' border h-[100px] rounded-sm justify-center  flex flex-col '>
                      <div
                        key={offer?._id}
                        className=' w-[100%] flex justify-center items-center'
                      >
                        <div className='w-[60%]'>
                          <div className='font-Josefin font-semibold text-[16px] ml-5'>
                            {offer?.offerName}
                          </div>
                          <div className='font-Josefin font-semibold text-[16px] ml-5'>
                            {offer?.offerType}
                          </div>
                        </div>
                        <div className='w-[40%] flex justify-evenly items-center'>
                          <div className='font-Josefin font-semibold text-[16px] ml-5'>
                            {offer?.discountType === 'Percentage'
                              ? `${offer.discountValue}%`
                              : `${offer.discountValue} ₹`}
                          </div>
                          <div
                            className='font-bold cursor-pointer'
                            onClick={() => applyOffer(offer?._id, varientId,offer?.discountType,offer?.discountValue)}
                          >
                            <MdAddCircleOutline className='text-[25px]' />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default ShowOfferModal
