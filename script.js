var dateInput = document.querySelector("#date-input");
var checkBtn = document.querySelector("#check-btn");
var outputDiv =document.querySelector(".output_area");

//reversing date
const reverseDate = (date) => {
  return date.split("").reverse().join("");
};

//checking for palindrome
const isPalindrome = (date) => {
  var revdate = reverseDate(date);
  return date === revdate;
};

//convrting date to string object
const convertDateToString = (date) => {
  var dateObj = { day: "", month: "", year: "" };

  if (date.day < 10) {
    dateObj.day = "0" + date.day;
  } else {
    dateObj.day = date.day.toString();
  }

  if (date.month < 10) {
    dateObj.month = "0" + date.month;
  } else {
    dateObj.month = date.month.toString();
  }

  dateObj.year = date.year.toString();
  return dateObj;
};

//making all date formats from date objct
const getDateFormats = (date) => {
  var dateStr = convertDateToString(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.day + dateStr.month;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
};

//checking palindromee for all formats
const checkAllFormats = (date) => {
  var dateList = getDateFormats(date);
  
  for (let i = 0; i < dateList.length; i++) {
    if (isPalindrome(dateList[i])) {
      return [true, dateList[i]];
    }
  }
  return [false, null];
};

//checking leap year
const isLeapYear = (year) =>  {
  if(!year % 400)
    return true;
  if(!year % 100)
    return false;
  if(!year % 4)
    return true;
  return false;
}

// getting next date after dob
const getNextDate = (date) => {
  var day = date.day+1;
  var month = date.month;
  var year = date.year;
  var daysList = [31,28,31,30,31,30,31,31,30,31,30,31];
  
  if(month===2)
  {
      if(isLeapYear(year))
      {
        if(day>29)
        {
          day=1;
          month++;
        }
      }
      else if(day>28)
      {
        day=1;
        month++;
      }
  }
  else
  {
    if(month<12){
      if(day>daysList[month-1])
          {
            day=1;
            month++;
          }
    }else{
      if(day>31)
      {
        day=1;
        month=1;
        year++;
      }
    }  
  }
  date.day=day;
  date.month=month;
  date.year=year;
  return date;
}

//getting next palindrome date after dob
const getNextPalindrome = (date) => {
  var count=0;
  var nextDate = getNextDate(date);

  while(1){
    count++;
    var palindrome = checkAllFormats(nextDate);

    if(palindrome[0] === true && palindrome[1]!== null)
    {
      var nextPalindromeDateFormat = palindrome[1];
      break;
    }
    nextDate=getNextDate(nextDate);
  }

  return [count , nextDate , nextPalindromeDateFormat];
}

//making date object frm date input
const getDateObj = (bdate) => {

  var dateObj = {
    day: "",
    month: "",
    year: "",
  };
  
  dateObj.year = Number(bdate.slice(0, 4));
  dateObj.month = Number(bdate.slice(4, 6));
  dateObj.day = Number(bdate.slice(6, 8));
  
  return dateObj;
};

//click handler for button
clickHandler = () => {
  var bdate = dateInput.value;
  
  if(bdate !== ''){
    
    bdate = bdate.replaceAll("-", "");
    
    var dateObj = getDateObj(bdate);
    
    var checkAll = checkAllFormats(dateObj);
    
    if(!checkAll[0]){
        nextPalindrome = getNextPalindrome(dateObj);
//nextPalindrome returns nmbr of days till nxt palindrome, date and its palindrome format
        noOfDays= nextPalindrome[0];
        
        nextPalindromeDate =
          nextPalindrome[1].day.toString() +"-"+
          nextPalindrome[1].month.toString() +"-"+
          nextPalindrome[1].year.toString();
        
          nextPalindromeDateFormat = nextPalindrome[2];

        outputDiv.innerHTML= "<p>Your birthdate is not palindrome. <br> Next palindrome date is <b>"+ `${nextPalindromeDate}`+"</b> after <b>"+ `${noOfDays}`+ "</b> days. <br></p>" + `<b class="palindrome"><div class="format">${nextPalindromeDateFormat}<div><b>`
    }
    else{
      outputDiv.innerHTML="<p>Yay! Your birhtdate is a Palindrome.<br></p>" + `<b class="palindrome"><div class="format">${checkAll[1]}</div><b>`
    }
    
  }
  
};

checkBtn.addEventListener("click", clickHandler);
