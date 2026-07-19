function showPage(pageId)
{
    // Hide the sidebar when any specific calculator page is showing
    document.getElementById("appSidebar").classList.add("hidden");

    // Get all pages
    let pages = document.getElementsByClassName("page");

    // Hide every page
    for(let page of pages)
    {
        page.style.display = "none";
    }

    // Show selected page
    document.getElementById(pageId).style.display = "block";

    // Get all sidebar buttons
    let tabs = document.getElementsByClassName("tab");

    // Remove active class from every button
    for(let tab of tabs)
    {
        tab.classList.remove("active");
    }

    // Highlight the clicked button safely if triggered via click event
    if(window.event && window.event.target && window.event.target.classList.contains("tab")) {
        window.event.target.classList.add("active");
    }
}

// Function to handle the back button click
function goHome() {
    // Bring back the sidebar
    document.getElementById("appSidebar").classList.remove("hidden");
    
    // Hide all pages
    let pages = document.getElementsByClassName("page");
    for(let page of pages)
    {
        page.style.display = "none";
    }
    
    // Remove highlight from sidebar tabs
    let tabs = document.getElementsByClassName("tab");
    for(let tab of tabs)
    {
        tab.classList.remove("active");
    }
}

// ===============================
// Smart Calculator
// Basic + Scientific
// ===============================

let calcDisplay = document.getElementById("calcDisplay");

// Add value to display
function appendValue(value)
{
    if(!calcDisplay) calcDisplay = document.getElementById("calcDisplay");
    calcDisplay.value += value;
}

// Clear display
function clearDisplay()
{
    if(!calcDisplay) calcDisplay = document.getElementById("calcDisplay");
    calcDisplay.value = "";
}

// Backspace
function backspace()
{
    if(!calcDisplay) calcDisplay = document.getElementById("calcDisplay");
    calcDisplay.value = calcDisplay.value.slice(0,-1);
}

// Calculate result
function calculate()
{
    if(!calcDisplay) calcDisplay = document.getElementById("calcDisplay");
    try
    {
        let expression = calcDisplay.value;

        // Replace symbols
        expression = expression.replaceAll("Math.PI", Math.PI);
        expression = expression.replaceAll("Math.E", Math.E);

        let result = eval(expression);

        addHistory(expression,result);

        calcDisplay.value = result;
    }
    catch
    {
        calcDisplay.value = "Error";
    }
}

// Square
function square()
{
    if(!calcDisplay) calcDisplay = document.getElementById("calcDisplay");
    try
    {
        let value = eval(calcDisplay.value);
        let result = value * value;
        addHistory(value+"²",result);
        calcDisplay.value=result;
    }
    catch
    {
        calcDisplay.value="Error";
    }
}

// Cube
function cube()
{
    if(!calcDisplay) calcDisplay = document.getElementById("calcDisplay");
    try
    {
        let value = eval(calcDisplay.value);
        let result = value * value * value;
        addHistory(value+"³",result);
        calcDisplay.value=result;
    }
    catch
    {
        calcDisplay.value="Error";
    }
}

// Scientific Functions
function scientificFunction(type)
{
    if(!calcDisplay) calcDisplay = document.getElementById("calcDisplay");
    try
    {
        let value = Number(calcDisplay.value);
        let result;

        if(type=="sin")
        {
            result=Math.sin(value);
        }
        else if(type=="cos")
        {
            result=Math.cos(value);
        }
        else if(type=="tan")
        {
            result=Math.tan(value);
        }
        else if(type=="sqrt")
        {
            result=Math.sqrt(value);
        }
        else if(type=="log")
        {
            result=Math.log10(value);
        }
        else if(type=="ln")
        {
            result=Math.log(value);
        }

        addHistory(type+"("+value+")",result);
        calcDisplay.value=result;
    }
    catch
    {
        calcDisplay.value="Error";
    }
}

// Factorial
function factorial()
{
    if(!calcDisplay) calcDisplay = document.getElementById("calcDisplay");
    let number = Number(calcDisplay.value);
    let result=1;

    for(let i=1;i<=number;i++)
    {
        result*=i;
    }

    addHistory(number+"!",result);
    calcDisplay.value=result;
}

// Switch to Basic Mode
function basicMode()
{
    document.getElementById("basicButtons").style.display="grid";
    document.getElementById("scientificButtons").style.display="none";
}

// Switch to Scientific Mode
function scientificMode()
{
    document.getElementById("basicButtons").style.display="none";
    document.getElementById("scientificButtons").style.display="grid";
}

// History
function addHistory(expression,result)
{
    let history = document.getElementById("historyList");
    let item = document.createElement("li");
    item.innerHTML = expression+" = <b>"+result+"</b>";
    history.prepend(item);
}

// ===============================
// CGPA Calculator
// ===============================

function addSubject()
{
    let table = document.getElementById("subjectTable");
    let row = document.createElement("tr");

    row.innerHTML = `
        <td><input type="text" placeholder="Subject"></td>
        <td><input type="number" class="grade" placeholder="0-10"></td>
        <td><input type="number" class="credit" placeholder="Credits"></td>
        <td>
            <button onclick="removeSubject(this)">❌</button>
        </td>
    `;
    table.appendChild(row);
}

function removeSubject(button)
{
    let row = button.parentElement.parentElement;
    row.remove();
}

function calculateCGPA()
{
    let grades = document.getElementsByClassName("grade");
    let credits = document.getElementsByClassName("credit");

    let totalPoints = 0;
    let totalCredits = 0;

    for(let i=0;i<grades.length;i++)
    {
        let grade = Number(grades[i].value);
        let credit = Number(credits[i].value);

        if(grade && credit)
        {
            totalPoints += grade * credit;
            totalCredits += credit;
        }
    }

    if(totalCredits == 0)
    {
        document.getElementById("cgpaResult").innerHTML = "CGPA: Enter valid details";
        document.getElementById("percentageResult").innerHTML = "Percentage:";
        return;
    }

    let cgpa = totalPoints / totalCredits;
    cgpa = cgpa.toFixed(2);
    let percentage = (cgpa * 9.5).toFixed(2);

    document.getElementById("cgpaResult").innerHTML = "CGPA: " + cgpa;
    document.getElementById("percentageResult").innerHTML = "Percentage: " + percentage + "%";
}

function resetCGPA()
{
    document.getElementById("subjectTable").innerHTML = `
    <tr>
        <td><input type="text" placeholder="Subject"></td>
        <td><input type="number" class="grade" placeholder="0-10"></td>
        <td><input type="number" class="credit" placeholder="Credits"></td>
        <td>
            <button onclick="removeSubject(this)">❌</button>
        </td>
    </tr>
    `;

    document.getElementById("cgpaResult").innerHTML = "CGPA:";
    document.getElementById("percentageResult").innerHTML = "Percentage:";
}

// ===============================
// Unit Converter
// ===============================

let units = {
    length:["Meter", "Kilometer", "Centimeter", "Millimeter", "Mile", "Foot"],
    weight:["Gram", "Kilogram", "Pound"],
    temperature:["Celsius", "Fahrenheit", "Kelvin"],
    speed:["m/s", "km/h", "mph"],
    area:["Square Meter", "Square Kilometer", "Square Foot"],
    volume:["Liter", "Milliliter", "Cubic Meter"],
    time:["Second", "Minute", "Hour", "Day"]
};

function loadUnits()
{
    let type = document.getElementById("conversionType").value;
    let from = document.getElementById("fromUnit");
    let to = document.getElementById("toUnit");

    from.innerHTML="";
    to.innerHTML="";

    units[type].forEach(function(unit)
    {
        from.innerHTML += `<option>${unit}</option>`;
        to.innerHTML += `<option>${unit}</option>`;
    });
}

function convertUnit()
{
    let value = Number(document.getElementById("convertValue").value);
    let type = document.getElementById("conversionType").value;
    let from = document.getElementById("fromUnit").value;
    let to = document.getElementById("toUnit").value;
    let result = value;

    if(from == to)
    {
        result = value;
    }
    else if(type=="length")
    {
        let meter;
        if(from=="Meter") meter=value;
        else if(from=="Kilometer") meter=value*1000;
        else if(from=="Centimeter") meter=value/100;
        else if(from=="Millimeter") meter=value/1000;
        else if(from=="Mile") meter=value*1609.34;
        else if(from=="Foot") meter=value*0.3048;

        if(to=="Meter") result=meter;
        else if(to=="Kilometer") result=meter/1000;
        else if(to=="Centimeter") result=meter*100;
        else if(to=="Millimeter") result=meter*1000;
        else if(to=="Mile") result=meter/1609.34;
        else if(to=="Foot") result=meter/0.3048;
    }
    else if(type=="weight")
    {
        let gram;
        if(from=="Gram") gram=value;
        else if(from=="Kilogram") gram=value*1000;
        else if(from=="Pound") gram=value*453.592;

        if(to=="Gram") result=gram;
        else if(to=="Kilogram") result=gram/1000;
        else if(to=="Pound") result=gram/453.592;
    }
    else if(type=="temperature")
    {
        if(from=="Celsius" && to=="Fahrenheit") result=(value*9/5)+32;
        else if(from=="Fahrenheit" && to=="Celsius") result=(value-32)*5/9;
        else if(from=="Celsius" && to=="Kelvin") result=value+273.15;
        else if(from=="Kelvin" && to=="Celsius") result=value-273.15;
        else if(from=="Fahrenheit" && to=="Kelvin") result=(value-32)*5/9+273.15;
        else if(from=="Kelvin" && to=="Fahrenheit") result=(value-273.15)*9/5+32;
    }
    else if(type=="speed")
    {
        let kmh;
        if(from=="km/h") kmh=value;
        else if(from=="m/s") kmh=value*3.6;
        else if(from=="mph") kmh=value*1.60934;

        if(to=="km/h") result=kmh;
        else if(to=="m/s") result=kmh/3.6;
        else if(to=="mph") result=kmh/1.60934;
    }

    if(window.Number.isInteger(result))
    {
        result=result;
    }
    else
    {
        result=Number(result).toFixed(3);
    }

    document.getElementById("conversionResult").innerHTML = "Result: " + result;
}

function resetConverter()
{
    document.getElementById("convertValue").value="";
    document.getElementById("conversionResult").innerHTML= "Result:";
}

loadUnits();

// ===============================
// Age Calculator
// ===============================

function calculateAge()
{
    let dob = new Date(document.getElementById("dob").value);
    let today = new Date();

    if(isNaN(dob))
    {
        alert("Please select your date of birth");
        return;
    }

    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();

    if(days < 0)
    {
        months--;
        let previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += previousMonth.getDate();
    }

    if(months < 0)
    {
        years--;
        months += 12;
    }

    document.getElementById("ageResult").innerHTML = "Age: " + years + " Years " + months + " Months " + days + " Days";

    let difference = today - dob;
    let totalDays = Math.floor(difference / (1000*60*60*24));
    document.getElementById("daysResult").innerHTML = "Total Days Lived: " + totalDays + " Days";

    let nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
    if(nextBirthday < today)
    {
        nextBirthday.setFullYear(today.getFullYear()+1);
    }

    let remaining = Math.ceil((nextBirthday-today)/(1000*60*60*24));
    document.getElementById("birthdayResult").innerHTML = "Next Birthday: " + remaining + " Days Left";
}

function resetAge()
{
    document.getElementById("dob").value="";
    document.getElementById("ageResult").innerHTML= "Age:";
    document.getElementById("daysResult").innerHTML= "Total Days Lived:";
    document.getElementById("birthdayResult").innerHTML= "Next Birthday:";
}

// ===============================
// Notes Module Placeholder
// ===============================
function addNote() {
    let input = document.getElementById("noteInput");
    if(!input.value.trim()) return;
    let list = document.getElementById("notesList");
    let card = document.createElement("div");
    card.className = "note-card";
    card.innerHTML = `<span>${input.value}</span><button class="delete-note" onclick="this.parentElement.remove()">🗑️</button>`;
    list.appendChild(card);
    input.value = "";
}
function clearNotes() {
    document.getElementById("notesList").innerHTML = "";
}

// ===============================
// Settings
// ===============================



function darkMode()
{

    document.body.classList.add("dark");


    localStorage.setItem(
        "theme",
        "dark"
    );

}




function lightMode()
{

    document.body.classList.remove("dark");


    localStorage.setItem(
        "theme",
        "light"
    );

}





// Load saved theme

let savedTheme =
localStorage.getItem("theme");



if(savedTheme=="dark")
{

    document.body.classList.add("dark");

}

// ===============================
// EMI Calculator
// ===============================


function calculateEMI()
{

    let principal =
    Number(document.getElementById("loanAmount").value);


    let rate =
    Number(document.getElementById("interestRate").value);


    let years =
    Number(document.getElementById("loanYears").value);



    if(principal<=0 || rate<=0 || years<=0)
    {

        alert("Enter valid details");

        return;

    }



    let monthlyRate =
    rate / 12 / 100;


    let months =
    years * 12;



    let emi =
    principal *
    monthlyRate *
    Math.pow(1+monthlyRate,months)
    /
    (Math.pow(1+monthlyRate,months)-1);



    let totalPayment =
    emi * months;


    let interest =
    totalPayment - principal;



    document.getElementById("emiAmount").innerHTML =

    "Monthly EMI: ₹" +
    emi.toFixed(2);



    document.getElementById("totalInterest").innerHTML =

    "Total Interest: ₹" +
    interest.toFixed(2);



    document.getElementById("totalPayment").innerHTML =

    "Total Payment: ₹" +
    totalPayment.toFixed(2);


}




function resetEMI()
{

    document.getElementById("loanAmount").value="";

    document.getElementById("interestRate").value="";

    document.getElementById("loanYears").value="";


    document.getElementById("emiAmount").innerHTML=
    "Monthly EMI:";


    document.getElementById("totalInterest").innerHTML=
    "Total Interest:";


    document.getElementById("totalPayment").innerHTML=
    "Total Payment:";

}