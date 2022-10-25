import { Course } from './course.js';
import { Student } from './student.js';
import { dataCourses } from './dataCourses.js';
import { dataStudents } from './dataStudents.js';

const coursesTbody: HTMLElement = document.getElementById('courses')!;
const studentsTbody: HTMLElement = document.getElementById('students')!;
const btnfilterByName: HTMLElement = document.getElementById('button-filterByName')!;
const btnfilterByCredits: HTMLElement = document.getElementById('button-filterByCredits')!;
const input = document.getElementById('search-box') as HTMLInputElement;
const minCredits = document.getElementById('min-credits') as HTMLInputElement;
const maxCredits = document.getElementById('max-credits') as HTMLInputElement;
let elements = document.getElementsByClassName('tableRow');
const cursosDiv: HTMLElement = document.getElementById('cursos-actuales')!;

function renderCoursesInTable(courses: Course[]): void {
  courses.forEach(c => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${c.name}</td>
                           <td>${c.professor}</td>
                           <td>${c.credits}</td>`;
    trElement.setAttribute("class", "tableRow")
    coursesTbody.appendChild(trElement);
  });
}

function clearTable(): void {
  for (let i = 0; i < elements.length; i++) {
    elements[i].remove();
  let creditos = document.getElementById("creditos-totales")
  if(creditos != null){
    creditos.remove();
  }
}
}


function getTotalCredits(courses: Course[]): string {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits.toString();
}


function applyFilterByName() { 
  clearTable();
  let text = input.value;
  var courses;
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
  courses = coursesFiltered;
  let creditsCount = document.createElement("h3");
  creditsCount.setAttribute("id", "creditos-totales");
  creditsCount.textContent = "Créditos totales: " +  getTotalCredits(courses);
  cursosDiv.appendChild(creditsCount);
}

function applyFilterByCredits(){
  clearTable();
  let coursesFiltered: Course[] = searchCourseByCredits(parseInt(minCredits.value), parseInt(maxCredits.value), dataCourses)
  renderCoursesInTable(coursesFiltered);
  let creditsCount = document.createElement("h3");
  creditsCount.setAttribute("id", "creditos-totales");
  creditsCount.textContent = "Créditos totales: " +  getTotalCredits(coursesFiltered);
  cursosDiv.appendChild(creditsCount);
}


function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

function searchCourseByCredits(minCredits: number, maxCredits: number, courses: Course[]) {

  return courses.filter(course => course.credits >= minCredits && course.credits <= maxCredits);
}

function renderStudentsInTable(students: Student[]): void {
  students.forEach(c => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${c.name}</td>
                           <td>${c.code}</td>
                           <td>${c.id}</td>
                           <td>${c.age}</td>
                           <td>${c.direction}</td>
                           <td>${c.phone}</td>`;
    studentsTbody.appendChild(trElement);
  });
}
renderStudentsInTable(dataStudents);

btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCredits.onclick = () => applyFilterByCredits();