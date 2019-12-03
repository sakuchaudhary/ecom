var express = require('express');
const mongoose = require('mongoose');
const app = express();
mongoose.connect("mongodb://localhost:27017/ecom");
app.use(express.urlencoded())
var bodyParser=require('body-parser');
//const url=require("url");
var session=require('express-session');
app.use(express.json());
app.use(express.static('public'));
app.use(session({'secret':'fghvcdhshhgvjhfsbhvvh746ghjb',saveUninitialized:true,resave:true}));
var flag=0;
var flag2=0;

app.set('view engine', 'ejs');
//mongoose.connect("mongodb://localhost:27017/ecom",{ useNewUrlParser: true },{ useUnifiedTopology: true } );//connection with database
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

mongoose.connection.on('error', (err) => {
  console.log('DB connection Error');
});

mongoose.connection.on('connected', (err) => {
  console.log('DB connected');
});

mongoose.set('useFindAndModify', false);
var Schema=mongoose.Schema;
var username;
let Product=new Schema({
    Prodid:Number,
    Prodname:String,
    Proddesc:String,
    Prodprice:Number,
    Prodquan:Number,
});

let Users=new Schema({
    name:String,
    username:String,
    password:String,
    email:String,
    
});

let Logedinuser=new Schema({
  
    username:String,
    password:String,
   
    
});

let Cart=new Schema({

uid:String,
pid:Number,
pname:String,
pdesc:String,
pprice:Number,
pquan:Number,

})
var pro = mongoose.model('product',Product);
var user = mongoose.model('users', Users);
var logedinuser = mongoose.model('logedinuser', Logedinuser);
var cart = mongoose.model("cart",Cart);



app.get("/",function(req,res)
       {
    res.sendFile(__dirname+"/login.html");
});

app.get("/game",function(req,res)
       {
    res.sendFile(__dirname+"/snake2.html");
});

app.get("/AdminProducts.html",function(req,res)
       {
           if(flag==1)
    res.sendFile(__dirname+"/AdminProducts.html");

   else res.redirect('/login.html')
});

app.get("/login.html",function(req,res)
       {
    res.sendFile(__dirname+"/login.html");
});

app.get("/signup.html",function(req,res)
       {
    res.sendFile(__dirname+"/signup.html");
});

app.get("/CartProducts.html",function(req,res)
       {
           if(flag2==1)
    res.sendFile(__dirname+"/CartProducts.html");
    else
    res.redirect('login.html');
});

app.post('/adduser',(req,res)=>{
    var len=JSON.parse(req.body.userList).length;
    var sData=new user();
    sData.name=JSON.parse(req.body.userList)[len-1].name;
    sData.username=JSON.parse(req.body.userList)[len-1].username;
    sData.email=JSON.parse(req.body.userList)[len-1].email;
    sData.password=JSON.parse(req.body.userList)[len-1].password;

    sData.save(function(err)
 {
 if(err)
     {
         console.log("Error");
     }
     res.redirect('/login.html');
 });
})

app.post('/loginarray',(req,res)=>{
  

    var len=JSON.parse(req.body.logarray).length;
    var sData=new logedinuser();
     if(JSON.parse(req.body.logarray)[len-1].username=='chitkara')
     flag=1;

     console.log("login array flag is: "+flag);
    sData.username=JSON.parse(req.body.logarray)[len-1].username;
    
    sData.password=JSON.parse(req.body.logarray)[len-1].password;

    sData.save(function(err)
 {
 if(err)
     {
         console.log("Error");
     }
     res.redirect('/viewProducts.html');
 });
})

app.post('/setSession',(req,res)=>{
    
     req.session.username=JSON.parse(req.body.username);
    

    if(req.session.username=='chitkara'){
        flag=1;
        
    }
    else if(req.session.username=='logout'){
        flag=0;
        flag2=0;
    }

    else 
    {
        flag=0;
        flag2=1;
    }
})

app.get('/loginarray',(req,res)=>{
    console.log('running it');
    logedinuser.find({},function(err,docs){
        if(err)
            {
                console.log("error");
            }
        console.log(docs);
        res.send(docs);
       
    });
  });

app.post('/array',(req,res) => {
    console.log("running it");
  var len=JSON.parse(req.body.productList).length;
     var sData=new pro();
     sData.Prodid=JSON.parse(req.body.productList)[len-1].Prodid+1;
  sData.Prodname=JSON.parse(req.body.productList)[len-1].Prodname;
  sData.Proddesc=JSON.parse(req.body.productList)[len-1].Proddesc;
 
   sData.Prodquan=JSON.parse(req.body.productList)[len-1].Prodquan;
     sData.Prodprice=JSON.parse(req.body.productList)[len-1].Prodprice;
 
  sData.save(function(err)
 {
 if(err)
     {
         console.log("Error");
     }
     res.redirect('/AdminProducts.html');
 });        
 });


 app.post('/cartarray',(req,res) => {
  console.log("running it");
  var len=JSON.parse(req.body.productList).length;
     var sData=new cart();
     sData.uid=JSON.parse(req.body.productList)[len-1].uid;
     sData.pid=JSON.parse(req.body.productList)[len-1].pid;
  sData.pname=JSON.parse(req.body.productList)[len-1].pname;
  sData.pdesc=JSON.parse(req.body.productList)[len-1].pdesc;
 
   sData.pquan=JSON.parse(req.body.productList)[len-1].pquan;
     sData.pprice=JSON.parse(req.body.productList)[len-1].pprice;
 
  sData.save(function(err)
 {
 if(err)
     {
         console.log("Error");
     }
     res.redirect('/CartProducts.html');

 });    
 });

 app.get('/adduser',(req,res)=>{
    console.log('running it');
    user.find({},function(err,docs){
        if(err)
            {
                console.log("error");
            }
        console.log(docs);
        res.send(docs);
       
    });
  });


 app.get('/array',(req,res)=>{
  console.log('running it');
  pro.find({},function(err,docs){
      if(err)
          {
              console.log("error");
          }
      console.log(docs);
      res.send(docs);
     
  });
});

app.get('/cartarray',(req,res)=>{
    console.log('running it');
    cart.find({},function(err,docs){
        if(err)
            {
                console.log("error");
            }
        console.log(docs);
        res.send(docs);
       
    });
  });
  

app.post('/delete',(req,res)=>{

 console.log("Prodname--------------------: "+JSON.parse(req.body.Prodname));

  pro.findOneAndRemove({'Prodname':JSON.parse(req.body.Prodname)}, function(err){
      if (err){
          throw err;
          
      }
      console.log('deleted');
  });
});

app.post('/cartdelete',(req,res)=>{

    
   var ob=(JSON.parse(req.body.obj));
   console.log(ob.uid+" "+ob.pid);
     cart.findOneAndRemove({'pid':ob.pid , 'uid':ob.uid}, function(err){
         if (err){
             throw err;
             
         }
         console.log('deleted');
     });
   });

   app.post('/emptycart',(req,res)=>{

    
    var ob=(JSON.parse(req.body.username));
    
      cart.remove({'uid':ob}, function(err){
          if (err){
              throw err;
              
          }
          console.log('deleted');
      });
    });

   app.post('/updateproducts',(req,res)=>{

    var len=JSON.parse(req.body.productList).length;
    var arr=JSON.parse(req.body.productList);
    for(var i=0;i<len;i++){

        var myquery = { Prodname: arr[i].Prodname };
        var newvalues = { $set: { Prodid: arr[i].Prodid, Proddesc:arr[i].Proddesc,Prodprice:arr[i].Prodprice,Prodquan:arr[i].Prodquan } };
        pro.updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
                else
            console.log("1 document updated");
        
          });
    
    }
   });


app.post('/cartupdate',(req,res)=>{
   
    //console.log(JSON.parse(req.body.obj));
    var ob=(JSON.parse(req.body.obj));
       console.log(ob.uid);

    var myquery = { pname: ob.pname, uid: ob.uid };
  var newvalues = { $set: { pname: ob.pname, pdesc:ob.pdesc,pprice:ob.pprice,pquan:ob.pquan } };
   
    cart.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
        else
    console.log("1 document updated");

  });
});

app.post('/update',(req,res)=>{
   
    //console.log(JSON.parse(req.body.obj));
    var ob=(JSON.parse(req.body.obj));
       console.log(ob.name);

    var myquery = { Prodname: ob.Prodname };
  var newvalues = { $set: { Prodname: ob.Prodname, Proddesc:ob.Proddesc,Prodprice:ob.Prodprice,Prodquan:ob.Prodquan } };
   
    pro.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
        else
    console.log("1 document updated");

  });
});

app.get("/viewProducts.html",function(req,res)
       {
           if(flag2==1)
    res.sendFile(__dirname+"/viewProducts.html");
    else res.redirect('login.html');
});


app.listen(8000);