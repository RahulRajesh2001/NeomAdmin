import * as Yup from 'yup';

export const categorySchema = Yup.object().shape({
    title: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
});
