// DOM Elements
const dayInput = document.getElementById('input-day');
const monthInput = document.getElementById('select-month') ;
const yearInput = document.getElementById('input-year');
const calculateBtn = document.getElementById('calculateBtn');
const result = document.getElementById('result-section');
const yearsValue = document.getElementById('years');
const monthsValue = document.getElementById('months');
const daysValue = document.getElementById('days') ;


// Errors elements access
const yearError = document.getElementById('yearError') ;
const monthError = document.getElementById('monthError');
const dayError = document.getElementById('dayError');

// Acessing the current date
const currentDate = new Date();
const currentYear = currentDate.getFullYear() ;
const currentMonth = currentDate.getMonth() + 1 ;
const currentDay = currentDate.getDate() ;

// Setting the max year to the current year
yearInput.max = currentYear;
yearInput.value = currentYear;

// Days in month array 
const daysInMonth = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ] ;

// Validate date input
function validateDate() {

    let isValid = true ;

// Collecting and storing data from input
    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);


// Initially hiding all error messages (controlled by css)
    dayError.classList.remove('show');
    monthError.classList.remove('show');
    yearError.classList.remove('show');

// Year validation
if (isNaN(year) || year < 1900 || year> currentYear) {
    yearError.innerText = `Please enter a valid year (1900 - ${currentYear})`;
    yearError.classList.add('show'); 
    isValid = false ;
}

// Month validation
if(isNaN(month) || month < 1 || month > 12) {
    monthError.innerText = `Please select a month` ;
    monthError.classList.add('show') ;
    isValid = false;
}

// Day validation
if ( isNaN(day) || day < 1 ){
    dayError.innerText = `Please enter a valid day`; 
    dayError.classList.add('show');
    isValid = false;
}
else if(month){
    // Checking valid day for the selected month and year
    const maxDays = getDaysInMonth(month, year);
    if(day > maxDays){
        dayError.innerText = `Maximum days for selected month is ${maxDays}`;
        dayError.classList.add('show');                            
        isValid = false;
    }

}
// Validate future dates
if(isValid) {
    if (year > currentYear ||
         year === currentYear && month > currentMonth ||
        year === currentYear && month === currentMonth && day > currentDay) {
            dayError.innerText = `Date cannot be in the future` ;
            dayError.classList.add('show') ;
            isValid = false ;
        }
}
 return isValid

}

// Gettting the number of months in a year/ leap year
function getDaysInMonth(month, year) {
    if (month === 2)   { // Febuary
        return isLeapYear(year) ? 29 : 28 ;
    }
    else {
        return daysInMonth[month - 1] ;
    }
}

// Checking if the year is a leap year
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// Calculate age
function calculateAge(birthDay, birthMonth, birthYear ) {
    let years = currentYear - birthYear ;
    let months = currentMonth - birthMonth
    let days = currentDay - birthDay ;

    //Adjusting negative days
    if(days < 0) {
        months-- ;

        //Get days in previous month
        const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
        const prevYear = currentMonth === 1 ? currentYear - 1 : currentYear ;
        days+= getDaysInMonth(prevMonth, prevYear);
    }

    if (months < 0) {
        years-- ;
        months+= 12 ;
    }
return { years, months, days } ;
}
 // Display the results
 function displayAge(){

    if(!validateDate() ) {
        result.classList.remove('show') ;
        return
    }
    

    const birthDay = parseInt( dayInput.value) ;
    const birthMonth = parseInt( monthInput.value) ;
    const birthYear = parseInt( yearInput.value) ;

    const age = calculateAge(birthDay, birthMonth, birthYear) ;

    yearsValue.innerText = age.years ;
    monthsValue.innerText = age.months ;
    daysValue.innerText = age.days ;

    result.classList.add('show');
 }


calculateBtn.addEventListener('click', displayAge);