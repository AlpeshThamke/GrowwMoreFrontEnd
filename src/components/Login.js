import React from 'react'
import {Card,Paper,Button,Typography as TP,CardContent,CardActions,FormLabel as FL,TextField as TF,Divider} from "@material-ui/core"
import {useState,useRef} from "react";
//imp
import {useAuth} from "../contexts/AuthContext";

import {Link,useHistory} from "react-router-dom";


function Login() {

    //for signup function implementation
    const {login} = useAuth()
    const [error,setError] = useState('');

    //for textFields
    const emailRef = useRef();
    const passwordRef = useRef();

    //for state of button
    const [loading,setLoading] = useState(false)

    const history = useHistory();

    async function doit(e){
        e.preventDefault();
        var a = emailRef.current.value
        var b = passwordRef.current.value
        try{
            setError('')
            setLoading(true)
            await login(a,b)
            history.push("/")
        }
        catch{
            setError("Failed to Log In")
        }
        setLoading(false)
    }
    return (
        <div>
            <form onSubmit={doit}>
                <Card style={{width:400,background:"#f0f0f0",marginLeft:"auto",marginRight:"auto"}}>
                    <CardContent>
                        <TP variant="h4" style={{textAlign:"center",color:"blue"}}>Log In</TP>
                        <Divider></Divider>
                        {error && <TP variant="h5" color="secondary" style={{marginTop:10,marginBottom:10}}>{error}</TP>}
                        <Divider></Divider>
                        <FL style={{marginTop:20,marginBottom:10}}>Email ID</FL>
                        <br />
                        <TF variant="outlined" color="primary" type="email" style={{width:"100%",background:"white",marginBottom:20}} inputRef={emailRef}></TF>
                        <br />


                        <FL style={{marginTop:20,marginBottom:10}}>Password</FL>
                        <br />
                        <TF variant="outlined" color="primary" type="password" style={{width:"100%",background:"white",marginBottom:20}} inputRef={passwordRef}></TF>
                        <br />

                        <Button variant="contained" disabled={loading} type='submit' style={{background:"skyblue",width:"100%",height:50,fontSize:20,marginBottom:10}}>Log In</Button>
                        <Link style={{marginTop:10,marginBottom:10}} to="/forgot-password">Forgot Password</Link>
                        <Divider></Divider>
                        <TP variant="h6" color="primary" style={{marginTop:10}}>Don't have an account?? <Link to="/signup">Sign Up</Link></TP>
                    </CardContent>
                </Card>
            </form>
        </div>
    )
}

export default Login;
