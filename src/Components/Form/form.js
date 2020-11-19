import React, {useEffect, useState} from "react";
import {TextField, Button, Typography, Paper} from '@material-ui/core';
import useStyles from "./style";
import FileBase from 'react-file-base64';
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux';
import {createPost, updatePost} from '../../actions/posts'


///////get the current id 
const Form = ({currentid, setCurrentId})=> {
    const classes = useStyles();
    const post = useSelector((state)=> currentid ? state.posts.find((p)=> p._id === currentid) : null);
    const dispatch = useDispatch()

    useEffect(()=> {
        if(post) setPostData(post)
    }, [post])
    const [postData, setPostData] = useState ({
        creator: "", title: "", message: "", tags: "", selectedFile: ""})

        const handleSubmit = (e)=> {
            e.preventDefault();

            if(currentid) {
                dispatch(updatePost(currentid, postData))
                clear()
            }
            else {
                dispatch(createPost(postData))
                clear()
            }
           
            
        }
        const clear = ()=> {
            setCurrentId(null);
            setPostData({
                creator: "", title: "", message: "", tags: "", selectedFile: ""})
        }
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
    <Typography variant="h6">{currentid ? 'Editing' : 'Creating'} a Memory</Typography>
            <TextField
             name="creator"
              variant="outlined"
               label="creator"
                fullWidth value={postData.creator}
                onChange={(e)=> setPostData({...postData, creator: e.target.value})}/>
                <TextField
             name="title"
              variant="outlined"
               label="title"
                fullWidth value={postData.title}
                onChange={(e)=> setPostData({...postData, title: e.target.value})}/>
                <TextField
             name="message"
              variant="outlined"
               label="message"
                fullWidth value={postData.message}
                onChange={(e)=> setPostData({...postData, message: e.target.value})}/>
                <TextField
             name="tags"
              variant="outlined"
               label="tags"
                fullWidth value={postData.tags}
                onChange={(e)=> setPostData({...postData, tags: e.target.value.split(',')})}/>
                <div className={classes.fileInput}>
                <FileBase 
                type="file"
                multiple={false}
                onDone={({base64}) => setPostData({...postData, selectedFile: base64})}/>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained"  color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                </div>
            </form>
        </Paper>
    )
}

export default Form