import * as Yup from 'yup';

export const FormSchema_2 = Yup.object({
    email: Yup.string().email('Invalid Email').lowercase().required("Email is Required"),
    CNIC_num:Yup.string().matches(
        /^\d{5}-\d{7}-\d$/,
        'Invalid CNIC Number'
    ).required('CNIC Number Is Required')
    // Tran_ID:Yup.string().min(15,'Transaction ID is wrong, it should be minimum of 15 letters long').max(15,'Transaction ID is wrong, it should be maximum of 15 letters').required()
})