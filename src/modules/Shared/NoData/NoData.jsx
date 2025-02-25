import React from 'react'
import nodata from '../../../assets/nodata.png'
const NoData = () => {
  return (
    <div >
      <img src={nodata} alt='No Data'/>
      <h2>No Data !</h2>
      <p className='text-secondary'>There is no content to display.</p>
    </div>
  )
}

export default NoData
