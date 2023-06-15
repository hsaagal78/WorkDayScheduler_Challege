$(function() {
    var container = $("#container"); // Get the container element with id "container"
    var saveBtns = $(".saveBtn"); // Get all elements with the class "saveBtn"
    var DayCurrent = $("#currentDay"); // Get the element with id "currentDay"
    var headhour=$(".headhour");
    var headminutes=$("#headminutes");
    // Display the current day at the top of the calendar
    function displayCurrentDay() {
      var currentDay = dayjs().format("MMMM DD, YYYY"); // Get the current day using Day.js library and format it as "Month Day, Year"
      DayCurrent.text(currentDay); // Set the text content of the "currentDay" element to the current day
    }
  
    // Check the timeblocks' time and apply appropriate styling
    function updateTimeblockStyling() {
      var currentHour = parseInt(dayjs().format("h")); 
      var currentMinutes = parseInt(dayjs().format("m")); // Get the current hour using Day.js library and parse it as an integer
        console.log( parseInt(dayjs().format("mm")));
        headhour.text(currentHour);
        headminutes.text(currentMinutes);
        saveBtns.each(function() {
        var hour = parseInt($(this).data("hour")); // Get the value of the "data-hour" attribute of the current element and convert it to an integer
  
        if (hour < currentHour) {
          $(this).parent().addClass("past"); // If the hour is earlier than the current hour, add the "past" class to the parent element
        } else if (hour === currentHour) {
          $(this).parent().addClass("present"); // If the hour is equal to the current hour, add the "present" class to the parent element
        } else {
          $(this).parent().addClass("future"); // If the hour is later than the current hour, add the "future" class to the parent element
        }
      });
    }
  
    // Load the saved events from local storage
    function loadSavedEvents() {
      saveBtns.each(function() {
        var hour = $(this).data("hour"); // Get the value of the "data-hour" attribute of the current element
        var event = localStorage.getItem(hour);// Retrieve the saved event from local storage based on the hour key
       
        var inputField = $(this).siblings(".description"); // Get the input field element with id "hour-hourValue"
  
        if (event !== null && event !== undefined) { // Check if the event is not null
          inputField.val(event); // Set the value of the input field to the retrieved event
        }
      });
    }
  
    // Save the event to local storage when the save button is clicked
    function saveEvent(event) {
      var saveBtn=$(this);
      var row = saveBtn.closest(".row"); // Find the closest parent element with the class "row"
      var textarea = row.find(".description"); // Select the textarea element within the row
      var hour = saveBtn.data("hour"); // Get the value of the "data-hour" attribute from the element that triggered the event
      var value = textarea.val().trim(); // Retrieve the value of the textarea and remove leading/trailing whitespace
  
      if (value !== "") {
        localStorage.setItem(hour, value); // Store the value in local storage with the hour as the key
        
      } else {
        localStorage.clear(); // If the value is empty, remove all items from local storage
      }
      
    }
  
    saveBtns.on("click", saveEvent); // Bind the saveEvent function as the click event listener for each save button
  
    // Initial setup
    displayCurrentDay(); // Display the current day
    updateTimeblockStyling(); // Apply appropriate styling to timeblocks
    loadSavedEvents(); // Load saved events from local storage
  
    // Update timeblock styling every minute
    setInterval(function() {
      updateTimeblockStyling();
    }, 60000);
  });

 