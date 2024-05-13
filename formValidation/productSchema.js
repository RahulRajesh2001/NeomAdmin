import * as Yup from 'yup';

export const productSchema = Yup.object().shape({
    title: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    brand: Yup.string().required('Brand is required'),
});
