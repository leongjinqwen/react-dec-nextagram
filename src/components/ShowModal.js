import React, { useState } from 'react';
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

const ShowModal = ({toggleShow,show,loginUser,signUpUser}) => {
    const [toLogin, setToLogin] = useState(true);
    const toggle = () => setToLogin(!toLogin);

    return(
        <>
        {
            toLogin 
            ? <LoginModal toggle={toggle} show={show} toggleShow={toggleShow} loginUser={loginUser}/> 
            : <SignUpModal toggle={toggle} show={show} toggleShow={toggleShow} signUpUser={signUpUser}/>
        }
            
            
        </>
    )
}
export default ShowModal;