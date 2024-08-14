import React, { useState,useEffect,useContext } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoadingButton from './LoadingButton';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import videoService from '../services/video.service';
import { UserContext } from '../App';
import { toast } from 'react-toastify';



function UploadVideo() {

const [videoname, setvideoname] = useState("");
const [videourl, setvideourl] = useState("");
const [agerating, setagerating] = useState("");
const [category, setcategory] = useState("");
const [categories, setcategories] = useState([]);
const {user} = useContext(UserContext);
const navigate=useNavigate();


const handleInputChange = (e) => {
    
    const { name, value } = e.target;
    if (name === 'videoname') {
      setvideoname(value);
    } else if (name === 'videourl') {
      setvideourl(value);
    } else if (name === 'agerating') {
      setagerating(value);
    } else if (name === 'category') {

    }
  }; 

  useEffect(() => {
    let categories = [];
    categories.push({name: "Rap", id: "Rap"})  
    categories.push({name: "Opera", id: "Opera"})  
    categories.push({name: "Trap", id: "Trap"})  
    categories.push({name: "Metal", id: "Metal"})  
    categories.push({name: "Rock", id: "Rock"})  
    categories.push({name: "K-pop", id: "Kpop"})  
    categories.push({name: "Greek Laika", id: "GreekLaika"})  
    categories.push({name: "Love Songs", id: "LoveSongs"})  
    categories.push({name: "Country", id: "Country"})  
    categories.push({name: "Nisiotika Music", id: "NisiotikaMusic"})  
    categories.push({name: "Tsamiko", id: "Tsamiko"})  
    categories.push({name: "Hpeirwtika", id: "Hpeirwtika"})  
    categories.push({name: "Zeimpekiko", id: "Zeimpekiko"})  
    categories.push({name: "Other", id: "Other"})  
    setcategories(categories);
  },[]);

  const handleButtonClick = () => {
    videoService.addvideo(videourl, new Date(), videoname, user, category, agerating).then((response)=>{
        toast.success("The video was uploaded successfully.")
        navigate('/')
    });
  };

  const change = (e) => {
    setcategory (e.target.value);
   }

    return (
        <Container fluid className="addshowtime-page w-500 align-items-center justify-content-center">
          <Row className="addshowtime-row text-center d-flex w-500 align-items-center justify-content-center">
            <Col sm={12} lg={12} md={12} className="addshowtime-card-col d-flex align-items-center justify-content-center">
              <Card className= "addshowtime-card my-sm-3 my-md-4 flex-wrap">
                <Card.Body className="p-sm-3 p-md-4">
                <Row>
                    <Col className="text-center mb-1">
                      <h1>Upload Video</h1>
                    </Col>
                  </Row>
                  <Row>
                    <Form className="p-4 p-sm-0" id="addshowtime-form">
    
                                
                        <Form.Group className="mb-3 w-100" controlId="formDuration" >
                            <Form.Label>Video Name</Form.Label>
                            <InputGroup className="mb-3">
                            <Form.Control
                          id='name'
                          type="text"
                          className="custom-fields" 
                          placeholder="Video Name" 
                          name="videoname"
                          value={videoname}
                          onChange={handleInputChange}                                                    
                        />
                          
                      </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3 w-100" controlId="formDuration" >
                            <Form.Label>Video Url</Form.Label>
                            <InputGroup className="mb-3">
                            <Form.Control
                          id='url'
                          type="text"
                          className="custom-fields" 
                          placeholder="Video Url" 
                          name="videourl"
                          value={videourl}
                          onChange={handleInputChange}                                                    
                        />
                          
                      </InputGroup>
                        </Form.Group>
                          <Form.Group className="mb-3 w-100" controlId="formDuration" >
                            <Form.Label>Age Rating</Form.Label>
                            <InputGroup className="mb-3">
                            <Form.Control
                          id='url'
                          type="text"
                          className="custom-fields" 
                          placeholder="Age Rating" 
                          name="agerating"
                          value={agerating}
                          onChange={handleInputChange}                                                    
                        />

                        <Form.Group className="mb-3 w-100" controlId="formDuration" >
                        <Form.Label>Category</Form.Label>
                        <InputGroup className="mb-3">
                        <select id="categories" name="categorieslist" form="add-movie-form" onChange={change} value={category}>
                        {categories.map((object, i) =>
                              <option value={object.id}> {object.name} </option>)}
                        </select>
                        </InputGroup>

                    </Form.Group>
                          
                      </InputGroup>
                        </Form.Group>
                        <LoadingButton
                            name="Submit"    
                            loadingText="Submitting..."
                            onClick={handleButtonClick}                                                  
                        />
    
                    </Form>
                    
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      );

} export default UploadVideo;