import { PI } from './myMath.js';
import { Shape } from './shape.js';

export class Circle extends Shape {
    constructor(radius, color) {
        super(color);
        this.radius = radius;
    }

    getRadius() {
        return this.radius;
    }

    setRadius(radius) {
        this.radius = radius;
    }

    getDiameter() {
        return this.radius * 2;
    }

    getCircumference() {
        return 2 * PI * this.radius;
    }

    getArea() {
        return PI * this.radius ** 2;
    }
}
