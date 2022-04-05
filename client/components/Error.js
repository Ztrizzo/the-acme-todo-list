import React from "react";
import { connect } from "react-redux";

const Error = (props) => {
  if(props.errorMessage === '')
    return null;

  return(
    <h5 id='error'>{props.errorMessage}</h5>
  )
}

export default connect(state => state)(Error);