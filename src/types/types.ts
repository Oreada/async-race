export interface Car {
    name: string;
    color: string;
    id: number;
}

export interface CarParameters {
    name: string;
    color: string;
}

export interface MoveProperties {
    velocity: number;
    distance: number;
}

export interface Success {
    success: boolean;
}

export interface Winner {
    id: number;
    wins: number;
    time: number;
}

export interface WinnerAdvanced {
    id: number;
    wins: number;
    time: number;
    name: string;
    color: string;
}

export interface WinnerParameters {
    wins: number;
    time: number;
}

export type sortWinners = 'id' | 'wins' | 'time';

export type orderWinners = 'ASC' | 'DESC';

export interface Storage {
    pageCars: number;
    amountCars: string;
    carsListFromSertainPage: Array<Car>;

    pageWinners: number;
    amountWinners: string;
    winnersListFromSertainPage: Array<WinnerAdvanced>;
    sortWinners: sortWinners;
    orderWinners: orderWinners;

    animationIds: Record<string, number>;

    newWinnerId: number;
    newWinnerTime: number;
    mode: string;

    view: 'garage' | 'winners';

    idCarToUpdate: number;
}

export interface Movingresult {
    id: number;
    time: number;
}
