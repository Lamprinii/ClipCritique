import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState,useEffect } from 'react';
import { toast } from 'react-toastify';
import InputGroup from 'react-bootstrap/InputGroup';
import questionnaireService from '../services/questionnaire.service';


const QuestionnaireModal = ({ showModal, closeModal, user}) => {

    const applyChanges = () =>{
        questionnaireService.add(user.id, category1, category2, category3, video1, video2, video3)
        closeModal();
    }

    const [category1, setcategory1] = useState("");
    const [category2, setcategory2] = useState("");
    const [category3, setcategory3] = useState("");
    const [categories, setcategories] = useState([]);
    const [video1, setvideo1] = useState("");
    const [video2, setvideo2] = useState("");
    const [video3, setvideo3] = useState("");
    const [videos, setvideos] = useState([]);



    
    const change1 = (e) => {
        setcategory1 (e.target.value);
       }
    
       const change2 = (e) => {
        setcategory2 (e.target.value);
       }
    
       const change3 = (e) => {
        setcategory3 (e.target.value);
       }

       const changev1 = (e) => {
        setvideo1 (e.target.value);
       }
    
       const changev2 = (e) => {
        setvideo2 (e.target.value);
       }
    
       const changev3 = (e) => {
        setvideo3 (e.target.value);
       }

    useEffect(() => {
        let categories = [];
        categories.push({name: "Rap", id: "Rap"})  
        categories.push({name: "Opera", id: "Opera"})  
        categories.push({name: "Trap", id: "Trap"})  
        categories.push({name: "Metal", id: "Metal"})  
        categories.push({name: "K-pop", id: "Kpop"})  
        categories.push({name: "Greek Laika", id: "GreekLaika"})  
        categories.push({name: "Love Songs", id: "LoveSongs"})  
        categories.push({name: "Nisiotika Music", id: "NisiotikaMusic"})  
        categories.push({name: "Tsamiko", id: "Tsamiko"})  
        categories.push({name: "Hpeirwtika", id: "Hpeirwtika"})  
        categories.push({name: "Zeimpekiko", id: "Zeimpekiko"})  
        categories.push({name: "Other", id: "Other"})  
        setcategories(categories);
        setcategory1(categories[0].id)
        setcategory2(categories[0].id)
        setcategory3(categories[0].id)
        videos.push({name: "Perfect - Ed Sheeran", id: 1})
        videos.push({name: "STILL STANDING - 12os Pithikos & Dani Gambino", id: 2})
        videos.push({name: "Bad Karma - Axel Thesleff ", id: 3})
        videos.push({name: "Nothing Else Matters - Metallica", id: 4})
        videos.push({name: "Ηπειρώτισσα Ξανθιά - Γιάννης Καψάλης", id: 5})
        videos.push({name: "Θα αλλάξω γειτονιά - Γιώργος Βελισσάρης", id: 6})
        setvideo1(videos[0].id);
        setvideo2(videos[0].id);
        setvideo3(videos[0].id);
      },[]);

    return (
        <Modal 
            show={showModal} 
            onHide={closeModal}
            backdrop="static" 
            centered
            
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    User Questionnaire
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>User Info</h4>
                <div>
                    <Form>
                                            

                    <Form.Group className="mb-3 w-100" controlId="formDuration" >
                        <Form.Label>1. Select your three favorite music category.</Form.Label>
                        <InputGroup className="mb-3">
                        <select id="categories" name="categorieslist" form="add-movie-form" onChange={change1} value={category1}>
                        {categories.map((object, i) =>
                              <option value={object.id}> {object.name} </option>)}
                        </select>
                        </InputGroup>
                        <InputGroup className="mb-3">
                        <select id="categories" name="categorieslist" form="add-movie-form" onChange={change2} value={category2}>
                        {categories.map((object, i) =>
                              <option value={object.id}> {object.name} </option>)}
                        </select>
                        </InputGroup>
                        <InputGroup className="mb-3">
                        <select id="categories" name="categorieslist" form="add-movie-form" onChange={change3} value={category3}>
                        {categories.map((object, i) =>
                              <option value={object.id}> {object.name} </option>)}
                        </select>
                        </InputGroup>
                        
                    </Form.Group>

                    <Form.Group className="mb-3 w-100" controlId="formDuration" >
                        <Form.Label>2. Select three songs in total based on your preferences.</Form.Label>
                        <InputGroup className="mb-3">
                        <select id="categories" name="categorieslist" form="add-movie-form" onChange={changev1} value={video1}>
                        {videos.map((object, i) =>
                              <option value={object.id}> {object.name} </option>)}
                        </select>
                        </InputGroup>
                        <InputGroup className="mb-3">
                        <select id="categories" name="categorieslist" form="add-movie-form" onChange={changev2} value={video2}>
                        {videos.map((object, i) =>
                              <option value={object.id}> {object.name} </option>)}
                        </select>
                        </InputGroup>
                        <InputGroup className="mb-3">
                        <select id="categories" name="categorieslist" form="add-movie-form" onChange={changev3} value={video3}>
                        {videos.map((object, i) =>
                              <option value={object.id}> {object.name} </option>)}
                        </select>
                        </InputGroup>
                        
                    </Form.Group>
                                            
                    </Form>
                    
                </div>
                
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={applyChanges}>Apply Changes</Button>
                <Button onClick={closeModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default QuestionnaireModal;