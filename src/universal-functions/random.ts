import { CAR_NAMES, CAR_COLORS } from '../constants/constants';
import { CarParameters } from '../types/types';

function getRandomItem(array: Array<string>): string {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

export function getArrayRandomCars(): Array<CarParameters> {
    const arrHundredCars = [];
    for (let i = 0; i < 100; i += 1) {
        arrHundredCars.push({
            name: getRandomItem(CAR_NAMES),
            color: getRandomItem(CAR_COLORS),
        });
    }
    return arrHundredCars;
}
