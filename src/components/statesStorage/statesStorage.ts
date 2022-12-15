import { getCars, getAmountCars, getWinners, getAmountWinners } from '../api/api';
import { Storage, sortWinners, orderWinners } from '../../types/types';

export const storage: Storage = {
    pageCars: 1,
    amountCars: 'amount',
    carsListFromSertainPage: [
        {
            name: 'string',
            color: 'string',
            id: 0,
        },
    ],

    pageWinners: 1,
    amountWinners: 'amount',
    winnersListFromSertainPage: [
        {
            id: 0,
            wins: 0,
            time: 0,
            name: 'string',
            color: 'string',
        },
    ],

    sortWinners: 'wins',
    orderWinners: 'ASC',

    animationIds: {},
    newWinnerId: 0,
    newWinnerTime: 0,
    mode: 'walk',

    view: 'garage',

    idCarToUpdate: 0,
};

export async function updateStorageGarage(page: number) {
    storage.pageCars = page;
    storage.carsListFromSertainPage = await getCars(page);
    storage.amountCars = await getAmountCars(page);
}

export async function nextPageGarage() {
    await updateStorageGarage(storage.pageCars + 1);
}

export async function previousPageGarage() {
    await updateStorageGarage(storage.pageCars - 1);
}

export async function updateStorageWinners(page: number) {
    storage.pageWinners = page;
    storage.winnersListFromSertainPage = await getWinners(page, storage.sortWinners, storage.orderWinners);
    storage.amountWinners = await getAmountWinners(page, storage.sortWinners, storage.orderWinners);
}

export async function nextPageWinners() {
    await updateStorageWinners(storage.pageWinners + 1);
}

export async function previousPageWinners() {
    await updateStorageWinners(storage.pageWinners - 1);
}

export async function changeSortWinners(newSort: sortWinners) {
    storage.sortWinners = newSort;
    await updateStorageWinners(storage.pageWinners);
}

export async function changeOrderWinners(newOrder: orderWinners) {
    storage.orderWinners = newOrder;
    await updateStorageWinners(storage.pageWinners);
}
