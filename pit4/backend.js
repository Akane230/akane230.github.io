const toggleBtn = document.querySelector('.toggle-btn');
const toggleBtnIcon = document.querySelector('.toggle-btn i');
const dropDownMenu = document.querySelector('.dropdown-menu');
const courseContainer = document.getElementById("course-container");
const searchBox = document.getElementById("search-box");

const jsonfile = "./courses.json";
let coursedata = [];

async function getCourseData() {
    try {
        const response = await fetch(jsonfile);
        coursedata = await response.json();

        if (!coursedata || !coursedata.courses) {
            console.error("No data found!");
            return;
        }
        displayCourseData(coursedata.courses); 
    } catch (error) {
        console.error("Error: ", error);
    }
}

function displayCourseData(data) {
    courseContainer.innerHTML = ""; 

    data.forEach(course => {
        const { year_level, sem, code, description, credit } = course;
        const div = document.createElement("div");
        div.innerHTML = `
            <h3>Year Level: ${year_level}</h3>
            <ul>
                <li>Semester: ${sem}</li>
                <li>Course Code: ${code}</li>
                <li>Description: ${description}</li>
                <li>Credit: ${credit}</li>
            </ul>
        `;
        courseContainer.appendChild(div);
    });
}

// function searchItem() {
//     const searchTerm = searchBox.value.toLowerCase().trim();

//     if (searchTerm === "") {
//         displayCourseData(coursedata.courses); 
//         return;
//     }

//     const filteredCourses = coursedata.courses.filter(course =>
//         course.description.toLowerCase().includes(searchTerm) || course.code.toLowerCase().includes(searchTerm)
//     );

//     displayCourseData(filteredCourses);
// }


toggleBtn.onclick = function () {
    dropDownMenu.classList.toggle('open');
    const isOpen = dropDownMenu.classList.contains('open');
    toggleBtnIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
};

getCourseData();