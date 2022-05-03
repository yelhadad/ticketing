class Person {
  firstName: string;
  lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName; 
  }

  fullName() {
    return this.firstName + ' ' + this.lastName;
  }
}

class Student extends Person {
  school: string
  subject: string
  grade: string

  constructor(school: string, subject: string, grade: string, firstName: string, lastName: string){
    super(firstName, lastName)
    this.grade = grade;
    this.subject = subject;
    this.school = school;
  }
}


