import ReactDOM from 'react-dom';
import {useState,useEffect,useRef} from "react";
import {Button,TextField,Container,ButtonGroup,Typography,Grid,Paper} from "@material-ui/core"

import RefreshIcon from '@material-ui/icons/Refresh';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

import {useAuth} from "../contexts/AuthContext";

//key::: LS16XJ6XSE895VQE
import {Fab} from "@material-ui/core"
import {makeStyles} from "@material-ui/core"
import {Divider} from "@material-ui/core"

import {ClipLoader} from "react-spinners"
import {Line} from "react-chartjs-2";

import Modal from "react-modal"

import {Link,useHistory} from "react-router-dom";
import axios from "axios"
import { AirportShuttleTwoTone } from '@material-ui/icons';

const useStyles = makeStyles({
  fatt:{
    background:"#80deea",
    color:"black"
  }
})

//array of companies for data retrieval
const symb=[
        {
            key:1,
            val:"FB",
            name:"FACEBOOK"
        },
        {
            key:2,
            val:"MSFT",
            name:"MICROSOFT"
        },
        {
            key:3,
            val:"AMZN",
            name:"AMAZON"
        },
        {
            key:4,
            val:'TSLA',
            name:"TESLA"
        }
    ]
const symbtg=[
        {
            key:1,
            val:"GOOGL",
            name:"Google"
        },
        {
            key:2,
            val:"AAPL",
            name:"Apple"
        },
        {
            key:3,
            val:"BRK.A",
            name:"B. Hathaway"
        },
        {
            key:4,
            val:'NFLX',
            name:"Netflix"
        }
    ]


function Stocks() {
    const [data,setData]  = useState({dat:"This is secy"});
    const [charu,setCharu] = useState({x:[1,2,3,4],y:[1,2,3,4]})
    const [va,setVa] = useState(true)
    const [kal,setKal] = useState(true)
    const [day,setDay] = useState(15);
    const [mod,setMod] = useState(false)
    const [abhi,setAbhi] = useState({x:[1,2,3,4],y:[1,2,3,4]})
    const [askd,setAskd] = useState(true)
    const [value,setValue] = useState(0)
    const [availableshares,setAvailableshares] = useState(0)
    const [maxshares,setMaxshares] = useState(0)
    const [balance,setBalance] = useState(0)
    const [boughtshares,setBoughtshares] = useState(0)
    const [totalinvest,setTotalinvest] = useState(0)
    const [ret,setRet] = useState(0)
    const [totalasset,setTotalasset] = useState(0)
    const [id,setId] = useState(0);
    const [selectedcompany,setSelectedcompany] = useState('')
    const [open,setOpen] = useState(false)


    const classes = useStyles();
    const history = useHistory();

    const buyRef = useRef();
    const sellRef = useRef();

    const [bhina,setBhina] = useState(false)
    const [shina,setShina] = useState(false)
    const [mon,setMon] = useState(0)
    const [vfm,setVfm] = useState(0)
    const [dfgh,setDfgh] = useState(false)
    const [future,setFuture] = useState(false)
    const [ipo,setIpo] = useState(false)
    

    const {currentUser} = useAuth();

    useEffect(()=>{
        getu()
        fetu(day)
        doit(4)
    },[])
    useEffect(()=>{
        fetu(day)
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
    async function zeb(id,name)
    {   
        document.getElementById("yesthis").style.background="white"
        document.getElementById("maybethis").style.background="white"
        const options={
            method:'GET',
            url:`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${id}&apikey=LS16XJ6XSE895VQE`
        };
        var teju = await axios.request(options)
        teju = teju.data
        var x=[],y=[];
        var co=0;
        for(var key in teju['Time Series (Daily)'])
        {
            x.push(key);
            y.push(teju['Time Series (Daily)'][key]['1. open'])
            co++;
            if(co===40)
            {
                break;
            }
        }
        var rx=[],ry=[];
        var l=x.length
        var one=y[0];
        var two = y[1];
        one = parseFloat(one)
        two = parseFloat(two)
        one+=0.00;
        two+=0.00;
        var diff = one-two;
        var per = diff/one*100;
        diff = diff.toFixed(2);
        per = per.toFixed(2);
        one = one.toFixed(3)
        for(var i=l-1;i>=0;i--)
        {
            rx.push(x[i]);
            ry.push(y[i]);
        }
        setAbhi({x:rx,y:ry})

        const opt={
            method:'GET',
            url:"https://growwmore.herokuapp.com/companystocksapi/"
        };
        var rishi = await axios.request(opt)
        rishi = rishi.data
        var ab = rishi.filter((each)=>{
            const {Name} = each
            if(Name===name)
            {
                return each
            }
        })

        const olp = {
            method:'GET',
            url:"https://growwmore.herokuapp.com/userapi/"
        };
        var samb = await axios.request(olp)
        samb = samb.data
        var gb = samb.filter((each)=>{
            const {useremail} = each
            if(useremail==currentUser.email)
            {
                return each
            }
        })

        var aji = (gb[0].balance)/one
        if(aji>ab[0].quantity)
        {
            aji=ab[0].quantity
        }
        aji = parseInt(aji)

        const kption = {
            method:"GET",
            url:"https://growwmore.herokuapp.com/stocksapi/"
        };
        var brai = await axios.request(kption)
        brai = brai.data
        var bnrai = brai.filter((each)=>{
            const {company,user} = each
            if(name==company && user==gb[0].id)
            {
                return each
            }
        })
        var pnb,sbi,boi,citi;
        if(bnrai.length>0)
        {

        bnrai = bnrai[0]
        pnb = bnrai.quantity*bnrai.prices
        sbi = bnrai.quantity*one
        boi = sbi-pnb
        pnb = pnb.toFixed(3)
        sbi = sbi.toFixed(3)
        boi = boi.toFixed(3)
        citi=bnrai.quantity
        }
        else
        {
            pnb=sbi=boi=citi=0
        }
        setBoughtshares(citi)
        setTotalinvest(pnb)
        setTotalasset(sbi)
        setRet(boi)
        setValue(one)
        setAvailableshares(ab[0].quantity)
        setBalance(gb[0].balance)
        setMaxshares(aji)
        setSelectedcompany(name)

        setAskd(false)
        document.getElementById("nameu").innerHTML='<b>' +name +'</b>'
        document.getElementById("namename").innerHTML='<b>'+name+'</b>'
        if(diff<0.00)
        {
            document.getElementById("heretofit").innerHTML = '<b>'+'$'+one +'</b>'
            document.getElementById("heretofit").style.color="red"
            document.getElementById("therealsotofit").innerHTML = '<b>'+ diff + '('+ per +' %)' +'</b>'
            document.getElementById("herealsotofit").innerHTML = '<b>'+'$' + one +'</b>'
            document.getElementById("herealsotofit").style.color="red"
            document.getElementById("therealsotofit").style.color="red"
            document.getElementById("maybethis").style.background="#ef9a9a"
            document.getElementById("yesthis").style.background="#ef9a9a"
        }
        else
        {
            document.getElementById("heretofit").innerHTML = '<b>'+'$'+ one +'</b>'
            document.getElementById("heretofit").style.color="green"
            document.getElementById("therealsotofit").innerHTML = '<b>'+ '+'+diff + '('+ '+'+ per +' %)' +'</b>'
            document.getElementById("herealsotofit").innerHTML = '<b>'+'$' + one +'</b>'
            document.getElementById("herealsotofit").style.color="green"
            document.getElementById("therealsotofit").style.color="green"
            document.getElementById("maybethis").style.background="#b2ff59"
            document.getElementById("yesthis").style.background="#b2ff59"
        }
    }
    const fuckit = (id) =>{
        for(var i=1000;i<=1008;i++)
        {
            if(i===id)
            {
                document.getElementById(i).style.background="green";
                document.getElementById(i).style.color="white"
            }
            else
            {
                document.getElementById(i).style.background="white";
                document.getElementById(i).style.color="black"
            }
        }
    }
    const lkdp ={
        labels:abhi.x,
        datasets:[
            {
                label:"Company",
                data:abhi.y,
                backgroundColor:"green"
            }
        ]
    }
    async function getu(){
        const options = {
            method: 'GET',
            url: 'https://quotes15.p.rapidapi.com/quotes/random/',
            headers: {
                'x-rapidapi-key': '2235b09679msh1eff4b8046864bcp143b10jsn6462ceb32b2c',
                'x-rapidapi-host': 'quotes15.p.rapidapi.com'
                    }
        };
        const teju = await axios.request(options)
        setData({name:teju.data.originator.name,quote:teju.data.content})
        setVa(false)
        
    }
    async function fetu(day){
        const options = {
            method:'GET',
            url:'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo',  
            
        };
        var teju = await axios.request(options)
        teju = teju.data
        var xvalues = []
        var yvalues = []
        // var name = teju['Meta Data']['2. Symbol']
        var co=0;
        for(var key in teju['Time Series (Daily)'])
        {
            xvalues.push(key);
            yvalues.push(teju['Time Series (Daily)'][key]['1. open'])
            co++;
            if(co===day)
            {
                break;
            }
        }
        var rx=[]
        var ry=[]
        var l= xvalues.length;
        for(var i=l-1;i>=0;i--)
        {
            rx.push(xvalues[i]);
            ry.push(yvalues[i]);
        }
        setCharu({x:rx,y:ry});
        setKal(false)    
    }
    async function setu(tk,name){
        const options={
            method:'GET',
            url:`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${tk}&apikey=LS16XJ6XSE895VQE`
        };
        var teju = await axios.request(options)
        teju = teju.data
        var temp
        var clo
        for(var key in teju['Time Series (Daily)'])
        {
            temp = teju['Time Series (Daily)'][key]['1. open']
            clo = teju['Time Series (Daily)'][key]['4. close']
            break;
        }
        var ke = parseFloat(temp)
        ke+=0.00
        var me = parseFloat(clo)
        me+=0.00
        var diff = ke-me;
        var per = diff/ke * 100;
        per = per.toFixed(2)
        diff = diff.toFixed(2)
        document.getElementById(tk).innerHTML='<b>'+ke+'</b>'
        document.getElementById(name).innerHTML='<b>'+diff+'('+per+'%'+')' +'</b>'
        if(diff<0.00)
        {
            document.getElementById(tk).style.color="red"
            document.getElementById(name).style.color="red"
            document.getElementById(tk+name).style.background="#ef9a9a"
        }
        else
        {   
            document.getElementById(name).innerHTML='<b>' + '+'+ diff +'('+per+'%'+')' + '</b>'
            document.getElementById(tk).style.color="green"
            document.getElementById(name).style.color="green"
            document.getElementById(tk+name).style.background="#b2ff59"

        }


    }
    const klpd={
        labels:charu.x,
        datasets:[
            {
                label:day,
                data:charu.y,
                backgroundColor:"#69f0ae"
            }
        ]
    }
    const doit = (ke) =>{
        for(var k=1;k<=5;k++)
        {
            if(k==ke)
            {
                document.getElementById(k).style.background="green"
                document.getElementById(k).style.color="white"
            }
            else
            {
                document.getElementById(k).style.background="white"
                document.getElementById(k).style.color="black"
            }
        }
    }
    async function buyit(){
        setBhina(true)
        setAskd(false)
        var qty = buyRef.current.value
        qty = parseInt(qty)
        if(qty>maxshares)
        {
            qty = maxshares
            buyRef.current.value=qty
        }
        const options = {
            method:"GET",
            url:"https://growwmore.herokuapp.com/userapi/"
        };
        var data = await axios.request(options)
        data = data.data
        var temp = data.filter((each)=>{
            const {useremail} = each
            if(useremail===currentUser.email)
            {
                return each
            }
        })
        temp= temp[0]
        const opt={
            method:'GET',
            url:'https://growwmore.herokuapp.com/stocksapi/'
        };
        var kemp=await axios.request(opt)
        kemp = kemp.data
        var kunal = kemp.filter((each)=>{
            const {user} = each
            if(user===temp.id)
            {
                return each
            }
        })
        var kp = kunal.filter((each)=>{
            const {company} = each
            if(company===selectedcompany)
            {
                return each
            }
        })

        var pkl = parseFloat(balance)
        pkl-=(parseFloat(value)*parseInt(qty))
        pkl = pkl.toFixed(3)
        pkl = parseFloat(pkl)

        var bnm,fgh,vfg,pgh,wer
        var btqty=0,ghj=0

        if(kp.length>0)
        {   
            btqty = parseInt(boughtshares)+parseInt(qty)
            ghj = parseFloat(parseFloat(totalinvest) + (parseInt(qty)*parseFloat(value)))/parseFloat(btqty)
            ghj = parseFloat(ghj)
            ghj = ghj.toFixed(3)
            const olp ={
                method:"PUT",
                url:"https://growwmore.herokuapp.com/stocksapi/",
                data:{
                    'id':kp[0].id,
                    'user':temp.id,
                    'company':selectedcompany,
                    'quantity':btqty,
                    'prices':ghj
                }
            };
            const resp = await axios.request(olp)
            
            

            const alpu ={
                method:'PUT',
                url:'https://growwmore.herokuapp.com/userapi/',
                data:{
                    'id':temp.id,
                    'balance':pkl
                }
            };
            bnm = await axios.request(alpu)
            bnm = bnm.data
        

            
            const rish = {
                method:'GET',
                url:'https://growwmore.herokuapp.com/companystocksapi/',
            };
            fgh = await axios.request(rish)
            fgh = fgh.data
            vfg = fgh.filter((each)=>{
                const {Name} = each
                if(Name===selectedcompany)
                {
                    return each
                }
            })
            vfg = vfg[0];
            pgh = vfg.quantity
            pgh = parseInt(pgh)
            pgh -= parseInt(qty)
            pgh = parseInt(pgh)



            const pj = {
                method:'PUT',
                url:'https://growwmore.herokuapp.com/companystocksapi/',
                data:{
                    'id':vfg.id,
                    'quantity':pgh
                }
            };
            wer = await axios.request(pj)
            wer = wer.data
        }   
        else
        {   
            btqty = qty
            btqty = parseInt(btqty)
            const olp ={
                method:'POST',
                url:'https://growwmore.herokuapp.com/stocksapi/',
                data:{
                    'user':temp.id,
                    'company':selectedcompany,
                    'quantity':btqty,
                    'prices':value
                }
            }
            var resp = await axios.request(olp)
            resp = resp.data


            const alpu={
                method:'PUT',
                url:'https://growwmore.herokuapp.com/userapi/',
                data:{
                    'id':temp.id,
                    'balance':pkl
                }
            };
            bnm = await axios.request(alpu)
            bnm = bnm.data

            const rish={
                method:'GET',
                url:'https://growwmore.herokuapp.com/companystocksapi/',
            };
            fgh = await axios.request(rish)
            fgh = fgh.data
            vfg = fgh.filter((each)=>{
                const {Name} = each
                if(Name===selectedcompany)
                {
                    return each
                }
            })
            vfg= vfg[0]
            pgh = vfg.quantity
            pgh = parseInt(pgh)
            pgh-=parseInt(qty)
            pgh = parseInt(pgh)

            const pj = {
                method:'PUT',
                url:'https://growwmore.herokuapp.com/companystocksapi/',
                data:{
                    'id':vfg.id,
                    'quantity':pgh
                }
            };
            wer = await axios.request(pj)
            wer = wer.data
        }
        // buyRef.current.value=""
        setAskd(false)
        setVfm(qty)
        setMon((parseFloat(parseInt(qty)*parseFloat(value))).toFixed(3))
        setAvailableshares(parseInt(pgh))
        setId(temp.id)
        setBoughtshares(btqty)
        setTotalinvest((parseFloat(parseFloat(totalinvest) + (parseInt(qty)*parseFloat(value)))).toFixed(3))
        setTotalasset((parseInt(btqty)*parseFloat(value)).toFixed(3))
        setRet((parseFloat(totalasset)-parseFloat(totalinvest)).toFixed(3))
        setBalance(pkl)
        setMaxshares((prevNo)=>{
            return parseInt(prevNo)-qty
        })
        // buyRef.current.value=" "
    }
    async function sellit(){
        setShina(true)
        setAskd(true)
        var qty = sellRef.current.value
        if(qty>boughtshares)
        {
            qty=boughtshares
        }
        qty = parseInt(qty)


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
        plk += (parseInt(qty)*parseFloat(value))
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
            url:'https://growwmore.herokuapp.com/stocksapi/'
        };

        var pjk = await axios.request(omg)
        pjk = pjk.data

        var ghj = pjk.filter((each)=>{
            const {user,company} = each
            if(user===tej.id && company===selectedcompany)
            {
                return each
            }
        })
        ghj = ghj[0]

        var om

        if(qty<ghj.quantity)
        {   
            var bgt = parseInt(ghj.quantity)
            bgt -= parseInt(qty)
            bgt = parseInt(bgt)
            om ={
                method:'PUT',
                url:'https://growwmore.herokuapp.com/stocksapi/',
                data:{
                    'id':ghj.id,
                    'quantity':bgt
                }
            };
        }
        else
        {
            om ={
                method:'DELETE',
                url:'https://growwmore.herokuapp.com/stocksapi/',
                data:{
                    'id':ghj.id
                }
            };
        }
        var th = await axios.request(om)
        th = th.data



        const vm ={
            method:'GET',
            url:'https://growwmore.herokuapp.com/companystocksapi/'
        };
        var dfg = await axios.request(vm)
        dfg = dfg.data
        var bnm = dfg.filter((each)=>{
            const {Name} = each
            if(Name===selectedcompany)
            {
                return each
            }
        })
        bnm = bnm[0]
        var dcc = bnm.quantity
        dcc = parseInt(dcc)
        dcc+=parseInt(qty)

        const xcv = {
            method:'PUT',
            url:'https://growwmore.herokuapp.com/companystocksapi/',
            data:{
                'id':bnm.id,
                'quantity':dcc
            }
        };
        var bhj = await axios.request(xcv)
        bhj = bhj.data
        setAskd(false)
        setVfm(qty)
        setMon((parseFloat(parseInt(qty)*parseFloat(value))).toFixed(3))
        setBalance(plk)
        setAvailableshares(dcc)
        setBoughtshares((prevNo)=>{
            return prevNo-qty
        })
        setTotalinvest((prevNo)=>{
            return (parseFloat(parseFloat(prevNo)-parseFloat(qty*parseFloat(ghj.prices)))).toFixed(3)
        })
        setTotalasset((prevNo)=>{
            return (parseFloat(parseFloat(prevNo)-(parseInt(qty)*parseFloat(value)))).toFixed(3)
        })
        setRet(parseFloat(totalasset-totalinvest))
        setMaxshares(parseInt(parseFloat(plk)/parseFloat(value)))
    }
  return (
    <div>
         <Container>
           <div style={{padding:20}}>
            <img style={{height:40}} src="https://assets-netstorage.groww.in/website-assets/prod/1.6.2/build/client/images/logo-dark-groww.83f43714.svg" alt="Logo of Groww" />
            <Button variant="outlined" style={{marginTop:-25,marginLeft:20,border:"none",fontSize:20,color:"red"}}>Explore</Button>
            <Button variant="outlined" style={{marginTop:-25,marginLeft:10,border:"none"}}><Link style={{textDecoration:"none"}} to="/investment">Investments</Link></Button>
            <TextField variant="outlined" color="primary" style={{width:400,height:20,marginLeft:30,marginTop:-10}} label="Search Stock and Mutual Fund"></TextField>
            {/* <NotificationsIcon fontSize="large" color="primary" style={{marginLeft:40,color:"black"}}/> */}
            <AccountBalanceWalletIcon fontSize="large" color="primary" style={{marginLeft:100,color:"black"}} onClick={()=>video()}/>
            {/* <ShoppingCartIcon fontSize="large" color="primary" style={{marginLeft:40,color:"black"}}/> */}
            <Fab style={{marginLeft:100,marginTop:-20}} className={classes.fatt} onClick={()=>history.push("/")}>
                    <AccountCircleIcon />
            </Fab>
           </div>
          <ButtonGroup style={{border:"none"}}>
            <Button style={{border:"none",marginRight:20}} ><Link style={{textDecoration:"none",color:"red",fontSize:20}} to="/stocks">Stocks</Link></Button>
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
          <div>
            <Typography variant="h6">Quote:</Typography>
            <div style={{textAlign:"center"}}>
            <ClipLoader loading={va}/>
            </div>
            <Typography><i>{data.quote}</i></Typography>
            <Typography variant="body1" color="textSecondary">{data.name}</Typography>
            <Typography variant="body1" color="textSecondary" style={{marginTop:30}}>Market Closes at 3:30 PM</Typography>
            <Typography variant="h5" style={{marginTop:10}}><b>Index</b></Typography>
            <Grid container spacing={5}>
                <Grid item>
                    <Paper style={{height:500,width:800,backgroundColor:"#f1f1f1"}}>
                        <Typography variant="h5" color="secondary" style={{textAlign:"center"}}>Nifty</Typography>
                        <div style={{padding:5}}>
                            <Paper style={{width:790,height:400}}>
                                <div style={{textAlign:"center"}}>
                                <ClipLoader style={{marginLeft:"auto",marginRight:"auto"}} loading={kal} />
                                </div>
                                {kal===false && <Line data={klpd} />}
                            </Paper>
                        </div>
                        <div style={{textAlign:"center"}}>
                        <ButtonGroup style={{marginTop:20}}>
                            <Button id='1' onClick={()=>{
                                doit(1)
                                setDay(1)
                                setKal(true)
                            }}>1 Day</Button>
                            <Button id='2' onClick={()=>{
                                doit(2)
                                setDay(5)
                                setKal(true)
                            }}>5 Days</Button>
                            <Button id='3' onClick={()=>{
                                doit(3)
                                setDay(10)
                                setKal(true)
                            }}>10 Days</Button>
                            <Button id='4'  onClick={()=>{
                                doit(4)
                                setDay(15)
                                setKal(true)
                            }}>15 Days</Button>
                            <Button id='5' onClick={()=>{
                                doit(5)
                                setDay(20)
                                setKal(true)
                            }}>20 Days</Button>
                        </ButtonGroup>
                        </div>
                    </Paper>
                </Grid>
                <Grid item>
                <Paper style={{height:270,width:370,background:"#f0f0f0"}}>
                    <div style={{padding:20,textAlign:"center"}}>
                        <Button style={{background:"#b2ff59",color:'blue',width:250,fontSize:"large",marginBottom:10}} variant='contained' onClick={()=>{
                            setMod(true)
                            setAskd(true)
                        }}>Explore Stocks Available</Button>
                        <Divider></Divider>
                        <Button style={{fontSize:"large",width:250,marginBottom:10,background:"#b2ff59",color:"blue",marginTop:10}} onClick={()=>setFuture(true)} variant='contained' >Future & Options</Button>
                        <Dialog open={future}>
                          <ClipLoader loading={dfgh}></ClipLoader>
                          <div style={{padding:40}}>
                          <Typography variant="h5" color='primary' style={{marginTop:20}}>Coming Soon</Typography>
                          <Typography variant='h5' color="secondary" style={{marginTop:-30,marginLeft:240}}>Stay Tuned</Typography>
                          <div style={{textAlign:"center",marginTop:20,marginBottom:10}}>
                          <Button  variant="contained" color='primary' onClick={()=>setFuture(false)}>Close</Button>
                          </div>
                          </div>
                        </Dialog>
                        <Dialog open={ipo}>
                          <ClipLoader loading={dfgh}></ClipLoader>
                          <div style={{padding:40}}>
                          <Typography variant="h5" color='primary' style={{marginTop:20}}>Coming Soon</Typography>
                          <Typography variant='h5' color="secondary" style={{marginTop:-30,marginLeft:240}}>Stay Tuned</Typography>
                          <div style={{textAlign:"center",marginTop:20,marginBottom:10}}>
                          <Button  variant="contained" color='primary' onClick={()=>setIpo(false)}>Close</Button>
                          </div>
                          </div>
                        </Dialog>
                        <Divider></Divider>
                        <Button style={{fontSize:"large",width:250,marginTop:10,background:"#b2ff59",color:"blue",marginBottom:10}} onClick={()=>setIpo(true)} variant='contained' >Initial Public Offerings -IPO</Button>
                    </div>
                </Paper>
                </Grid>
            </Grid> 
            <Typography variant="h5" style={{marginTop:40,marginBottom:20}}><b>Stocks in News</b></Typography> 
            <Grid container spacing={5}>
                {
                    symb.map((each,index)=>{
                        if(each){
                        const {name,val} =each
                        return(
                            <Grid key={index} item>
                                <Paper style={{background:"#f0f0f0"}} id={val+name}>
                                    <div style={{padding:20,height:170,width:140}}>
                                        <img style={{height:30,width:30,border:"1px dashed red"}} src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/05/Target_Corporation_logo_vector.svg.png?auto=format&q=60&fit=max&w=930" alt="" />
                                        <RefreshIcon size="small" style={{float:"right"}} onClick={()=>setu(val,name)}/>
                                        <Typography variant="body1">{name}</Typography>
                                        <Divider></Divider>
                                        <br />
                                        $ <span style={{marginTop:20}} variant="body1" id={val}>__</span>
                                        <br />
                                        <span style={{marginTop:20}} variant="body1" id={name}>__</span>
                                        <br />
                                        <Button variant="contained" color="primary" style={{marginTop:20,marginLeft:24,marginRight:"auto",background:"green",fontSize:10}} onClick={()=>setu(val,name)}>View More</Button>                                        
                                    </div>
                                </Paper>
                            </Grid>
                        )
                        }
                    })
                }
            </Grid>  
            <div>
                <Modal isOpen={mod} onRequestClose={()=>{
                    setMod(false)
                    }} ariaHideApp={true}> 
                        <Typography color="secondary">Select a Company</Typography>
                        <ButtonGroup>
                            <Button id="1000" onClick={()=>{
                                zeb('MSFT','Microsoft')
                                setAskd(true)
                                fuckit(1000)
                                }}>Microsoft</Button>
                            <Button id="1001"  onClick={()=>{
                                zeb('FB','Facebook')
                                setAskd(true)
                                fuckit(1001)
                            }}>FaceBook</Button>
                            <Button id="1002"  onClick={()=>{
                                zeb('BRK.A','B. Hathaway')
                                setAskd(true)
                                fuckit(1002)
                            }}>B. Hathaway</Button>
                            <Button id="1003" onClick={()=>{
                                zeb('AAPL','Apple')
                                setAskd(true)
                                fuckit(1003)
                            }}>Apple</Button>
                            <Button id="1004"  onClick={()=>{
                                zeb('TSLA','Tesla')
                                setAskd(true)
                                fuckit(1004)
                            }}>Tesla</Button>
                            <Button id="1005"  onClick={()=>{
                                zeb('AMZN','Amazon')
                                setAskd(true)
                                fuckit(1005)
                            }}>Amazon</Button>
                            <Button id="1006"  onClick={()=>{
                                zeb('GOOGL','Google')
                                setAskd(true)
                                fuckit(1006)
                            }}>Google</Button>
                            <Button id="1007"  onClick={()=>{
                                zeb('NFLX','Netflix')
                                setAskd(true)
                                fuckit(1007)
                            }}>Netflix</Button>
                            <Button id="1008"  onClick={()=>{
                                zeb('IBM','IBM')
                                setAskd(true)
                                fuckit(1008)
                            }}>IBM</Button>
                        </ButtonGroup>       
                        <Grid container spacing={5}>
                            <Grid item>
                            <Paper style={{width:600,height:500,marginTop:20,background:"#f0f0f0"}}>
                                <div style={{padding:10}}>
                                <Paper>
                                <div style={{textAlign:"center"}}>
                                <ClipLoader loading={askd} ></ClipLoader>
                                </div>
                                {askd===false && <Line data={lkdp} />}
                                </Paper>
                                </div>
                                <div style={{padding:10,marginLeft:170}}>
                                    <Paper style={{width:200,height:170}} id="maybethis">
                                        <div style={{textAlign:"center"}}>
                                        <ClipLoader loading={askd}></ClipLoader>
                                        </div>
                                        {askd===false && <Typography variant="h6" style={{textAlign:"center"}} id='nameu'/>}
                                        <Divider></Divider>
                                        <div style={{textAlign:"center"}}>
                                        {/* <ClipLoader loading={askd}></ClipLoader> */}
                                        </div>
                                        {askd===false && <Typography variant="body1" id="herealsotofit" style={{marginLeft:20,marginTop:20}} />}
                                        {askd===false && <Typography variant="body1" id="therealsotofit" style={{marginLeft:20,marginTop:5}} />}
                                    </Paper>
                                </div>
                            </Paper>
                            </Grid>
                            <Grid item>
                                <Paper style={{marginTop:20,width:400,background:"#f0f0f0"}}>
                                    <div style={{padding:10}}>
                                        <Paper id="yesthis">
                                            {/* <Typography variant="h5" color="primary" style={{textAlign:"center"}}>Buy/Sell Shares</Typography> */}
                                            <div style={{textAlign:'center'}}>
                                            <ClipLoader loading={askd}></ClipLoader>
                                            </div>
                                            {askd===false && <Typography variant="h6" color="primary" id="namename" style={{textAlign:"center"}}>__</Typography> }
                                            {askd===false && <Typography variant="body1" style={{marginTop:15,marginLeft:10}}>Market Price:</Typography>}
                                            {askd===false && <Typography variant="body1" style={{marginTop:-25,marginLeft:270}} id="heretofit">__</Typography>}
                                            {askd===false && <Typography variant="body1" style={{marginLeft:10,marginTop:20}}>Available Shares:</Typography>}
                                            {askd===false && <Typography variant="body1" style={{marginLeft:270,marginTop:-25}}>{availableshares}</Typography>}
                                            {askd===false && <Typography variant="body1" style={{marginLeft:10,marginTop:20}}>Maximum Shares you can buy:</Typography>}
                                            {askd===false && <Typography variant="body1" style={{marginLeft:270,marginTop:-25}}>{maxshares}</Typography>}
                                            {askd===false &&  maxshares!==0 &&  <Typography variant="body1" style={{marginLeft:10,marginTop:20}}>Shares you want to buy:</Typography>}
                                            {/* {askd===false && <Typography variant="body1" style={{marginLeft:270,marginTop:-25}}>$1000</Typography>} */}
                                            <div style={{padding:10}}>
                                            {askd===false && maxshares!==0 && <TextField variant="outlined" type="number" inputRef={buyRef} style={{marginLeft:"auto",width:"100%",marginTop:5,background:"whitesmoke"}} label="Input number"></TextField>}
                                            </div>
                                            <div style={{textAlign:"center",marginTop:5}}>
                                            {askd===false && maxshares!==0 &&  <Button variant="contained" onClick={()=>buyit()} style={{background:"green",color:"white",marginRight:5,marginBottom:5}}>Buy Shares</Button>}
                                            </div>
                                            <Divider/>
           {/*here for hidden things */}    <div>
                                                {askd===false && boughtshares!==0 &&  <Typography variant="body1" style={{marginLeft:10,marginTop:20}}>Shares you want to sell:</Typography>}
                                                <div style={{padding:10}}>
                                                    {askd===false && boughtshares!==0 && <TextField variant="outlined" type="number" inputRef={sellRef} style={{marginLeft:"auto",width:"100%",marginTop:5,background:"whitesmoke"}} label="Input number"></TextField>}
                                                </div>
                                                <div style={{textAlign:"center",marginTop:5}}>
                                                {askd===false && boughtshares!==0 && <Button variant="contained" onClick={()=>sellit()} style={{background:"green",color:"white",marginLeft:5,marginBottom:5}}>Sell Shares</Button>}
                                                </div>
                                            </div>
                                        </Paper>
                                    </div>
                                </Paper>
                            </Grid>
                            <Grid item>
                                <Grid container direction="column">
                                    <Grid item>
                                        <Paper style={{background:"#f0f0f0",marginTop:20,width:300,height:200}}>
                                            <div style={{padding:10}}>
                                            <Paper>
                                            <Typography variant="h5" color="primary" style={{textAlign:"center"}}>
                                                Wallet Balance
                                            </Typography>
                                            <div style={{textAlign:"center"}}>
                                            <ClipLoader loading={askd}></ClipLoader>
                                            </div>
                                            {askd===false && <Typography variant="body1" style={{marginTop:20,marginLeft:10}}>Balance Available:</Typography>}
                                            {askd===false && <Typography variant="body1" style={{marginTop:-24,marginLeft:210}}>${balance}</Typography>}
                                            </Paper>
                                            </div>
                                        </Paper>
                                    </Grid>
                                    <Grid item>
                                        <Paper style={{background:"#f0f0f0",marginTop:20,width:300,height:300}}>
                                            <div style={{padding:10}}>
                                            <Paper>
                                            <Typography variant="h5" color="primary" style={{textAlign:"center"}}>
                                                Holdings 
                                            </Typography>
                                            <div style={{textAlign:"center"}}>
                                            <ClipLoader loading={askd}></ClipLoader>
                                            </div>
                                            {askd===false && <Typography variant="body1" style={{marginTop:20,marginLeft:10}}>Number of Shares:</Typography>}
                                            {askd===false && <Typography variant="body1" style={{marginTop:-24,marginLeft:190}}>{boughtshares}</Typography>}
                                            {askd===false && <Typography variant="body1" style={{marginTop:20,marginLeft:10}}>Total Invested Money:</Typography>}
                                            {askd===false && <Typography variant="body1" style={{marginTop:-24,marginLeft:190}}>${totalinvest}</Typography>}
                                            {askd===false && <Typography variant="body1" style={{marginTop:20,marginLeft:10}}>Returns:</Typography>}
                                            {askd===false && <Typography variant="body1" style={{marginTop:-24,marginLeft:190}}>${ret}</Typography>}
                                            {askd===false && <Typography variant="body1" style={{marginTop:20,marginLeft:10}}>Total Asset Value:</Typography>}
                                            {askd===false && <Typography variant="body1" style={{marginTop:-24,marginLeft:190}}>${totalasset}</Typography>}
                                            </Paper>
                                            </div>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>                 
                </Modal>
            </div>
            <div>
                <Modal isOpen={bhina} style={{overlay:{backgroundColor:"#f0f0f0",position: 'fixed',top: 0,left: 0,right: 0,bottom: 0},content: {position: 'absolute',top: '30px',left: '30px',right: '30px',bottom: '30px'}}}>
                        <div style={{padding:40,width:500,marginLeft:"auto",marginRight:"auto"}}>
                            <Paper>
                                <ClipLoader loading={askd}></ClipLoader>
                                {askd===false && <Typography variant="h4" color="primary" style={{textAlign:"center",marginBottom:10}}>Transaction Successful</Typography>}
                                {askd===false && <Divider/>}
                                {askd===false && <Typography variant="body1" color="textSecondary" style={{marginTop:10,marginLeft:10}}>Name of the Company:</Typography>}
                                {askd===false && <Typography variant="body1" style={{marginLeft:400,marginTop:-25}}>{selectedcompany}</Typography>}
                                {askd===false && <Typography variant="body1" color="textSecondary" style={{marginTop:10,marginLeft:10}}>Number of Shares bought:</Typography>}
                                {askd===false && <Typography variant="body1" style={{marginLeft:400,marginTop:-25}}>{vfm}</Typography>}
                                {askd===false && <Typography variant="body1" color="textSecondary" style={{marginTop:10,marginLeft:10}}>Current Value per Share:</Typography>}
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
                                {askd===false && <Typography variant="body1" style={{marginLeft:400,marginTop:-25}}>{selectedcompany}</Typography>}
                                {askd===false && <Typography variant="body1" color="textSecondary" style={{marginTop:10,marginLeft:10}}>Number of Shares sold:</Typography>}
                                {askd===false && <Typography variant="body1" style={{marginLeft:400,marginTop:-25}}>{vfm}</Typography>}
                                {askd===false && <Typography variant="body1" color="textSecondary" style={{marginTop:10,marginLeft:10}}>Current Value per Share:</Typography>}
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
            <Typography variant="h5" style={{marginTop:40,marginBottom:20}}><b>Top Gainers</b></Typography>
            <Grid container spacing={5}>
                {
                    symbtg.map((each,index)=>{
                        if(each){
                        const {name,val} =each
                        return(
                            <Grid key={index} item>
                                <Paper style={{background:"#f0f0f0"}} id={val+name}>
                                    <div style={{padding:20,height:170,width:140}}>
                                        <img style={{height:30,width:30,border:"1px dashed red"}} src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/05/Target_Corporation_logo_vector.svg.png?auto=format&q=60&fit=max&w=930" alt="" />
                                        <RefreshIcon size="small" style={{float:"right"}} onClick={()=>setu(val,name)}/>
                                        <Typography variant="body1">{name}</Typography>
                                        <Divider></Divider>
                                        <br />
                                        $ <span style={{marginTop:20}} variant="body1" id={val}>__</span>
                                        <br />
                                        <span style={{marginTop:20}} variant="body1" id={name}>__</span>
                                        <br />
                                        <Button variant="contained" style={{marginTop:20,marginLeft:24,marginRight:"auto",background:"green",fontSize:10,color:"white"}} onClick={()=>setu(val,name)}>View More</Button>
                                    </div>
                                </Paper>
                            </Grid>
                        )
                        }
                    })
                }
            </Grid>  
        </div>
         </Container>
    </div>
  )
}

export default Stocks
