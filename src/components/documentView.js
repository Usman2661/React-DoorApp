import React, { Component } from 'react';
// import logger from 'logging-library';
import FileViewer from 'react-file-viewer';

export class documentView extends Component {

    state = {
        document:'',
        type:''
    }

    componentDidMount(){
        const document= this.props.location;
        this.setState({document: document.document});
        this.setState({type: document.filetype});
    }

    onError(e){
        console.log('An Error Occured ' + e);
    }
    render() {
        return (
            <FileViewer style={{height:'800px'}}
            fileType={this.state.type}
            filePath={this.state.document}
            onError={this.onError}
            />
        );      
    }
}

export default documentView
