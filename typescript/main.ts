import { Course } from './course.js';
import { dataCourses } from './dataCourses.js';
const coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById('button-filterByName')!;
const input = document.getElementById('search-box') as HTMLInputElement;
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
  text = (text == null) ? '' : text;
  var courses;
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
  courses = coursesFiltered;
  let creditsCount = document.createElement("h3");
  creditsCount.textContent = "Créditos totales: " +  getTotalCredits(courses);
  cursosDiv.appendChild(creditsCount);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

btnfilterByName.onclick = () => applyFilterByName();