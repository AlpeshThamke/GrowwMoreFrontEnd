import React from 'react';
import {Card,Typography as TP,Button,Divider,CardContent,CardActions,Paper,ButtonGroup,Grid,Container} from "@material-ui/core";
import {useState} from "react";
import {useAuth} from "../contexts/AuthContext";
import {Link,useHistory} from "react-router-dom";
// import axios from "axios";

function Dashboard() {
    const [error,setError] =useState('');
    const {currentUser,logout} = useAuth();
    const history = useHistory();
    async function handlelogout(){
        setError('')
        try{
            await logout()
            history.push("/home")
        }
        catch{
            setError('Failed to log out')
        }
    }
    return (
        <div>
            <Paper style={{width:300,background:'#f0f0f0',marginTop:20,marginLeft:"auto",marginRight:"auto"}}>
                    <TP variant="h5" color="primary" style={{width:"100%",textAlign:"center"}}>User Profile</TP>
                    {error && <TP variant="h6" color='secondary' style={{marginTop:10,marginBottom:10}}>{error}</TP>}
                    <Divider></Divider>
                    {currentUser && <TP variant="body1" style={{marginLeft:10}} >Email id: <Link style={{float:"right",textDecoration:"none"}}>{currentUser.email}</Link></TP>}
                    <div style={{textAlign:"center"}}>  
                    <Button variant="contained" onClick={handlelogout} style={{background:"skyblue",marginBottom:20,width:"50%",marginTop:10}}>Log Out</Button>
                    </div>
            </Paper>
            <Container style={{marginTop:50}}>
                <Paper style={{background:"#f0f0f0"}}>
                    <Grid container spacing={3} orientatio='vertical'>
                        <Grid item style={{marginLeft:"auto",marginRight:"auto"}}>
                            <Paper style={{height:150,width:300}}>
                                <div style={{padding:20}}>
                                    <Button variant="contained" style={{background:"green",marginTop:10}}><Link style={{textDecoration:"none",color:"white",fontSize:20}} to="/stocks">Proceed to Stock Market</Link></Button>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item style={{marginLeft:"auto",marginRight:"auto"}}>
                            <Paper style={{height:150,width:300}}>
                                <div style={{padding:20}}>
                                    <Button variant="contained" style={{background:"green",marginTop:10}}><Link style={{textDecoration:"none",color:"white",fontSize:20}} to="/mutual">Proceed to Mutual Fund</Link></Button>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item style={{marginLeft:"auto",marginRight:"auto"}}>
                            <Paper style={{height:150,width:300}}>
                                <div style={{padding:20}}>
                                    <Button variant="contained" style={{background:"green",marginTop:10}}><Link style={{textDecoration:"none",color:"white",fontSize:20}} to="/gold">Proceed to Gold Market</Link></Button>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item style={{marginLeft:"auto",marginRight:"auto"}}>
                            <Paper style={{height:150,width:300}}>
                                <div style={{padding:20,textAlign:"center"}}>
                                    <Button variant="contained" style={{background:"green",marginTop:30}}><Link style={{textDecoration:"none",color:"white",fontSize:20}} to="/investment">Your Portfolio</Link></Button>
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </div>
    )
}

export default Dashboard
