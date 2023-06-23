import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import { FormSchema_2 } from '../FormSchema_2'

const TransactionDetails = ({ email, cnic }) => {
  const [data, setData] = useState([])
  const [flag, setFlag] = useState(false);
  const [formFlag, setform] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 1
  const lastIndex = currentPage * recordsPerPage
  const firstIndex = lastIndex - recordsPerPage
  const records = data.slice(firstIndex, lastIndex)

  const handlePrevious = () => {
    // if (currentPage !== firstIndex) {
    setCurrentPage(currentPage - 1)
    // }
  }

  const handleNext = () => {
    // if (currentPage !== lastIndex) {
    setCurrentPage(currentPage + 1)
    // }
  }

  //     useEffect(() =>{
  //         loadData();
  //    }, [])

  //    const loadData = async() => {

  //     try {
  //       let response = await axios.get(`http://localhost:5000/api/transactionDetail?CNIC=${cnic}&email=${email}`)
  //       setData(response.data.data);
  //       console.log(data)
  //   } catch (error) {
  //       console.log(error);
  //   }
  // }

  const fromInitialValues = {
    CNIC_num: '',
    email: '',
  }

  const formik = useFormik({
    initialValues: fromInitialValues,
    validationSchema: FormSchema_2,
    onSubmit: async (values, action) => {
    //   console.log(values.CNIC_num)
    //   console.log(values.email)
      try {
        let response = await axios.get(
          `https://paymentapi-production.up.railway.app/api/transactionDetail?CNIC=${values.CNIC_num}&email=${values.email}`,
        )
        setData(response.data.data)
        // console.log(data)
      } catch (error) {
        // console.log(error)
      }
      setFlag(true);
      setform(true);

      // await loadData(values.CNIC_num, values.email);
      action.resetForm()
    },
  })

  return (
    <>
    {formFlag === false ? 
      <div style={{ marginTop: '4rem' }}>
        <h1 className="mb-5">Transaction Details</h1>
        <form onSubmit={formik.handleSubmit} className="container text-cente">
          <div className="row">
            <div className="mb-3 col">
              <label htmlFor="" className="form-label">
                Enter Your Valid CNIC
              </label>
              <input
                className="form-control"
                type="text"
                name="CNIC_num"
                onChange={formik.handleChange}
                value={formik.values.CNIC_num}
              />
              <br />
              {formik.errors.CNIC_num && formik.touched.CNIC_num ? (
                <span style={{ color: 'red' }}>{formik.errors.CNIC_num}</span>
              ) : null}
            </div>
            <div className="mb-3 col">
              <label htmlFor="" className="form-label">
                Mobile Number
              </label>
              <input
                className="form-control"
                type="text"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <br />
              {formik.errors.email && formik.touched.email ? (
                <span style={{ color: 'red' }}>{formik.errors.email}</span>
              ) : null}
            </div>
          </div>

          <input type="submit" value="Submit" className="btn btn-primary" />
        </form>
      </div>

      :
      <>
      {flag && (
        <div className="container text-cente" style={{ marginTop:"4rem" }}>
          <div className="row">
            <div className="mb-3 col">
              <button
                onClick={handlePrevious}
                className="btn btn-primary"
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </div>
            <div className="mb-3 col">
              <button
                onClick={handleNext}
                className="btn btn-primary"
                disabled={currentPage === lastIndex + 1}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
      {
        data.length !== 0 ?
        <>
        {records.map((r, i) => (
            <div key={i} className='card container text-cente' style={{width:"18rem"}}>
              <ul className='list-group list-group-flush'>
              <li className='list-group-item'>Transaction ID: {r.Transaction_ID}</li>
              <li className='list-group-item'>Date: {(r.DateTime).slice(0, 10)}</li>
              <li className='list-group-item'>Mobile Number: {r.MobileNumber}</li>
              <li className='list-group-item'>Email Address: {r.EmailAddress}</li>
              <li className='list-group-item'>CNIC Number: {r.CNIC}</li>
              <li className='list-group-item'>Amount: {r.Amount}</li>
              <li className='list-group-item'>Account: {r.Account_Number}</li>
              <li className='list-group-item'>Bank: {r.Bank_Name}</li>
              </ul>
            </div>
          ))}
          </>
          :
          <h1>You have no transaction record</h1>

      }
</>
}
    </>
  )
}

export default TransactionDetails