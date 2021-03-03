const jobsHolder = document.getElementById('holder1');
const searchJobs = document.getElementById('searchJobs');
const search = document.getElementById('search_button');
const main = document.getElementById('main');
const filter = document.getElementById('jobfilters');
const JobLocation = document.getElementById('JobLocation');
const JobSalary = document.getElementById('JobSalary');
const filterBtn = document.getElementById('filter_button');
const jobsort = document.getElementById('JobSal')
let diffJobs = [];

const loadCharacters = async () => {
    try {
        const res = await fetch('./data.json');
        const fileJob = await res.json();
        if (localStorage.getItem("myData") === null) {
            localStorage.setItem("myData", JSON.stringify(fileJob));
            console.log("adding file data to storage");
        }

        diffJobs = JSON.parse(localStorage.getItem("myData"));
    } catch (err) {
        console.error(err);

    }

};
loadCharacters();

if (search)
    search.addEventListener('click', (e) => {
        const searchString = document.getElementById('search').value.toLowerCase();
        console.log(searchString);


        console.log(typeof (diffJobs));
        if (searchString.length > 0) {
            const filteredCharacters = diffJobs.filter((character) => {
                return (
                    character.profile.toLowerCase().includes(searchString) ||
                    character.company.toLowerCase().includes(searchString) ||
                    character.location.toLowerCase().includes(searchString)

                );
            });
            displayCharacters1(filteredCharacters);
        }
        else {
            displayCharacters1(diffJobs);
        }
    });




function displayCharacters1(character) {
    let str = '';

    for (let index = 0; index < character.length; index++) {
        str += ` <section class="character">
        <div class="container" id="job">
        <div class="company-details">
        <div class="job-update">
        <i class="fa fa-briefcase"></i>Profile: <span id="profile">${character[index].profile}</span><br>
        <i class="fa fa-building" aria-hidden="true"></i>Company: <span id="company">${character[index].company}</span><br>
        <i class="fa fa-inr"></i>Salary: <span id="salary">${character[index].salary}</span><br>
        <i class="fa fa-map-marker"></i>Location: <span id="location">${character[index].location}</span><br>
        <div class='apply'><a href='job_description.html' onclick='storeData()'>View Details</a></div>
        </div>
        </div>
        </div>
        </section>
        `


    }
    jobsHolder.innerHTML = str;

}


if (filterBtn)
    filterBtn.addEventListener('click', function () {
        let s2 = JobSalary.value.toLowerCase();
        let s3 = JobLocation.value.toLowerCase();

        const filteredCharacters = diffJobs.filter((character) => {
            return (
                character.salary.toLowerCase().includes(s2) &&
                character.location.toLowerCase().includes(s3)
            );
        });
        displayCharacters1(filteredCharacters);
    })

function sortByProperty(property) {
    return function (a, b) {
        if (a[property] > b[property])
            return 1;
        else if (a[property] < b[property])
            return -1;

        return 0;
    }
}

function SortOrder() {
    if (jobsort.value === 'salary') {
        diffJobs.sort(sortByProperty('salary'));
        displayCharacters1(diffJobs);
    }
    

}




//....................................................................job description page .............................................................//
function loadevent(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}

// function to store data in local storage
function storeData(e) {
    var a = loadevent(e);
    console.log(a);
    var b = a.parentNode.parentNode;
    console.log(b);
    localStorage.setItem("profile", b.children[1].innerText);
    localStorage.setItem("company", b.children[4].innerText);

    console.log(localStorage);
}


function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

/*An array containing all the country names in the world:*/
var countries = ["Accounts Assistant", "Software Engineer", "HR Assistant", "QA Engineer", "Full Stack Developer", "Deloitte", "Hyderabad", "TA Digital", "Gurgaon", "Google", "Bangalore", "Cognizant", "Mumbai", "Amazon", "Pune",];

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("search"), countries);





