import {Car} from './Car';

const musicToggleElement = <HTMLElement>document.querySelector('#music-toggle');
const musicSliderElement = <HTMLInputElement>(
    document.querySelector('#music-slider')
);
const engineToggleElement = <HTMLInputElement>(
    document.querySelector('#engine-toggle')
);
const addFuelForm = document.querySelector('#add-fuel-form');
const addFuelInput = <HTMLFormElement>document.querySelector('#add-fuel-input');
const fuelLevelElement = <HTMLElement>document.querySelector('#fuel-level');
const milesElement = <HTMLElement>document.querySelector('#miles-value');
const audioElement = <HTMLAudioElement>document.querySelector('#car-music');

let car = new Car(100);

musicToggleElement.addEventListener('click', () => {
    if (car._musicPlayer.level === 0) {
        car._musicPlayer.turnOn();
        musicSliderElement.value = car._musicPlayer.level.toString();
        musicToggleElement.innerText = 'Turn music off';
        return;
    }
    musicToggleElement.innerText = 'Turn music on';
    car._musicPlayer.turnOff();
});

//I use input instead of change, because then the value changes when I move the mouse, not only on release
musicSliderElement.addEventListener('input', (event) => {
    let target = <HTMLFormElement>event.target;

    car._musicPlayer.level = target.value;
    audioElement.volume = car._musicPlayer.level / 100;

    //@todo when you are repeating the same text over and over again maybe we should have made some constants for it? Can you do improve on this?
    musicToggleElement.innerText = car._musicPlayer.level
        ? 'Turn music off'
        : 'Turn music on';
});

engineToggleElement.addEventListener('click', () => {
    if (car._engine.engineStatus) {
        car._engine.turnOff();
        engineToggleElement.innerText = 'Turn engine on';
        return;
    }
    engineToggleElement.innerText = 'Turn engine off';
    car._engine.turnOn();
});

addFuelForm.addEventListener('submit', (event) => {
    event.preventDefault();

    car.addFuel(Number(addFuelInput.value));
    fuelLevelElement.innerText = car.fuel.toString();
});

setInterval(() => {
    car.drive();

    //while it looks like both lines below are the same there is a subtle difference (you could put breakpoints here to see the difference):
    // this <cast> will only tell TypeScript that the value is a string, but the actual variable in JS is not changed in any way: it is in reality still a number
    milesElement.innerText = <string>(<unknown>car.miles);
    // This .toString() will actually convert the value in JavaScript from an integer to a string
    fuelLevelElement.innerText = car.fuel.toString();

    if (car._musicPlayer.level === 0) {
        audioElement.pause();
    } else {
        audioElement.play();
    }
}, 1000);