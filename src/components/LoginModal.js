import React, {useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4),
    },
  },
  footer: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5), 
  },
  header: {
    paddingLeft: theme.spacing(6),
  }
}));

const LoginModal = ({className,show,toggle,toggleShow,loginUser}) => {
  const classes = useStyles();
  const [userInfo, setUserInfo] = useState({
    username:"",
    password:""
  })
  const { username,password } = userInfo

  const handleInput = (e) => {
    console.log(e.target.value)
    setUserInfo({
      ...userInfo,
      [e.target.name]:e.target.value
    })
  }
  const handleLogin = (e) => {
    e.preventDefault()
    loginUser(username,password)
    setTimeout(toggleShow,1000);
  }

  return (
    <div>
      <Modal isOpen={show} toggle={toggleShow} className={className}>
        <ModalHeader className={classes.header} toggle={toggleShow}>Login</ModalHeader>
        <ModalBody>
          <Form className={classes.root} onSubmit={handleLogin}>
            <FormGroup>
              <TextField fullWidth label="Username" name="username" type="text" value={username} onChange={handleInput}/>
            </FormGroup>
            <FormGroup>
              <TextField fullWidth label="Password" name="password" type="password" value={password} onChange={handleInput}/>
            </FormGroup>
            <input type="submit" className="d-none" />
          </Form>
        </ModalBody>
        <ModalFooter className={classes.footer}>
          <Button outline color="success" disabled={!(username&&password)} onClick={handleLogin}>Login</Button>
          <Button outline color="primary" onClick={toggle}>Sign up now</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default LoginModal;