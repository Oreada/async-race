import { storage, updateStorageGarage } from '../statesStorage/statesStorage';
import { startMoving, stopMoving } from '../moving/moving';
import { createButton, updateButton, generateButton } from '../..';
import { createCar, updateCar } from '../api/api';
import { drawGarageList } from './1-garage';
import { drawNewTitles } from './total-view';
import { disableTrueOrFalseGarage } from './prev-next-buttons';
import { getArrayRandomCars } from '../../universal-functions/random';

export function addListenersToRaceButtons() {
    document.body.addEventListener('click', async function (event) {
        const carsOnPageList = storage.carsListFromSertainPage;
        const targetButton = event.target as HTMLButtonElement;
        if (targetButton.classList.contains('race__start')) {
            createButton.disabled = true;
            updateButton.disabled = true;
            generateButton.disabled = true;

            //! устанавливаю режим гонки:
            storage.mode = 'racing';
            //! удаляю старого победителя:
            storage.newWinnerId = 0;
            storage.newWinnerTime = 0;

            //! делаю ресет всех машинок, т.к. в этот момент на финише могут быть машинки, ранее запущенные в walk-mode
            carsOnPageList.map(async (carObj) => await stopMoving(carObj.id));

            //! запускаю гонку - старт всех машинок текущей страницы:
            carsOnPageList.map(async (carObj) => await startMoving(carObj.id));

            const raceStartButton = document.querySelector('.race__start') as HTMLButtonElement;
            raceStartButton.disabled = true;
            const raceResetButton = document.querySelector('.race__reset') as HTMLButtonElement;
            raceResetButton.disabled = false;
        }
        if (targetButton.classList.contains('race__reset')) {
            createButton.disabled = false;
            generateButton.disabled = false;

            carsOnPageList.map(async (carObj) => await stopMoving(carObj.id));

            const messageCanvas = document.querySelector('.garage__message') as HTMLElement;
            messageCanvas.innerHTML = '';
            const raceStartButton = document.querySelector('.race__start') as HTMLButtonElement;
            raceStartButton.disabled = false;
            const raceResetButton = document.querySelector('.race__reset') as HTMLButtonElement;
            raceResetButton.disabled = true;
            storage.mode = 'walk';
        }
    });
}

export function addListenerToCreateButton() {
    createButton.addEventListener('click', async function (event) {
        event.preventDefault();
        const createInputText = document.querySelector('.create__input-text') as HTMLInputElement;
        const createInputColor = document.querySelector('.create__input-color') as HTMLInputElement;

        const nameNewCar = createInputText.value;
        const colorNewCar = createInputColor.value;

        await createCar({
            name: nameNewCar ? nameNewCar : 'Car',
            color: colorNewCar,
        });

        await updateStorageGarage(storage.pageCars);
        drawGarageList();
        drawNewTitles();
        disableTrueOrFalseGarage();
        createInputText.value = '';
        createInputColor.value = '#800000';
    });
}

export function addListenerToGenerateButton() {
    generateButton.addEventListener('click', function (event) {
        event.preventDefault();
        const hundredCarParameters = getArrayRandomCars();
        const promisesArr = hundredCarParameters.map(async (obj) => await createCar(obj));
        Promise.all(promisesArr).then(async () => {
            await updateStorageGarage(storage.pageCars);
            drawGarageList();
            drawNewTitles();
            disableTrueOrFalseGarage();
        });
    });
}

export function addListenerToUpdateButton() {
    updateButton.addEventListener('click', async function (event) {
        event.preventDefault();
        const updateInputText = document.querySelector('.update__input-text') as HTMLInputElement;
        const updateInputColor = document.querySelector('.update__input-color') as HTMLInputElement;

        const nameUpdatedCar = updateInputText.value;
        const colorUpdatedCar = updateInputColor.value;

        await updateCar(
            {
                name: nameUpdatedCar,
                color: colorUpdatedCar,
            },
            storage.idCarToUpdate
        );

        await updateStorageGarage(storage.pageCars);
        drawGarageList();
        updateInputText.value = '';
        updateInputColor.value = '#800000';

        updateButton.disabled = true;
    });
}
