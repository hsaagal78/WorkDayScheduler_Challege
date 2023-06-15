// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function() {
    var container = $("#container"); // Get the container element with id "container"
    var saveBtns = $(".btn"); // Get all elements with the class "btn"
    var DayCurrent = $("#currentDay"); // Get the element with id "currentDay"
  
    // Display the current day at the top of the calendar
    function displayCurrentDay() {
      var currentDay = dayjs().format("MMMM DD, YYYY"); // Get the current day using Day.js library and format it as "Month Day, Year"
      DayCurrent.text(currentDay); // Set the text content of the "currentDay" element to the current day
    }
  
    // Check the timeblocks' time and apply appropriate styling
    function updateTimeblockStyling() {
      var currentHour = dayjs().format(); // Get the current hour using Day.js library
  
      saveBtns.each(function() {
        var hour = parseInt($(this).data("hour")); // Get the value of the "hour" attribute of the current element and convert it to an integer
  
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
        var hour = $(this).data("hour"); // Get the value of the "hour" attribute of the current element
        var event = localStorage.getItem(hour); // Retrieve the saved event from local storage based on the hour key
        var inputField = $("#hour-" + hour); // Get the input field element with id "hour-hourValue"
  
        if (event) {
          inputField.val(event); // Set the value of the input field to the retrieved event
        }
      });
    }
  
    // Save the event to local storage when the save button is clicked
    function saveEvent(event) {
      var row = $(event.target).closest(".row"); // Find the closest parent element with the class "row"
      var textarea = row.find(".description"); // Select the textarea element within the row
      var hour = $(event.target).data("hour"); // Get the value of the "data-hour" attribute from the element that triggered the event
      var value = textarea.val().trim(); // Retrieve the value of the textarea and remove leading/trailing whitespace
  
      if (value !== "") {
        localStorage.setItem(hour, value); // Store the value in local storage with the hour as the key
      } else {
        localStorage.removeItem(hour); // If the value is empty, remove the corresponding item from local storage
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

   

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
// });
// GIVEN I am using a daily planner to create a schedule
// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar
// WHEN I scroll down
// THEN I am presented with timeblocks for standard business hours of 9am&ndash;5pm
// WHEN I view the timeblocks for that day
// THEN each timeblock is color coded to indicate whether it is in the past, present, or future
// WHEN I click into a timeblock
// THEN I can enter an event
// WHEN I click the save button for that timeblock
// THEN the text for that event is saved in local storage
// WHEN I refresh the page
// THEN the saved events persist