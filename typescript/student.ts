export class Student {
    name: string;
    code: string;
    id: string;
    age: number;
    direction: string;
    phone: string;
  
    constructor(name: string, code: string, id: string, age: number, direction: string, phone: string) {
        this.name = name;
        this.code = code;
        this.id = id;
        this.age = age;
        this.direction = direction;
        this.phone = phone;
    }
  }