import { Circle } from './circle.js';
import { randomInt } from './myMath.js';

const circle1 = new Circle(5, 'red');
console.log(circle1.getRadius());
console.log(circle1.getDiameter());
console.log(circle1.getCircumference());
console.log(circle1.getArea());
console.log(circle1.getColor());

const circle2 = new Circle(randomInt(1, 10), 'blue');
console.log(circle2.getRadius());
console.log(circle2.getDiameter());
console.log(circle2.getCircumference());
console.log(circle2.getArea());
console.log(circle2.getColor());
