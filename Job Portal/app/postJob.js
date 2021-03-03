let company = document.getElementById('job_company');
let profile = document.getElementById('job_profile');
let locationn = document.getElementById('job_location');
let salary = document.getElementById('job_salary');
let description = document.getElementById('job_description');
let about = document.getElementById('job_about');
let skills = document.getElementById('job_skills');
let deleteId = document.getElementById('delete_id');

let company1 = document.getElementById('job_company1');
let profile1 = document.getElementById('job_profile1');
let locationn1 = document.getElementById('job_location1');
let salary1 = document.getElementById('job_salary1');
let description1 = document.getElementById('job_description1');
let about1 = document.getElementById('job_about1');
let skills1 = document.getElementById('job_skills1');
let deleteId1 = document.getElementById('delete_id1');


details = JSON.parse(localStorage.getItem("myData"));

function postJob() {
    console.log("hi" + JSON.stringify(company.value));
    if(company.value === "") {
        window.alert("Company Can't Be Empty");
        return;
    }
    if(profile.value === "") {
        window.alert("Profile Can't Be Empty");
        return;
    }
    if(locationn.value === "") {
        window.alert("Location Can't Be Empty");
        return;
    }
    const newId = details[details.length - 1].id + 1;
    let postedJob = {
        "id": newId,
        "company": company.value,
        "profile": profile.value,
        "location": locationn.value,
        "salary": salary.value,
        "description": description.value,
        "about": about.value,
        "skills": skills.value

    };
    details.push(postedJob);
    localStorage.setItem("myData", JSON.stringify(details));
    window.alert("Job Posted");
    location.href = 'index.html';
    console.log("hello");

}
function deleteJob() {
    details = details.filter(job => job.id != deleteId.value);
    window.alert("Job Deleted");
    localStorage.setItem("myData", JSON.stringify(details));
    location.href = 'index.html';
}
//postJob();

function modifyJob() {
     details.forEach((job, index) => {
        if (job.id == deleteId1.value) {
            job = {
                id: job.id,
                company: company1.value ? company1.value : job.company,
                profile: profile1.value ? profile1.value : job.profile,
                location: locationn1.value ? locationn1.value : job.locationn1,
                salary: salary1.value ? salary1.value : job.salary,
                description: description1.value ? description1.value : job.description,
                about: about1.value ? about1.value : job.about,
                skills: skills1.value ? skills1.value : job.skills
            }; console.log(JSON.stringify(job));
            details[index] = job;
        }
    });
    localStorage.setItem("myData", JSON.stringify(details));
    window.alert("Job Mofified");
    location.href = 'index.html';
    console.log(details);
}