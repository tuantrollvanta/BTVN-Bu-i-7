function ValidateInput() {
    // debugger
    let formElement = document.querySelector(".form")
    let inputElement = formElement.querySelectorAll(".form-input")
    console.log(inputElement);
    for (let i = 0; i < inputElement.length; i++) {
        if(inputElement[i].value == ""){
            inputElement[i].parentElement.querySelector(".error-message").innerText = "cai nay bat buoc"
        }else{
            inputElement[i].parentElement.querySelector(".error-message").innerText = ""
        }
    }
}

function addNew() {
    ValidateInput();
    let formElement = document.querySelector(".form")
    let errorElement = formElement.querySelectorAll(".error-message")
    let arrErrorElement = [];
    for (let i = 0; i < errorElement.length; i++) {
        arrErrorElement.push(errorElement[i].innerText)
    }
    let checkErrorElement = arrErrorElement.every(value => value == "");
    if (checkErrorElement) {
        let name = document.getElementById("name").value;
        let address = document.getElementById("address").value;
        let listStudent = localStorage.getItem("listStudent") ? JSON.parse(localStorage.getItem("listStudent")): [];
        listStudent.push ({
            name: name,
            address: address,
        })
        localStorage.setItem("listStudent", JSON.stringify(listStudent));
        renderStudent();
    }
}

function removeItem(index) {
    let listStudent = localStorage.getItem("listStudent") ? JSON.parse(localStorage.getItem("listStudent")): [];
    let removed = listStudent.splice(index,1);
    console.log(removed)
    localStorage.removeItem(removed)
    localStorage.setItem("listStudent",JSON.stringify(listStudent));
    renderStudent();
    // debugger
}

function renderStudent() {
    let listStudent = localStorage.getItem("listStudent") ? JSON.parse(localStorage.getItem("listStudent")): [];
    let student = `
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Action</th>
        </tr>
    `
    listStudent.map((value,index) => {
        student +=`
            <tr>
                <td>${index + 1}</td>
                <td>${value.name}</td>
                <td>${value.address}</td>
                <td>
                    <button onclick='EditStudent(${index})'>Edit</button>
                    <button onclick='removeItem(${index})'>Delete</button>
                </td>
            </tr>
        `
    })
    document.getElementById("tablecontent").innerHTML = student;
}

function EditStudent (index) {
    let listStudent = localStorage.getItem("listStudent") ? JSON.parse(localStorage.getItem("listStudent")): [];
    document.getElementById("name").value = listStudent[index].name;
    document.getElementById("address").value = listStudent[index].address;

    document.getElementById("index").value = index
    document.getElementById("save").style.display = "inline-block"
    document.getElementById("add").style.display = "none"
}

function changeStudent () {
    let listStudent = localStorage.getItem("listStudent") ? JSON.parse(localStorage.getItem("listStudent")): [];
    let index = document.getElementById("index").value;
    listStudent[index] = {
        name : document.getElementById("name").value,
        address: document.getElementById("address").value,
    }
       
    
    localStorage.setItem("listStudent",JSON.stringify(listStudent));
    renderStudent();
    // debugger;
    document.getElementById("save").style.display = "none"
    document.getElementById("add").style.display = "inline-block"

}

