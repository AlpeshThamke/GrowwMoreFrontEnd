import {Container,Paper,Grid,Card,Button,Typography as TP} from "@material-ui/core"
import {Link} from "react-router-dom"

function Home() {
    return (
        <div>
            <Container style={{textAlign:"center"}}>
                <TP variant="h3" style={{background:"cyan",marginTop:20,marginBottom:20,fontFamily:'roboto'}}><b>GROWW</b></TP>
                {/* <TP variant="h5" style={{background:"cyan"}}>Inspired from HARSHAD MEHTA</TP> */}
                <hr style={{height:10,background:'blue',marginTop:-5}} />
                <TP variant="h4" style={{color:"#e91e63",marginTop:20,marginBottom:20}}>Invest with Groww to grow more</TP>
                <div style={{padding:20,background:"skyblue"}}>
                    <TP variant="h4" style={{marginTop:10,marginBottom:10}}>We offer you these</TP>
                    <Grid container spacing={6}>
                        <Grid item style={{width:300,marginLeft:"auto",marginRight:"auto"}}>
                            <Paper style={{height:220}}>
                                <div style={{padding:10}}>
                                    <TP variant="h4" style={{color:"green",marginBottom:5}}>Stocks</TP>
                                    <TP variant="body1" color="primary" style={{textAlign:"left"}}>We offer you to buy and sell stocks of top listed companies, and it's super easy with our GUI and it's free to use. So why holding back yourself just kick start investing in stocks</TP>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item style={{width:300,marginLeft:"auto",marginRight:"auto"}}>
                            <Paper style={{height:220}}>
                                <div style={{padding:10}}>
                                    <TP variant="h4" style={{color:"green",marginBottom:5}}>Mutual Funds</TP>
                                    <TP variant="body1" color="primary" style={{textAlign:"left"}}>We offer you to buy and sell SIPs of top listed companies, and it's super easy with our GUI and it's free to use. So why holding back yourself just kick start investing in Mutual Funds</TP>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item style={{width:300,marginLeft:"auto",marginRight:"auto"}}>
                            <Paper style={{height:220}}>
                                <div style={{padding:10}}>
                                    <TP variant="h4" style={{color:"green",marginBottom:5}}>Gold</TP>
                                    <TP variant="body1" color="primary" style={{textAlign:"left"}}>We offer you to buy and sell gold, and it's super easy with our GUI and it's free to use. So why holding back yourself just kick start investing in Gold</TP>
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
                <div style={{marginTop:20,marginBottom:20,padding:20,background:"#64ffda"}}>
                    <Grid container spacing={5}>
                        <Grid item style={{marginLeft:"auto",marginRight:"auto"}}>
                            <Paper style={{width:500}}>
                                <TP variant="h5" style={{marginTop:10,marginBottom:10}}>Create a brand new account NOW!</TP>
                                <Button variant="contained" color='primary' style={{marginBottom:10}}><Link style={{textDecoration:"none",color:'white'}} to="/signup">Sign Up</Link></Button>
                            </Paper>
                        </Grid>
                        <Grid item style={{marginLeft:"auto",marginRight:"auto"}}>
                            <Paper style={{width:500}}>
                                <TP variant="h5" style={{marginTop:10,marginBottom:10}}>Already have an account!</TP>
                                <Button variant="contained" color='primary' style={{marginBottom:10}}><Link style={{textDecoration:"none",color:'white'}} to="/login">Sign In</Link></Button>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </Container> 
        </div>
    )
}

export default Home
