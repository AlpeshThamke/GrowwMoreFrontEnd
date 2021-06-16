import {Button,TextField,Fab,Container,ButtonGroup,Divider} from "@material-ui/core"
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Link, useHistory} from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {makeStyles} from "@material-ui/core";
import {TableContainer,TableHead,TableBody,TableRow,Table,TableCell} from "@material-ui/core";
import {Paper} from "@material-ui/core";
import {Typography} from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';

import CachedIcon from '@material-ui/icons/Cached';

import {ClipLoader} from "react-spinners";

import {useAuth} from "../contexts/AuthContext";
import axios from "axios";
import {useState,useEffect} from "react";

const useStyles = makeStyles({
  fatt:{
    background:"#80deea",
    color:"black"
  }
})


function Investment() {
    const classes = useStyles();
    const history = useHistory();
    const [askd,setAskd] = useState(true)
    const [stocksdata,setStocksdata] = useState([]);
    const [mutualdata,setMutualdata] = useState([]);
    const [golddata,setGolddata] = useState([]);
    const {currentUser} = useAuth();
    const [open,setOpen] = useState(false)
    const [dfgh,setDfgh] = useState(false)
    const [balance,setBalance] = useState(0)

    useEffect(()=>{
        doit();
    },[])
    async function video()
    {
        setDfgh(true)
        setOpen(true)
        const options={
            method:'GET',
            url:'https://growwmore.herokuapp.com/userapi/'
        };
        var temp = await axios.request(options)
        temp = temp.data
        var teju = temp.filter((each)=>{
            const {useremail} = each
            if(useremail===currentUser.email)
            {
                return each;
            }
        })
        teju = teju[0];
        setBalance(teju.balance)
        setDfgh(false)
    }
    async function doit(){
        const options={
            method:"GET",
            url:'https://growwmore.herokuapp.com/userapi/'
        };
        var data = await axios.request(options)
        data = data.data
        var abhi = data.filter((each)=>{
            const {useremail} = each
            if(useremail===currentUser.email)
            {
                return each;
            }
        })
        abhi = abhi[0];

        //stocks
        const omg = {
            method:"GET",
            url:'https://growwmore.herokuapp.com/stocksapi/'
        };
        var tnp = await axios.request(omg)
        tnp = tnp.data
        var tmp = tnp.filter((each)=>{
            const {user} = each
            if(user===abhi.id)
            {
                return each;
            }
        })
        
        //mutual funds
        const om = {
            method:"GET",
            url:'https://growwmore.herokuapp.com/mutualapi/'
        };
        var vjt = await axios.request(om)
        vjt = vjt.data
        var vjti = vjt.filter((each)=>{
            const {user} = each
            if(user===abhi.id)
            {
                return each;
            }
        })        

        //gold
        const omi = {
            method:'GET',
            url:'https://growwmore.herokuapp.com/goldapi/'
        };
        var bgh = await axios.request(omi)        
        bgh = bgh.data
        var cvg = bgh.filter((each)=>{
            const {user} = each
            if(user===abhi.id)
            {
                return each;
            }
        })

        setStocksdata(tmp);
        setMutualdata(vjti);
        setGolddata(cvg);
        setAskd(false)

    }
    async function stocksfetching(company,index){
        var code ;
        if(company==='Microsoft') code='MSFT'
        else if(company==='Facebook') code='FB'
        else if(company==='B. Hathaway') code='BRK.A'
        else if(company==='Apple') code='AAPL'
        else if(company==='Tesla') code='TSLA'
        else if(company==='Amazon') code='AMZN'
        else if(company==='Google') code='GOOGL'
        else if(company==='Netflix') code='NFLX'
        else if(company==='IBM') code='IBM'

        const options={
            method:'GET',
            url:`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${code}&apikey=LS16XJ6XSE895VQE`
        };
        var teju = await axios.request(options)
        teju = teju.data
        var pri
        for(var key in teju['Time Series (Daily)'])
        {
            pri=(teju['Time Series (Daily)'][key]['1. open'])
            break;
        }
        var tempdata = stocksdata.filter((each)=>{
            if(each.company===company)
            {
                return each;
            }
        })
        tempdata = tempdata[0];
        var originalprice = tempdata.prices
        originalprice = parseFloat(originalprice);
        pri  = parseFloat(pri)
        var numberofshares = tempdata.quantity
        numberofshares = parseInt(numberofshares)
        var myreturns = parseFloat(numberofshares*(originalprice-pri))
        myreturns = myreturns.toFixed(3);
        pri = pri.toFixed(3)

        document.getElementById(company+index).innerHTML='$'+myreturns
        document.getElementById(company).innerHTML='$'+pri
    }
    async function mutualfetching(company,index){
        var code ;
        if(company==='ICICI Prudential') code='117619'
        else if(company==='Axis Small Cap') code='125354'
        else if(company==='Tata Digital') code='135800'
        else if(company==='Parag Parikh') code='122639'
        else if(company==='Axis') code='135800'
        else if(company==='Axis BlueChip') code='112278'
        else if(company==='Nippon') code='100383'
        else if(company==='Motilal Oswal') code='147703'
        else if(company==='PGIM') code='138453'

        const options={
            method:'GET',
            url:`https://api.mfapi.in/mf/${code}`
        };
        var teju = await axios.request(options)
        teju = teju.data.data
        var pri
        for(var ke in teju)
        {
            pri=(teju[ke].nav);
            break;
        }
        var tempdata = mutualdata.filter((each)=>{
            if(each.company===company)
            {
                return each;
            }
        })
        tempdata = tempdata[0];
        var originalprice = tempdata.prices
        originalprice = parseFloat(originalprice);
        pri  = parseFloat(pri)
        var numberofshares = tempdata.quantity
        numberofshares = parseInt(numberofshares)
        var myreturns = parseFloat(numberofshares*(originalprice-pri))
        myreturns = myreturns.toFixed(3);
        pri = pri.toFixed(3)

        document.getElementById(company+index).innerHTML='$'+myreturns
        document.getElementById(company).innerHTML='$'+pri
    }
    async function goldfetching(company,index){
        const options={
            method:'GET',
            url:`https://api.mfapi.in/mf/106193`
        };
        var teju = await axios.request(options)
        teju = teju.data.data
        var pri
        for(var ke in teju)
        {
            pri=(teju[ke].nav);
            break;
        }
        var tempdata = golddata.filter((each)=>{
            if(each.company===company)
            {
                return each;
            }
        })
        pri  = parseFloat(pri)
        pri +=4000.0;
        pri/=75.00;
        tempdata = tempdata[0];
        var originalprice = tempdata.prices
        originalprice = parseFloat(originalprice);
        pri  = parseFloat(pri)
        var numberofshares = tempdata.quantity
        numberofshares = parseInt(numberofshares)
        var myreturns = parseFloat(numberofshares*(originalprice-pri))
        myreturns = myreturns.toFixed(3);
        pri = pri.toFixed(3)

        document.getElementById(company+index).innerHTML='$'+myreturns
        document.getElementById(company).innerHTML='$'+pri
    }
    return (
        <div>
            <Container>
                <div style={{padding:20}}>
                    <img style={{height:40}} src="https://assets-netstorage.groww.in/website-assets/prod/1.6.2/build/client/images/logo-dark-groww.83f43714.svg" alt="Logo of Groww" />
                    <Button variant="outlined" style={{marginTop:-25,marginLeft:10,border:"none"}}><Link style={{textDecoration:"none",color:"black"}} to="/stocks">Explore</Link></Button>
                    <Button variant="outlined" style={{marginTop:-25,marginLeft:10,border:"none",fontSize:20,color:'red'}}>Investments</Button>
                    <TextField variant="outlined" color="primary" style={{width:400,height:20,marginLeft:20,marginTop:-10}} label="Search Stock and Mutual Fund"></TextField>
                    {/* <NotificationsIcon fontSize="large" color="primary" style={{marginLeft:30,color:"black"}}/> */}
                    <AccountBalanceWalletIcon fontSize="large" color="primary" style={{marginLeft:100,color:"black"}} onClick={()=>video()}/>
                    {/* <ShoppingCartIcon fontSize="large" color="primary" style={{marginLeft:40,color:"black"}}/> */}
                    <Fab style={{marginLeft:100,marginTop:-20}} className={classes.fatt} onClick={()=>history.push("/")}>
                        <AccountCircleIcon/>
                    </Fab>
                </div> 

                <ButtonGroup style={{border:"none"}}>
                    <Button style={{border:"none",marginRight:20}} ><Link style={{textDecoration:"none",color:"black",fontSize:20}} to="/stocks">Stocks</Link></Button>
                    <Button style={{border:"none",marginRight:20}} ><Link style={{textDecoration:"none",color:"black",fontSize:20}} to="/mutual">Mutual Fund</Link></Button>
                    <Button style={{border:"none",marginRight:20}} ><Link style={{textDecoration:"none",color:"black",fontSize:20}} to="/gold">Gold</Link></Button>
                </ButtonGroup>
                <Dialog open={open}>
              <ClipLoader loading={dfgh}></ClipLoader>
              <div style={{padding:40}}>
            {dfgh===false && <Typography variant="h5" color='primary' style={{marginTop:20}}>Current Balance</Typography>}
            {dfgh===false && <Typography variant='h5' color="secondary" style={{marginTop:-30,marginLeft:240}}>${balance}</Typography>}
            <div style={{textAlign:"center",marginTop:20,marginBottom:10}}>
            {dfgh===false && <Button  variant="contained" color='primary' onClick={()=>setOpen(false)}>Close</Button>}
            </div>
            </div>
          </Dialog>
                <Divider/>
            </Container>
            <ClipLoader loading={askd}></ClipLoader>

            {/* Stocks */}
            {askd===false && <Container>
                {stocksdata.length!==0 && mutualdata.length!==0 && golddata.length!==0 && <Typography variant="h6" color="secondary">Click on refresh button to load current prices for particular company</Typography>}
                <Paper style={{marginTop:20,background:"#f0f0f0"}}>
                <Typography variant="h5" color="primary" style={{marginBottom:10}}>Stocks Investment:</Typography>
                {stocksdata.length===0 && <Typography variant='h5' color="secondary">Not invested till now</Typography>}
                {stocksdata.length!==0 && <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow style={{background:"black",color:"white"}}>
                                <TableCell style={{color:"whitesmoke"}}>Sr. No.</TableCell>
                                <TableCell style={{color:"whitesmoke"}}>Name of the Company</TableCell>
                                <TableCell style={{color:"whitesmoke"}}>Amount</TableCell>
                                <TableCell style={{color:"whitesmoke"}}>Bought Price per share</TableCell>
                                <TableCell style={{color:"whitesmoke"}}>Current Price</TableCell>
                                <TableCell style={{color:"whitesmoke"}}>Returns</TableCell>
                                <TableCell style={{color:"whitesmoke"}}>Current Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                stocksdata.map((each,index)=>{
                                    const {company,quantity,prices} = each
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>{index+1}</TableCell>
                                            <TableCell>{company}</TableCell>
                                            <TableCell>{quantity}</TableCell>
                                            <TableCell>${prices}</TableCell>
                                            <TableCell id={company}>----</TableCell>
                                            <TableCell id={company+index}>----</TableCell>
                                            <TableCell><CachedIcon onClick={()=>stocksfetching(company,index)}/></TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>}
                </Paper>
            </Container>}


            {/* Mutual Funds */}
            {askd===false && <Container>
                <Paper style={{marginTop:20,background:"#f0f0f0"}}>
                <Typography variant="h5" color="primary"  style={{marginBottom:10}}>Mutual Funds Investment:</Typography>
                {mutualdata.length===0 && <Typography variant='h5' color="secondary">Not invested till now</Typography>}
                {mutualdata.length!==0 && <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow style={{background:"black",color:"white"}}>
                                <TableCell style={{color:"whitesmoke"}}>Sr. No.</TableCell>
                                <TableCell style={{color:"whitesmoke"}}>Name of the Company</TableCell>
                                <TableCell style={{color:"whitesmoke"}}>Amount</TableCell>
                                <TableCell style={{color:"whitesmoke"}}>Bought Price per NAV</TableCell>
                                <TableCell style={{color:"whitesmoke"}}>Current Price</TableCell>
                                <TableCell style={{color:"whitesmoke"}}>Returns</TableCell>
                                <TableCell style={{color:"whitesmoke"}}>Current Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                mutualdata.map((each,index)=>{
                                    const {company,quantity,prices} = each
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>{index+1}</TableCell>
                                            <TableCell>{company}</TableCell>
                                            <TableCell>{quantity}</TableCell>
                                            <TableCell>${prices}</TableCell>
                                            <TableCell id={company}>----</TableCell>
                                            <TableCell id={company+index}>----</TableCell>
                                            <TableCell><CachedIcon onClick={()=>mutualfetching(company,index)}/></TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>}
                </Paper>
            </Container>}


            {/* Gold */}
            {askd===false && <Container>
                <Paper style={{marginTop:20,background:"#f0f0f0"}}>
                <Typography variant="h5" color="primary" style={{marginBottom:10}}>Gold Investment:</Typography>
                {golddata.length===0 && <Typography variant='h5' color="secondary">Not invested till now</Typography>}
                {golddata.length!==0 && <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow style={{background:"black",color:"white"}}>
                                <TableCell style={{color:"whitesmoke"}}>Sr. No.</TableCell>
                                <TableCell style={{color:"whitesmoke"}}>Name of the Company</TableCell>
                                <TableCell style={{color:"whitesmoke"}}>Amount</TableCell>
                                <TableCell style={{color:"whitesmoke"}}>Bought Price per gram</TableCell>
                                <TableCell style={{color:"whitesmoke"}}>Current Price</TableCell>
                                <TableCell style={{color:"whitesmoke"}}>Returns</TableCell>
                                <TableCell style={{color:"whitesmoke"}}>Current Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                golddata.map((each,index)=>{
                                    const {company,quantity,prices} = each
                                    var pnk = parseFloat(quantity)
                                    pnk = pnk.toFixed(3);
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>{index+1}</TableCell>
                                            <TableCell>{company}</TableCell>
                                            <TableCell>{pnk}</TableCell>
                                            <TableCell>${prices}</TableCell>
                                            <TableCell id={company}>----</TableCell>
                                            <TableCell id={company+index}>----</TableCell>
                                            <TableCell><CachedIcon onClick={()=>goldfetching(company,index)}/></TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>}
                </Paper>
            </Container>}
        </div>
    )
}

export default Investment
