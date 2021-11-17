console.log("hello world");

const api_url_1 = "https://reqres.in/api/users?page=1";
const api_url_2 = "https://reqres.in/api/users?page=2";
let incoming_table=[]
let employee_table = [];
let id = [];
// let fullName = [];
// let first_name = [];
// let last_name = [];
// let email = [];
// let avatar = [];

function createRows(employee) {
   var eid, idText, name, nameText, email, emailText;
   let profileContainer = document.createElement("div");
   profileContainer.className = "profile-container";
   profileContainer.id = employee.id;

   //Profile-picture
   pic = document.createElement("img");
   pic.className = "profile-picture";
   picSrc = document.createAttribute("src");
   picSrc.value = employee.avatar;
   pic.setAttributeNode(picSrc);
   let altText = document.createAttribute("alt");
   altText.value = "Image not available";
   pic.setAttributeNode(altText);
   profileContainer.appendChild(pic);

   // name
   name = document.createElement("p");
   name.className = "name";
   nameText = document.createTextNode(
      employee.first_name + " " + employee.last_name
   );
   name.appendChild(nameText);
   profileContainer.appendChild(name);

   // ID
   
   eid = document.createElement("p");
   eid.className = "id";
   idText = document.createTextNode("ID:  " + employee.id);
   eid.appendChild(idText);
   profileContainer.appendChild(eid);

   //email

   email = document.createElement("p");
   email.className = "email";
   emailText = document.createTextNode("E-mail:  " + employee.email);
   email.appendChild(emailText);
   profileContainer.appendChild(email);

   //Delete icon
   let icon= document.createElement("span");
   icon.setAttribute("name",employee.id)   
   icon.setAttribute("onclick", "deleteEMP(event)")
   icon.className= "material-icons-round";
   let iconText= document.createTextNode("person_remove")
   icon.appendChild(iconText)
   profileContainer.appendChild(icon)
   

   const element = document.getElementById("container");
   element.appendChild(profileContainer);
}

function fetchDataAndCreateRows(url) {
   fetch(url)
      .then((response) => response.json())
      .then((employeeData) => {
         incoming_table = employeeData.data;

         incoming_table.forEach((employee) => {
            employee_table.push(employee)
            id.push(employee.id);
            // first_name.push(employee.first_name);
            // last_name.push(employee.last_name);
            // fullName.push(employee.first_name + " " + employee.last_name);
            // email.push(employee.email);
            // avatar.push(employee.avatar);

             createRows(employee);
         });       
      });
}
fetchDataAndCreateRows(api_url_1);
fetchDataAndCreateRows(api_url_2);

// ********
// employee_table.map((employee)=>{
//    createRows(employee)
// })
// **********

let deleteEmployee = () => {
   let EmployeeId = document.getElementById("empid").value;
   document.getElementById("empid").value = "";
   let emp = document.getElementById(EmployeeId);
   emp.remove();
   let index = id.indexOf(+EmployeeId);
   if (index != -1) {
      id.splice(index, 1);
      fullName.splice(index, 1);
      first_name.splice(index, 1);
      last_name.splice(index, 1);
      email.splice(index, 1);
      avatar.splice(index, 1);
   }
};
let createEmployee = () => {
   let emp = {};
   emp.avatar = document.getElementById("ImageInput").value;
   console.log(emp.avatar + "**");
   emp.first_name = document.getElementById("FirstNameInput").value;
   emp.last_name = document.getElementById("LastNameInput").value;
   emp.id = document.getElementById("IDInput").value;
   emp.email = document.getElementById("EmailInput").value;
   _createEmployee(emp);
};

let _createEmployee = (emp) => {
   let index = id.indexOf(+emp.id);
   if (index != -1) {
      console.log("Employee ID already existed");
      return "Employee ID already existed";
   }
   employee_table.push(emp)
   id.push(+emp.id);
   // first_name.push(emp.first_name);
   // last_name.push(emp.last_name);
   // fullName.push(emp.first_name + " " + emp.last_name);
   // email.push(emp.email);
   // avatar.push(emp.avatar);

   createRows(emp);
};

let deleteEMP =(event)=>{
   let element=event.target.getAttribute('name')   
   let emp = document.getElementById(element);  
   emp.remove();   
   let index = id.indexOf(+element);
   console.log(employee_table[index]);
      employee_table.splice(index,1)
      id.splice(index, 1);
      // fullName.splice(index, 1);
      // first_name.splice(index, 1);
      // last_name.splice(index, 1);
      // email.splice(index, 1);
      // avatar.splice(index, 1);   
    console.log(employee_table);
}

let updateEmployee =()=>{
   let idToBeUpdated = document.getElementById("UpdateIDInput").value;
   let index = id.indexOf(+idToBeUpdated)
   if(index!==-1)
   // if(idToBeUpdated >=1 && idToBeUpdated<= employee_table.length)
   {
      let newImage = document.getElementById("UpdateImageInput").value;
      document.getElementById("UpdateImageInput").value="";
   let newFirstName = document.getElementById("UpdateFirstNameInput").value;
   document.getElementById("UpdateFirstNameInput").value="";
   let newLastName = document.getElementById("UpdateLastNameInput").value;
   document.getElementById("UpdateLastNameInput").value="";
   let newEmail = document.getElementById("UpdateEmailInput").value;
   document.getElementById("UpdateEmailInput").value="";
   let index = id.indexOf(+idToBeUpdated)

   employee= employee_table[index]
   console.log(`OLD DETAILS `,employee);
   employee.avatar=newImage || employee.avatar
   employee.first_name=newFirstName  || employee.first_name
   employee.last_name=newLastName || employee.last_name
   employee.email=newEmail || employee.email
  
document.getElementById(idToBeUpdated).children[0].src= newImage || document.getElementById(idToBeUpdated).children[0].src 
document.getElementById(idToBeUpdated).children[1].innerText=`${newFirstName ||employee.first_name } ${newLastName || employee.last_name}`
document.getElementById(idToBeUpdated).children[2].innerText=`ID: ${idToBeUpdated}`
document.getElementById(idToBeUpdated).children[3].innerText=`Email: ${newEmail || employee.email }`

   console.log(`NEW DETAILS `, employee);
}else{
   console.error("enter valid ID")
}
   

   
}
