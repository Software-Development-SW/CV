import { dataCourses } from './dataCourses.js';
var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById('button-filterByName');
var input = document.getElementById('search-box');
var elements = document.getElementsByClassName('tableRow');
var cursosDiv = document.getElementById('cursos-actuales');
function renderCoursesInTable(courses) {
    courses.forEach(function (c) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>".concat(c.name, "</td>\n                           <td>").concat(c.professor, "</td>\n                           <td>").concat(c.credits, "</td>");
        trElement.setAttribute("class", "tableRow");
        coursesTbody.appendChild(trElement);
    });
}
function clearTable() {
    for (var i = 0; i < elements.length; i++) {
        elements[i].remove();
    }
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits.toString();
}
function applyFilterByName() {
    clearTable();
    var text = input.value;
    text = (text == null) ? '' : text;
    var courses;
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
    courses = coursesFiltered;
    var creditsCount = document.createElement("h3");
    creditsCount.textContent = "Créditos totales: " + getTotalCredits(courses);
    cursosDiv.appendChild(creditsCount);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
btnfilterByName.onclick = function () { return applyFilterByName(); };
