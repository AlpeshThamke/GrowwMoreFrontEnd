import ReactDOM from 'react-dom';
import {Button,TextField,Container,ButtonGroup,Typography,Grid,Paper} from "@material-ui/core"
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Fab} from "@material-ui/core"
import {makeStyles} from "@material-ui/core"
import {Divider} from "@material-ui/core";
import {Link,useHistory} from "react-router-dom";
import {useEffect,useState,useRef} from "react"
import axios from "axios"
import {Line} from "react-chartjs-2"
import {ClipLoader} from "react-spinners"
import RefreshIcon from '@material-ui/icons/Refresh';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {useAuth} from "../contexts/AuthContext";
import Dialog from '@material-ui/core/Dialog';

import Modal from "react-modal";

const useStyles = makeStyles({
  fatt:{
    background:"#80deea",
    color:"black"
  }
})

function Gold() {
    const classes = useStyles();
    const [gol,setGol] = useState({x:[1,2,3,4],y:[1,2,3,4]})
    const [se,setSe] = useState(true)
    const [day,setDay] = useState(15)
    const [askd,setAskd] = useState(true)

    const {currentUser} = useAuth();

    const [value,setValue] = useState(0)
    const [availableshares,setAvailableshares] = useState(0)
    const [maxshares,setMaxshares] = useState(0)
    const [balance,setBalance] = useState(0)
    const [boughtshares,setBoughtshares] = useState(0)
    const [totalinvest,setTotalinvest] = useState(0)
    const [ret,setRet] = useState(0)
    const [totalasset,setTotalasset] = useState(0)

    const [bhina,setBhina] = useState(false)
    const [shina,setShina] = useState(false)
    const [mon,setMon] = useState(0)
    const [vfm,setVfm] = useState(0)

    const [open,setOpen] = useState(false)
    const [dfgh,setDfgh] = useState(false)

    const buyRef = useRef()
    const sellRef = useRef()

    const history = useHistory();
    useEffect(()=>{
        getu(day)
        doit(4)
        kes()
    },[])
    useEffect(()=>{
        getu(day)
    },[day])

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
    async function kes(){
        const options={
            method:"GET",
            url:"https://api.mfapi.in/mf/106193"
        };
        var teju = await axios.request(options)
        teju = teju.data.data
        var co=0
        var one,two
        for(var ke in teju)
        {
            if(co===0)
            {
                one = teju[ke].nav
                co++;
            }
            else
            {
                two = teju[ke].nav
                break;
            }
        }
        one = parseFloat(one)
        two = parseFloat(two)
        one+=4000.0
        two+=4000.0
        one/=75.00;
        two/=75.00;
        one = one.toFixed(3)
        two = two.toFixed(3)
        var diff = one-two;
        diff = diff.toFixed(3)
        var per = diff/one*100
        per = per.toFixed(3)

        const omg = {
            method:'GET',
            url:'https://growwmore.herokuapp.com/userapi/'
        }
        var temp = await axios.request(omg)
        temp = temp.data

        var pk = temp.filter((each)=>{
            const {useremail} = each
            if(useremail===currentUser.email)
            {
                return each;
            }
        })
        pk = pk[0]

        const olp = {
            method:'GET',
            url:'https://growwmore.herokuapp.com/goldapi/'
        }
        var smb = await axios.request(olp)
        smb = smb.data
        var ind = smb.filter((each)=>{
            const {user} = each
            if(user===pk.id)
            {
                return each
            }
        })
        var ghty = parseFloat(parseFloat(pk.balance)/(parseFloat(one)))
        var ghh,dfg
        if(ind.length>0)
        {
            ind = ind[0]
            ghh = (parseFloat(parseFloat(ind.quantity)*parseFloat(ind.prices))).toFixed(3)
            
        }
        else
        {   
            ghh=0
            ind={
                'quantity':0
            }
        }

            const bnhj = {
                method:'GET',
                url:'https://growwmore.herokuapp.com/companygoldapi/'
            };
            dfg = await axios.request(bnhj)
            dfg = dfg.data
            dfg = dfg[0]

        setTotalinvest(parseFloat(ghh))
        setAvailableshares((parseFloat(dfg.quantity)).toFixed(3))
        setMaxshares(ghty)
        setBoughtshares((parseFloat(ind.quantity)).toFixed(3))
        setBalance((pk.balance).toFixed(3))
        setValue(parseFloat(one))
        setAskd(false)
        setTotalasset((parseFloat(parseFloat(one)*parseFloat(ind.quantity))).toFixed(3))
        
        if(diff<0.00 )
        {
            document.getElementById('100').innerHTML='<b>$'+one+' per g</b>'
            document.getElementById('golle').style.background='#ef9a9a'
            document.getElementById('nameu').style.background='#ef9a9a'
            document.getElementById('101').innerHTML='<b>'+diff+'('+per+'%)</b>'
            document.getElementById("namename").innerHTML = '$'+one+' per g'
            document.getElementById('100').style.color="red"
            document.getElementById('101').style.color="red"
        }
        else
        {   
            document.getElementById('100').innerHTML='<b>$'+one+' per g</b>'
            document.getElementById('golle').style.background='#b2ff59'
            document.getElementById('nameu').style.background='#b2ff59'
            document.getElementById("namename").innerHTML = '$'+one+' per g'
            document.getElementById('101').innerHTML='<b>+'+diff+'(+'+per+'%)</b>'
            document.getElementById('100').style.color="green"
            document.getElementById('101').style.color="green"
        }
    }
    async function getu(day){
        const options = {
            method:"GET",
            url:'https://api.mfapi.in/mf/106193'
        };
        var teju = await axios.request(options)
        teju = teju.data.data
        var co=0;
        var x=[];
        var y = [];
        for(var ke in teju)
        {   
            x.push(teju[ke].date)
            var t= teju[ke].nav
            t= parseFloat(t);
            t+=4000.00;
            t/=75.00;
            t = t.toFixed(3);
            y.push(t);
            co++;
            if(co===day)
            {
                break;
            }
        }
        var rx = [];
        var ry=[];
        var l= x.length;
        for(var i=l-1;i>=0;i--)
        {
            rx.push(x[i]);
            ry.push(y[i]);

        }
        setGol({x:rx,y:ry})
        setSe(false)
    }
    const klpd={
        labels:gol.x,
        datasets:[
            {
                label:"Gold",
                data:gol.y,
                backgroundColor:"yellow"
            }
        ]
    }
    const doit = (id) =>{
        for(var i=1;i<=7;i++)
        {
            if(i===id)
            {
                document.getElementById(i).style.background="green"
                document.getElementById(i).style.color="white"
            }
            else
            {
                document.getElementById(i).style.background="white"
                document.getElementById(i).style.color="black"
            }
        }
    }
    async function buyit(){
        setBhina(true)
        setAskd(true)
        var money = buyRef.current.value
        money = parseFloat(money)
        if(money>parseFloat(balance))
        {
            money = balance
        }
        money = parseFloat(money)

        const options = {
            method:'GET',
            url:'https://growwmore.herokuapp.com/userapi/'
        };
        var ab = await axios.request(options)
        ab = ab.data
        var temp = ab.filter((each)=>{
            const {useremail} = each
            if(useremail===currentUser.email)
            {
                return each
            }
        })
        temp = temp[0]
        var cd = temp.balance
        cd = parseFloat(cd)
        cd-=parseFloat(money)
        const bgty = {
            method:'PUT',
            url:'https://growwmore.herokuapp.com/userapi/',
            data:{
                'id':temp.id,
                'balance':cd
            }
        }
        var tytt = await axios.request(bgty)
        tytt = tytt.data


        const opt = {
            method:'GET',
            url:'https://growwmore.herokuapp.com/goldapi/'
        };
        var tgy = await axios.request(opt)
        tgy = tgy.data
        // tgy = tgy[0] 
        var inp = tgy.filter((each)=>{
            const {user} = each
            if(user===temp.id)
            {
                return each
            }
        })  
        var veryvery
        if(inp.length>0)
        {   
            var fgh = parseFloat(inp[0].quantity)
            fgh += parseFloat(parseFloat(money)/(parseFloat(value)))
            var prices = (((parseFloat(inp[0].quantity)*parseFloat(inp[0].prices))+parseFloat(money))/(parseFloat(fgh))).toFixed(3)
            prices = parseFloat(prices)
            veryvery = fgh
            const omg={
                method:'PUT',
                url:'https://growwmore.herokuapp.com/goldapi/',
                data:{
                    'id':inp[0].id,
                    'user':temp.id,
                    'quantity':fgh,
                    'prices':prices
                }
            };
            var resp = await axios.request(omg)
            resp = resp.data
        }
        else
        {   
            var rty = parseFloat(money)/(parseFloat(value))
            rty = parseFloat(rty)
            veryvery = rty
            const omg={
                method:'POST',
                url:'https://growwmore.herokuapp.com/goldapi/',
                data:{
                    'user':temp.id,
                    'company':'Muthoot',
                    'quantity':rty,
                    'prices':value
                }
            };
            var resp = await axios.request(omg)
            resp = resp.data
        }
        var asdf = parseFloat(money)/(parseFloat(value))
        asdf = parseFloat(asdf)
        asdf = (parseFloat(availableshares) - asdf)
        asdf = parseFloat(asdf)

        const qwe = {
            method:'PUT',
            url:'https://growwmore.herokuapp.com/companygoldapi/',
            data:{
                'id':1,
                'quantity':asdf
            }
        };
        var cfg = await axios.request(qwe)
        cfg = cfg.data
        // buyRef.current.value=""

        setAskd(false)
        setMon((parseFloat(money)).toFixed(3))
        setVfm((parseFloat(parseFloat(money)/(parseFloat(value)))).toFixed(3))
        setBoughtshares((veryvery).toFixed(3))
        setBalance((prevNo)=>{
            return (parseFloat(parseFloat(prevNo)-parseFloat(money))).toFixed(3)
        })
        setTotalinvest((prevNo)=>{
            return (parseFloat(parseFloat(prevNo)+parseFloat(money))).toFixed(3)
        })
        setAvailableshares((prevNo)=>{
            return (parseFloat(prevNo)-parseFloat(money)/(parseFloat(value))).toFixed(3)
        })
        setTotalasset(()=>{
            return (parseFloat(veryvery*parseFloat(value))).toFixed(3)
        })
    }
    async function sellit(){
        setShina(true)
        setAskd(true)
        var qty = sellRef.current.value
        qty=parseFloat(qty)
        if(qty>parseFloat(totalasset))
        {
            qty = totalasset
            
        }
        sellRef.current.value=qty
        qty = parseFloat(qty)
        qty = qty.toFixed(3)
        qty = parseFloat(qty)

        const options={
            method:'GET',
            url:'https://growwmore.herokuapp.com/userapi/'
        };
        var data = await axios.request(options)
        data = data.data
        var tej = data.filter((each)=>{
            const {useremail} = each
            if(useremail===currentUser.email)
            {
                return each
            }
        })
        tej = tej[0]
        var plk = tej.balance
        plk = parseFloat(plk)
        plk+= parseFloat(qty)
        plk = plk.toFixed(3)
        plk = parseFloat(plk)

        const olp={
            method:'PUT',
            url:'https://growwmore.herokuapp.com/userapi/',
            data:{
                'id':tej.id,
                'balance':plk
            }
        };
        var res = await axios.request(olp)
        res = res.data
        
        const omg={
            method:'GET',
            url:'https://growwmore.herokuapp.com/goldapi/'
        };

        var pjk = await axios.request(omg)
        pjk = pjk.data

        var ghj = pjk.filter((each)=>{
            const {user} = each
            if(user===tej.id)
            {
                return each
            }
        })
        ghj = ghj[0]
        var om,veryvery

        if(qty<(parseFloat(ghj.quantity)*parseFloat(ghj.prices)))
        {   
            var bgt = parseFloat(ghj.quantity)
            bgt -= parseFloat(parseFloat(qty)/parseFloat(value))
            bgt = parseFloat(bgt)
            bgt = bgt.toFixed(3)
            bgt = parseFloat(bgt)
            veryvery = bgt
            om ={
                method:'PUT',
                url:'https://growwmore.herokuapp.com/goldapi/',
                data:{
                    'id':ghj.id,
                    'quantity':bgt
                }
            };
        }
        else
        {   
            veryvery=0
            om ={
                method:'DELETE',
                url:'https://growwmore.herokuapp.com/goldapi/',
                data:{
                    'id':ghj.id
                }
            };
        }
        var th = await axios.request(om)
        th = th.data

        const vm ={
            method:'GET',
            url:'https://growwmore.herokuapp.com/companygoldapi/'
        };
        var dfg = await axios.request(vm)
        dfg = dfg.data
        var bnm = dfg.filter((each)=>{
            const {Name} = each
            if(Name==='Muthoot Gold')
            {
                return each
            }
        })
        bnm = bnm[0]
        var dcc = bnm.quantity
        dcc = parseFloat(dcc)
        dcc+=parseFloat(parseFloat(qty)/parseFloat(value))
        dcc = dcc.toFixed(3)
        dcc = parseFloat(dcc)

        const xcv = {
            method:'PUT',
            url:'https://growwmore.herokuapp.com/companygoldapi/',
            data:{
                'id':bnm.id,
                'quantity':dcc
            }
        };
        var bhj = await axios.request(xcv)
        bhj = bhj.data

        setAskd(false)
        setMon((parseFloat(qty)).toFixed(3))
        setVfm((parseFloat(parseFloat(qty)/(parseFloat(value)))).toFixed(3))
        setBalance(plk)
        setAvailableshares(dcc)
        setBoughtshares((prevNo)=>{
            return (parseFloat(parseFloat(prevNo)-(parseFloat(qty)/parseFloat(value)))).toFixed(3)
        })
        setTotalinvest((prevNo)=>{
            return (parseFloat(parseFloat(prevNo)-parseFloat(qty))).toFixed(3)
        })
        setTotalasset(()=>{
            return (parseFloat(veryvery*parseFloat(value))).toFixed(3)
        })
    }
    return (
        <div>
            <Container>
                <div style={{padding:20}}>
                <img style={{height:40}} src="https://assets-netstorage.groww.in/website-assets/prod/1.6.2/build/client/images/logo-dark-groww.83f43714.svg" alt="Logo of Groww" />
                <Button variant="outlined" style={{marginTop:-25,marginLeft:20,border:"none",fontSize:20,color:"red"}}>Explore</Button>
                <Button variant="outlined" style={{marginTop:-25,marginLeft:10,border:"none"}}><Link style={{textDecoration:"none"}} to="/investment">Investments</Link></Button>
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
                    <Button style={{border:"none",marginRight:20}} ><Link style={{textDecoration:"none",color:"red",fontSize:20}} to="/gold">Gold</Link></Button>
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
                <div>
            <Typography variant="h5" style={{marginTop:20,marginBottom:20}}><b>Gold's Performance</b></Typography>
            <Paper style={{width:800,height:500,background:"#f0f0f0"}}>
                <div style={{padding:10,marginLeft:15}}>
                    <Paper style={{width:750,height:400}}>
                        <div style={{textAlign:"center"}}>
                        <ClipLoader loading={se}></ClipLoader>
                        </div>
                        {se===false && <Line data={klpd}/>}
                    </Paper>
                </div>
                <div style={{textAlign:"center",marginTop:10}}>
                <ButtonGroup>
                    <Button id='1' onClick={()=>{
                        doit(1)
                        setSe(true)
                        setDay(1)
                    }}>1 Day</Button>
                    <Button id='2' onClick={()=>{
                        doit(2)
                        setSe(true)
                        setDay(5)
                    }}>5 Days</Button>
                    <Button id='3' onClick={()=>{
                        doit(3)
                        setSe(true)
                        setDay(10)
                    }}>10 Days</Button>
                    <Button id='4' onClick={()=>{
                        doit(4)
                        setSe(true)
                        setDay(15)
                    }}>15 Days</Button>
                    <Button id='5' onClick={()=>{
                        doit(5)
                        setSe(true)
                        setDay(20)
                    }}>20 Days</Button>
                    <Button id='6' onClick={()=>{
                        doit(6)
                        setSe(true)
                        setDay(40)
                    }}>40 Days</Button>
                    <Button id='7' onClick={()=>{
                        doit(7)
                        setSe(true)
                        setDay(100)
                    }}>100 Days</Button>
                </ButtonGroup>
                </div>
            </Paper>
            <div>
                <Modal isOpen={bhina} style={{overlay:{backgroundColor:"#f0f0f0",position: 'fixed',top: 0,left: 0,right: 0,bottom: 0},content: {position: 'absolute',top: '30px',left: '30px',right: '30px',bottom: '30px'}}}>
                        <div style={{padding:40,width:500,marginLeft:"auto",marginRight:"auto"}}>
                            <Paper>
                                <ClipLoader loading={askd}></ClipLoader>
                                {askd===false && <Typography variant="h4" color="primary" style={{textAlign:"center",marginBottom:10}}>Transaction Successful</Typography>}
                                {askd===false && <Divider/>}
                                {askd===false && <Typography variant="body1" color="textSecondary" style={{marginTop:10,marginLeft:10}}>Name of the Company:</Typography>}
                                {askd===false && <Typography variant="body1" style={{marginLeft:400,marginTop:-25}}>Muthoot Gold</Typography>}
                                {askd===false && <Typography variant="body1" color="textSecondary" style={{marginTop:10,marginLeft:10}}>Number of NAV bought:</Typography>}
                                {askd===false && <Typography variant="body1" style={{marginLeft:400,marginTop:-25}}>{vfm}</Typography>}
                                {askd===false && <Typography variant="body1" color="textSecondary" style={{marginTop:10,marginLeft:10}}>Current Value per NAV:</Typography>}
                                {askd===false && <Typography variant="body1" style={{marginLeft:400,marginTop:-25}}>${value}</Typography>}
                                {askd===false && <Typography variant="body1" color="textSecondary" style={{marginTop:10,marginLeft:10}}>Money invested:</Typography>}
                                {askd===false && <Typography variant="body1" style={{marginLeft:400,marginTop:-25}}>${mon}</Typography>}
                                {askd===false && <Typography variant="body1" color="textSecondary" style={{marginTop:10,marginLeft:10}}>Wallet Balance:</Typography>}
                                {askd===false && <Typography variant="body1" style={{marginLeft:400,marginTop:-25}}>${balance}</Typography>}
                                {askd===false && <div style={{textAlign:"center"}}>
                                    <Button variant="contained" style={{background:"green",color:'white',marginTop:20,marginBottom:20}} onClick={()=>{
                                        setBhina(false)
                                        history.push("/investment")
                                    }}>Please Click here to go back</Button>
                                </div>}
                            </Paper>
                        </div>
                </Modal>
            </div>

            {/* Sell Modal */}
            <div>
                <Modal isOpen={shina} style={{overlay:{backgroundColor:"#f0f0f0",position: 'fixed',top: 0,left: 0,right: 0,bottom: 0},content: {position: 'absolute',top: '30px',left: '30px',right: '30px',bottom: '30px'}}}>
                        <div style={{padding:40,width:500,marginLeft:"auto",marginRight:"auto"}}>
                            <Paper>
                                <ClipLoader loading={askd}></ClipLoader>
                                {askd===false && <Typography variant="h4" color="primary" style={{textAlign:"center",marginBottom:10}}>Transaction Successful</Typography>}
                                {askd===false && <Divider/>}
                                {askd===false && <Typography variant="body1" color="textSecondary" style={{marginTop:10,marginLeft:10}}>Name of the Company:</Typography>}
                                {askd===false && <Typography variant="body1" style={{marginLeft:400,marginTop:-25}}>Muthoot Gold</Typography>}
                                {askd===false && <Typography variant="body1" color="textSecondary" style={{marginTop:10,marginLeft:10}}>Number of NAV sold:</Typography>}
                                {askd===false && <Typography variant="body1" style={{marginLeft:400,marginTop:-25}}>{vfm}</Typography>}
                                {askd===false && <Typography variant="body1" color="textSecondary" style={{marginTop:10,marginLeft:10}}>Current Value per NAV:</Typography>}
                                {askd===false && <Typography variant="body1" style={{marginLeft:400,marginTop:-25}}>${value}</Typography>}
                                {askd===false && <Typography variant="body1" color="textSecondary" style={{marginTop:10,marginLeft:10}}>Money got:</Typography>}
                                {askd===false && <Typography variant="body1" style={{marginLeft:400,marginTop:-25}}>${mon}</Typography>}
                                {askd===false && <Typography variant="body1" color="textSecondary" style={{marginTop:10,marginLeft:10}}>Wallet Balance:</Typography>}
                                {askd===false && <Typography variant="body1" style={{marginLeft:400,marginTop:-25}}>${balance}</Typography>}
                                {askd===false && <div style={{textAlign:"center"}}>
                                    <Button variant="contained" style={{background:"green",color:'white',marginTop:20,marginBottom:20}} onClick={()=>{
                                        setShina(false)
                                        history.push("/investment")
                                    }}>Please Click here to go back</Button>
                                </div>}
                            </Paper>
                        </div>
                </Modal>
            </div>
            <Paper style={{width:300,marginLeft:200,marginTop:20}} id="golle">
                    <div style={{padding:10}}>
                        <ClipLoader loading={askd}></ClipLoader>
                        <RefreshIcon onClick={()=>{
                            setAskd(true)
                            kes()
                            }} style={{float:"right"}}/>
                        {askd===false && <Typography variant="h5" color="primary" style={{textAlign:"center"}}>Muthoot Gold</Typography>}
                        {askd===false && <Divider></Divider>}
                        <div style={{marginLeft:80}}>
                        {askd===false && <Typography variant="body1" id='100' style={{textAlign:"left"}}>__</Typography>}
                        {askd===false && <Typography variant="body1" id='101' style={{textAlign:"left"}}>__</Typography>}
                        </div>
                    </div>
            </Paper>
                <Paper style={{marginTop:10,background:"#f0f0f0",width:400,float:"right",marginTop:-620}}>
                        <div style={{padding:10}}>
                            <Paper id="nameu">
                            <ClipLoader loading={askd}></ClipLoader>
                            {askd===false && <Typography variant="body1" style={{marginTop:0,marginLeft:10}}>Market Price:</Typography>}
                            {askd===false && <Typography variant="body1" style={{marginTop:-22,marginLeft:260}} id="namename">___</Typography>}
                            {askd===false && <Typography variant="body1" style={{marginTop:20,marginLeft:10}}>Total Available:</Typography>}
                            {askd===false && <Typography variant="body1" style={{marginTop:-22,marginLeft:260}}>{availableshares}g</Typography>}
                            {askd===false && <Typography variant='body1' style={{marginTop:20,marginLeft:10}}>Total Invested in Gold:</Typography>}
                            {askd===false && <Typography variant='body1' style={{marginLeft:260,marginTop:-23}}>${totalinvest}</Typography>}
                            {askd===false && <Typography variant="body1" style={{marginLeft:10,marginTop:20}}>Total Gold Owned:</Typography>}
                            {askd===false && <Typography variant='body1' style={{marginLeft:260,marginTop:-23}}>{boughtshares}g</Typography>}
                            {askd===false && <Typography variant='body1' style={{marginTop:20,marginLeft:10}}>Available Balance:</Typography>}
                            {askd===false && <Typography variant='body1' style={{marginLeft:260,marginTop:-23}}>${balance}</Typography>}
                            {askd===false &&  maxshares!==0 &&  <Typography variant="body1" style={{marginLeft:10,marginTop:20}}>Buy gold worth:</Typography>}
                                            {/* {askd===false && <Typography variant="body1" style={{marginLeft:270,marginTop:-25}}>$1000</Typography>} */}
                                            <div style={{padding:10}}>
                                            {askd===false && maxshares!==0 && <TextField variant="outlined" type="number" inputRef={buyRef} style={{marginLeft:"auto",width:"100%",marginTop:5,background:"whitesmoke"}} label="Input number"></TextField>}
                                            </div>
                                            <div style={{textAlign:"center",marginTop:5}}>
                                            {askd===false && maxshares!==0 &&  <Button variant="contained" onClick={()=>buyit()} style={{background:"green",color:"white",marginRight:5,marginBottom:5}}>Buy Gold</Button>}
                                            </div>
                                            <Divider/>
           {/*here for hidden things */}    <div>
                                                {askd===false && boughtshares!==0.000 &&  <Typography variant="body1" style={{marginLeft:10,marginTop:20}}>Sell gold worth:</Typography>}
                                                <div style={{padding:10}}>
                                                    {askd===false && boughtshares!==0.000 && <TextField variant="outlined" type="number" inputRef={sellRef} style={{marginLeft:"auto",width:"100%",marginTop:5,background:"whitesmoke"}} label="Input number"></TextField>}
                                                </div>
                                                <div style={{textAlign:"center",marginTop:5}}>
                                                {askd===false && boughtshares!==0.000 && <Button variant="contained" onClick={()=>sellit()} style={{background:"green",color:"white",marginLeft:5,marginBottom:5}}>Sell Gold</Button>}
                                                </div>
                                            </div>
                            </Paper>
                        </div>
                </Paper>
        </div>
            </Container>
        </div>
    )
}

export default Gold
