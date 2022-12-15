import {
    Car,
    CarParameters,
    MoveProperties,
    Success,
    Winner,
    WinnerAdvanced,
    sortWinners,
    orderWinners,
    WinnerParameters,
} from '../../types/types';
import { GARAGE_API, ENGINE_API, WINNERS_API } from '../../constants/constants';

//! ------------------ CARS ------------------------------------------------------

export async function getAllCars(): Promise<Array<Car>> {
    const response = await fetch(`${GARAGE_API}`);
    const allCars = await response.json();
    return allCars;
}

async function getCarsAndAmount(page: number, limit = 7) {
    const response = await fetch(`${GARAGE_API}?_page=${page}&_limit=${limit}`);
    return response;
}

export async function getCars(page: number, limit = 7): Promise<Array<Car>> {
    //! возвращает массив машин с конкретной переданной страницы
    const сarsList = await (await getCarsAndAmount(page, limit)).json();
    return сarsList;
}

export async function getAmountCars(page: number, limit = 7): Promise<string> {
    //! не важно, какая страница, всё равно показывает общее количество машин
    const amountCars = (await getCarsAndAmount(page, limit)).headers.get('X-Total-Count') as string;
    return amountCars;
}

export async function getCarById(id: number): Promise<Car> {
    const response = await fetch(`${GARAGE_API}/${id}`);
    const car = await response.json();
    return car;
}

export async function createCar(obj: CarParameters): Promise<Car> {
    const response = await fetch(GARAGE_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    });
    const newCar = await response.json();
    return newCar;
}

export async function deleteCarById(id: number): Promise<Record<string, never>> {
    const response = await fetch(`${GARAGE_API}/${id}`, {
        method: 'DELETE',
    });
    return await response.json(); // {}
}

export async function updateCar(obj: CarParameters, id: number): Promise<Car> {
    const response = await fetch(`${GARAGE_API}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    });
    const updatedCar = await response.json();
    return updatedCar;
}

//! ------------------ START-STOP-DRIVE ------------------------------------------------------

export async function startCarsEngine(id: number): Promise<MoveProperties> {
    const response = await fetch(`${ENGINE_API}?id=${id}&status=started`, {
        method: 'PATCH',
    });
    const moveProperties = await response.json();
    return moveProperties;
}

export async function stopCarsEngine(id: number): Promise<MoveProperties> {
    const response = await fetch(`${ENGINE_API}?id=${id}&status=stopped`, {
        method: 'PATCH',
    });
    const moveProperties = await response.json();
    return moveProperties;
}

export async function switchCarsEngineToDriveMode(id: number): Promise<Success> {
    try {
        const response = await fetch(`${ENGINE_API}?id=${id}&status=drive`, {
            method: 'PATCH',
        });
        const moveProperties = await response.json();
        return moveProperties;
    } catch (error) {
        return { success: false };
    }
}

//! ------------------ WINNERS ------------------------------------------------------

async function getWinnersAndAmount(page: number, sort: sortWinners, order: orderWinners, limit = 10) {
    const response = await fetch(`${WINNERS_API}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);
    return response;
}

export async function getWinners(
    page: number,
    sort: sortWinners,
    order: orderWinners,
    limit = 10
): Promise<Array<WinnerAdvanced>> {
    const winnersList = await (await getWinnersAndAmount(page, sort, order, limit)).json();
    const allCars = await getAllCars();
    allCars.forEach((carObj: Car) => {
        winnersList.forEach((winnerObj: WinnerAdvanced) => {
            if (carObj.id === winnerObj.id) {
                winnerObj.color = carObj.color;
                winnerObj.name = carObj.name;
            }
        });
    });
    return winnersList;
}

export async function getAmountWinners(
    page: number,
    sort: sortWinners,
    order: orderWinners,
    limit = 10
): Promise<string> {
    const amountWinners = (await getWinnersAndAmount(page, sort, order, limit)).headers.get('X-Total-Count') as string;
    return amountWinners;
}

export async function getWinnerById(id: number): Promise<Winner> {
    const response = await fetch(`${WINNERS_API}/${id}`);
    const winner = await response.json();
    return winner;
}

export async function createWinner(obj: Winner): Promise<Winner> {
    //! при создании Winner нужно указывать ID, поэтому тут тип Winner, а не WinnerParameters
    const response = await fetch(WINNERS_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    });
    const newWinner = await response.json();
    return newWinner;
}

export async function deleteWinnerById(id: number) {
    const response = await fetch(`${WINNERS_API}/${id}`, {
        method: 'DELETE',
    });
    return await response.json(); // {}
}

export async function updateWinner(obj: WinnerParameters, id: number): Promise<Winner> {
    const response = await fetch(`${WINNERS_API}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    });
    const updatedWinner = await response.json();
    return updatedWinner;
}

export async function saveWinnerToScore(id: number, time: number) {
    const winnerToSave = await getWinnerById(id);
    const isInScore = JSON.stringify(winnerToSave) !== '{}';

    if (isInScore) {
        const numberOfWins = winnerToSave.wins; //! количество побед этого winner на данный момент
        const bestTime = winnerToSave.time; //! лучшее время этого winner на данный момент
        const newTime = time < bestTime ? time : bestTime;

        await updateWinner(
            {
                wins: numberOfWins + 1,
                time: newTime,
            },
            id
        );
    } else {
        await createWinner({
            id: id,
            wins: 1,
            time: time,
        });
    }
}
