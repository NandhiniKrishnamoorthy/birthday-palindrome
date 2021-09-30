// JavaScript source code
var dob = document.querySelector("#date-of-birth");
var checkButton = document.querySelector("#check-birthdate");
var displayMessage = document.querySelector("#output-message");


//Convert date to String format
function convertDateToString(dateFormat) {
    var dateInStr = { day: "", month: "", year: "" };
    if (dateFormat.day < 10) {
        dateInStr.day = "0" + dateFormat.day;
    }
    else {
        dateInStr.day = dateFormat.day.toString();       //toString() - converts to string
    }

    if (dateFormat.month < 10) {
        dateInStr.month = "0" + dateFormat.month;
    }
    else {
        dateInStr.month = dateFormat.month.toString();       
    }

    dateInStr.year = dateFormat.year.toString();
    return (dateInStr);
    
}

//create a list contains date in all formats
function getDateInAllFormats(dateStrFormat) {
    var ddmmyyyy = dateStrFormat.day + dateStrFormat.month + dateStrFormat.year;
    var mmddyyyy = dateStrFormat.month + dateStrFormat.day + dateStrFormat.year;
    var yyyymmdd = dateStrFormat.year + dateStrFormat.month + dateStrFormat.day;
    var ddmmyy = dateStrFormat.day + dateStrFormat.month + dateStrFormat.year.slice(-2);
    var mmddyy = dateStrFormat.month + dateStrFormat.day + dateStrFormat.year.slice(-2);
    var yyddmm = dateStrFormat.year.slice(-2) + dateStrFormat.day + dateStrFormat.month;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}

//Check date is palindrome for all formats
function checkPalindromeForAllDateFormats(date) {    
    var palindromeList = [];

    for (var i = 0; i < date.length; i++) {
        var result = reverseDOB(date[i]);
        palindromeList.push(result);
    }
    return palindromeList;
}


//reverse string and check palindrome
function reverseDOB(birthdate) {
    var birthdayChar = birthdate.split('');
    var reverseChar = birthdayChar.reverse();
    var reverseDOBString = reverseChar.join('');    
    return birthdate === reverseDOBString;    
}

//display the output message
function showMessage(msg) {
    displayMessage.innerText = msg;
}


//Finding next Palindrome Date
function getNextPalindromeDate(date) {
    debugger;
    var nextDate = getNextDate(date);
    var ctr = 0;

    while (1) {
        ctr++;
        var nextdateStr = convertDateToString(nextDate);
        var nextdateList = getDateInAllFormats(nextdateStr);
        var nextresultList = checkPalindromeForAllDateFormats(nextdateList);

        for (let i = 0; i < nextresultList.length; i++) {
            if (nextresultList[i]) {
                return [ctr, nextDate];
            }
        }
        nextDate = getNextDate(nextDate);
    }
}


function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month = 3;
            }
        } else {
            if (day > 28) {
                day = 1;
                month = 3;
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year,
    };
}


function isLeapYear(year) {
    if (year % 400 === 0) return true;

    if (year % 100 === 0) return false;

    if (year % 4 === 0) return true;

    return false;
}


//button click event
checkButton.addEventListener("click", function checkBirthDateLucky() {
    var dateOfBirth = dob.value;
    if (dateOfBirth) {
        var birthDate = dateOfBirth.split("-");     //split() - split the date format

        var birthDate_Dic = {
            year: Number(birthDate[0]),
            month: Number(birthDate[1]),
            day: Number(birthDate[2])
        }
        var dateStr = convertDateToString(birthDate_Dic);                      //1. Convert date to String format
        var dateList = getDateInAllFormats(dateStr);                           //2. create a list contains date in all formats
        var datePalindromeList = checkPalindromeForAllDateFormats(dateList);   //3. Check date is palindrome or not for all formats
        var isPalindrome = false;

        for (let i = 0; i < datePalindromeList.length; i++) {
            if (datePalindromeList[i]) {
                isPalindrome = true;
                break;
            }
        }

        if (isPalindrome) {
            showMessage("Yay! Your birthday is palindrome!");
        } else {
            const [ctr1, nextDate] = getNextPalindromeDate(birthDate_Dic);        //4. If birthdate is not palindrome, find next nearest palindrome

            showMessage(`The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${ctr1} days.`);
        }

    }
    else {
        showMessage("Please enter the date");
    }
});