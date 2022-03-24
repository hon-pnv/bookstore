const APIitem ='https://61bc10bcd8542f001782451a.mockapi.io/item'
const APIcart ='https://61bc10bcd8542f001782451a.mockapi.io/Itemofcart'
function showData(type){
    document.getElementById('product').innerHTML=''
    axios.get(`${APIitem}`).then(function(res){
        for (var i = 0;i<res.data.length;i++){
            if(res.data[i].type ==type){
                document.getElementById('product').innerHTML+=`
                    <div class="col-12 col-sm-6 col-md-3 mb-4 m">     
                        <div class="card box" style="width: 20rem;height: 34rem;">
                                <img class="card-img-top sizeimg" src="${res.data[i].image}" alt="Card image cap">
                            <div class="card-body">
                                <h4 class="card-title text-center">${res.data[i].nameItem}</h4>
                                <h5 class="card-text text-danger text-center font-weight-bold">${res.data[i].price}đ</h5>
                                <button id="cart" class="btn btn-info" onclick="confirmifo(${res.data[i].id})"><i class="fas fa-shopping-cart"></i>&ensp; Mua ngay</button>
                            </div>
                        </div>
                    </div>  
                `
            }
        }
    })
}
var a ='';  
var dem = 0;
var total =0;
var tong =0;
function confirmifo(id){
    if (!loginStatus) {
        alert('Bạn phải đăng nhập để mua hàng');
        return
    }
    dem++
    document.getElementById('showproduct').style.display='none';
    document.getElementById('detail').style.display='block';
    document.querySelector('.footer').style.display='none';
    axios.get(`${APIitem}`).then(function(res){
     for(var i =0; i<res.data.length;i++){
         if(res.data[i].id == id){
             a = res.data[i].image
            document.getElementById('detailimg').innerHTML =`
            <img style="width:100%" src="${a}" alt="">
            `
            document.getElementById('vnameItem').innerHTML = res.data[i].nameItem;
            document.getElementById('vpriceItem').innerHTML = res.data[i].price;

         }
     }
 })
}

function addmock(){
    var data={
        nameItem : document.getElementById('vnameItem').innerHTML,
        price : document.getElementById('vpriceItem').innerHTML,
        image: a,
        quanlity: document.getElementById('vquality').value,
    }
    axios.post(APIcart,data).then()
    document.getElementById('showproduct').style.display='block';
    document.getElementById('detail').style.display='none';
    alert("Đã thêm vào giỏ hàng")
    document.getElementById('quantily').innerHTML = dem;
}


