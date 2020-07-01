import React from 'react';
import './AddPost.css';
import { userLoggedDetails } from '../../../Globals';
import { sendRequest } from '../../../Helpers/Helper';
import { Button, Form, Row, Col, Modal, Spinner } from 'react-bootstrap';

class AddPost extends React.Component {
    captionRef;
    addImageRef;
    imgRef;
    addPostRef;
    dataUrl;
    constructor() {
        super();
        this.captionRef = React.createRef();
        this.addImageRef = React.createRef();
        this.imgRef = React.createRef();
        this.addPostRef = React.createRef();
        this.dataUrl = '';
        this.state = {
            disabled: true,
            showDialog: false
        };
    }

    render() {
        return (<Modal show={this.state.showDialog} onHide={this.onDialogHide.bind(this)} className="m-post-modal">
            <Modal.Header closeButton>
                <Modal.Title>Add Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">Caption</Form.Label>
                        <Col sm="10">
                            <Form.Control ref={this.captionRef} onKeyUp={this.validate.bind(this)} as="textarea" rows="2" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <div className="m-add-img-btn">
                            <Button onClick={this.addImage.bind(this)} bsstyle="primary">Add Image</Button>
                            <input type="file" accept="image/*" ref={this.addImageRef} hidden id="upload" onChange={this.onUpload.bind(this)} />
                        </div>
                    </Form.Group>
                </Form>
                <img className="m-img" ref={this.imgRef} />
            </Modal.Body>
            <Modal.Footer>
                <Button disabled={this.state.disabled} ref={this.addPostRef} onClick={this.addPost.bind(this)} bsstyle="primary">
                    <Spinner
                        className="spinner"
                        as="span"
                        animation="border"
                        size="sm"
                    />
                    Post
                </Button>
            </Modal.Footer>
        </Modal>)
    }


    onDialogHide() {
        this.toggleDialog();
    }

    toggleDialog(show = false) {
        this.setState({ showDialog: show })
    }

    addPost(e) {
        this.toggleSpinner(true);
        let data = { username: userLoggedDetails.username, caption: this.captionRef.current.value, img: this.dataUrl };
        sendRequest('POST', 'addpost', data, this.responseCb.bind(this));
    }

    addImage() {
        this.addImageRef.current.click();
    }

    onUpload(e) {
        this.dataUrl = '';
        this.togglePreview(false);
        this.validate();
        let reader = new FileReader();
        reader.readAsArrayBuffer(e.target.files[0]);
        reader.addEventListener("load", this.onReaderLoad.bind(this));
    }

    onReaderLoad(e) {
        this.imgRef.current.src = window.URL.createObjectURL(new Blob([e.target.result]));
        this.imgRef.current.addEventListener("load", this.onImageLoad.bind(this));
    }

    onImageLoad(e) {
        this.dataUrl = this.compressImg();
        this.togglePreview(true);
        this.validate();
    }

    validate() {
        let caption = this.captionRef.current.value;
        this.setState({ disabled: !(caption && this.dataUrl) })
    }

    compressImg() {
        let canvas = document.createElement('canvas');
        let width = this.imgRef.current.width;
        let height = this.imgRef.current.height;
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(this.imgRef.current, 0, 0, width, height);
        return canvas.toDataURL("image/jpeg", .7);
    }

    togglePreview(isPreview) {
        if (isPreview) {
            this.imgRef.current.classList.add('m-img-preview');
        } else {
            this.imgRef.current.classList.remove('m-img-preview');
        }
    }

    toggleSpinner(show = false) {
        if (show) {
            this.addPostRef.current.classList.add('m-post-spinner')
        } else {
            this.addPostRef.current.classList.remove('m-post-spinner');
        }
    }
    
    responseCb(response) {
        this.toggleSpinner();
        this.toggleDialog();
        this.props.refreshPost();
    }
}

export default AddPost;