const APTform ='https://61bc10bcd8542f001782451a.mockapi.io/Dangki'

 var id =0;
var xacnhan=0;
var arr = []
function addData (){
    id++;
    var firstName = document.getElementById('firstName').value;
    var phone = document.getElementById("phone").value;
    var nameLogin = document.getElementById("account").value;
    var password = document.getElementById('password').value;
    var address = document.getElementById('adress').value;
    var data = {
        id:id,
        Ho:firstName,
        Sodienthoai: phone,
        address: address,
        Tendangnhap: nameLogin,
        matkhau: password
    }
    axios.get(`${APTform}`).then(function(res) {
        arr= res.data;
       for(let i = 0 ; i < arr.length;i ++){
        if(nameLogin == arr[i].Tendangnhap ){
            xacnhan = 1
           break
        }
       }
       if(xacnhan == 0){
        axios.post(APTform,data).then(
            alert("Đã đăng kí thành công")
        )
           
       }
       else{ 
        alert("Tài khoản đã tồn tại vui lòng đăng nhập lại")
        xacnhan = 0;}
      
    })
   
    
    
}
function reset(){
    document.getElementById('firstName').value='';
     document.getElementById('adress').value='';
     document.getElementById("phone").value='';
    document.getElementById("account").value='';
    document.getElementById('password').value='';
}

