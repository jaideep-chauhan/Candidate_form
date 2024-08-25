import * as Yup from 'yup';

export const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  street1: Yup.string().required('Street 1 is required'),
  street2: Yup.string().required('Street 2 is required'),
  permStreet1: Yup.string().when('isSameAddress', {
    is: false,
    then: Yup.string().required('Permanent Street 1 is required when address is not the same'),
    otherwise: Yup.string()
  }),
  permStreet2: Yup.string().when('isSameAddress', {
    is: false,
    then: Yup.string().required('Permanent Street 2 is required when address is not the same'),
    otherwise: Yup.string()
  }),
  fileName: Yup.array().of(Yup.string().required('File Name is required')),
  fileType: Yup.array().of(Yup.string().required('File Type is required')),
}).required();
