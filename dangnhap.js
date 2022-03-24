const APIlogin = 'https://61bc10bcd8542f001782451a.mockapi.io/Dangki'
var xacnhan =0;
var seekId = 0;
var a =''
var loginStatus = false;
function confirmData(){
    axios.get(`${APIlogin}`).then(function(res){
        for(var i = 0; i<res.data.length;i++){
            if(res.data[i].Tendangnhap==document.getElementById("login").value && res.data[i].matkhau==document.getElementById("matkhau").value){
              xacnhan++;
              a=res.data[i].Tendangnhap
              seekId =res.data[i].id
            }
        }
        if(xacnhan!=0){
            alert("Đăng nhập thành công")
            loginStatus = true;
           document.getElementById('abcd').style.display ='none'
           document.querySelector(".main").style.display = 'none'
           document.querySelector(".footer").style.display = 'none'
           document.getElementById("userName").innerHTML =  "Chào"+" "+ a
            reset()
            localStorage.setItem("idlogin",seekId)
        }
        else{
            alert("đăng nhập thất bại")
            reset()
        }
    })
}
function reset(){
    document.getElementById("login").value=''
    document.getElementById("matkhau").value =''
}
