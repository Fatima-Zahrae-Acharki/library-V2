// book class: represents a book 
class book {
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
        return (`the ${this.title} book is a ${this.genre}  in ${this.language} written by  ${this.author}  and published on ${this.pub}. The price of ${this.title} , is  ${this.price} DHs`)
    }
}






// const form = document.getElementById('form');
const title = document.getElementById('title');
const author = document.getElementById('author');
const price = document.getElementById('price');
const pub = document.getElementById('pub');
const language = document.getElementById('language');
//const genre = document.getElementById('genre');
const genre = document.querySelectorAll('input[name="fav_language"]');

const errorElementTitle = document.getElementById('error1')
const errorElementAuthor = document.getElementById('error2')
const errorElementPrice = document.getElementById('error3')
const errorElementPub = document.getElementById('error4')
const errorElementLanguage = document.getElementById('error5')
const errorElementGenre = document.getElementById('error6')


form.addEventListener('submit', (e) => { //check the entered data (validtion)
    //title handling of the title
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


    // author
    // let message = []
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


    // price
    // let message = []
    if(price.value === '' ) {
        message.push('please enter the price*')
    }

    if(message.length > 0 ) {
        e.preventDefault()
        errorElementPrice.innerText = message.join(',')
    }


    var price = new RegExp(/^\d+(,\d{1,2})?$/)
    var checkPrice = document.getElementById("price").value;
    var valid = price.test(checkPrice)

    
    // publication date
    // let message = []
    if(pub.value === '' ) {
        message.push('you have to enter a date*')
    }
    
    if(message.length > 0 ) {
        e.preventDefault()
        errorElementPub.innerText = message.join(',')
    }



    //language
    // let message = []
    if(language.value === '' ) {
        message.push('you have to chose a language*')
    }
   
    if(message.length > 0 ) {
        e.preventDefault()
        errorElementLanguage.innerText = message.join(',')
    }



    //email
    
// form.addEventListener("submit", (e) => {
//   let messages = [];
var  regexEmail= /^(((\w+)(.)(\w+))|((\w+)))(@)(\w+)(.)(\w+)$/;
if(Email.value !=="" ){
    if(regexEmail.test(Email.value)){
        errorEmail.innerHTML="✔"
        Email.style.border="green"
    }
    else{
        errorEmail.innerHTML="please enter email without /^(((\w+)(.)(\w+))|((\w+)))(@)(\w+)(.)(\w+)$/, Or just Lutter "
        no_valide++;
    }
    }   else{
            errorEmail.innerHTML="The Title field is not filled out*"
            no_valide++;
        }
        
        var emailRegex = new RegExp(/^[a-z\d\.]+@[a-z\d]+\.([a-z]{2,8})(\.[a-z]{2,8})?$/);
        let checkEmail = email.value;
        var valid = emailRegex.test(checkEmail);
});

    


// })










