import React from 'react'
import { useNavigate } from 'react-router-dom'

const FillRecipes = () => {
    const navigate=useNavigate();
  return (
    <>
           <div className='base-light-bg rounded d-flex justify-content-between my-5 text-md-start flex-md-row flex-column text-center p-5 '>
        <div className='content'>
          <h3>Fill the <span className='base-color'>Recipes</span> !</h3>
          <p>you can now fill the meals easily using the table and form ,<br/>
             click here and sill it with the table !</p>
        </div>
        <div className='button'>
          <button onClick={()=>navigate('/dashboard/recipes')} className='base-button px-5 text-nowrap'>All Recipes <i className="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>
      <form>
      <div className='d-flex flex-column col-10 mx-auto align-items-center justify-content-center'>
            <input
                type="text" 
                className="form-control bg-body-tertiary border-0 mb-3 px-2 py-2"
                placeholder="Recipe Name "
                aria-label="Recipe Name"
                aria-describedby="basic-addon1"
                />
            <input
                type="text" 
                className="form-control bg-body-tertiary border-0 mb-3 px-2 py-2"
                placeholder="Tag"
                aria-label="Tag"
                aria-describedby="basic-addon1"
            />
                <input
                type="text" 
                className="form-control bg-body-tertiary border-0 mb-3 px-2 py-2"
                placeholder="Price"
                aria-label="Price"
                aria-describedby="basic-addon1"
                />
                <input
                type="text" 
                className="form-control bg-body-tertiary border-0 mb-3 px-2 py-2"
                placeholder="Categ"
                aria-label="Categ"
                aria-describedby="basic-addon1"
                />
                <textarea className="form-control bg-body-tertiary border-0" placeholder="Description *" id="floatingTextarea2"></textarea>

                <div className="d-flex flex-column col-10 mx-auto justify-content-center align-items-center p-3 border border-dashed" id="drag-area">
                    <i className="fa-solid fa-arrow-up-from-bracket"></i>
                    <p>Drag & Drop or <span className="base-color"> Upload Image</span></p>
                    
                    <input type="file" className="form-control-file" id="fileInput" style={{display: "none"}}/>
                </div>
        </div>
           <div className='d-flex justify-content-end gap-3' >
           <button type="submit" className=" w-25" >Save1</button>
                <button type="submit" className="px-5">Save2</button>
           </div>
      </form>
    </>
  )
}

export default FillRecipes
