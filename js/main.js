var siteName = document.getElementById('siteName');
var siteURL = document.getElementById('siteURL');
var dataList = [];
if(localStorage.getItem('Data') != null){
    dataList = JSON.parse(localStorage.getItem('Data'));
    displayData()
}

function addData(){
    if(validationName()== true && validationUrl()==true){
        var site ={
            name:siteName.value,
            url:siteURL.value,
        }
        dataList.push(site);
        localStorage.setItem('Data', JSON.stringify(dataList))
        clearData();
        siteName.classList.remove('is-valid')
        siteURL.classList.remove('is-valid')
        document.getElementById('button').removeAttribute('data-bs-toggle')
        document.getElementById('button').removeAttribute('data-bs-target')

        displayData();
    }else{
        document.getElementById('button').setAttribute('data-bs-toggle', "modal"); 
        document.getElementById('button').setAttribute('data-bs-target',"#exampleModal"); 
    }
}
function clearData(){
    siteName.value = '' ;
    siteURL.value = '' ;
}
function displayData(){
    var data = '';
    for(var i =0 ; i<dataList.length ; i++ ){
        data += `
        <tr>
            <td>${i+1}</td>
            <td>${dataList[i].name}</td>
            <td><button class="btn btn-1 text-white"><a href="${dataList[i].url}" class = "text-decoration-none text-white" target="_blank"><i class="fa-regular fa-eye pe-2"></i>Visit</a></button></td>
            <td><button onclick = "deletItem(${i})" class="btn btn-2 text-white"><i class="fa-solid fa-trash-can pe-2 text-white"></i>Delete</button></td>
        </tr>
        `
    }
    document.getElementById('tableBody').innerHTML = data
}

function deletItem(index){
    dataList.splice(index , 1)
    localStorage.setItem('Data', JSON.stringify(dataList))
    displayData()
}
/// regex
function validationName(){
    var text = siteName.value;
    var regexName = /^\w{3,}$/
    if(regexName.test(text)){
        siteName.classList.add("is-valid")
        siteName.classList.remove("is-invalid")
        document.getElementById('button').removeAttribute('data-bs-toggle')
        document.getElementById('button').removeAttribute('data-bs-target')
        return true;


    }else{
        siteName.classList.add("is-invalid")
        siteName.classList.remove("is-valid")
       
        return false;

    }

}
function validationUrl(){
    var url = siteURL.value;
    var regexUrl = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)$/
    if(regexUrl.test(url)){
        siteURL.classList.add("is-valid")
        siteURL.classList.remove("is-invalid")
        document.getElementById('button').removeAttribute('data-bs-toggle')
        document.getElementById('button').removeAttribute('data-bs-target')
        return true;
    }else{
        siteURL.classList.add("is-invalid")
        siteURL.classList.remove("is-valid")
        return false;
    }
}
