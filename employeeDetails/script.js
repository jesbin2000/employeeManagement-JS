function addForm(){
    const addPage = document.getElementById("addEmployeeFrom");
    addPage.style.setProperty('display','flex','important');
    }
function editForm(){
    const editPage = document.getElementById("editEmployeeFrom");
    editPage.style.setProperty('display','flex','important');
}
function deleteForm(){
    const deletePage = document.getElementById("deleteSection");
    deletePage.style.setProperty('display','flex','important');
}
function closeForms(){
    document.getElementById("dataform").reset();
    const viewPage = document.getElementById("addEmployeeFrom");
    viewPage.style.setProperty('display','none','important');
    const editPage = document.getElementById("editEmployeeFrom");
    editPage.style.setProperty('display','none','important');
    const deletePage = document.getElementById("deleteSection");
    deletePage.style.setProperty('display','none','important');
}
var dataArray=[];
async function employeeDetails(){
    try{
        const employeeApi = await fetch("http://localhost:3000/employees");
        const employeeData =await employeeApi.json();
        dataArray=employeeData;
        dataArray.reverse();
        // displayEmpList(dataArray);
        pages(dataArray)
    }
    catch(error){
        console.log(error);
    }
}
employeeDetails();

function displayEmpList(employeenData,srNo){
    let dataList=""
    employeenData.map((data)=>{
        dataList += `<tr>
        <td>#${srNo+1}</td>
        <td><img id="profileImg" src="http://localhost:3000/employees/${data.id}/avatar"width="45px" width="45px" style="border-radius:40%;margin-right: 5px;">${data.salutation}${data.firstName} ${data.lastName}</td>
        <td>${data.email}</td>
        <td>${data.phone}</td>
        <td>${data.gender}</td>
        <td>${data.dob}</td>
        <td>${data.country}</td>
        <td><div class="dropdown">
            <button class="btn p-1 bg-light" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown"><i class="fa-solid fa-ellipsis"></i></button>
            <ul class="dropdown-menu rounded-3" aria-labelledby="dropdownMenuButton1">
                <li id="viewEmployeeBtn" ><a class="dropdown-item text-secondary" href="profile.html?id=${data.id}" ><i class="fa-regular fa-eye me-1"></i> view</a></li>
                <li id="editEmployeeBtn" onclick="editEmployee('${data.id}')"><a class="dropdown-item text-secondary" href="#"><i class="fa-solid fa-pen-to-square me-1"></i> edit</a></li>
                <li id="deleteEmployeeBtn" onclick="deleteEmployee('${data.id}')"><a class="dropdown-item text-secondary" href="#"><i class="fa-solid fa-trash me-2"></i>Delete</a></li>
            </ul>
        </div>
    </td>
    </tr>`
   
    srNo++;
    document.getElementById("tableBody").innerHTML = dataList;
    })
}


//-<<--ADD EMPLOYEE-->>-


const firstName = document.getElementById("addFirstName");
const secondName = document.getElementById("addLastName");
const emailid = document.getElementById("addEmail");
const mobNo = document.getElementById("addPhNo");
const salutation = document.getElementById("addSalutation");
const userName = document.getElementById("addUserId");
const password = document.getElementById("addPassWord");
const DOB = document.getElementById("addDOB");
const male = document.getElementById("flexRadioDefault1");
const female = document.getElementById("flexRadioDefault2");
const qualifiaction = document.getElementById("addQualification");
const address = document.getElementById("addAddress");
const country = document.getElementById("addCountry");
const state = document.getElementById("addState");
const city = document.getElementById("addCity");
const pinZip = document.getElementById("addPinZip");

function  datebirth(DOB){ //<<---DATE REVERSE
    var date =DOB.value;
    date = date.split("-").reverse().join("-");
    return date;
    }
//-<<--preview-->>-

let profilePic = document.getElementById("ProfilePic");
let inPutFile=document.getElementById("imgFile");
inPutFile.onchange=function(){
    profilePic.src=URL.createObjectURL(inPutFile.files[0]);
    }
//-<<--POST EMPLOYEE DATA-->>-

let empData;
async function addEmployee(){
    try{
        empData={
            salutation:salutation.value,
            firstName:firstName.value,
            lastName:secondName.value,
            email:emailid.value,
            phone: mobNo.value,
            dob: datebirth(DOB),
            gender:male.checked?male.value:female.value,
            qualifications:qualifiaction.value,
            address: address.value,
            city:city.value,
            state:state.value,
            country: country.value,
            username: addUserId.value,
            password: password.value,
            pinZip:pinZip.value,
        };
        const employeeApi = await fetch("http://localhost:3000/employees",{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(empData),
        })
        if(!employeeApi.ok)
        {
            throw new Error(`${employeeApi.status}`)
        }
        const employeeData= await employeeApi.json();
        let avatarId=employeeData.id;
        // console.log(employeeData);
        // console.log(avatarId);
        const profileImg=new FormData();
        profileImg.append("avatar",inPutFile.files[0]);
        await fetch(`http://localhost:3000/employees/${avatarId}/avatar`,{
            method:"POST",
            body:profileImg
        })
        // window.location.reload();
        empData.id=avatarId;
        dataArray.unshift(empData)
        displayEmpList(dataArray);
        Pagination(0);
        closeForms();
}
    catch(error)
    {
        console.log("data not found",error);
    }
}
//-<<--Validation Add Employee-->>-
errorMsg=document.getElementsByClassName("error_msg");
function formValidation(){
let mobileValiadtion=(id,index,message)=>{
    if(id.value==""){
        errorMsg[index].innerHTML=message;
    }
    else if(!(id.value.length===10)){
        errorMsg[index].innerHTML="Mobile number must 10 digit";
    }
    else{
        errorMsg[index].innerHTML="";
    }
    }
let genderValidation = (index,message) => {
    if(!male.checked==true && !female.checked==true){
        errorMsg[index].innerHTML=message;
    }
    else if(male.checked==true || female.checked==true){
        errorMsg[index].innerHTML="";
    }
    }
let validitationForm = (id,index,message) => {
    if(id.value.trim()===""){
        errorMsg[index].innerHTML=message;
        }
    else{
        errorMsg[index].innerHTML="";
        }
    }
let emailValidation = (id,index,message) => {
    let emailregex= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(id.value.trim()===""){
        errorMsg[index].innerHTML=message;
        }
    else if(id.value.match(emailregex))
        {
        errorMsg[index].innerHTML="";
        }
    else
        {
            errorMsg[index].innerHTML="Check email fromat";
        }
    }

validitationForm(salutation,0,"Select salutation"),
validitationForm(firstName,1,"Frist name required"),

validitationForm(secondName,2,"Last name required"),
emailValidation(emailid,3,"Email required"),
mobileValiadtion(mobNo,4,"Enter your phone number"),
validitationForm(userName,5,"User name required"),
validitationForm(password,6,"Enter password"),
validitationForm(DOB,7,"Date of birth required"),
genderValidation(8,"Gender is required"),
validitationForm(qualifiaction,9,"Enter qualification "),
validitationForm(address,10,"Enter address"),
validitationForm(country,11,"Select country "),
validitationForm(state,12,"Select state "),
validitationForm(city,13,"Select city "),
validitationForm(pinZip,14,"Enter pin/Zip")

function clearAlert(index){
    errorMsg[index].innerHTML="";
    }

salutation.addEventListener("input",()=>clearAlert(0))
firstName.addEventListener("input",()=>clearAlert(1))
secondName.addEventListener("input",()=>clearAlert(2))
emailid.addEventListener("input",()=>clearAlert(3))
mobNo.addEventListener("input",()=>clearAlert(4))
userName.addEventListener("input",()=>clearAlert(5))
password.addEventListener("input",()=>clearAlert(6))
DOB.addEventListener("input",()=>clearAlert(7))
male.addEventListener("input",()=>clearAlert(8))
female.addEventListener("input",()=>clearAlert(8))
qualifiaction.addEventListener("input",()=>clearAlert(9))
address.addEventListener("input",()=>clearAlert(10))
country.addEventListener("input",()=>clearAlert(11))
state.addEventListener("input",()=>clearAlert(12))
city.addEventListener("input",()=>clearAlert(13))
pinZip.addEventListener("input",()=>clearAlert(14))


}
document.getElementById("addFormBtn").addEventListener("click",()=>{
    formValidation();
    addEmployee();
});
//<<---Delete Employee-->>
function deleteEmployee(empId){
    deleteForm();
    deleteButn.addEventListener("click",()=>{
    try{
        data=fetch(`http://localhost:3000/employees/${empId}`,{
        method:"DELETE",
        headers:{'Content-Type': 'application/json'},
    })
    closeForms();
    // window.location.reload();
    // console.log(empId);
    dataArray.filter((element,index)=>{
        if(empId===element.id){
            dataArray.splice(index,1);
            pages(currentPage);
            pages(dataArray);
            
        }
    })
    }
    catch{
        console.log("data not found",error);
        }
    });
}

// <<---EDIT EMPLOYEE--->>

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
let employeId;
async function editEmployee(empId){
    editForm();
    // console.log(empId);
    try{
    let employeeApi = await fetch(`http://localhost:3000/employees/${empId}`)
    data = await employeeApi.json();
    // console.log(data)
    editPic.src=(`http://localhost:3000/employees/${data.id}/avatar`);
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
        // console.log(editEmpData.id);
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
    dataArray.filter((element,index)=>{
        if(editEmpData.id===element.id){
            dataArray.splice(index,1,editEmpData);
            pages(dataArray);
            Pagination(currentPage)
        };
    })
    closeForms();
    // window.location.reload();
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

//<<--Pagination Employee LIst -->>}
let currentPage;
let noOfEmp;
function pages(dataArray){
    let empNo=document.getElementById("selcetProfileNo").value
    noOfEmp=Number(empNo)
    // console.log(dataArray);
    noOfPages=Math.ceil(dataArray.length/noOfEmp );
    // console.log(noOfPages);
    let pagecreated="";
    for(currentPage=0;currentPage<noOfPages;currentPage++){
        
        pagecreated +=`<li class="page-item p-1 position-static"><button class="page-link text-dark rounded" href="#" onclick="Pagination(${currentPage})">${currentPage+1}</button></li>`
    }
    document.getElementById("page_no").innerHTML= pagecreated;
    Pagination(0);
}
document.getElementById("selcetProfileNo").addEventListener("click",()=>{
    pages(dataArray);
    // dataArray.reverse();
});
function Pagination(currentPage) {
    pageArray=[];
    console.log("pagination list number",noOfEmp)
    let start=currentPage;
    console.log("pagination button click number",start);
    let empStart=start*noOfEmp;
    console.log(empStart);
    for(i=empStart;i<(empStart+noOfEmp);i++){
        if(dataArray[i]==null){
            break;
        }else{
            pageArray.push(dataArray[i]);
        }
    }
    function nextPage(){
        if(currentPage < noOfPages-1){
            currentPage++;
            Pagination(currentPage);
        }
    }
    document.getElementById("nextbutn").addEventListener("click",nextPage);
    function preview(){
        if(currentPage>0){
            currentPage--;
            Pagination(currentPage);
        }
    }
    document.getElementById("preview-butn").addEventListener("click",preview);
    displayEmpList(pageArray,empStart);
}



// SEARCH EMPLOYEE

let input = document.getElementById("search");
function searchTable() {
    var filter, found, table, tr, td, i, j;
    displayEmpList(dataArray,0);
    filter = input.value.toUpperCase();
    table = document.getElementById("tableData");
    tr = table.getElementsByTagName("tr")
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length; j++) {
            if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                found = true;
            }
        }
        if (found) {
            tr[i].style.display = "";
            found = false;
        } else {
            tr[i].style.display = "none";
        }
    }
}
document.getElementById("search").addEventListener("input",()=>{
    if(input.value.trim()==""){
        Pagination(0);
    }else{
        searchTable();
    }
})