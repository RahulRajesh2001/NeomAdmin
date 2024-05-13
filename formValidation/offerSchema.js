import * as Yup from 'yup';

export const offerSchema = Yup.object().shape({
    offerName: Yup.string().required('Offer Name is required'),
    description: Yup.string().required('Description is required'),
    discountValue: Yup.number().required('Discount Value is required'),
    validFrom: Yup.date().required('Valid From is required'),
    validUntil: Yup.date().required('Valid Until is required'),
});
