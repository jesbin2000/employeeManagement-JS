const url=new URLSearchParams(document.location.search)
let id=url.get("id");

const fullName=document.getElementById("view-name");
const emailId=document.getElementById("view-mail");
const gender=document.getElementById("viewgender");
const age=document.getElementById("viewage");
const dob=document.getElementById("viewdob");
const mobno=document.getElementById("viewmob");
const qualifiaction=document.getElementById("viewqualification");
const address=document.getElementById("viewaddress");
const userName=document.getElementById("viewusername");
const viewDeleteBtn=document.getElementById("viewusername");
const viewEditBtn=document.getElementById("viewusername");
const ViewImage=document.getElementById("Viewimage");
let employees=[];

employeeDetails(id);
async function employeeDetails(id){
    try{
    const employeeApi=await fetch(`http://localhost:3000/employees/${id}`)
    const empdata =await employeeApi.json();
    // employees=empdata;
    // console.log(employees);
    let newdate=empdata.dob .split("-").reverse("-");
        ViewImage.src=(`http://localhost:3000/employees/${id}/avatar`)
        fullName.textContent=empdata.salutation+" "+empdata.firstName+" " +empdata.lastName;
        emailId.textContent=empdata.email;
        gender.textContent=empdata.gender;
        age.textContent=calcAge(newdate);
        mobno.textContent=empdata.phone;
        dob.textContent=empdata.dob;
        qualifiaction.textContent=empdata.qualifications;
        address.textContent=empdata.address;
        userName.textContent=empdata.username;
    function calcAge(dob){
        let today=new Date();
        let DateofBirth=new Date(dob);
        let age = today.getFullYear() - DateofBirth.getFullYear();
        let monthDiffernce = today.getMonth()-DateofBirth.getMonth();
        if(monthDiffernce < 0 ||(monthDiffernce===0 && today.getDate()< DateofBirth.getDate() )){
            age--;
            return age;
        }
        else{
            return age;
        }

        }
    }
    catch(error){
        console.log("fetching incompleted"+error);
    }
}
//<<--View Edit Page-->>
function editForm(){
    const editPage = document.getElementById("editEmployeeFrom");
    editPage.style.setProperty('display','flex','important');
}
// editForm();
// --view delete alert--
function deleteForm(){
    const deletePage = document.getElementById("deleteSection");
    deletePage.style.setProperty('display','flex','important');
}
// deleteForm();

// <<----Closing form--->>
function closeForms(){
    const editPage = document.getElementById("editEmployeeFrom");
    editPage.style.setProperty('display','none','important');
    const deletePage = document.getElementById("deleteSection");
    deletePage.style.setProperty('display','none','important');
}
// <<-------Editing Fom--------->>

document.getElementById("view-edit_btn").addEventListener("click",()=>{
    editEmployee(id);
    editForm();
})
document.getElementById("view-delete_btn").addEventListener("click",()=>{
    deleteForm();
})

const editSalutation = document.getElementById("editSalutation");
const editFIrstName = document.getElementById("editFirstName");
const editSecondName = document.getElementById("editLastName");
const editEmailid = document.getElementById("editEmail");
const editMobNo = document.getElementById("editPhNo");
const editUserName = document.getElementById("editUserId");
const editPassword = document.getElementById("editPassWord");
const editDob = document.getElementById("editDOB");
const editMale = document.getElementById("flexRadioDefault3");
const editFemale = document.getElementById("flexRadioDefault4");
const editQualifiaction = document.getElementById("editQualification");
const editAddress = document.getElementById("editAdress");
const editCountry = document.getElementById("editCountry");
const editState = document.getElementById("editState");
const editCity= document.getElementById("editCity");
const editPinZip = document.getElementById("editPinZip");


async function editEmployee(id){
    // console.log(id);
    let employeeApi = await fetch(`http://localhost:3000/employees/${id}`)
    data = await employeeApi.json();
    employees=data;
    try{
    // console.log(employees)
    editPic.src=(`http://localhost:3000/employees/${id}/avatar`);
    editSalutation.value=data.salutation;
    editFIrstName.value=data.firstName;
    editSecondName.value=data.lastName;
    editEmailid.value=data.email;
    editMobNo.value=data.phone;
    editUserName.value=data.username;
    editPassword.value=data.password;
    editDob.value=data.dob.split("-").reverse().join("-");
    data.gender === "male"?editMale.checked = true:editFemale.checked = true;
    editQualifiaction.value=data.qualifications;
    editAddress.value=data.address;
    editCountry.value=data.country;
    editState.value=data.state;
    editCity.value=data.city;
    editPinZip.value=data.pinZip;
    employeId=data.id;
if(!employeeApi.ok)
{
throw new Error(`${employeeApi.status}`)
}
}
catch(error){
    console.log("data not found",error);
}
}
let editEmpData;
async function employeeChanges(){
    try{
        editEmpData={
            salutation:editSalutation.value,
            firstName:editFIrstName.value,
            lastName:editSecondName.value,
            email:editEmailid.value,
            phone:editMobNo.value,
            dob: editDob.value.split("-").reverse().join("-"),
            gender: editMale.checked?editMale.value:editFemale.value,
            qualifications:editQualifiaction.value,
            address: editAddress.value,
            city:editCity.value,
            state:editState.value,
            country: editCountry.value,
            username: editUserName.value,
            password: editPassword.value,
            pinZip:editPinZip.value,
            id:employeId,
        };
const employeeApi = await fetch(`http://localhost:3000/employees/${editEmpData.id}`,{
method:"PUT",
headers: {'Content-Type': 'application/json'},
body: JSON.stringify(editEmpData),
})
const profileImg=new FormData();
profileImg.append("avatar",editInPutFile.files[0]);
const avatar= await fetch(`http://localhost:3000/employees/${editEmpData.id}/avatar`,{
    method:"POST",
    body:profileImg
})
if(!employeeApi.ok)
    {
    throw new Error(`${employeeApi.status}`);
    }
    employeeDetails(editEmpData.id)
    closeForms()
    }
catch(error)
    {
        console.log("data not found",error);
    }
}
let editPic = document.getElementById("editProfilePic");
let editInPutFile=document.getElementById("editImgFile");
editInPutFile.onchange=function(){
    editPic.src=URL.createObjectURL(editImgFile.files[0]);
}

    
editErrorMsg=document.getElementsByClassName("editErrorMsg");
// <<----EDIT FROM VALIDATION---->>
function editFormValidation(){
    let mobileValiadtion=(id,index,message)=>{

        if(id.value==""){
            editErrorMsg[index].innerHTML=message;
        }
        else if(!(id.value.length===10)){
            editErrorMsg[index].innerHTML="Mobile number must 10 digit";
        }
        else{
            editErrorMsg[index].innerHTML="";
        }
        }
    let validitationForm = (id,index,message) => {
        if(id.value.trim()===""){
            editErrorMsg[index].innerHTML=message;
            }
        else{
            editErrorMsg[index].innerHTML="";
            }
        }
    let emailValidation = (id,index,message) => {
        let emailregex= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(id.value.trim()===""){
            editErrorMsg[index].innerHTML=message;
            }
        else if(id.value.match(emailregex))
            {
            editErrorMsg[index].innerHTML="";
            }
        else
            {
                editErrorMsg[index].innerHTML="Check email fromat";
            }
        }
    validitationForm(editSalutation,0,"Select salutation");
    validitationForm(editFIrstName,1,"Frist name required");
    validitationForm(editSecondName,2,"Last name required");
    emailValidation(editEmailid,3,"Email required");
    mobileValiadtion(editMobNo,4,"Enter your phone number");
    validitationForm(editUserName,5,"User name required");
    validitationForm(editPassword,6,"Enter password");
    validitationForm(editDob,7,"Date of birth required");
    validitationForm(editQualifiaction,9,"Enter qualification");
    validitationForm(editAddress,10,"Enter address");
    validitationForm(editCountry,11,"Select country ");
    validitationForm(editState,12,"Select state ");
    validitationForm(editCity,13,"Select city ");
    validitationForm(editPinZip,14,"Enter pin/Zip");
    function clearAlert(index){
        editErrorMsg[index].innerHTML="";
        }
    editSalutation.addEventListener("input",()=>clearAlert(0))
    editFIrstName.addEventListener("input",()=>clearAlert(1))
    editSecondName.addEventListener("input",()=>clearAlert(2))
    editEmailid.addEventListener("input",()=>clearAlert(3))
    editMobNo.addEventListener("input",()=>clearAlert(4))
    editUserName.addEventListener("input",()=>clearAlert(5))
    editPassword.addEventListener("input",()=>clearAlert(6))
    editDob.addEventListener("input",()=>clearAlert(7))
    editMale.addEventListener("input",()=>clearAlert(8))
    editFemale.addEventListener("input",()=>clearAlert(8))
    editQualifiaction.addEventListener("input",()=>clearAlert(9))
    editAddress.addEventListener("input",()=>clearAlert(10))
    editCountry.addEventListener("input",()=>clearAlert(11))
    editState.addEventListener("input",()=>clearAlert(12))
    editCity.addEventListener("input",()=>clearAlert(13))
    editPinZip.addEventListener("input",()=>clearAlert(14))
}
document.getElementById("savechanges").addEventListener("click",()=>{
    editFormValidation();
    employeeChanges();
    });
    // <<---DELETE employee --->>
document.getElementById("view-delete_btn").addEventListener("click",deleteEmployee(id))
function deleteEmployee(id){
    document.getElementById("deleteButn").addEventListener("click",()=>{
    try{
        data=fetch(`http://localhost:3000/employees/${id}`,{
        method:"DELETE",
        headers:{'Content-Type': 'application/json'},
        })
    closeForms();
    window.location.href="index.html"
        }
    catch{
        console.log("data not found",error);
        }
        });
    }
