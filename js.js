


// const form = document.getElementById('form');
const title = document.getElementById('title');
const author = document.getElementById('author');
const price = document.getElementById('price');
const pub = document.getElementById('pub');
const language = document.getElementById('language');
//const genre = document.getElementById('genre');
const genre = document.querySelectorAll('input[name="fav_language"]');
const email = document.getElementById('email');

const errorElementTitle = document.getElementById('error1')
const errorElementAuthor = document.getElementById('error2')
const errorElementPrice = document.getElementById('error3')
const errorElementPub = document.getElementById('error4')
const errorElementLanguage = document.getElementById('error5')
const errorElementGenre = document.getElementById('error6')
const errorElementEmail = document.getElementById('error7')


var StoredBooks = [];
var noValid = 0 ;





// book class: represents a book 
class Book {
    constructor(title, author, price, pub, language, genre, email){
     this.title = title;
     this.author = author;
     this.price = price;
     this.pub = pub;
     this.language = language;
     this.genre = genre;
     this.email = email;
     
    }
    DetailOuvrage() {
        return ("the" + title + "book is a" + genre + "in" + language  + "written by" + author +  "and published on" + pub + ". The price of" + title+ ", is"  + price + "DHs")
    }
}


var listBook = JSON.parse(localStorage.getItem("listBook"));
    if(listBook!=null){
        for(i=0;i<listBook.length;i++){
            var ouvrage = new Book(StoredBooks[i].title, StoredBooks[i].author, StoredBooks[i].Price, StoredBooks[i].pub, StoredBooks[i].language, StoredBooks[i].genre, StoredBooks[i].email);
            StoredBooks.push(ouvrage);
        }
    }






// title    handling of title
form.addEventListener('submit', (e) => { //check the entered data (validtion)
    let message = []   //stocks the errors
    if(title.value === '' ) {  //if user let title blank an error will appear 
        message.push('you have to enter a title*')
    }
    if(title.value.length >= 30 ) {
        message.push('title must be less than 30 character*')
    }
    if(message.length > 0 ) {
        e.preventDefault()  //to stop browser from executing a function 
        errorElementTitle.innerText = message.join(',')  //skip and jump to another error
    }
})
// author

form.addEventListener('submit', (e) => {
    let message = []
    if(author.value === '' ) {
        message.push('you have to enter a name*')
    }
    if(author.value.length >= 30 ) {
        message.push('name must be less than 30 character*')
    }
    if(message.length > 0 ) {
        e.preventDefault()
        errorElementAuthor.innerText = message.join(',')
    }
})
// price
// var  regexPrice=/^((\d{1,3}|\s){1})((,\d{3}|\d))(\s|.(\d{2}))$/
var regexPrice=/^((\d+\.{0.1}))$/
form.addEventListener('submit', (e) => {
    let message = []
    if(price.value === '' ) {
        
        message.push('please enter the price*')
    }

    if(message.length > 0 ) {
        e.preventDefault()
        errorElementPrice.innerText = message.join(',')
    }
    if(regexPrice.test(price.value)){
        Float(price.delete(".").gsub(",", "."))
        errorElementPrice.innerHTML="✔"
        price.style.border="green"
      }
})


// form.addEventListener("submit", (e) => {
 
//       let messages = [];


//     if(price.value !=="" ){
//       Float(price.delete(".").gsub(",", "."))
//         if(regexPrice.test(price.value)){
//           errorPrice.innerHTML="✔"
//           price.style.border="green"
//         }
//         else{
//           errorPrice.innerHTML="please enter price without /^(((\w+)(.)(\w+))|((\w+)))(@)(\w+)(.)(\w+)$/ "
//             no_valide++;
//         }
//     }else{
//       errorPrice.innerHTML="The Title field is not filled out"
//         no_valide++;
//     }

// publication date
form.addEventListener('submit', (e) => {
    let message = []
    if(pub.value === '' ) {
        message.push('you have to enter a date*')
    }
    
    if(message.length > 0 ) {
        e.preventDefault()
        errorElementPub.innerText = message.join(',')
    }
})
// language
form.addEventListener('submit', (e) => {
    let message = []
    if(language.value === '' ) {
        message.push('you have to chose a language*')
    }
   
    if(message.length > 0 ) {
        e.preventDefault()
        errorElementLanguage.innerText = message.join(',')
    }
})
//email

form.addEventListener("submit", (e) => {
//   let messages = [];
    var  regexEmail= /^[a-z\d\.]+@[a-z\d]+\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
    if(email.value !=="" )
        if(regexEmail.test(email.value)){
            errorElementEmail.innerHTML=""
            
        }
        else{
            errorElementEmail.innerHTML="please enter a correct email form "

            
        }
       else{
            errorElementEmail.innerHTML="This field is not filled out*"
                
            }
            
            // var emailRegex = new RegExp(/^[a-z\d\.]+@[a-z\d]+\.([a-z]{2,8})(\.[a-z]{2,8})?$/);
            // let checkEmail = email.value;
            // var valid = emailRegex.test(checkEmail);


});





// genre  !!!!!!!!!!!!!!!!!!!!!!!

const hhhhh = document.getElementsByClassName('f')

form.addEventListener('submit', (e) => {
    let message = []
    if (!(hhhhh[0].checked || hhhhh[1].checked || hhhhh[2].checked || hhhhh[3].checked || hhhhh[4].checked || hhhhh[5].checked || hhhhh[6].checked || hhhhh[7].checked || hhhhh[8].checked )) {
        errorElementGenre.innerHTML = 'you have to chose a category*'
        
    }
   
    else{
        errorElementGenre.innerHTML="Good"
        errorElementGenre.style.color ="#d6a5b5";
     }
})







//the taaable
var selectedRow = null

function onFormSubmit(){
    // if (ValidityState()){    
    var formData = readFormData();
    if(selectedRow == null)
        insertNewRecord(formData);
    else 
    {
        updateRecord(formData);
        selectedRow = null;
    }
        // insertNewRecord(formData);
    resetForm();
    //  }
}

function readFormData(){
    var formData = {};
    formData["title"] = document.getElementById("title").value;
    formData["author"] = document.getElementById("author").value;
    formData["price"] = document.getElementById("price").value;
    formData["pub"] = document.getElementById("pub").value;
    formData["language"] = document.getElementById("language").value;
    formData["genre"] = document.querySelector('input[name="fav_language"]:checked').value;
    formData["email"] = document.getElementById("email").value;
    return formData;
}

var tbody=document.getElementById("book-list")
// var genreSelected = document.querySelector('input[name="fav_language"]:checked').value;
function insertNewRecord() {
    var genreSelected = document.querySelector('input[name="fav_language"]:checked').value;
    var newBook = new Book(title.value, author.value, price.value, pub.value, language.value, genreSelected, email.value );
    StoredBooks.push(newBook);


    tbody.innerHTML=""

    var table = document.getElementById("table").getElementsByTagName('tbody')[0];
    
    for(i=0; i< StoredBooks.length; i++){
        var newRow = tbody.insertRow(table.length);

        cell0 = newRow.insertCell(0);
        cell0.innerHTML =StoredBooks[i].title;

        cell1 = newRow.insertCell(1);
        cell1.innerHTML = StoredBooks[i].author;

        cell2 = newRow.insertCell(2);
        cell2.innerHTML = StoredBooks[i].price;

        cell3 = newRow.insertCell(3);
        cell3.innerHTML = StoredBooks[i].pub;

        cell4 = newRow.insertCell(4);
        cell4.innerHTML = StoredBooks[i].language;

        cell5 = newRow.insertCell(5);
        cell5.innerHTML = StoredBooks[i].genre;
        
        cell6 = newRow.insertCell(6);
        cell6.innerHTML = StoredBooks[i].email;

        cell7 = newRow.insertCell(7);
        cell7.innerHTML =  `<button onClick='onEdit(this)'>Edit</button>
        <button onClick='onDelete(this)'>Delete</button>`;
    }

    
}
form.addEventListener("submit", (e) => {
    if (noValid==0){
    //     //   var xType=""
    //     //   for(i=0;i< Type.length;i++)
    //     //    {
    //     //      if(Type[i].checked)
    //     //      {
    //     //       xType=Type[i].value;
    //     //      }
    //     //    }
      
    //   var mybook =new Book (title.value, author.value, price.value, pub.value, language.value, genreSelected, email.value)
    //   StoredBooks.push(mybook)
    //   localStorage.setItem("listBook",JSON.stringify(StoredBooks));
    //   tbody.innerHTML="";
    //   insertNewRecord();
    //   resetForm();
    onFormSubmit();
  
    }
    });
//infooooosssssss
function resetForm() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("price").value = "";
    document.getElementById("pub").value = "";
    document.getElementById("language").value = "";
    document.getElementById("genre").value = "";

    // selectedRow = null;
}


//when editing
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById('title').value = selectedRow.cells[0].innerHTML;
    document.getElementById('author').value = selectedRow.cells[1].innerHTML;
    document.getElementById('price').value = selectedRow.cells[2].innerHTML;
    document.getElementById('pub').value = selectedRow.cells[3].innerHTML;
    document.getElementById('language').value = selectedRow.cells[4].innerHTML;
    document.getElementById('genre').value = selectedRow.cells[5].innerHTML;
    document.getElementById('email').value = selectedRow.cells[6].innerHTML;
}


function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.title;
    selectedRow.cells[1].innerHTML = formData.author;
    selectedRow.cells[2].innerHTML = formData.price;
    selectedRow.cells[3].innerHTML = formData.pub;
    selectedRow.cells[4].innerHTML = formData.language;
    selectedRow.cells[5].innerHTML = formData.genre;
    selectedRow.cells[6].innerHTML = formData.email;
}

//when u want to delete ur infos

function onDelete(td) {
    if(confirm('do u really want to delete this ?')){
        row = td.parentElement.parentElement;
        document.getElementById("table").deleteRow(row.rowIndex);
        
    }
    resetForm();

}





let pr = document.getElementById('pr')
pr.addEventListener('click', function() {
    window.print(), id='="noPrint"'
})









// function validate() {
//     isValid = true;
//     if (document.getElementById("title").value == "") {
//         isValid = false;
//         document.getElementById("first").classList.remove("hide");
//     } else {
//         isValid = true;
//         if(!document.getElementById("title").classList.contains("hide"))
//             document.getElementById("title").classList.add("hide");
//     }
//     return isValid;
// } 

// let submit1 = document.getElementById('btn')
// submit1.addEventListener("click", onFormSubmit);

















// var title = document.getElementById('title');
// var author = document.getElementById('author');
// var price = document.getElementById('price');
// var pub = document.getElementById('pub');
// var language = document.getElementById('language');
// var genre = document.getElementById('genre');


//  function btn(){
//      var table = document.getElementById('table')
//      var row = table.insertRow(-1);
//      var title = row.insertCell(0);
//      var author = row.insertCell(1);
//      var price = row.insertCell(2);
//      var pub = row.insertCell(3);
//      var language = row.insertCell(4);
//      var genre = row.insertCell(5);

//  }
