import * as Yup from 'yup';

export const FormSchema = Yup.object({
    acc_num: Yup.string().min(8,'Too short').max(17,'Too Long').required("Bank Number is Required"),
    // bank_name:Yup.array().of(Yup.string()).min(1,"Atleast one must be selected").required('Bank Selection is Required'),
    bank_name:Yup.string().required('Bank Selection is Required'),
    email: Yup.string().email('Invalid Email').lowercase().required("Email is Required"),
    CNIC_num:Yup.string().matches(
        /^\d{5}-\d{7}-\d$/,
        'Invalid CNIC Number'
    ).required('CNIC Number Is Required'),
    amount:Yup.number().min(0,'Amount Should not be in negative').required(),
    curr: Yup.string().required("Currency Selection is Required")
})

// const data = [
//         "National Bank",
//         "Faisal Bank",
//         "HBL",
//         "Meezan Bank",
//         "JS Bank",
//         "Bank Al Habib",
//         "Habib Metro Bank",
//         "UBL Bank"
// ]