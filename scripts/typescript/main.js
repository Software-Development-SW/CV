import { dataCourses } from './dataCourses.js';
import { dataStudents } from './dataStudents.js';
var coursesTbody = document.getElementById('courses');
var studentsTbody = document.getElementById('students');
var btnfilterByName = document.getElementById('button-filterByName');
var btnfilterByCredits = document.getElementById('button-filterByCredits');
var input = document.getElementById('search-box');
var minCredits = document.getElementById('min-credits');
var maxCredits = document.getElementById('max-credits');
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
        var creditos = document.getElementById("creditos-totales");
        if (creditos != null) {
            creditos.remove();
        }
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
    var courses;
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
    courses = coursesFiltered;
    var creditsCount = document.createElement("h3");
    creditsCount.setAttribute("id", "creditos-totales");
    creditsCount.textContent = "Créditos totales: " + getTotalCredits(courses);
    cursosDiv.appendChild(creditsCount);
}
function applyFilterByCredits() {
    clearTable();
    var coursesFiltered = searchCourseByCredits(parseInt(minCredits.value), parseInt(maxCredits.value), dataCourses);
    renderCoursesInTable(coursesFiltered);
    var creditsCount = document.createElement("h3");
    creditsCount.setAttribute("id", "creditos-totales");
    creditsCount.textContent = "Créditos totales: " + getTotalCredits(coursesFiltered);
    cursosDiv.appendChild(creditsCount);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function searchCourseByCredits(minCredits, maxCredits, courses) {
    return courses.filter(function (course) { return course.credits >= minCredits && course.credits <= maxCredits; });
}
function renderStudentsInTable(students) {
    students.forEach(function (c) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>".concat(c.name, "</td>\n                           <td>").concat(c.code, "</td>\n                           <td>").concat(c.id, "</td>\n                           <td>").concat(c.age, "</td>\n                           <td>").concat(c.direction, "</td>\n                           <td>").concat(c.phone, "</td>");
        studentsTbody.appendChild(trElement);
    });
}
renderStudentsInTable(dataStudents);
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCredits.onclick = function () { return applyFilterByCredits(); };
