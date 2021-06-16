
import React from 'react'
import {Card,Paper,Button,Typography as TP,CardContent,CardActions,FormLabel as FL,TextField as TF,Divider} from "@material-ui/core"
import {useState,useRef} from "react";
//imp
import {useAuth} from "../contexts/AuthContext";

import {Link,useHistory} from "react-router-dom";


function ForgotPassword() {

    //for signup function implementation
    const {resetPassword} = useAuth()
    const [error,setError] = useState('');

    //for textFields
    const emailRef = useRef();

    //for state of button
    const [loading,setLoading] = useState(false)

    const history = useHistory();

    async function doit(e){
        e.preventDefault();
        var a = emailRef.current.value
        try{
            setError('')
            setLoading(true)
            await resetPassword(a)
            history.push("/login")
        }
        catch{
            setError("Failed to Reset Password")
        }
        setLoading(false)
    }
    return (
        <div>
            <form onSubmit={doit}>
                <Card style={{width:400,background:"#f0f0f0",marginLeft:"auto",marginRight:"auto"}}>
                    <CardContent>
                        <TP variant="h4" style={{textAlign:"center",color:"blue"}}>Reset Password</TP>
                        <Divider></Divider>
                        {error && <TP variant="h5" color="secondary" style={{marginTop:10,marginBottom:10}}>{error}</TP>}
                        <Divider></Divider>
                        <FL style={{marginTop:20,marginBottom:10}}>Email ID</FL>
                        <br />
                        <TF variant="outlined" color="primary" type="email" style={{width:"100%",background:"white",marginBottom:20}} inputRef={emailRef}></TF>
                        <br />
                        <Button variant="contained" disabled={loading} type='submit' style={{background:"skyblue",width:"100%",height:50,fontSize:20,marginBottom:10}}>Reset</Button>
                        <Divider></Divider>
                        <TP variant="h6" color="primary" style={{marginTop:10}}><Link to="/login">Cancel</Link></TP>
                    </CardContent>
                </Card>
            </form>
        </div>
    )
}

export default ForgotPassword;
