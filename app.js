

//  </>  by RITESH K

// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from LS
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
     // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  
  //check box
  var checkbox = document.createElement('input');
  checkbox.type = "checkbox";
  checkbox.value = 1;
  checkbox.name = "todo[]";

li.appendChild(checkbox);

  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Store in LS
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = '';

  e.preventDefault();
  });
}//  </>  by RITESH K

// Add Task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task');
  }

  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';

  // checkbox
  var checkbox = document.createElement('input');
  checkbox.type = "checkbox";
  checkbox.value = 1;
  checkbox.name = "todo[]";

li.appendChild(checkbox);

  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Store in LS
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = '';

  console.log(li);
  

  e.preventDefault();
}
  //  </>  by RITESH K
// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// document.getElementById("myP").style.textDecoration = "underline overline";

// Remove Task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();

      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}
  //  </>  by RITESH 
// Clear Tasks
function clearTasks() {
  // taskList.innerHTML = '';

  // Faster
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // https://jsperf.com/innerhtml-vs-removechild

  // Clear from LS
  clearTasksFromLocalStorage();
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

let monthsNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let daysNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
  
  let today = new Date();
  let g_currentMonth = today.getMonth();
  let g_currentYear = today.getFullYear();
  let g_startDay = (new Date(today.getFullYear(), today.getMonth(), 1).getDay() + 6) % 7; //first day in current month
  
  function showCalendar(currentMonth, currentYear, startDay) {
    clearCalendarView();
    let currentDay = getCurrentDay();
  
    let calendar = document.createElement("table");
    calendar.classList.add("calendar");
    calendar.id = "calendar_id";
  
    let content = document.getElementById("content");
  
    let calendarHeader = createHeader();
    calendar.appendChild(calendarHeader);
  
    let info = createInfo(currentMonth, currentYear);
    info.id = "info_id";
    content.appendChild(info);
  
  
    let days = createDaysForMonth(monthsNames[currentMonth], daysNames[startDay], currentDay);
    calendar.appendChild(days);
  
    content.appendChild(calendar);
  }
    //  </>  by RITESH 
  function getCurrentDay() {
    let today = new Date();
    let thisMonth = today.getMonth();
    let thisYear = today.getFullYear();
    if (thisMonth === g_currentMonth && thisYear === g_currentYear) {
        return today.getDate();
    }  
  }
  
  function clearCalendarView() {
    var el = document.getElementById("calendar_id");
    if (el) {
      el.remove();
    }
  
    var info = document.getElementById("info_id");
    if (info) {
      info.remove();
    }
  }
  
  function createHeader() {
    let thead = document.createElement("tr");
    daysNames.forEach(day => {
      let cell = document.createElement("th");
      cell.textContent = day;
      thead.appendChild(cell);
    });  //  </>  by RITESH 
    return thead;
  }
  
  function createInfo(currentMonth, currentYear) {
    const result = document.createElement("div");
    result.textContent = (monthsNames[currentMonth]) + '  ' + currentYear;
    result.classList.add("resultMonthAndYear");
    return result;
  }
  
  function createDaysForMonth(monthName, startingDay, currentDay) {
    let tbody = document.createElement("tbody");
    let count = 1;
    //  </>  by RITESH 
    let firstRow = createFirstRow(startingDay, currentDay);
    tbody.appendChild(firstRow);
  
    let index = daysNames.indexOf(startingDay);
    let nextMonday = 8 - index; // 7 - index + 1
  
    let lastMonday = createMiddleRows(tbody, nextMonday, monthName, currentDay);
  
    let lastRow = createLastRow(lastMonday, monthName, currentDay);
    tbody.appendChild(lastRow);
  
    return tbody;
  }
    //  </>  by RITESH 
  function createFirstRow(startingDay, currentDay) {
    let row = document.createElement("tr");
    let start = daysNames.indexOf(startingDay);
  
    for (i = 0; i < start; i++) {
      let cell = document.createElement("td");
      row.appendChild(cell);
    }
  
    let count = 1;
    for (i = start; i < 7; i++) {
      let cell = document.createElement("td");
      cell.textContent = count;
      row.appendChild(cell);
      if (count === currentDay) {
        cell.classList.add("currentDay");
      }
      count++;
    }
    return row;
  }
  
  function createMiddleRows(tbody, startingDay, monthName, currentDay) {
    let monthIndex = monthsNames.indexOf(monthName);
    let daysInCurrentMonth = daysInMonth[monthIndex];
    let count = startingDay;
  
    while (count + 6 < daysInCurrentMonth) {
      let row = document.createElement("tr");
      for (i = 0; i < 7; i++) {
        let cell = document.createElement("td");
        cell.textContent = count;
        row.appendChild(cell);
        if (count === currentDay) {
          cell.classList.add("currentDay");
        }
        count++;
      }
      tbody.appendChild(row);
    }
    return count;
  }
    //  </>  by RITESH 
  function createLastRow(startDay, monthName, currentDay) {
    let monthIndex = monthsNames.indexOf(monthName);
    let daysInCurrentMonth = daysInMonth[monthIndex];
  
    let row = document.createElement("tr");
    let count = 0;
    for (i = startDay; i <= daysInCurrentMonth; i++) {
      let cell = document.createElement("td");
      cell.textContent = i;
      row.appendChild(cell);
      if (i === currentDay) {
        cell.classList.add("currentDay");
      }
      count++;
    }
    for (i = count; i < 7; i++) {
      let cell = document.createElement("td");
      row.appendChild(cell);
    }
    return row;
  }
  
  function previous() {
    g_currentMonth--;
    if (g_currentMonth < 0) {
      g_currentMonth = 11;
      g_currentYear--;
    }
      //  </>  by RITESH 
    g_startDay = (new Date(g_currentYear, g_currentMonth, 1).getDay() + 6) % 7;;
    showCalendar(g_currentMonth, g_currentYear, g_startDay);
  }
  
  function next() {
    g_currentMonth++;
    if (g_currentMonth > 11) {
      g_currentMonth = 0;
      g_currentYear++;
    }
    g_startDay = (new Date(g_currentYear, g_currentMonth, 1).getDay() + 6) % 7;
    showCalendar(g_currentMonth, g_currentYear, g_startDay);
  }
  
  //*bind execution logic with buttons
  let buttonPrev = document.getElementById("previous");
  buttonPrev.addEventListener("click", previous);
  
  let buttonNext = document.getElementById("next");
  buttonNext.addEventListener("click", next);
  
  showCalendar(g_currentMonth, g_currentYear, g_startDay); //calling the function
  


  var myDate = new Date(); 
  var myDay = myDate.getDay(); 
  //  </>  by RITESH 
  // Array of days. 
  var weekday = ['Sunday', 'Monday', 'Tuesday', 
      'Wednesday', 'Thursday', 'Friday', 'Saturday' 
  ]; 
  document.write(" </> by RITESH K" ); 
  document.write("Today : " + weekday[myDay]); 
  document.write("<br/>"); 
  
  // get hour value. 
  var hours = myDate.getHours(); 
  var ampm = hours >= 12 ? 'PM' : 'AM'; 
  hours = hours % 12; 
  hours = hours ? hours : 12; 
  var minutes = myDate.getMinutes(); 
  minutes = minutes < 10 ? '0' + minutes : minutes; 
  var myTime = hours + " " + ampm + " : " + minutes +  
      " : " + myDate.getMilliseconds(); 
  document.write("\tCurrent time is : " + myTime);

// Add toggle
  $(function () {

    $("#btn1").on('click', function () {

        $('#task-form').fadeToggle();

    });

});

