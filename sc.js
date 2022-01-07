const form = document.getElementById('form');
const title = document.getElementById('title');
const author = document.getElementById('author');
const price = document.getElementById('price');
const pub = document.getElementById('pub');
const language = document.getElementById('language');
const genre = document.querySelectorAll('input[name="fav_language"]');
const email = document.getElementById('email');
const errorElementTitle = document.getElementById('error1')
const errorElementAuthor = document.getElementById('error2')
const errorElementPrice = document.getElementById('error3')
const errorElementPub = document.getElementById('error4')
const errorElementLanguage = document.getElementById('error5')
const errorElementGenre = document.getElementById('error6')
const errorElementEmail = document.getElementById('error7')
const tbody = document.getElementById("book-list")
const details = document.getElementById('details')
// const pr = document.getElementById('pr')
var StoredBooks = []
var noValid = 0
var selectedRow = null

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
        // return ("the" + title + "book is a" + genre + "in" + language  + "written by" + author +  "and published on" + pub + ". The price of" + title+ ", is"  + price + "DHs")
        return(`The ${this.title} book is a ${this.genre}  in ${this.language} written by  ${this.author}  and published on ${this.pub} . The price of ${this.title}  is  ${this.price} DHs.`)
        
    }
}

//localStorage.removeItem("listBook")

// get localStorage
var listBook = JSON.parse(localStorage.getItem("listBook"));
if(listBook!=null){
    for(i=0;i<listBook.length;i++){
        var ouvrage = new Book(listBook[i].title, listBook[i].author, listBook[i].price, listBook[i].pub, listBook[i].language, listBook[i].genre, listBook[i].email);
        StoredBooks.push(ouvrage);
    }
    tri()
    loadData();
}


// data validation
function formValidation() {
    // title
    let message = []   //stocks the errors
    if(title.value === '' ) {  //if user let title blank an error will appear 
        message.push('you have to enter a title*')
    }
    if(title.value.length >= 30 ) {
        message.push('title must be less than 30 character*')
    }
    if(message.length > 0 ) {
        errorElementTitle.innerText = message.join(',')  //skip and jump to another error
        noValid++
    }

    // author
    message = [];
    if(author.value === '' ) {
        message.push('you have to enter a name*')
    }
    if(author.value.length >= 30 ) {
        message.push('name must be less than 30 character*')
    }
    if(message.length > 0 ) {
        errorElementAuthor.innerText = message.join(',')
        noValid++
    }

    // price
    // var  regexPrice=/^((\d{1,3}|\s){1})((,\d{3}|\d))(\s|.(\d{2}))$/
    var regexPrice=/^[0-9]+\.[0-9]{2}$/;
    message = []
    if(price.value === '' ) {
        message.push('please enter the price*')
    }
    if(message.length > 0 ) {
        errorElementPrice.innerText = message.join(',')
        noValid++
    }
    if(regexPrice.test(price.value)){
        Float(price.delete(".").gsub(",", "."))
        errorElementPrice.innerHTML="✔"
        price.style.border="green"
    }

    // publication date
    message = []
    if(pub.value === '' ) {
        message.push('you have to enter a date*')
    }    
    if(message.length > 0 ) {
        errorElementPub.innerText = message.join(',')
        noValid++
    }

    // language
    message = []
    if(language.value === '' ) {
        message.push('you have to chose a language*')
    }
    if(message.length > 0 ) {
        errorElementLanguage.innerText = message.join(',')
        noValid++
    }

    //email

    var email_check = /\w+@gmail\.com/;
            var email_check2 = /\s/;
            if(!email_check.test(email.value) && email.value!=""){
                if(email_check2.test(email.value)){
                    
                }
                noValid++;
                email.style.borderColor = "red";
                email.nextElementSibling.innerHTML = "Invalid email format";
                email.nextElementSibling.style.color = "red";
            }
            else{
                email.style.borderColor = "green";
                email.nextElementSibling.style.color = "green";
                email.nextElementSibling.innerHTML = "ok!";
            }


    // var regexEmail= /^[a-z\d\.]+@[a-z\d]+\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
    // if(email.value !== "" ){
    //     if(regexEmail.test(email.value)){
    //         errorElementEmail.innerHTML=""      
    //     }
    //     else{
    //         errorElementEmail.innerHTML="please enter a correct email form "
    //         noValid++
    //     }
    // }
    // else{
    //     errorElementEmail.innerHTML="This field is not filled out*"
    //     noValid++
    // }
        
    // genre
    const hhhhh = document.getElementsByClassName('f')
    message = []
    if (!(hhhhh[0].checked || hhhhh[1].checked || hhhhh[2].checked || hhhhh[3].checked || hhhhh[4].checked || hhhhh[5].checked || hhhhh[6].checked || hhhhh[7].checked || hhhhh[8].checked )) {
        errorElementGenre.innerHTML = 'you have to chose a category*' 
        noValid++
    }
    else{
        errorElementGenre.innerHTML="Good"
        errorElementGenre.style.color ="#d6a5b5";
    }

    if(noValid==0)
        return true
    
    return false;
}

// get form data
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

// reset form
function resetForm() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("price").value = "";
    document.getElementById("pub").value = "";
    document.getElementById("language").value = "";
    document.querySelector('input[name="fav_language"]:checked').checked = false;
    document.getElementById("email").value = "";
}


function loadData() {
    tbody.innerHTML = ""
    
    for(i=0; i< StoredBooks.length; i++){
        var newRow = tbody.insertRow();

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

// insert new row in html table
function insertNewRecord() {
    var genreSelected = document.querySelector('input[name="fav_language"]:checked').value;
    var newBook = new Book(title.value, author.value, price.value, pub.value, language.value, genreSelected, email.value );
    details.innerHTML = newBook.DetailOuvrage()
    StoredBooks.push(newBook);
    localStorage.setItem("listBook", JSON.stringify(StoredBooks));
    tri()
    loadData();
    
}

 //sort items
    function tri(){
        StoredBooks.sort(function(book1, book2){
            if(book1.title.toUpperCase()>book2.title.toUpperCase()){
                return 1;
            }
            else if(book1.title.toUpperCase()<book2.title.toUpperCase()){
                return -1;
            }
            else{
                return 0;
            }

        });


        // listBook.sort(function(a,b){
        //     if(a.title.toUpperCase()< b.title.toUpperCase()){
        //     return -1 }
        // })
        

    }

// edit row
function onEdit(td) {
    selectedRow = td.parentElement.parentElement.rowIndex;
    var row = document.getElementsByTagName("table")[0].rows[selectedRow];
    document.getElementById("title").value = row.cells[0].innerHTML;
    document.getElementById("author").value = row.cells[1].innerHTML;
    document.getElementById("price").value = row.cells[2].innerHTML;
    document.getElementById("pub").value = row.cells[3].innerHTML;
    document.getElementById("language").value = row.cells[4].innerHTML;
    //document.querySelectorAll("genre").value = row.cells[5].innerHTML;
    for(var i=0; i<genre.length; i++) {
        if(genre[i].value == row.cells[5].innerHTML)
            genre[i].checked = true;
    }
    document.getElementById("email").value = row.cells[6].innerHTML;

    // tbody.innerHTML = ""
    tri();
    loadData();
    // resetForm();
    
    


}

// update row
function updateRecord(formData) {
    // update directement dans la ligne de la table HTML 
    // !!!!!!!! faire un update au niveau de StoredBooks
    var rowToEdit = tbody.rows[selectedRow-1];
    rowToEdit.cells[0].innerHTML = formData.title;
    rowToEdit.cells[1].innerHTML = formData.author;
    rowToEdit.cells[2].innerHTML = formData.price;
    rowToEdit.cells[3].innerHTML = formData.pub;
    rowToEdit.cells[4].innerHTML = formData.language;
    rowToEdit.cells[5].innerHTML = formData.genre;
    rowToEdit.cells[6].innerHTML = formData.email;


    StoredBooks[selectedRow-1].title = title.value;
    StoredBooks[selectedRow-1].author = author.value;
    StoredBooks[selectedRow-1].price = price.value;
    StoredBooks[selectedRow-1].pub = pub.value;
    StoredBooks[selectedRow-1].language = language.value;
    for(var i=0; i<genre.length; i++) {
        if(genre[i].value == rowToEdit.cells[5].innerHTML)
            genre[i].checked = true;
    }
    StoredBooks[selectedRow-1].email = email.value;

    localStorage.setItem("listBook", JSON.stringify(StoredBooks))

    
    
}

// when u want to delete ur infos
function onDelete(td) {
    if(confirm('do u really want to delete this ?')){
        var row = td.parentElement.parentElement.rowIndex-1;
        StoredBooks.splice(row, 1);
        tri();
        localStorage.setItem("listBook", JSON.stringify(StoredBooks))
        loadData();

        
    }
    


    
}

// on form submit
form.addEventListener('submit', (e) => {
    // to stop browser from executing a function 
    e.preventDefault(); 

    // if form data is valid add new row
    if( formValidation){
        var formData = readFormData();
        if(selectedRow == null)
            insertNewRecord(formData);
        else {
            updateRecord(formData);
            selectedRow = null;
        }
        resetForm();
    }    
});


// on print button click
// pr.addEventListener('click', function() {
//     window.print(), id='="noPrint"'
// })


pr.addEventListener('click',function printData()
{
  var div = document.getElementById("table");
  newwin = window.open("")
  newwin.document.write(div.outerHTML);
  newwin.print();
  newwin.close();
  
})