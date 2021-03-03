var diffJobs=[];
const loadCharacters = async () => {
    try {
        const res = await fetch('./data.json');
        diffJobs = await res.json();
        displayResult(diffJobs);
        // displayCharacters1(diffJobs);
    } catch (err) {
        console.log(err);
    }
    // diffJobs=diffJobs.sort(GetSortOrder);
};

loadCharacters();
function displayResult(diffJobs){
    let s2 = localStorage.getItem('profile');
    let s3 = localStorage.getItem('company');
    console.log(s3);

   for (let i = 0; i < diffJobs.length; i++) {
       if (diffJobs[i].profile===s2 && diffJobs[i].company===s3) {
        showLoadDescription(diffJobs[i]);
        break;
       }
       else {
           continue;
       }
       
   }
  //console.log(filteredCharacters);

 
 
}

function showLoadDescription(filteredData) {
    console.log(filteredData);
    let out = '';
    out+= "<section>"
    out+= "<h1 id='job_description'>JOB DESCRIPTION</h1>";
    out+=  "<div class='container'>";
    out+= "<div class='company-details' id='job1'>";
    out+= "<i class='fa fa-briefcase'></i><span id='profile'>Profile : "  + filteredData.profile + "</span><br>";
    out+= "<i class='fa fa-building'></i><span id='company'>Company : "  + filteredData.company + "</span><br>";
    out+= "<i class='fa fa-inr'></i><span id='salary'>Salary : "  + filteredData.salary + "</span><br>";
    out+= "<i class='fa fa-map-marker'></i><span id='profile'>Location : "  + filteredData.location + "</span><br>";
    out+= "</div>";
    // out+= "<div class='logo_specific'>"
    // out+= "<img src= " + filteredData.img + ">";
    // out+= "</div>";
    out+= "<div class='img-conatiner'>"
    out+= "<p class='suggested_jobs'>Suggested Jobs For You</p>";
    out+= "<img src='./images/ta_logo.png'>"
    out+= "<img src='./images/google_logo.png'>"
    out+= "<img src='./images/deloitte_logo.png'>"
    out+= "<img src='./images/amazon_logo.png'>"
    
    out+= "</div>"
    out+= "<div id='job2'>";
    out+= "<h3>Job Description</h3>"
    out+= "<p>" + filteredData.description + "</p>";
    out+= "<h3>About Company</h3>"
    out+= "<p>" + filteredData.about + "</p>";
    out+= "<h3>Skills Required</h3>"
    out+= "<p>" + filteredData.skills + "</p>";
    out+= "</div>";
    out+= "<button class='example_f' id='applyjob_button'>Apply Job</button>"
    out+= "</div>";
    
    out+= "</section>";
    


     main.innerHTML = out;
  
}