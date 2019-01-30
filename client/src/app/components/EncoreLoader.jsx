import React from 'react'
import Loader from 'react-loader-spinner'

const loaderContainer = {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    overflow: 'auto'
}

const loader = {
    margin: 'auto', 
    maxHeight: '100%'
}

const EncoreLoader = (props) => {
  return(
	    <div style={loaderContainer}>
	        <div style={loader}>
	            <Loader 
	               type="RevolvingDot"
	               color="#212121"
	               height="50"   
	               width="50"/>
	        </div>
	  	</div>
  )
}

export default EncoreLoader
