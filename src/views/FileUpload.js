import React, { Component } from "react";
import axios from 'axios';

class FileUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            displayImage: false,
            imageFile: null
        }   
    };

    componentDidMount = () => {
        axios.get(
            "http://localhost:8080/DearBiryaniBackend/neardear/getAllItems",
        ).then(res=>{
            console.log(res.data.rows[0].imageUrl);
            this.setState({
                imageFile: res.data.rows[0].image
            });
        });
    }

    enableImage = () =>{
        this.setState({
            displayImage : true
        });
    }

    onChangeHandler=event=>{
        console.log(sessionStorage);
        var file = event.target.files[0];
        if(this.validateSize(event)){ 
      // if return true allow to setState
         this.setState({
          selectedFile: file
          });
    
        }
      }


      fileUploadHandler = () => {
        
        const data = new FormData()
        var file = this.state.selectedFile;
        console.log(file);
        data.append('fileUpload', file);
        console.log(data);
        //var newData = { "fileUploadFileName" : file.name, "fileUploadContentType" : file.type};

        axios.post(
            "http://localhost:8080/DearBiryaniBackend/fileUpload/uploadImage",
            data,
            {
                headers: {
                    //"Authorization": "YOUR_API_AUTHORIZATION_KEY_SHOULD_GOES_HERE_IF_HAVE",
                    "Content-type": "multipart/form-data",
                },                    
            }
        )
          .then(res => { // then print response status
            console.log('upload success')
          })
          .catch(err => { // then print response status
            console.log('upload fail')
          })
    
      };
      validateSize=(event)=>{
      let file = event.target.files[0];
      let size = 30000;
      let err = '';
      if (file.size > size) {
       err = file.type+'is too large, please pick a smaller file\n';
       console.log(err);
     }
     return true
    };
     
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <form method="post" action="#" id="#">
                            <div className="form-group files">
                                <label>Upload Your File </label>
                                <input type="file" name="file" className="form-control" onChange={this.onChangeHandler}/>
                            </div>
                            <div className="col-md-6 pull-right">
                                <button width="100%" type="button" className="btn btn-info" onClick={this.fileUploadHandler}>Upload File</button>
                                <button onClick={this.enableImage}>Show Image</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div>
                    <img id="target" src={URL.createObjectURL(this.state.imageFile)}/>
                </div>
            </div>
        );
    }
}
 
export default FileUpload;