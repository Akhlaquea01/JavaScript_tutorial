/*******************************************************
 * TOPIC: CLASS INHERITANCE (extends / super)
 *
 * `extends` lets one class inherit properties and methods
 * from another. `super` calls the parent's constructor (or
 * a parent method) from inside the child class.
 *
 * Covers:
 *  1. Base class with constructor + method
 *  2. extends + super in a derived class
 *  3. Multiple subclasses sharing one parent
 *  4. Method overriding
 *  5. Static methods (belong to the class, not instances)
 *******************************************************/


/********************************************************
 * 1️⃣ BASE (PARENT) CLASS
 ********************************************************/

class Person {
    constructor(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    greet() {
        console.log(`${this.name} says hello`);
    }

    static func() {
        // `static` methods live on the class itself, not on instances —
        // called as Person.func(), never as somePerson.func()
        console.log("I'm a static function");
    }
}

const person1 = new Person('Rajesh', 25, 'male');
person1.greet(); // "Rajesh says hello"


/********************************************************
 * 2️⃣ extends + super — DERIVED (CHILD) CLASSES
 *
 * - "Derived class" = the class doing the inheriting (Student)
 * - "Parent/base class" = the class being inherited from (Person)
 * - `super(...)` MUST be called before using `this` in a
 *   derived constructor — it runs the parent's constructor
 *   so the inherited fields get initialized first.
 ********************************************************/

class Student extends Person {
    constructor(name, age, gender, cgpa, batchName) {
        super(name, age, gender); // sets this.name/age/gender via Person's constructor
        this.cgpa = cgpa;
        this.batchName = batchName;
    }
}

const student1 = new Student('Balla', 30, 'male', '8.5', 'LLD Full stack');
student1.greet();              // "Balla says hello" — greet() is inherited, not redefined
console.log(student1.cgpa);    // "8.5" — own property, added in Student's constructor
console.log(student1 instanceof Person); // true — Student IS-A Person


/********************************************************
 * 3️⃣ MULTIPLE SUBCLASSES SHARING ONE PARENT
 *
 * Any number of classes can extend the same parent — each
 * gets the shared behavior (greet) plus its own fields.
 ********************************************************/

class Teacher extends Person {
    constructor(name, age, gender, averageRating, batchStrength) {
        super(name, age, gender);
        this.averageRating = averageRating;
        this.batchStrength = batchStrength;
    }
}

const teacher1 = new Teacher('Sanchit', 26, 'male', 4, 100);
console.log(teacher1);
Teacher.func(); // static methods are inherited too — "I'm a static function"


/********************************************************
 * 4️⃣ METHOD OVERRIDING
 *
 * A derived class can redefine a method it inherited.
 * `super.methodName()` still lets you call the parent's
 * version from inside the override, if you want to extend
 * rather than fully replace it.
 ********************************************************/

class Intern extends Person {
    constructor(name, age, gender, mentor) {
        super(name, age, gender);
        this.mentor = mentor;
    }

    greet() { // overrides Person.prototype.greet
        super.greet();                          // still runs the parent's version first...
        console.log(`...mentored by ${this.mentor}`); // ...then adds extra behavior
    }
}

const intern1 = new Intern('Priya', 22, 'female', 'Sanchit');
intern1.greet();
// "Priya says hello"
// "...mentored by Sanchit"


/********************************************************
 * 5️⃣ INTERVIEW NOTES
 *
 * ✔ `super(...)` must run before `this` is used in a
 *   derived constructor — JS enforces this at runtime.
 * ✔ Methods defined in a class body live on the PROTOTYPE
 *   (shared by all instances), not copied onto each object
 *   — see 033-prototypes.js for how that lookup works.
 * ✔ `static` members belong to the class itself and are
 *   inherited by subclasses, but never appear on instances.
 * ✔ Overriding + `super.method()` lets a subclass extend
 *   behavior instead of fully replacing it.
 *
 * KEY: `extends` sets up the prototype chain for you;
 * `super` is how a child reaches up that chain to its parent.
 ********************************************************/
