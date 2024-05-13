import * as Yup from 'yup';

export const cuponSchema = Yup.object().shape({
    cuponName: Yup.string().required('Coupon Name is required'),
    cuponCode: Yup.string().required('Coupon Code is required'),
    description: Yup.string().required('Description is required'),
    discountValue: Yup.number().required('Discount Value is required'),
    validFrom: Yup.date().required('Valid From is required'),
    validUntil: Yup.date().required('Valid Until is required'),
    usageLimit: Yup.number().required('Usage Limit is required'),
});
