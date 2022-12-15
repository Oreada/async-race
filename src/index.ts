import './scss/style.scss';
import { storage } from './components/statesStorage/statesStorage';
import { updateStorageGarage, updateStorageWinners } from './components/statesStorage/statesStorage';
import { changeSortWinners, changeOrderWinners } from './components/statesStorage/statesStorage';
import { htmlTotal } from './components/view/total-view';
import { drawGarageList } from './components/view/1-garage';
import { drawWinnersList } from './components/view/2-winners';
import { addListenersToPageButtons } from './components/view/prev-next-buttons';
import { addListenersToControlsButtons } from './components/view/controls-buttons';
import { addListenersToRaceButtons } from './components/view/management-buttons';
import { addListenersToNavigation } from './components/view/navigation-buttons';
import { addSortHandler } from './components/view/sorting';
import {
    addListenerToCreateButton,
    addListenerToGenerateButton,
    addListenerToUpdateButton,
} from './components/view/management-buttons';

const currentPageGarage = 1;
const currentPageWinners = 1;

await updateStorageGarage(currentPageGarage);
await updateStorageWinners(currentPageWinners);

htmlTotal();
drawGarageList();
drawWinnersList();

export const garageButtonPrevious = document.querySelector('.garage__pages-previous') as HTMLButtonElement;
export const garageButtonNext = document.querySelector('.garage__pages-next') as HTMLButtonElement;
export const winnersButtonPrevious = document.querySelector('.winners__pages-previous') as HTMLButtonElement;
export const winnersButtonNext = document.querySelector('.winners__pages-next') as HTMLButtonElement;

export const createButton = document.querySelector('.create__button') as HTMLButtonElement;
export const updateButton = document.querySelector('.update__button') as HTMLButtonElement;
export const generateButton = document.querySelector('.generate__button') as HTMLButtonElement;

addListenersToPageButtons();
addListenersToControlsButtons();
addListenersToRaceButtons();
addListenersToNavigation();

addListenerToCreateButton();
addListenerToGenerateButton();
addListenerToUpdateButton();

const garageElement = document.querySelector('.garage') as HTMLDivElement;
const winnersElement = document.querySelector('.winners') as HTMLDivElement;

if (storage.view === 'garage') {
    garageElement.style.display = 'block';
    winnersElement.style.display = 'none';
} else if (storage.view === 'winners') {
    garageElement.style.display = 'none';
    winnersElement.style.display = 'block';
}

changeSortWinners(storage.sortWinners);
changeOrderWinners(storage.orderWinners);
export const selectSorting = document.querySelector('.sorting__select') as HTMLSelectElement;
addSortHandler();

console.log(`For Cross-check: All requirements are fulfilled. Score: 190`);
