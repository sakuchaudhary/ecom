var ProdArray=[];
var ProdId=0;
var currentId=0;
var temp=1;
var targetParent;
var editParent;
var divAddProduct = document.getElementById("divAddProduct");
var divListProducts = document.getElementById("divListProducts");
var aAddProduct = document.getElementById("aAddProduct");

aAddProduct.addEventListener("click",function(){
  createNewProductPanel();
  aAddProduct.setAttribute("style","visibility:hidden");
});

function createNewProductPanel()
{
  if(temp==1)
  {
  temp=0;

  var h2=document.createElement("h2");
  h2.setAttribute("id","h2");
  h2.innerHTML="Input Details";
  h2.setAttribute("style","text-decoration:underline");
   

  var div1=document.createElement("div");
  div1.setAttribute("id","div1");
  var ProdName=document.createElement("input");
  ProdName.setAttribute("id","ProdName");
  ProdName.setAttribute("placeholder","Product Name....");
 
  
  div1.appendChild(ProdName);
  insertBlankLine(div1);
  insertBlankLine(div1);


  var div2=document.createElement("div");
  div2.setAttribute("id","div2");
  var ProdDesc=document.createElement("textarea");
  ProdDesc.setAttribute("id","ProdDesc");
  ProdDesc.setAttribute("placeholder","Product Desc....");
  ProdDesc.setAttribute("rows","4");
  ProdDesc.setAttribute("cols","19");
  div2.appendChild(ProdDesc);
  insertBlankLine(div2);
  insertBlankLine(div2);


  var div3=document.createElement("div");
  div3.setAttribute("id","div3");
  var ProdPrice=document.createElement("input");
  ProdPrice.setAttribute("type","number");
  ProdPrice.setAttribute("id","ProdPrice");
  ProdPrice.setAttribute("placeholder","Product Price....");
  div3.appendChild(ProdPrice);
  insertBlankLine(div3);
  insertBlankLine(div3);

 var div4=document.createElement("div");
 div4.setAttribute("id","div4");
 var ProdQuan=document.createElement("input");
 ProdQuan.setAttribute("type","number");
 ProdQuan.setAttribute("id","ProdQuan");
 ProdQuan.setAttribute("placeholder","Product Quantity....");
 div4.appendChild(ProdQuan);
 insertBlankLine(div4);
 insertBlankLine(div4);

var div5=document.createElement("div");
div5.setAttribute("id","div5");
var submitButton=document.createElement("button");
submitButton.setAttribute("id","submitButton");
submitButton.setAttribute("style","margin-left:5px");
submitButton.innerHTML="Submit";
submitButton.addEventListener("click",function()
{
  var flag=validation();
  if(flag==true){
  addProducttoArray();
   }
   else
   alert("All fields required......");
});

var cancelButton=document.createElement("button");
cancelButton.setAttribute("id","cancelButton");
cancelButton.setAttribute("style","margin-left:20px");
cancelButton.innerHTML="Cancel";
cancelButton.addEventListener("click",function(){
removeFields();
});

var saveButton=document.createElement("button");
saveButton.setAttribute("id","saveButton");
saveButton.setAttribute("style","margin-left:20px");
saveButton.setAttribute("style","visibility:hidden");
saveButton.addEventListener("click",function(){
var newObject={
  Prodid:currentId,
  Prodname:document.getElementById("ProdName").value,
  Proddesc:document.getElementById("ProdDesc").value,
  Prodprice:document.getElementById("ProdPrice").value,
  Prodquan:document.getElementById("ProdQuan").value
}
replaceInArray(newObject);
updateDom(newObject);
clearPannel();
});
saveButton.innerHTML="Save";
div5.append(submitButton);
div5.append(cancelButton);
div5.append(saveButton);

divAddProduct.append(h2);
divAddProduct.append(div1);
divAddProduct.append(div2);
divAddProduct.append(div3);
divAddProduct.append(div4);
divAddProduct.append(div5);
}
}

function insertBlankLine(divi)
{
  var br=document.createElement("br");
  divi.appendChild(br);
}

//******************************validation function*********************************** */
function validation()
{
  var prodName=document.getElementById("ProdName").value;
  var prodDesc=document.getElementById("ProdDesc").value;
  var prodPrice=document.getElementById("ProdPrice").value;
  var prodQuan=document.getElementById("ProdQuan").value;
  if(prodName == ""||prodDesc == ""||prodPrice == ""||prodQuan==""){
  return false;}
  else
  return true;
}

//****************add to product array function*********************** */
function addProducttoArray()
{
  var ProdObject={
  Prodid:ProdId,
  Prodname:document.getElementById("ProdName").value,
  Proddesc:document.getElementById("ProdDesc").value,
  Prodprice:document.getElementById("ProdPrice").value,
  Prodquan:document.getElementById("ProdQuan").value
  }
  ProdArray.push(ProdObject);
  storeProducts(ProdArray);

 addProducttoDOM(ProdObject,1);

  clearPannel();
  ProdId++;
  console.log(JSON.stringify(ProdArray));
}

//******clear pannel function*************** */
function clearPannel()
{
temp=1;
divAddProduct.removeChild(h2);
divAddProduct.removeChild(div1);
divAddProduct.removeChild(div2);
divAddProduct.removeChild(div3);
divAddProduct.removeChild(div4);
divAddProduct.removeChild(div5);
aAddProduct.setAttribute("style","visibility:visible; inline-size: 200px; margin-left: 40%;");
}

//*********add to DOM function******************* */
function addProducttoDOM(ProdObj,flag2)
{
var listdiv1=document.createElement("div");
var prodName=ProdObj.Prodname;
var prodDesc=ProdObj.Proddesc;
var prodprice=ProdObj.Prodprice;
var prodquan=ProdObj.Prodquan;
var prodid=ProdObj.Prodid;
 if(flag2==1)
 prodid=prodid+1;

var pname=document.createElement("h4");
var pdesc=document.createElement("h4");
var pprice=document.createElement("h4");
var pquan=document.createElement("h4");
pname.innerHTML=prodid+": Product Name: "+prodName;
pdesc.innerHTML="Product Description: "+prodDesc;
pprice.innerHTML="Product Price: "+prodprice;
pquan.innerHTML="Product Quantity: "+prodquan;

var editButton=document.createElement("button");
editButton.setAttribute("id","editButton");
editButton.setAttribute("style","margin-left:3px");
editButton.setAttribute("style","margin-top:5px");
editButton.innerHTML="Edit";

var deleteButton=document.createElement("button");
deleteButton.setAttribute("id","deleteButton");
deleteButton.setAttribute("style","margin-top:5px");
deleteButton.setAttribute("style","margin-left:10px");
deleteButton.innerHTML="Delete";

listdiv1.append(pname);

listdiv1.append(pdesc);

listdiv1.append(pprice);

listdiv1.append(pquan);
insertBlankLine(listdiv1);

listdiv1.append(editButton);
listdiv1.append(deleteButton);



insertBlankLine(listdiv1);
insertBlankLine(listdiv1);
divListProducts.append(listdiv1);
console.log(ProdArray);

editButton.addEventListener("click",function(){
editFunction(prodName,prodDesc,prodprice,prodquan,ProdObj);
});

deleteButton.addEventListener("click",function(){
  
  deleteFunction(ProdObj);
 // deleteFromDataBase(ProdObj);

});
}

//************removing object from array*************** */
function removeFromProductsArray(id)
{
  ProdArray.splice(id,1);
  console.log(ProdArray);
 
}

//*******************insert into fields during edit function*********** */

function insertIntoFields(prodName,prodDesc,prodprice,prodquan)
{
  var name=document.getElementById("ProdName");
  var desc=document.getElementById("ProdDesc");
  var price=document.getElementById("ProdPrice");
  var quantity=document.getElementById("ProdQuan");
  name.value=prodName;
  desc.value=prodDesc;
  price.value=prodprice;
  quantity.value=prodquan;
}


function updateDom(ProdObj)
{
 var listdiv1=document.createElement("div");
var prodName=ProdObj.Prodname;
var prodDesc=ProdObj.Proddesc;
var prodprice=ProdObj.Prodprice;
var prodquan=ProdObj.Prodquan;
var prodid=ProdObj.Prodid;
//prodid=prodid+1;

var pname=document.createElement("h2");
var pdesc=document.createElement("h4");
var pprice=document.createElement("h4");
var pquan=document.createElement("h4");
pname.innerHTML=prodid+"# Product Name: "+prodName;
pdesc.innerHTML="Product Description: "+prodDesc;
pprice.innerHTML="Product Price: "+prodprice;
pquan.innerHTML="Product Quantity: "+prodquan;

var editButton=document.createElement("button");
editButton.setAttribute("id","editButton");
editButton.setAttribute("style","margin-left:3px");
editButton.setAttribute("style","margin-top:5px");
editButton.innerHTML="Edit";

var deleteButton=document.createElement("button");
deleteButton.setAttribute("id","deleteButton");
deleteButton.setAttribute("style","margin-top:5px");
deleteButton.setAttribute("style","margin-left:10px");
deleteButton.innerHTML="Delete";

listdiv1.append(pname);

listdiv1.append(pdesc);

listdiv1.append(pprice);

listdiv1.append(pquan);
insertBlankLine(listdiv1);

listdiv1.append(editButton);
listdiv1.append(deleteButton);



insertBlankLine(listdiv1);
insertBlankLine(listdiv1);
divListProducts.append(listdiv1);
 editParent.parentNode.replaceChild(listdiv1,editParent);
  editButton.addEventListener("click",function(){
  editFunction(prodName,prodDesc,prodprice,ProdObj);
  });
  deleteButton.addEventListener("click",function(){
  deleteFunction(ProdObj);
  
  });
}


function getProductIndex(id)
{
  for (var i = 0; i < ProdArray.length; i++)
	{
      if (ProdArray[i].Prodid == id)
			return i;
  }
}


function replaceInArray(newObj)
{
  for(var i=0;i<ProdArray.length;i++)
  {
    if(ProdArray[i].Prodid==newObj.Prodid)
    {
      ProdArray[i]=newObj;
    }
  }
  console.log(ProdArray);
  
  updateDatabase(newObj);
}

//*********local storage functions**************** */

function storeProducts(ProdArray)
{
/*console.log(ProdArray);
localStorage.adminproducts=JSON.stringify(ProdArray);*/

var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
   
    }
  };
  xhttp.open("POST", "/array", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("productList="+JSON.stringify(ProdArray));
}





function getStoredProducts()
{

  console.log("get stored product running");
  

var xhttp=new XMLHttpRequest();
   
    xhttp.onreadystatechange=()=>{
    if(xhttp.readyState == 4 && xhttp.status == 200){
       
      console.log("response text");
      console.log(xhttp.responseText);
      ProdArray = JSON.parse(xhttp.responseText);
     //console.log(ProdArray);
    ProdId = ProdArray[ProdArray.length-1].Prodid;

   
    
    console.log(ProdArray);
    console.log("-----------------------------")

    console.log("name "+ProdArray[0].name);
for(i=0;i<ProdArray.length;i++)
  {
  addProducttoDOM(ProdArray[i],0);
  }
    }
  }
  xhttp.open("GET", "/array", true);
  xhttp.send();  
 

     
 
}



function editFunction(prodName,prodDesc,prodprice,prodquan,ProdObj)
{
  editParent=event.target.parentNode;
  createNewProductPanel();
  aAddProduct.setAttribute("style","visibility:hidden");
  document.getElementById("submitButton").setAttribute("style","visibility:hidden");
  document.getElementById("cancelButton").setAttribute("style","visibility:hidden");
  document.getElementById("saveButton").setAttribute("style","visibility:visible");
  insertIntoFields(prodName,prodDesc,prodprice,prodquan);
  currentId=ProdObj.Prodid;
}


function deleteFunction(ProdObj)
{
  targetParent = event.target.parentNode;
  console.log(ProdObj.Prodid);
  removeFromProductsArray(getProductIndex(ProdObj.Prodid));
  deleteFromDataBase(ProdObj.Prodname);
  targetParent.parentNode.removeChild(targetParent);
  
  
}
//********************************************json******************************************
/*var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange=function()
{
    // readyState 4 means the request is done.
    // status 200 is a successful return.
    if (xhttp.readyState == 4 && xhttp.status == 200)
    {
      //document.getElementById("users").innerHTML = xhttp.responseText; // 'This is the output.'
      var ProdArray = JSON.parse( xhttp.responseText) ;
      for(var i=0;i<ProdArray.length;i++)
      {
          addProducttoDOM(ProdArray[i]);
      }
      }
    }
`
`

  function loadDoc()
{
  xhttp.open("GET", "/products");
  xhttp.send();
}*/

var userArray=[];
function checkLogin()
{
  if(sessionStorage.logarray)
   
  userArray=JSON.parse(sessionStorage.logarray);

  if(userArray.length!=0){
    loggedIn();
  }
  
}

var Name=document.getElementById("name");
var Logout=document.getElementById("logout");

function loggedIn()
{
  


  //************************************ */
  Name.innerHTML="Hello "+userArray[0].name+"";
  Name.setAttribute("href","#");
  //************************** */
 

  //***************************************** *
  Logout.innerHTML="Logout";
  



  Logout.addEventListener("click",function(){
  sessionStorage.logarray=JSON.stringify([]);
  });
 
}

function deleteFromDataBase(Prodname){
  console.log("product to be deleted is with id----"+Prodname)
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   
  }
};
xhttp.open("POST", "/delete", true);
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

xhttp.send("Prodname="+JSON.stringify(Prodname));
}

function updateDatabase(obj){
  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     
    }
  };
  xhttp.open("POST", "/update", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhttp.send("obj="+JSON.stringify(obj));
}

function logoutadmin()
{
  setSession("logout");
  location.href="login.html";
}

function setSession(username){

  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
   
    }
  };
  xhttp.open("POST", "/setSession", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("username="+JSON.stringify(username));
}
