import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import SideBar from '../../components/sidebar/SideBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../../baseURL';
import { useDispatch, useSelector } from 'react-redux';
import { setVarients } from '../../../redux/reducers/ProductSlice';

const EditProductVariant = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const id = useSelector((state) => state?.products?.productVarientId);
    const productVarients = useSelector((state) => state?.products?.varients);
    const token=localStorage.getItem("adminLogin")
    const [variant, setVariant] = useState({});

    useEffect(() => {
        const foundVariant = productVarients.find(element => element?._id === id);
        if (foundVariant) {
            setVariant(foundVariant);
        }
    }, [id, productVarients]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const productVariantData = {
                productVariant: variant.varientName,
                color: variant.color,
                stock: variant.stock,
                regularPrice: variant.regularPrice,
                salesPrice: variant.salePrice
            };

            await axios.post(`${baseUrl}/api/v1/admin/editProductVarient?id=${id}`, productVariantData, {
                headers: {
                    Authorization: `${token}`
                }
            }).then((res) => {
                if(res?.status == 200){
                    dispatch(setVarients(res?.data?.productVarients))
                    alert(res.data.message)
                    navigate('/varients')
                    
                }
            });
        } catch (err) {
            console.error('Error submitting data:', err);
        }
    };

    const handleChange = (e, field) => {
        setVariant({ ...variant, [field]: e?.target?.value });
    };

    return (
        <div className='flex bg-[#F5F5F9] '>
            <SideBar />
            <div className='w-[100%] flex flex-col items-center'>
                <Navbar />
                <div className='w-[98%] h-full rounded-lg flex justify-evenly items-center'>
                    <div className='bg-[#FFFF] h-[60%] w-[68%] '>
                        <form onSubmit={handleSubmit} className='ml-20 flex flex-col gap-4'>
                            <div className='font-Playfair text-[18px] text-[#566A7F] mt-4 '>
                                Product Information
                            </div>
                            <div className='flex'>
                                <div className='w-[44%]'>
                                    <div className='font-Josefin text-[14px] text-[#566A7F]'>
                                        PRODUCT VARIANT
                                    </div>
                                    <input
                                        type='text'
                                        className='outline-none w-[80%] h-[40px] rounded-md border border-[#566A7F]'
                                        value={variant.varientName}
                                        onChange={(e) => handleChange(e, 'varientName')}
                                    />
                                </div>
                                <div className='w-[44%]'>
                                    <div className='font-Josefin text-[14px] text-[#566A7F]'>
                                        COLOR
                                    </div>
                                    <input
                                        type='text'
                                        className='outline-none w-[80%] h-[40px] rounded-md border border-[#566A7F]'
                                        value={variant.color}
                                        onChange={(e) => handleChange(e, 'color')}
                                    />
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='w-[44%]'>
                                    <div className='font-Josefin text-[14px] text-[#566A7F]'>
                                        STOCK
                                    </div>
                                    <input
                                        type='text'
                                        className='outline-none w-[80%] h-[40px] rounded-md border border-[#566A7F]'
                                        value={variant.stock}
                                        onChange={(e) => handleChange(e, 'stock')}
                                    />
                                </div>
                                <div className='w-[44%]'>
                                    <div className='font-Josefin text-[14px] text-[#566A7F]'>
                                        REGULAR PRICE
                                    </div>
                                    <input
                                        type='text'
                                        className='outline-none w-[80%] h-[40px] rounded-md border border-[#566A7F]'
                                        value={variant.regularPrice}
                                        onChange={(e) => handleChange(e, 'regularPrice')}
                                    />
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='w-[44%]'>
                                    <div className='font-Josefin text-[14px] text-[#566A7F]'>
                                        SALE PRICE
                                    </div>
                                    <input
                                        type='text'
                                        className='outline-none w-[80%] h-[40px] rounded-md border border-[#566A7F]'
                                        value={variant.salePrice}
                                        onChange={(e) => handleChange(e, 'salePrice')}
                                    />
                                </div>
                                <div className='w-[35%] flex justify-evenly mt-4 '>
                                    <button className='bg-[#EBEEF0] w-[48%] h-[50px] rounded-lg text-[#566A7F]'>
                                        Discard
                                    </button>
                                    <button
                                        className=' w-[48%] h-[50px] rounded-lg bg-[#696CFF] text-[#ffff]'
                                        type='submit'
                                    >
                                        Publish
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProductVariant;
