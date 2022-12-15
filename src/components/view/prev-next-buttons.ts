import { LIMIT_GARAGE_DEFAULT, LIMIT_WINNERS_DEFAULT } from '../../constants/constants';
import { storage } from '../../components/statesStorage/statesStorage';
import {
    nextPageGarage,
    previousPageGarage,
    nextPageWinners,
    previousPageWinners,
} from '../../components/statesStorage/statesStorage';
import { drawGarageList } from '../view/1-garage';
import { drawWinnersList } from '../view/2-winners';
import { garageButtonPrevious, garageButtonNext, winnersButtonPrevious, winnersButtonNext } from '../../index';
import { drawNewTitles } from '../view/total-view';

export function disableTrueOrFalseGarage() {
    if (storage.pageCars > 1) {
        garageButtonPrevious.disabled = false;
    } else {
        garageButtonPrevious.disabled = true;
    }
    if (storage.pageCars * LIMIT_GARAGE_DEFAULT < Number(storage.amountCars)) {
        garageButtonNext.disabled = false;
    } else {
        garageButtonNext.disabled = true;
    }
}

export function disableTrueOrFalseWinners() {
    if (storage.pageWinners > 1) {
        winnersButtonPrevious.disabled = false;
    } else {
        winnersButtonPrevious.disabled = true;
    }
    if (storage.pageWinners * LIMIT_WINNERS_DEFAULT < Number(storage.amountWinners)) {
        winnersButtonNext.disabled = false;
    } else {
        winnersButtonNext.disabled = true;
    }
}

export function addListenersToPageButtons() {
    garageButtonPrevious.addEventListener('click', async function () {
        await previousPageGarage();
        drawGarageList();
        drawNewTitles();
        disableTrueOrFalseGarage();
    });

    garageButtonNext.addEventListener('click', async function () {
        await nextPageGarage();
        drawGarageList();
        drawNewTitles();
        disableTrueOrFalseGarage();
    });

    winnersButtonPrevious.addEventListener('click', async function () {
        await previousPageWinners();
        drawWinnersList();
        drawNewTitles();
        disableTrueOrFalseWinners();
    });

    winnersButtonNext.addEventListener('click', async function () {
        await nextPageWinners();
        drawWinnersList();
        drawNewTitles();
        disableTrueOrFalseWinners();
    });
}
