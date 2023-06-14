// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
    var currentDayEl = $(".container");
    var saveBtns = $(".btn");
  
    // Display the current day at the top of the calendar
    function displayCurrentDay() {
      var currentDay = dayjs().format("MMMM DD, YYYY");
      currentDayEl.textContent = currentDay;
      console.log(displayCurrentDay);
      console.log(currentDayEl);
    }
  
    // Check the timeblocks' time and apply appropriate styling
    function updateTimeblockStyling() {
        var currentHour = dayjs().format(); // Get the current hour using the Day.js library and store it in the variable currentHour
        console.log(currentHour); 
      
        saveBtns.each(function() { // Iterate over each element in the saveBtns set using the jQuery each function
          var hour = parseInt($(this).data("hour")); // Get the value of the "hour" attribute of the current element and convert it to an integer
        
          if (hour < currentHour) { // Compare the current hour with the hour of the current element
            $(this).parent().addClass("past"); // If the hour of the element is earlier than the current hour, add the "past" class to the parent element (the container of the button)
          } else if (hour === currentHour) { // Compare if the hour of the element is equal to the current hour
            $(this).parent().addClass("present"); // If the hour of the element is equal to the current hour, add the "present" class to the parent element
          } else { // If none of the above conditions are met (the hour of the element is later than the current hour)
            $(this).parent().addClass("future"); // Add the "future" class to the parent element
          }
        });
      } 
  
     // Load the saved events from local storage
     function loadSavedEvents() {
        saveBtns.each(function() { // Iterate over each element in the saveBtns set using the jQuery each function
          var hour = $(this).data("hour"); // Get the value of the "hour" data attribute of the current element and store it in the variable hour
          var event = localStorage.getItem(hour); // Retrieve the saved event from the local storage based on the hour key
          
          if (event) { // Check if an event exists for the current hour in the local storage
            $("#hour-" + hour).val(event); // Set the value of the input field with id "hour-hourValue" to the retrieved event
          }
        });
      }
  
     // Save the event to local storage when the save button is clicked
     function saveEvent(event) { //function called saveEvent that takes an event as a parameter.
        
        var textarea = $(event.target).closest(".row").find(".description");//element within the closest parent element with the "row" class. It uses the closest function to find the parent element and then find to select the textarea element within it
        var hour = $(event.target).data("hour");//uses the event to get the value of the "hour" data attribute from the element that triggered the event
        var value = textarea.val().trim(); //etrieves the value of the textarea
        
        if (value !== "") {//checks if the value is not empty.
          localStorage.setItem(hour, value);//object to store the value in the local storage. 
        } else {
          localStorage.removeItem(hour);//  if the value is empty, it uses the localStorage object to remove the item corresponding to the "hour" from the local storage.
        }
    }
      // Bind event listeners to save buttons
      saveBtns.on("click", saveEvent);
    
      // Initial setup
      displayCurrentDay();
      updateTimeblockStyling();
      loadSavedEvents();
   
    
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