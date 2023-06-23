import React, { useState } from 'react'
import { useFormik } from 'formik'
import { FormSchema } from '../FormSchema'
import axios from 'axios'

const PaymentForm = () => {
  const [flag, setFlag] = useState(false)

  const fromInitialValues = {
    acc_num: '',
    bank_name: '',
    CNIC_num: '',
    curr: '',
    amount: '',
    email: '',
    m_number: '',
  }

  const formik = useFormik({
    initialValues: fromInitialValues,
    validationSchema: FormSchema,
    onSubmit: async (values, action) => {

      const requestBody = {
        amount: values.amount,
        email: values.email,
        CNIC_num: values.CNIC_num,
        m_number: values.m_number,
        acc_num: values.acc_num,
        bank_name: values.bank_name,
        currency: values.curr,
      }

      try {
        let response = await axios.post(
          'https://paymentapi-production.up.railway.app/api/newTransaction/',
          requestBody,
        )
        // console.log(response)
      } catch (error) {
        // console.log(error)
      }
      action.resetForm()
    },
  })

  const bankOptions = [
    { name: 'Select' },
    { name: 'National Bank' },
    { name: 'Faisal Bank' },
    { name: 'HBL' },
    { name: 'Meezan Bank' },
    { name: 'JS Bank' },
    { name: 'Bank Al Habib' },
    { name: 'Habib Metro Bank' },
    { name: 'UBL Bank' },
  ]
  const currOptions = [
    { name: 'Select' },
    { name: 'PKR' },
    { name: 'USD' },
    { name: 'AED' },
  ]

  return (
    <div style={{ marginTop:"4rem" }}>
      <h1 className='mb-5'>Payment Gateway Form</h1>
      <form onSubmit={formik.handleSubmit} className="container text-cente">
        <div className="row">
          <div className="mb-3 col">
            <label htmlFor="" className="form-label">
              Bank Account Number
            </label>
            <input
              className="form-control"
              type="text"
              name="acc_num"
              onChange={formik.handleChange}
              value={formik.values.acc_num}
            />
            <br />
            {formik.errors.acc_num && formik.touched.acc_num ? (
              <span style={{ color: 'red' }}>{formik.errors.acc_num}</span>
            ) : null}
          </div>

          {/* <br /><br /> */}
          <div className="mb-3 col">
            <label htmlFor="" className="form-label">
              Select Bank Name
            </label>
            <select
              type="text"
              className="form-control"
              name="bank_name"
              onChange={formik.handleChange}
              value={formik.values.bank_name}
            >
              {bankOptions.map((option, index) => (
                <option key={index} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>

            <br />
            {formik.errors.bank_name && formik.touched.bank_name ? (
              <span style={{ color: 'red' }}>{formik.errors.bank_name}</span>
            ) : null}
          </div>
        </div>

        <div className="row">
        <div className="mb-3 col">
          <label htmlFor="" className="form-label">
            CNIC Number
          </label>
          <input
            type="text"
            className="form-control"
            name="CNIC_num"
            onChange={formik.handleChange}
            value={formik.values.CNIC_num}
          />
          <br />
          {formik.errors.CNIC_num && formik.touched.CNIC_num ? (
            <span style={{ color: 'red' }}>{formik.errors.CNIC_num}</span>
          ) : null}
        </div>

        {/* <br /><br /> */}
        <div className="mb-3 col">
          <label htmlFor="" className="form-label">
            Select Currency
          </label>
          <select
            type="text"
            className="form-control"
            name="curr"
            onChange={formik.handleChange}
            value={formik.values.curr}
          >
            {currOptions.map((option, index) => (
              <option key={index} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
          <br />
          {formik.errors.curr && formik.touched.curr ? (
            <span style={{ color: 'red' }}>{formik.errors.curr}</span>
          ) : null}
        </div>
        </div>

        {/* <br /><br /> */}

        <div className="row">
        <div className="mb-3 col">
          <label htmlFor="" className="form-label">
            Amount
          </label>
          <input
            type="text"
            className="form-control"
            name="amount"
            onChange={formik.handleChange}
            value={formik.values.amount}
          />
          <br />
          {formik.errors.amount && formik.touched.amount ? (
            <span style={{ color: 'red' }}>{formik.errors.amount}</span>
          ) : null}
        </div>

        {/* <br /><br /> */}
        <div className="mb-3 col">
          <label htmlFor="" className="form-label">
            Valid Email Address
          </label>
          <input
            type="text"
            className="form-control"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <br />
          {formik.errors.email && formik.touched.email ? (
            <span style={{ color: 'red' }}>{formik.errors.email}</span>
          ) : null}
        </div>

        {/* <br /><br /> */}
        <div className="mb-3 col">
          <label htmlFor="" className="form-label">
            Mobile Number
          </label>
          <input
            type="text"
            className="form-control"
            name="m_number"
            onChange={formik.handleChange}
            value={formik.values.m_number}
          />
          <br />
          {formik.errors.m_number && formik.touched.m_number ? (
            <span style={{ color: 'red' }}>{formik.errors.m_number}</span>
          ) : null}
        </div>
        </div>

        {/* <br /><br /> */}
        <input type="submit" value="Submit" className="btn btn-primary" />
        {/* </div>     */}
      </form>

      {/* <br /><br /><br /><br /> */}
      {/* <TransactionDetails cnic = {formik.values.CNIC_num} email ={formik.values.email}/> */}
    </div>
  )
}

export default PaymentForm
