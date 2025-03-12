
import React from 'react';

const Header = ({ title, span, description, img }) => {
  return (
    <>
      <div className='container-fluid '>
        <div className='row base-bg-color rounded'>
          <div className='left-section col-12 col-md-9 d-flex flex-column justify-content-center text-center text-md-start '>
            <h1 className='fw-bolder text-white '>
              {title} <span className='fw-normal'>{span}</span>
            </h1>
            <p className='text-white fs-7'>{description}</p>
          </div>
          <div className='right-section  col-12 col-md-3 text-center '>
            <img src={img}  className='img-fluid' />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

