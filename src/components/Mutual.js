import ReactDOM from 'react-dom';
import {Button,TextField,Container,ButtonGroup,Typography,Grid,Paper} from "@material-ui/core"
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Fab} from "@material-ui/core"
import {makeStyles} from "@material-ui/core"
import {Divider} from "@material-ui/core"
import {Link} from "react-router-dom";
import {ClipLoader} from "react-spinners"
import {Line} from "react-chartjs-2";
import RefreshIcon from '@material-ui/icons/Refresh';
import Modal from "react-modal";
import {useState,useEffect,useRef} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {useAuth} from "../contexts/AuthContext";

import Dialog from '@material-ui/core/Dialog';
import { SettingsInputSvideo } from '@material-ui/icons';
// import MuiDialogTitle from '@material-ui/core/DialogTitle';
// import MuiDialogContent from '@material-ui/core/DialogContent';
// import MuiDialogActions from '@material-ui/core/DialogActions';

const symb=[
    {
        id:1,
        name:"ICICI Prudential",
        code:'117619',
        link:"https://api.mfapi.in/mf/117619"
    },
    {
        id:2,
        name:"Axis Small Cap",
        code:'125354',
        link:"https://api.mfapi.in/mf/125354"
    },
    {
        id:3,
        name:"Tata Digital",
        code:'135800',
        link:"https://api.mfapi.in/mf/135800"
    },
    {
        id:4,
        name:"Parag Parikh",
        code:'122639',
        link:"https://api.mfapi.in/mf/122639"
    }
]

const useStyles = makeStyles({
  fatt:{
    background:"#80deea",
    color:"black"
  }
})

function Mutual() {
    const [data,setData] = useState({x:[1,2,3,4],y:[1,2,3,4]});
    const [kal,setKal] = useState(true)
    const [day,setDay] = useState(15)
    const [mod,setMod] = useState(false)
    const [askd,setAskd] = useState(true)
    const [abhi,setAbhi] = useState({x:[1,2,3,4],y:[1,2,3,4]})

    const [bhina,setBhina] = useState(false)
    const [shina,setShina] = useState(false)
    const [mon,setMon] = useState(0)
    const [vfm,setVfm] = useState(0)

    const [value,setValue] = useState(0)
    const [availableshares,setAvailableshares] = useState(0)
    const [maxshares,setMaxshares] = useState(0)
    const [balance,setBalance] = useState(0)
    const [selectedcompany,setSelectedcompany] = useState('')
    const [boughtshares,setBoughtshares] = useState(0)
    const [totalinvest,setTotalinvest] = useState(0)

    
    const [ret,setRet] = useState(0)
    const [totalasset,setTotalasset] = useState(0)
    const [id,setId] = useState(0);

    const [dfgh,setDfgh] = useState(false)
    const [open,setOpen] = useState(false)
    const [sip,setSip] = useState(false)

    const {currentUser} = useAuth()
    const sellRef = useRef()
    const buyRef = useRef()
    const history = useHistory();
    useEffect(()=>{
        getu(day)
        doit(4)
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

    async function zeb(id,name)
    {   
        document.getElementById("yesthis").style.background="white"
        document.getElementById("maybethis").style.background="white"
        const options={
            method:'GET',
            url:`https://api.mfapi.in/mf/${id}`
        };
        var teju = await axios.request(options)
        teju = teju.data.data
        var x=[],y=[];
        var co=0;
        for(var ke in teju)
        {
            x.push(teju[ke].date);
            y.push(teju[ke].nav);
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
        const opt={
            method:'GET',
            url:"https://growwmore.herokuapp.com/companymutualapi/"
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
        ab = ab[0]
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
        gb = gb[0];
        var aji = parseFloat((parseFloat(gb.balance))/(parseFloat(one)))
        if(aji>parseFloat(ab.quantity))
        {
            aji=ab.quantity
        }
        aji = parseFloat(aji)
        const kption = {
            method:"GET",
            url:"https://growwmore.herokuapp.com/mutualapi/"
        };
        var brai = await axios.request(kption)
        brai = brai.data
        var bnrai = brai.filter((each)=>{
            const {company,user} = each
            if(name==company && user===gb.id)
            {
                return each
            }
        })
        var pnb,sbi,boi,citi;
        if(bnrai.length>0)
        {

        bnrai = bnrai[0]
        var temp = bnrai.quantity
        temp = parseFloat(temp)
        var hyy = bnrai.prices
        hyy = parseFloat(hyy)
        pnb = temp*hyy
        sbi = temp*parseFloat(one)
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
        setBoughtshares(citi.toFixed(3))
        setTotalinvest(pnb)
        setTotalasset(sbi)
        setRet(boi)
        setValue(one)
        setAvailableshares(ab.quantity.toFixed(3))
        setBalance(gb.balance.toFixed(3))
        setMaxshares(aji.toFixed(3))
        setSelectedcompany(name)
        setAbhi({x:rx,y:ry})
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
    async function getu(day){
        const options = {
            method:'GET',
            url:"https://api.mfapi.in/mf/117619"
        };
        var teju = await axios.request(options)
        teju = teju.data.data
        var co=0;
        var x = [];
        var y =[];
        for(var ke in teju)
        {
            x.push(teju[ke].date)
            y.push(teju[ke].nav)
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
        setData({x:rx,y:ry});
        setKal(false)
    }
    async function fik(link,name,id,code){
        const options = {
            method:"GET",
            url:`https://api.mfapi.in/mf/${code}`
        };
        var teju = await axios.request(options)
        teju = teju.data.data
        var one,two
        var co=0;
        for(var ke in teju)
        {
            if(co===0)
            {
                one=teju[ke].nav
                co++;
            }
            else
            {
                two=teju[ke].nav
                break;
            }
        }
        one = parseFloat(one)
        one+=0.00
        two = parseFloat(two)
        two+=0.00
        var diff = one-two
        var per = diff/one*100
        diff = diff.toFixed(2)
        per = per.toFixed(2)
        document.getElementById(name).innerHTML='<b>'+'$'+one+'</b>'
        document.getElementById(name+id).innerHTML='<b>'+diff+'('+per+'%)'+'</b>'
        if(diff>=0.00)
        {
            document.getElementById(name).style.color="green"
            document.getElementById(name+id).style.color="green"
            document.getElementById(code).style.background="#b2ff59"
            document.getElementById(name+id).innerHTML='<b>'+'+'+diff+'('+per+'%)'+'</b>'
        }
        else
        {
            document.getElementById(name).style.color="red"
            document.getElementById(name+id).style.color="red"
            document.getElementById(code).style.background="#ef9a9a"
        }
    }
    const doit = (gh) =>{
        for(var x=1;x<=7;x++)
        {
            if(x===gh)
            {
                document.getElementById(x).style.background="green"
                document.getElementById(x).style.color="white"
            }
            else
            {
                document.getElementById(x).style.background="white"
                document.getElementById(x).style.color="black"
            }
        }
    }
    const klpd={
            labels:data.x,
            datasets:[
                {
                    label:"ICICI Prudential",
                    data:data.y,
                    backgroundColor:"#69f0ae"
                }
            ]
        }
    const fuckit = (id) =>{
        for(var i=1001;i<=1008;i++)
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
    async function buyit(){
        setBhina(true)
        setAskd(true)
        var money = buyRef.current.value
        money = parseFloat(money)
        if(money===0.00)
        {   
            buyRef.current.value=""
            return 1
        }
        if(money>balance)
        {
            money=balance
        }
        money = parseFloat(money)
        var qty = money/(parseFloat(value))
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
            url:'https://growwmore.herokuapp.com/mutualapi/'
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
        pkl -= parseFloat(money)
        pkl = pkl.toFixed(3)
        pkl = parseFloat(pkl)

        var bnm,fgh,vfg,pgh,wer
        var btqty=0,ghj=0

        if(kp.length>0)
        {   
            btqty = parseFloat(boughtshares)+parseFloat(qty)
            ghj = parseFloat(parseFloat(totalinvest) + (parseFloat(qty)*parseFloat(value)))/parseFloat(btqty)
            ghj = parseFloat(ghj)
            ghj = ghj.toFixed(3)
            const olp ={
                method:"PUT",
                url:"https://growwmore.herokuapp.com/mutualapi/",
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
                url:'https://growwmore.herokuapp.com/companymutualapi/',
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
            pgh = parseFloat(pgh)
            pgh -= parseFloat(qty)
            pgh = parseFloat(pgh)



            const pj = {
                method:'PUT',
                url:'https://growwmore.herokuapp.com/companymutualapi/',
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
            btqty = parseFloat(btqty)
            btqty = btqty.toFixed(3)
            btqty = parseFloat(btqty)
            const olp ={
                method:'POST',
                url:'https://growwmore.herokuapp.com/mutualapi/',
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
                url:'https://growwmore.herokuapp.com/companymutualapi/',
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
            pgh = parseFloat(pgh)
            pgh-=parseFloat(qty)
            pgh = parseFloat(pgh)
            pgh = pgh.toFixed(3)
            pgh = parseFloat(pgh)

            const pj = {
                method:'PUT',
                url:'https://growwmore.herokuapp.com/companymutualapi/',
                data:{
                    'id':vfg.id,
                    'quantity':pgh
                }
            };
            wer = await axios.request(pj)
            wer = wer.data
        } 
        setAskd(false)
        setMon((parseFloat(money)).toFixed(3))
        setVfm((qty.toFixed(3)))
        setAvailableshares(parseFloat(pgh).toFixed(3))
        setId(temp.id)
        setBoughtshares(()=>{
            return btqty.toFixed(3)
        })
        setTotalinvest((parseFloat(parseFloat(totalinvest) + (parseFloat(qty)*parseFloat(value)))).toFixed(3))
        setTotalasset((parseFloat(btqty)*parseFloat(value)).toFixed(3))
        setRet((parseFloat(totalasset)-parseFloat(totalinvest)).toFixed(3))
        setBalance(pkl.toFixed(3))
        setMaxshares((prevNo)=>{
            return (parseFloat(prevNo)-qty).toFixed(3)
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
        plk+=qty
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
            url:'https://growwmore.herokuapp.com/mutualapi/'
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

        if(qty<(ghj.quantity*ghj.prices))
        {   
            var bgt = parseFloat(ghj.quantity)
            bgt -= parseFloat(parseFloat(qty)/parseFloat(value))
            bgt = parseFloat(bgt)
            bgt = bgt.toFixed(3)
            bgt = parseFloat(bgt)
            om ={
                method:'PUT',
                url:'https://growwmore.herokuapp.com/mutualapi/',
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
                url:'https://growwmore.herokuapp.com/mutualapi/',
                data:{
                    'id':ghj.id
                }
            };
        }
        var th = await axios.request(om)
        th = th.data

        const vm ={
            method:'GET',
            url:'https://growwmore.herokuapp.com/companymutualapi/'
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
        dcc = parseFloat(dcc)
        dcc+=parseFloat(parseFloat(qty)/parseFloat(value))
        dcc = dcc.toFixed(3)
        dcc = parseFloat(dcc)

        const xcv = {
            method:'PUT',
            url:'https://growwmore.herokuapp.com/companymutualapi/',
            data:{
                'id':bnm.id,
                'quantity':dcc
            }
        };
        var bhj = await axios.request(xcv)
        bhj = bhj.data

        setAskd(false)
        setVfm((parseFloat(parseFloat(qty)/(parseFloat(value)))).toFixed(3))
        setMon((parseFloat(qty)).toFixed(3))
        setBalance(plk)
        setAvailableshares(dcc)
        setBoughtshares((prevNo)=>{
            return (parseFloat(parseFloat(prevNo)-parseFloat(qty)/parseFloat(value))).toFixed(3)
        })
        setTotalinvest((prevNo)=>{
            return (parseFloat(parseFloat(prevNo)-parseFloat(qty))).toFixed(3)
        })
        setTotalasset((prevNo)=>{
            return (parseFloat(parseFloat(prevNo)-parseFloat(qty))).toFixed(3)
        })
        setRet((parseFloat(totalasset-totalinvest)).toFixed(3))
        setMaxshares((parseFloat(parseFloat(plk)/parseFloat(value))).toFixed(3))


    }
    const classes = useStyles();
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
                    <AccountCircleIcon/>
                </Fab>
            </div>
            <ButtonGroup style={{border:"none"}}>
            <Button style={{border:"none",marginRight:20}} ><Link style={{textDecoration:"none",color:"black",fontSize:20}} to="/stocks">Stocks</Link></Button>
            <Button style={{border:"none",marginRight:20}} ><Link style={{textDecoration:"none",color:"red",fontSize:20}} to="/mutual">Mutual Fund</Link></Button>
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
            <Typography style={{marginTop:20,marginBottom:20}} variant="h5"><b>Popular Funds</b></Typography>
            <Grid container spacing={4}>
                {
                    symb.map((each,index)=>{
                        const {id,name,link,code} = each
                        return(
                            <Grid item key={id}>
                                <Paper id={code} style={{height:220,width:190,background:"#f0f0f0"}}>
                                    <div style={{padding:10}}>
                                        <img style={{height:30,width:30,border:"1px dashed red"}} src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/05/Target_Corporation_logo_vector.svg.png?auto=format&q=60&fit=max&w=930" alt="" />
                                        <RefreshIcon onClick={()=>fik(link,name,id,code)} style={{float:"right"}}/>
                                        <Typography variant="body1" color="textprimary">{name}</Typography>
                                        <Divider></Divider>
                                        <Typography style={{marginTop:30}} variant="body1" id={name}>$ __</Typography>
                                        <Typography variant="body1"  style={{marginBottom:20}} id={name+id}> ___</Typography>
                                        <Button variant="contained" style={{background:"green",color:"white",marginLeft:33,fontSize:10}}  onClick={()=>fik(link,name,id,code)} >Know More</Button>
                                    </div>
                                </Paper>
                            </Grid>
                        )
                    })
                }
                <Grid item>
                    <Paper style={{display:"inline-block",width:340,height:300,background:"#f0f0f0",marginTop:-40}}>
                    <Paper style={{display:"inline-block",width:340,height:300,background:"#f0f0f0"}}>
                        <div style={{marginTop:30}}>
                            <div style={{textAlign:"center"}} ><img src="https://assets-netstorage.groww.in/website-assets/prod/1.6.3/build/client/images/newToMfDark.004e86ad.svg"/></div>
                            <Typography variant="h5" style={{textAlign:"center"}}>New to Mutual Fund</Typography>
                            <Typography variant="body1" style={{textAlign:"center"}}>Start Exploring mutual fund to begin your investment journey</Typography>
                            <div style={{textAlign:"center",marginTop:10}}>
                                <Button variant="contained" style={{background:"green",color:"white"}} onClick={()=>{
                                    setAskd(true)
                                    setMod(true)
                                    }}>Explore Mutual Funds</Button>
                            </div>
                        </div>
                    </Paper>
                    <Paper style={{display:"inline-block",width:340,height:300,background:"#f0f0f0",marginTop:20}}>
                        <div style={{marginTop:30}}>
                            <div style={{textAlign:"center"}} ><img src="https://assets-netstorage.groww.in/website-assets/prod/1.6.3/build/client/images/startSipDark.41c44b3a.svg"/></div>
                            <Typography variant="h5" style={{textAlign:"center"}}>Have a SIP</Typography>
                            <Typography variant="body1" style={{textAlign:"center"}}>Start and Manage monthly investments on our App, very fast</Typography>
                            <div style={{textAlign:"center",marginTop:10}}>
                                <Button variant="contained" style={{background:"green",color:"white"}} onClick={()=>setSip(true)}>Start A SIP</Button>
                                <Dialog open={sip}>
                                <ClipLoader loading={dfgh}></ClipLoader>
                                <div style={{padding:40}}>
                                <Typography variant="h5" color='primary' style={{marginTop:20}}>Coming Soon</Typography>
                                <Typography variant='h5' color="secondary" style={{marginTop:-30,marginLeft:240}}>Stay Tuned</Typography>
                                <div style={{textAlign:"center",marginTop:20,marginBottom:10}}>
                                <Button  variant="contained" color='primary' onClick={()=>setSip(false)}>Close</Button>
                                </div>
                                </div>
                                </Dialog>
                            </div>
                        </div>
                    </Paper>
                    </Paper>
                </Grid>
            </Grid>
            <div>
                <Modal isOpen={mod} onRequestClose={()=>setMod(false)}>
                    <Typography color="secondary">Select a Company</Typography>
                        <ButtonGroup>
                            <Button id="1001"  onClick={()=>{
                                zeb("122639",'Parag Parikh')
                                setAskd(true)
                                fuckit(1001)
                                }}>Parag Parikh</Button>

                            <Button id="1002"  onClick={()=>{
                                zeb("117619",'ICICI Prudential')
                                setAskd(true)
                                fuckit(1002)
                            }}>ICICI Prudential</Button>

                            <Button id="1003"  onClick={()=>{
                                zeb("135800",'Axis')
                                setAskd(true)
                                fuckit(1003)
                            }}>Axis</Button>

                            <Button  id="1004"  onClick={()=>{ 
                                zeb('125354','Tata Digital')
                                setAskd(true)
                                fuckit(1004)
                            }}>Tata Digital</Button>

                            <Button id="1005"  onClick={()=>{
                                zeb('112278','Axis BlueChip')
                                setAskd(true)
                                fuckit(1005)
                            }}>Axis BlueChip</Button>

                            <Button id="1006"  onClick={()=>{
                                zeb('100383','Nippon')
                                setAskd(true)
                                fuckit(1006)
                            }}>Nippon</Button>

                            <Button id="1007"  onClick={()=>{
                                zeb('147703','Motilal Oswal')
                                setAskd(true)
                                fuckit(1007)
                            }}>Motilal Oswal</Button>

                            <Button id="1008"  onClick={()=>{
                                zeb('138453','PGIM')
                                setAskd(true)
                                fuckit(1008)
                            }}>PGIM</Button>
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
                                            <div style={{textAlign:'center'}}>
                                            <ClipLoader loading={askd}></ClipLoader>
                                            </div>
                                            {askd===false && <Typography variant="h6" color="primary" id="namename" style={{textAlign:"center"}}>__</Typography> }
                                            {askd===false && <Typography variant="body1" style={{marginTop:15,marginLeft:10}}>Market Price:</Typography>}
                                            {askd===false && <Typography variant="body1" style={{marginTop:-25,marginLeft:270}} id="heretofit">__</Typography>}
                                            {askd===false && <Typography variant="body1" style={{marginLeft:10,marginTop:20}}>Available Units:</Typography>}
                                            {askd===false && <Typography variant="body1" style={{marginLeft:270,marginTop:-25}}>{availableshares}</Typography>}
                                            {askd===false && <Typography variant="body1" style={{marginLeft:10,marginTop:20}}>Maximum Units you can buy:</Typography>}
                                            {askd===false && <Typography variant="body1" style={{marginLeft:270,marginTop:-25}}>{maxshares}</Typography>}
                                            {askd===false &&  maxshares!==0.000 &&  <Typography variant="body1" style={{marginLeft:10,marginTop:20}}>Money you want to invest:</Typography>}
                                            {/* {askd===false && <Typography variant="body1" style={{marginLeft:270,marginTop:-25}}>$1000</Typography>} */}
                                            <div style={{padding:10}}>
                                            {askd===false && maxshares!==0.000 && <TextField variant="outlined" type="number" inputRef={buyRef} style={{marginLeft:"auto",width:"100%",marginTop:5,background:"whitesmoke"}} label="Input number"></TextField>}
                                            </div>
                                            <div style={{textAlign:"center",marginTop:5}}>
                                            {askd===false && maxshares!==0.000 &&  <Button variant="contained" onClick={()=>buyit()} style={{background:"green",color:"white",marginRight:5,marginBottom:5}}>Invest</Button>}
                                            </div>
                                            <Divider/>
           {/*here for hidden things */}    <div>
                                                {askd===false && boughtshares!==0.000 &&  <Typography variant="body1" style={{marginLeft:10,marginTop:20}}>Money you want to withdraw:</Typography>}
                                                <div style={{padding:10}}>
                                                    {askd===false && boughtshares!==0.000 && <TextField variant="outlined" type="number" inputRef={sellRef} style={{marginLeft:"auto",width:"100%",marginTop:5,background:"whitesmoke"}} label="Input number"></TextField>}
                                                </div>
                                                <div style={{textAlign:"center",marginTop:5}}>
                                                {askd===false && boughtshares!==0.000 && <Button variant="contained" onClick={()=>sellit()} style={{background:"green",color:"white",marginLeft:5,marginBottom:5}}>Withdraw</Button>}
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
                                            <ClipLoader loading={askd}></ClipLoader>
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
                                            {askd===false && <Typography variant="body1" style={{marginTop:20,marginLeft:10}}>Number of Units:</Typography>}
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
                                {askd===false && <Typography variant="body1" style={{marginLeft:400,marginTop:-25}}>{selectedcompany}</Typography>}
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
                <Paper style={{background:"#f0f0f0",width:855,height:600,marginTop:-280}}>
                    <Typography variant="h4" style={{textAlign:"center"}}>Mutual Fund's Performance</Typography>
                    <div style={{padding:10}}>
                    <Paper style={{height:450,width:840}}>
                        <div style={{textAlign:"center"}}>
                        <ClipLoader  loading={kal}></ClipLoader>
                        </div>
                        {kal===false && <Line data={klpd}/>}
                    </Paper>
                    </div>
                    <div style={{textAlign:"center",marginTop:20}}>
                    <ButtonGroup>
                        <Button id='1' onClick={()=>{
                            doit(1)
                            setDay(1)
                            setKal(true)
                        }}>1 Day</Button>
                        <Button id='2'  onClick={()=>{
                            doit(2)
                            setKal(true)
                            setDay(5)}}>5 Days</Button>
                        <Button id='3'  onClick={()=>{
                            doit(3)
                            setKal(true)
                            setDay(10)}}>10 Days</Button>
                        <Button id='4'  onClick={()=>{
                            doit(4)
                            setKal(true)
                            setDay(15)}}>15 Days</Button>
                        <Button id='5'  onClick={()=>{
                            doit(5)
                            setKal(true)
                            setDay(20)}}>20 Days</Button>
                        <Button id='6'  onClick={()=>{
                            doit(6)
                            setKal(true)
                            setDay(40)}}>40 Days</Button>
                        <Button id='7'  onClick={()=>{
                            doit(7)
                            setKal(true)
                            setDay(100)}}>100 Days</Button>
                    </ButtonGroup>
                    </div>
                </Paper>
        </div>
            </Container>
        </div>
    )
}

export default Mutual
