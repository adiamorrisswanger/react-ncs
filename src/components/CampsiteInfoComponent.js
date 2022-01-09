import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, Breadcrumb, BreadcrumbItem, 
    Button, Modal, ModalHeader, ModalBody, Label, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const minLength = len => val => val && (val.length >= len);
const maxLength = len => val => !val || (val.length <= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
    }

    render() {
        return (
            <React.Fragment>
                <Button className="fa fa-pencil" onClick={this.toggleModal}> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Add Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={values => this.handleSubmit(values)}>
                        <div className="form-group">
                            <Row>
                                <Label htmlFor="rating" md={2}>Rating</Label>
                                <Control.select model=".rating" id="rating" name="rating" 
                                placeholder="Rating"
                                className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                                
                            </Row>
                        </div>
                        <div className="form-group">
                            <Row>
                                <Label htmlFor="author" md={2}>Author</Label>
                                <Control.text model=".author" id="author" name="author" 
                                placeholder="Author"
                                className="form-control"
                                validators={{
                                    minLength: minLength(2),
                                    maxLength: maxLength(15)
                                }}
                                />
                                <Errors 
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        minLength: "Must be more than two characters",
                                        maxLength: "Must be less than 15 characters"
                                    }}
                                />
                            </Row>
                        </div>
                        <div className="form-group">
                            <Row>
                                <Label htmlFor="comment" md={2}>Comment</Label>
                                <Control.textarea model=".text" id="comment" name="comment" 
                                placeholder="Comment"
                                className="form-control"
                                />
                            </Row>
                        </div>
                        <div className="form-group">
                            <Button type="submit" color="primary">
                                Submit
                            </Button> 
                        </div>
                        
                    </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
           
        );
    }
        
}

function RenderCampsite({campsite}) {
    return (<div className="col-md-5  m-1">
        <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
    </div>)
}

function RenderComments({comments, addComment, campsiteId}) {
    if(comments) {
        return (
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                {comments.map(comment => <div key={comment.id}>
                    <p>{comment.text}</p>
                    <p>{comment.author} - {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </div>)}
                <CommentForm campsiteId={campsiteId} addComment={addComment} />
            </div>
        )
    }
    return <div />
}

function CampsiteInfo(props) { 
    if (props.campsite) {
        return (
        <div className="container">
            <div className="row">
                <div className="col">
                <Breadcrumb>
                        <BreadcrumbItem><Link to='/directory'>Directory</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                    <hr />
                </div>
            </div>
            <div className="row">
                <RenderCampsite campsite={props.campsite} />
                <RenderComments 
                    comments={props.comments}
                    addComment={props.addComment}
                    campsiteId={props.campsite.id}
                />
            </div>
        </div>
        );
    } 
        return <div />
}


export default CampsiteInfo;