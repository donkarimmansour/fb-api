import React, { useEffect, useRef, useState } from 'react'
import * as yup from 'yup'
import {Formik} from 'formik'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button , Badge, Breadcrumb, Card, Col, Container, Form, Row, Table, ThemeProvider, Stack, FloatingLabel, Spinner, Placeholder, ToastContainer, Toast } from 'react-bootstrap';
import { ADD_ID } from '../redux/constants/ids';
import { io } from "socket.io-client";
import { useSelector , useDispatch } from "react-redux";
import { CLEAR_MESSAGE } from '../redux/constants/message';

const Fb = () => {

    const [show, setShow] = useState(true);

    const dispatch = useDispatch();
    const socket = useRef();

     const { ids , count } = useSelector(state => state.ids);
     const { successMsg , errorMsg } = useSelector(state => state.message);
      const { loading} = useSelector(state => state.loading);


    // useEffect(() => {
    //     if (successMsg !== "") {

    //     }
    //     if(errorMsg !== ""){
          
    //     } 
        
    //     dispatch({ type: CLEAR_MESSAGE })

    // }, [successMsg])

    useEffect(() => {
        socket.current = io('ws://localhost:3001');
        console.log("ws");

        socket.current.emit('AddMe')

         socket.current.on('getMe', (res) => {
           console.log("getMe :" , res);
        }) 
 
        //get new id
        socket.current.on('getId', (data) => {
            console.log("getId :" , data);

            // dispatch({
            //     type: ADD_ID,
            //     payload: data
            // })
        }) 

    }, []);


    const schema = yup.object().shape({
        link: yup.string().required().min(10),
        limit: yup.number().required().moreThan(0),
        delay: yup.number().required().moreThan(999),
        timeout: yup.number().required().moreThan(4999),
        type: yup.string().required().notOneOf(["..."] , "type must not be : ..."),
        login: yup.string().required().notOneOf(["..."] , "type must not be : ..."),
        withid: yup.string().required().notOneOf(["..."] , "type must not be : ..."),
        separator: yup.string().required().notOneOf(["..."] , "type must not be : ..."),
        browser: yup.string().required().notOneOf(["..."] , "type must not be : ..."),
      
    });

      const onSubmit = values => {
          console.log(values);

      }


  return (
    <ThemeProvider breakpoints={['xl', 'lg', 'md', 'sm', 'xs']} minBreakpoint="xs">

        <Container  className="text-start mt-2" fluid  >

            <Row xs={1} >

                <Col>

                <Card>
                    
                    <Card.Header>
                        <Stack direction="horizontal" gap={3}>
                            <p className="h3">Fb Scrapper</p>
                            <Button variant="secondary"> Extracted <Badge bg="dark">9</Badge> </Button>
                        </Stack>
            </Card.Header>
      <Card.Body>

      <Row xs={1}>
        

                <Col>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item active="active">FB</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>

                <Col>
      <Formik
      validationSchema={schema}
      onSubmit={onSubmit}
      validateOnMount={true}
      validateOnChange={true}
      initialValues={{
        link: '',
        type: '...',
        login: '...',
        browser: '...',
        separator: '...',
        withid: '...',
        limit: 1,
        delay: 1000,
        timeout: 5000,
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (

        <Form  onSubmit={handleSubmit}>

          <Row className="mb-3">

                <Form.Group as={Col} md="4" className="position-relative">
                    <Form.Label>Login</Form.Label>
                    <Form.Select placeholder="login" name="login" onChange={handleChange} onBlur={handleBlur} isInvalid={touched.login && errors.login} isValid={touched.login && !errors.login}>
                        <option value="...">Choose...</option>
                        <option value="usel">use Login</option>
                        <option value="notl">Not use Login</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid" tooltip="tooltip">{errors.login}</Form.Control.Feedback>
                </Form.Group>


                <Form.Group as={Col} md="4" className="position-relative">
                    <Form.Label>Type</Form.Label>
                    <Form.Select placeholder="type" name="type" onChange={handleChange} onBlur={handleBlur} isInvalid={touched.type && errors.type} isValid={touched.type && !errors.type}>
                        <option value="...">Choose...</option>
                        <option value="gcfp">get Comments from post</option>
                        <option value="gcfgp">get Comments from group posts</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid" tooltip="tooltip">{errors.type}</Form.Control.Feedback>
                </Form.Group>


                <Form.Group as={Col} md="4" className="position-relative">
                    <Form.Label>Link</Form.Label>
                    <Form.Control type="text" placeholder="link" name="link" onChange={handleChange} onBlur={handleBlur} isInvalid={touched.link && errors.link} isValid={touched.link && !errors.link}/>
                    <Form.Control.Feedback type="invalid" tooltip="tooltip">{errors.link}</Form.Control.Feedback>
                </Form.Group>


                <Form.Group as={Col} md="4" className="position-relative">
                    <Form.Label>Limit</Form.Label>
                    <Form.Control type="number" placeholder="limit" name="limit" value={values.limit} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.limit && errors.limit} isValid={touched.limit && !errors.limit}/>
                    <Form.Control.Feedback type="invalid" tooltip="tooltip">{errors.limit}</Form.Control.Feedback>
                </Form.Group>


                <Form.Group as={Col} md="4" className="position-relative">
                    <Form.Label>Delay</Form.Label>
                    <Form.Control type="number" placeholder="delay" name="delay" value={values.delay} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.delay && errors.delay} isValid={touched.delay && !errors.delay}/>
                    <Form.Control.Feedback type="invalid" tooltip="tooltip">{errors.delay}</Form.Control.Feedback>
                </Form.Group>


                <Form.Group as={Col} md="4" className="position-relative">
                    <Form.Label>Timeout</Form.Label>
                    <Form.Control type="number" placeholder="timeout" name="timeout" value={values.timeout} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.timeout && errors.timeout} isValid={touched.timeout && !errors.timeout}/>
                    <Form.Control.Feedback type="invalid" tooltip="tooltip">{errors.timeout}</Form.Control.Feedback>
                </Form.Group>


                <Form.Group as={Col} md="4" className="position-relative">
                    <Form.Label>with Id</Form.Label>
                    <Form.Select placeholder="withid" name="withid" onChange={handleChange} onBlur={handleBlur} isInvalid={touched.withid && errors.withid} isValid={touched.withid && !errors.withid}>
                        <option value="...">Choose...</option>
                        <option value="usei">with Id</option>
                        <option value="noti">Not Necessary</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid" tooltip="tooltip">{errors.withid}</Form.Control.Feedback>
                </Form.Group>


                <Form.Group as={Col} md="4" className="position-relative">
                    <Form.Label>Open browser</Form.Label>
                    <Form.Select placeholder="browser" name="browser" onChange={handleChange} onBlur={handleBlur} isInvalid={touched.browser && errors.browser} isValid={touched.browser && !errors.browser}>
                        <option value="...">Choose...</option>
                        <option value="useb">use Browser</option>
                        <option value="notb">Not use Browser</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid" tooltip="tooltip">{errors.browser}</Form.Control.Feedback>
                </Form.Group>


                <Form.Group as={Col} md="4" className="position-relative">
                    <Form.Label>Separator</Form.Label>
                    <Form.Select placeholder="separator" name="separator" onChange={handleChange} onBlur={handleBlur} isInvalid={touched.separator && errors.separator} isValid={touched.separator && !errors.separator}>
                        <option value="...">Choose...</option>
                        <option value="|">|</option>
                        <option value=":">:</option>
                        <option value=";">;</option>
                        <option value=";">;</option>
                        <option value="$">$</option>
                        <option value="*">*</option>
                        <option value="#">#</option>
                        <option value="&amp;">&amp;</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid" tooltip="tooltip">{errors.separator}</Form.Control.Feedback>
                </Form.Group>
            </Row>

                <Row>
                    <Form.Group as={Col} className="position-relative">
                        <Form.Label>Link</Form.Label>
                        <FloatingLabel  label="ids"  >
                           <Form.Control as="textarea" placeholder="ids..." style={{ height: '100px' }} />
                        </FloatingLabel>
                    </Form.Group>
                </Row>


            <Row>
                <Col>
                    <Button variant="outline-dark" type="submit" disabled={!loading && (!touched || !isValid)}>
                      <Spinner as="span" animation="border" className="mr-2" size="sm" role="status" aria-hidden="true"/>
                      Start</Button>

                    <Button variant="outline-secondary" type="button" className="m-2" disabled>Stop</Button>
                </Col>
            </Row>

        </Form>
      )}
    </Formik>
               
    </Col>


    <Col>
      <Placeholder as="p" animation="glow">
        <Placeholder xs={12} size="lg" />
        <Placeholder xs={12} size="lg" />
        <Placeholder xs={12} size="lg" />
      </Placeholder>
    </Col>


      <Col>
    <Table striped="striped" responsive>
        <thead>
            <tr>
                <th>#</th>
                <th>Type</th>
                <th>FullName</th>
                <th>ID</th>
                <th>Author</th>
                <th>Post Content</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>From Post</td>
                <td>Mark</td>
                <td>1112321111111156</td>
                <td>mdo</td>
                <td>hi my friend</td>
            </tr>
            <tr>
                <td>2</td>
                <td>From Post</td>
                <td>Mark</td>
                <td>hjdhjdjhdj</td>
                <td>mdo</td>
                <td>hi my friend</td>
            </tr>
        </tbody>
    </Table>
</Col>
</Row>
</Card.Body>
</Card>
</Col>





            </Row>
        </Container>

        {/* <ToastContainer className="p-3" position="top-end" >
          <Toast onClose={() => setShow(false)} show={show}>
            <Toast.Header closeButton={true}>
              <strong className="me-auto">Bootstrap</strong>
            </Toast.Header>
            <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
          </Toast>
        </ToastContainer> */}

  </ThemeProvider>
    
  )
}

export default Fb
