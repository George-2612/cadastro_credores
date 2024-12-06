// Validate form inputs before submitting data
function validateForm(){
    var name = document.getElementById("name").value;
    var cpf = document.getElementById("cpf").value;
    var address = document.getElementById("address").value;
    var setor = document.getElementById("setor").value;
    var data = document.getElementById("data").value;
    var email = document.getElementById("email").value;

    if(name == ""){
        alert("Name is required");
        return false;
    }

    if(cpf == ""){
        alert("Cpf is required");
        return false;
    }
    else if(cpf < 1){
        alert("Cpf must not be zero or less than zero");
        return false;
    }

    if(address == ""){
        alert("Address is required");
        return false;
    }

    if(setor == ""){
        alert("Setor is required");
        return false;
    }

    if(data == ""){
        alert("Data is required");
        return false;
    }

    if(email == ""){
        alert("Email is required");
        return false;
    }
    else if (!email.includes("@")){
        alert("Invalid email address");
        return false;
    }

    return true;
}

// Function to show data from local storage 
function showData(){
    var peoplelist;
    if(localStorage.getItem("peoplelist") == null){
        peoplelist = [];
    }
    else{
        peoplelist = JSON.parse(localStorage.getItem("peoplelist"));
    }

    var html = "";

    peoplelist.forEach(function (element, index){
        html += "<tr>";
        html += "<td>" + element.name + "</td>"; 
        html += "<td>" + element.cpf + "</td>"; 
        html += "<td>" + element.address + "</td>"; 
        html += "<td>" + element.setor + "</td>"; 
        html += "<td>" + element.data + "</td>"; 
        html += "<td>" + element.email + "</td>"; 
        html += '<td><button onclick="deleteData('+index+')" class="btn btn-danger">Delete</button><button onclick="editData('+index+')" class="btn btn-warning m-2">Edit</button></td>';
        html +="</tr>"
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

// Loads all data from local storage when document or page loaded
window.onload = showData; // Corrigido para window.onload

// Function to add data to local storage
function AddData(){
    // if form is validate
    if(validateForm() == true){
        var name = document.getElementById("name").value;
        var cpf = document.getElementById("cpf").value;
        var address = document.getElementById("address").value;
        var setor = document.getElementById("setor").value;
        var data = document.getElementById("data").value;
        var email = document.getElementById("email").value;
        
        var peoplelist;
        if(localStorage.getItem("peoplelist") == null){
            peoplelist = [];
        }
        else{
            peoplelist = JSON.parse(localStorage.getItem("peoplelist"));
        }

        peoplelist.push({
            name: name,
            cpf: cpf,
            address: address,
            setor: setor,
            data: data,
            email: email, 
        });

        localStorage.setItem("peoplelist", JSON.stringify(peoplelist));
        showData();
        
        // Limpar todos os campos após adicionar os dados
        document.getElementById("name").value = "";
        document.getElementById("cpf").value = "";
        document.getElementById("address").value = "";
        document.getElementById("setor").value = "";
        document.getElementById("data").value = "";
        document.getElementById("email").value = "";
    }
}

// Function to delete data from local storage
function deleteData(index){
    var peoplelist;
    if(localStorage.getItem("peoplelist") == null){
        peoplelist = [];
    }
    else{
        peoplelist = JSON.parse(localStorage.getItem("peoplelist"));
    }

    peoplelist.splice(index, 1);
    localStorage.setItem("peoplelist", JSON.stringify(peoplelist));
    showData();
}

// Function to edit data in local storage
function editData(index){
    // Submit button will hide and Update button will show for updating of data in local storage
    document.getElementById("submit").style.display = "none";
    document.getElementById("update").style.display = "block";
    
    var peoplelist;
    if(localStorage.getItem("peoplelist") == null){
        peoplelist = [];
    }
    else{
        peoplelist = JSON.parse(localStorage.getItem("peoplelist"));
    }

    document.getElementById("name").value = peoplelist[index].name;
    document.getElementById("cpf").value = peoplelist[index].cpf;
    document.getElementById("address").value = peoplelist[index].address;
    document.getElementById("setor").value = peoplelist[index].setor;
    document.getElementById("data").value = peoplelist[index].data;
    document.getElementById("email").value = peoplelist[index].email;

    document.querySelector("#update").onclick = function(){
        if(validateForm() == true){
            peoplelist[index].name = document.getElementById("name").value;
            peoplelist[index].cpf = document.getElementById("cpf").value;
            peoplelist[index].address = document.getElementById("address").value;
            peoplelist[index].setor = document.getElementById("setor").value;
            peoplelist[index].data = document.getElementById("data").value;
            peoplelist[index].email = document.getElementById("email").value;

            localStorage.setItem("peoplelist", JSON.stringify(peoplelist));

            showData();
            
            // Limpar todos os campos após atualizar os dados
            document.getElementById("name").value = "";
            document.getElementById("cpf").value = "";
            document.getElementById("address").value = "";
            document.getElementById("setor").value = "";
            document.getElementById("data").value = "";
            document.getElementById("email").value = "";

            // Update button will hide and submit button will show
            document.getElementById("submit").style.display = "block";
            document.getElementById("update").style.display = "none";
        }
    }
}