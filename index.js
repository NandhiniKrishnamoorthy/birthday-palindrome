// JavaScript source code
var dob = document.querySelector("#date-of-birth");
var checkButton = document.querySelector("#check-birthdate");
var displayMessage = document.querySelector("#output-message");

function reverseDOB(birthdate) {
    var birthdayString = birthdate.split('');
    var reverseString = birthdayString.reverse();
    return (reverseString.join(''));
}

function showMessage(msg) {
    displayMessage.innerText = msg;
}

checkButton.addEventListener("click", function checkBirthDateLucky() {
    var dateOfBirth = dob.value;        
    if (dateOfBirth) {
        dateOfBirth = dateOfBirth.replaceAll("-", "");
        var reverseDateofBirth = reverseDOB(dateOfBirth);
        if (dateOfBirth === reverseDateofBirth) {
            showMessage("Wohoo! Your birthdate is a Palindrome 🥳");
        }
        else {
            showMessage("Sorry! Your birthdate is not a Palindrome")
        }
    }
    else {
        showMessage("Please enter the date");
    }
});