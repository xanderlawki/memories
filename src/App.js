import React, {useEffect, useState} from 'react';
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import memories from './images/memories.png';
import Posts from "./Components/Posts/post";
import Form from "./Components/Form/form";
import useStyles from "./styles";
import {useDispatch} from "react-redux";
import {getPosts} from "./actions/posts";


const App = ()=> {
  const [currentid, setCurrentId] = useState(null)
  const classes = useStyles();
  const dispatch = useDispatch();
    useEffect(()=> {
      dispatch(getPosts());
    }, [currentid, dispatch])
  return (
    <Container maxidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
      <Typography className = {classes.heading} variant="h2" text-align="center">Memories</Typography>
      <img className={classes.image} src={memories} alt="memories" height="60"/>
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" className={classes.mainContainer} alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId}/>
              
            </Grid>
            <Grid item xs={12} sm={4}>
            <Form currentid={currentid} setCurrentId={setCurrentId}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
      </Container>
  )
}

export default App