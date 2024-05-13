import React, { useState, useEffect } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import axios from 'axios'
import { baseUrl } from '../../../baseURL.js'
import { MdDelete } from 'react-icons/md'

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

const ShowCategoryOffer = ({categoryId }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [update, setUpdate] = useState(true)
  const [offers, setOffers] = useState([])
  const [appliedOffer, setAppliedOffer] = useState([])
  const token = localStorage.getItem('adminLogin')

  useEffect(() => {
    axios.get(`${baseUrl}/api/v1/admin/getAllOffers`, { headers: { Authorization: token } })
      .then((res) => {
        setOffers(res?.data?.offers)
      })
      .catch((err) => {
        console.log('Error fetching offers:', err)
      })
  }, [open, update, token])



const applyCategoryOffer = (id,offertype,offervalue) => {

    axios.post(`${baseUrl}/api/v1/admin/applyCategoryOffer`, {id,offertype,offervalue,categoryId}, { headers: { Authorization: token } })
      .then((res) => {
        setUpdate(!update)
        alert(res?.data?.message)
      })
      .catch((err) => {
        console.log('Error applying category offer:', err)
      })
}

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
            <div className='h-full w-[100%]'>
            <div className='font-Playfair font-bold text-[20px]'>Offers</div>
              <div className='h-[100%] overflow-auto'>
                {offers?.map((offer) =>
                  offer?.offerType == 'Category' ? (
                    <div className='border h-[100px] rounded-sm justify-center flex flex-col' key={offer?._id}>
                      <div className='w-[100%] flex justify-center items-center'>
                        <div className='w-[60%]'>
                          <div className='font-Josefin font-semibold text-[16px] ml-5'>{offer?.offerName}</div>
                          <div className='font-Josefin font-semibold text-[16px] ml-5'>{offer?.offerType}</div>
                        </div>
                        <div className='w-[40%] flex justify-evenly items-center'>
                          <div className='font-Josefin font-semibold text-[16px] ml-5'>
                            {offer?.discountType === 'Percentage' ? `${offer.discountValue}%` : `${offer.discountValue} ₹`}
                          </div>
                          <div>
                            <button className='w-[80px] rounded-lg font-bold text-[#ffff] h-[30px] flex justify-center items-center bg-green-500' onClick={() => applyCategoryOffer(offer._id,offer.discountType,offer.discountValue)}>APPLY</button>
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

export default ShowCategoryOffer
