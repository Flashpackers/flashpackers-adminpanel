import AuthFormLayout from "../../../component/AuthFormLayout";
import authBgOtherImg from "../../../assets/images/auth-bg.png"
import waveOtherImg from "../../../assets/images/wave.png"
import React from 'react';
import PropTypes from 'prop-types'
// import { data } from "autoprefixer";
const Login = ({sendtoparent}) => {
  const handleformvalid=(data)=>{
    sendtoparent(data)
  }
  return (
    <div>
      <AuthFormLayout sendtoparent={handleformvalid}/>
      <div>
        <div className="absolute end-0 start-0 top-1/2 -z-10 w-full -translate-y-1/3">
          <img
            width={1853}
            height={420}
            src={waveOtherImg}
            alt=""
            className="flex w-full opacity-60"
          />
        </div>
        <div className="absolute end-0 top-0 -z-10 hidden h-5/6 xl:flex">
          <img
            width={657}
            height={400}
            alt=""
            src={authBgOtherImg}
            className="z-0 w-full"
          />
        </div>
      </div>

    </div>

  );
};
Login.propTypes = {
  sendtoparent: PropTypes.func.isRequired // Ensure sendtoparent is a function and required
};
export default Login;