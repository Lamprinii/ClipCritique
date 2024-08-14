// components/Signup.js
import React, { useState,useContext  } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoadingButton from './LoadingButton';
import {FaEyeSlash, FaEye} from 'react-icons/fa';
import authService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import QuestionnaireModal from './QuestionnaireModal';


import './Style/Register.css'; // Import the external CSS file


const Register = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [fullName, setfullName] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [user, setuser] = useState("");



  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'fullName') {
      setfullName(value);
    } else if (name === 'passwordConfirm') {
      setPasswordConfirm(value);
    } else if (name === 'dateOfBirth') {
      setdateOfBirth(value);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [showQuestionnaireModal, setQuestionnaireModal] = useState(false);

  const handleEditUserClose =() =>  { setQuestionnaireModal(false);
    navigate("/");
  }



  const handleButtonClick = () => {
    let counter=0;
    document.getElementById('email').classList.remove('error');
    document.getElementById('pass').classList.remove('error');
    document.getElementById('full').classList.remove('error');
    document.getElementById('passconf').classList.remove('.error');
    document.getElementById('dateOfBirth').classList.remove('.error');


    if (email === ''|| !(email.includes('@'))) {
      document.getElementById('email').classList.add('error');
      counter++;
    }if (password === '') {
      document.getElementById('pass').classList.add('error');
      counter++;
    }if (fullName === '') {
      document.getElementById('full').classList.add('error');
      counter++;
    }if (dateOfBirth === '') {
      document.getElementById('dateOfBirth').classList.add('error');
      counter++;
    }if (passwordConfirm === '') {
      document.getElementById('passconf').classList.add('error');
      counter++;
    }if (password != passwordConfirm ){
      document.getElementById('pass').classList.add('error');
      document.getElementById('passconf').classList.add('error');
      counter++;
    }
    if (counter==0){
      authService.register(fullName,email,password,dateOfBirth).then((response)=>{
        setuser(response.data)
        setQuestionnaireModal(true)
      }).catch((err)=>{
        console.log(err);
      })
    }
  };


  return (
    <Container fluid className="signup-page align-items-center justify-content-center">
      <Row className="signup-row text-center d-flex w-100 align-items-center justify-content-center">
        <Col sm={12} lg={12} md={12} className="signup-card-col d-flex align-items-center justify-content-center">
          <Card className= "signup-card my-sm-3 my-md-4 p-0 p-sm-3 flex-wrap">
            <Card.Body className="p-sm-3 p-md-4">
              <Row>
                <Col className="text-center mb-1">
                  <h1 className='signup_title'>Register</h1>
                  <p className='signup_subtitle'>Already have an account? &nbsp;
                  <Link to="/login">Login</Link>
                  </p>
                </Col>
              </Row>
              <Row>

                <Form className="p-4 p-sm-0" id="signup-form">

                  <Form.Group className="mb-3" controlId="formFullName" >
                    <Form.Label>Full Name</Form.Label>                 
                        <Form.Control
                            id='full'
                            type="text"
                            className="custom-fields" 
                            placeholder="Full Name" 
                            name="fullName"
                            value={fullName}
                            onChange={handleInputChange}                                                
                        />

                  </Form.Group>

                  <Form.Group className="mb-3 w-100" controlId="formStartDate" >
                        <Form.Label>Date of Birth</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                            id="dateOfBirth" 
                            type="date"
                            className="custom-fields" 
                            placeholder="Date of Birth"
                            name="dateOfBirth"
                            value={dateOfBirth}
                            onChange={handleInputChange}
                            />
                        </InputGroup>

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                        <Form.Control
                            id='email'
                            type="email"
                            className="custom-fields" 
                            placeholder="Enter email" 
                            name="email"
                            value={email}
                            onChange={handleInputChange}                                                    
                        />
                    </Form.Group>
                            
                    <Form.Group className="mb-3" controlId="formPassword" >
                        <Form.Label>Password</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                            id='pass'
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="custom-fields"
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                            />
                            <Button 
                                variant="outline-secondary" 
                                onClick={() => setShowPassword(!showPassword)}
                                className="custom-eye-Btn"                                          
                            >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </Button>
                        </InputGroup>

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPasswordConfirm" >
                        <Form.Label>Confirm Password</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                            id='passconf'
                            type={showPasswordConfirm ? "text" : "password"}
                            placeholder="Re-enter Password"
                            className="custom-fields"
                            name="passwordConfirm"
                            value={passwordConfirm}
                            onChange={handleInputChange}
                            />
                            <Button 
                                variant="outline-secondary" 
                                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                                className="custom-eye-Btn"                                          
                            >
                            {showPasswordConfirm ? <FaEyeSlash /> : <FaEye />}
                            </Button>
                        </InputGroup>

                    </Form.Group>

                    <LoadingButton
                        name="Submit"    
                        loadingText="Submitting..."
                        onClick={handleButtonClick}
                        className="custom-btn-2"                                                  
                    />

                </Form>
                
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {showQuestionnaireModal && (<QuestionnaireModal
                show={showQuestionnaireModal}
                onHide={() => setQuestionnaireModal(false)}
                showModal = {() => setQuestionnaireModal(true)}
                closeModal = {handleEditUserClose}   
                user = {user}         
        />
        )}
    </Container>  
  );
};

export default Register;
