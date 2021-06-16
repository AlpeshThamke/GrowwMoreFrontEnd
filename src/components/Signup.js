import react from 'react'
import {Card,Paper,Button,Typography as TP,CardContent,CardActions,FormLabel as FL,TextField as TF,Divider} from "@material-ui/core"
import {useState,useRef} from "react";
//imp
import {useAuth} from "../contexts/AuthContext";

import {Link,useHistory} from "react-router-dom";
import axios from "axios";


function Signup() {

    //for signup function implementation
    const {signup} = useAuth()
    const [error,setError] = useState('');

    //for textFields
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const usernameRef = useRef();

    //for state of button
    const [loading,setLoading] = useState(false)

    const history = useHistory();

    async function doit(e){
        e.preventDefault();
        var a = emailRef.current.value
        var b = passwordRef.current.value
        var c = passwordConfirmRef.current.value
        var d = usernameRef.current.value
        if(c!==b)
        {
            return setError("Passwords do not match")
        }
        try{
            setError('')
            setLoading(true)
            await signup(a,b)
            const options={
                method:'POST',
                url:"https://growwmore.herokuapp.com/userapi/",
                data:{
                    'username':d,
                    'useremail':a,
                    'balance':1000
                }
            };
            const data = await axios.request(options);
            history.push("/login")
        }
        catch{
            setError("Failed to Sign Up")
        }
        setLoading(false)
    }
    return (
        <div>
            <form onSubmit={doit}>
                <Card style={{width:400,background:"#f0f0f0",marginLeft:"auto",marginRight:"auto"}}>
                    <CardContent>
                        <TP variant="h4" style={{textAlign:"center",color:"blue"}}>Create an Account</TP>
                        <Divider></Divider>
                        {error && <TP variant="h5" color="secondary" style={{marginTop:10,marginBottom:10}}>{error}</TP>}
                        <Divider></Divider>
                        <FL style={{marginTop:20,marginBottom:10}}>Email ID</FL>
                        <br />
                        <TF variant="outlined" color="primary" type="email" style={{width:"100%",background:"white",marginBottom:20}} inputRef={emailRef}></TF>
                        <br />

                        <FL style={{marginTop:20,marginBottom:10}}>Username</FL>
                        <br />
                        <TF variant="outlined" color="primary" style={{width:"100%",background:"white",marginBottom:20}} inputRef={usernameRef}></TF>
                        <br />

                        <FL style={{marginTop:20,marginBottom:10}}>Password</FL>
                        <br />
                        <TF variant="outlined" color="primary" type="password" style={{width:"100%",background:"white",marginBottom:20}} inputRef={passwordRef}></TF>
                        <br />


                        <FL style={{marginTop:20,marginBottom:10}}>Password Confirm</FL>
                        <br />
                        <TF variant="outlined" color="primary" type='password' style={{width:"100%",background:"white",marginBottom:20}} inputRef={passwordConfirmRef}></TF>
                        <br />
                        <Button variant="contained" disabled={loading} type='submit' style={{background:"skyblue",width:"100%",height:50,fontSize:20,marginBottom:10}}>Create Account</Button>
                        <Divider></Divider>
                        <TP variant="h6" color="primary" style={{marginTop:10}}>Already have an Account?? <Link to="/login" >Log In</Link></TP>

                    </CardContent>
                </Card>
            </form>
        </div>
    )
}

export default Signup
