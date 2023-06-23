import React, { useState } from 'react'
import logo from '../assets/PayFastlogo.png'
import PaymentForm from '../Component/PaymentForm';
import TransactionDetails from '../Component/TransactionDetails';

const Navbar = () => {
    const [flag, setFlag] = useState(false);

    const navigateTo = () => {
        setFlag(!flag);
    };

  return (
    <>
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src={logo}
            alt="Logo"
            width="100"
            height="30"
            className="d-inline-block align-text-top"
          />
        </a>
      </div>
      <form className="container-fluid justify-content-end">
        <button className="btn btn-primary me-2" type="button" onClick={ ()=> navigateTo()}>
        { flag === false? 'See your transaction history' : 'Move to transaction' }
        </button>
      </form>
    </nav>
    { flag === false? <PaymentForm/> : <TransactionDetails/> }
    </>
  )
}

export default Navbar
