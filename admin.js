const APTconfirm ='https://61bc10bcd8542f001782451a.mockapi.io/item'
const APIcus ='https://61bc10bcd8542f001782451a.mockapi.io/Dangki'
const APIgiohang = 'https://61bc10bcd8542f001782451a.mockapi.io/donhang'
function getData(){
    axios.get(`${APTconfirm}`)
    .then (
        function (res){
            
            show(res)
        }
    )
}
var dem=0;
function show(arr){
    for( let i = 0 ; i < arr.data.length;i++){
        dem ++;
        document.getElementById('tbl').innerHTML+=`
        <tr>
        <td>${dem}</td>
        <td>${arr.data[i].nameItem}</td>
        <td>${arr.data[i].price}</td>
        <td><img id ='thunho' src="${arr.data[i].image}" alt=""> </td>
        <td>${arr.data[i].type}</td>
        <td>  <button onclick="getdatafromtable(${arr.data[i].id})">Edit</button>   <button onclick="deleteproduct(${arr.data[i].id})">Delete</button></td>
      </tr>
        `
    }
}

function reset(){
     document.getElementById('product-name').value =''
    document.getElementById('price').value=''
     document.getElementById('image').value=''
     document.getElementById('type').value=''
}
    

function add(){
    var name1= document.getElementById('product-name').value
    var price= document.getElementById('price').value
    var img = document.getElementById('image').value
    var type = document.getElementById('type').value
    var data ={
        nameItem :name1,
        price: price,
        image :img,
        type:type
    }
    axios.post(APTconfirm,data)
    .then(
        () => {location.reload()}
    )
    reset()
}
function getdatafromtable(id){
    axios.get(`${APTconfirm}/${id}`)
    .then( function (res) {
        document.getElementById('product-name').value=res.data.nameItem;
        document.getElementById('price').value=res.data.price;
        document.getElementById('image').value=res.data.image;
        document.getElementById('type').value=res.data.type;
        document.getElementById('add').style.display ='none';
        document.getElementById('update').style.display ='block';
        document.getElementById('update').value =res.data.id

    }
    )
   
}
function update(id) {
    var name1= document.getElementById('product-name').value
    var price= document.getElementById('price').value
    var img = document.getElementById('image').value
    var type = document.getElementById('type').value
    var data ={
        nameItem :name1,
        price: price,
        image :img,
        type:type
    }
    axios.put(`${APTconfirm}/${id}`,data).then(() => {location.reload()});
    reset()
    document.getElementById('add').style.display ='block';
    document.getElementById('update').style.display ='none';
} 
function deleteproduct(id){
    axios.delete(`${APTconfirm}/${id}`).then(
        () => {location.reload()}
    )
}
function GetData(){
    document.querySelector(".nen").style.display = "block"
    document.querySelector(".bill").style.display = "none"
    document.querySelector(".khachhang").style.display = "none"
    getData()
}
function showCustommer(){
    document.querySelector(".nen").style.display = "none"
    document.querySelector(".khachhang").style.display = "block"
    document.querySelector('.bill').style.display='none'
    document.getElementById('tbl1').innerHTML=''
    axios.get(`${APIcus}`).then(function(res){
        for(var i=0; i<res.data.length;i++){
            document.getElementById('tbl1').innerHTML+=`
        <tr>
        <td>${res.data[i].id}</td>
        <td>${res.data[i].Ho}</td>
        <td>${res.data[i].Sodienthoai}</td>
        <td>${res.data[i].address}</td>
        <td><button data-toggle="modal" data-target="#exampleModal" onclick ="billCus(${res.data[i].id})">Xem chi tiết</button> </td>
      </tr>
        `}
    })  
}
var tongtien = 0;
function billCus(id){
    document.getElementById('detailorder').innerHTML =''
    tongtien = 0;
    axios.get(`${APIcus}`).then(function(res){
        for(var i = 0; i< res.data.length;i++){
            if(res.data[i].id == id){
                for (var j = 0 ; j<res.data[i].cart.length;j++){
                    tongtien += res.data[i].cart[j].total;
                    document.getElementById('detailorder').innerHTML +=`
                    <tr>
                    <td>${j}</td>
                    <td>${res.data[i].cart[j].date}</td>
                    <td>${res.data[i].cart[j].nameItem}</td>
                    <td>${res.data[i].cart[j].price}</td>
                    <td>${res.data[i].cart[j].quanlity}</td>
                    <td>${res.data[i].cart[j].total}</td>
                  </tr>
                    `
                }
                document.getElementById('tien').innerHTML = tongtien
            }
        }
    })
   
}  
function showbill(){
    document.querySelector(".nen").style.display = "none"
    document.querySelector(".khachhang").style.display = "none"
    document.querySelector('.bill').style.display='block'
    document.getElementById('tbl2').innerHTML=''
    axios.get(`${APIgiohang}`).then(function(res){
        console.log(res);
        for(var i=0;i<res.data.length;i++){
            
            for(var j = 0; j<res.data[i].mathang.length;j++){
                document.getElementById('tbl2').innerHTML+=`
                <tr>
                <td>${res.data[i].id}</td>
                <td>${res.data[i].MaKH  }</td>
                <td>${res.data[i].date}</td>
                <td>${res.data[i].mathang[j].nameItem}</td>
                <td>${res.data[i].mathang[j].price}</td>
                <td>${res.data[i].mathang[j].quanlity}</td>
                <td>${res.data[i].mathang[j].total}</td>
              </tr>
                `
            }
        }
    })
}
var stt =0;
function search(){
    document.querySelector(".nen").style.display = "block"
    document.querySelector(".bill").style.display = "none"
    document.querySelector(".khachhang").style.display = "none"
    document.getElementById('tbl').innerHTML =''
    console.log(111)
    axios.get(`${APTconfirm}`).then(function(res){
        for(var i=0; i<res.data.length;i++){
            console.log(111)
            if(res.data[i].type == document.getElementById('search').value){
                stt ++;
                document.getElementById('tbl').innerHTML+=`
                <tr>
                <td>${stt}</td>
                <td>${res.data[i].nameItem}</td>
                <td>${res.data[i].price}</td>
                <td><img id ='thunho' src="${res.data[i].image}" alt=""> </td>
                <td>${res.data[i].type}</td>
                <td>  <button onclick="getdatafromtable(${res.data[i].id})">Edit</button>   <button onclick="deleteproduct(${res.data[i].id})">Delete</button></td>
              </tr>
                `
            }
        }
    })
}


