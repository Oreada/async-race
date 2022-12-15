import { startMoving, stopMoving } from '../moving/moving';
import { findId } from '../../universal-functions/find-id';
import { updateButton } from '../..';
import { storage, updateStorageGarage, updateStorageWinners } from '../statesStorage/statesStorage';
import { getCarById, deleteCarById, deleteWinnerById } from '../api/api';
import { drawGarageList } from './1-garage';
import { drawNewTitles } from './total-view';
import { disableTrueOrFalseGarage } from './prev-next-buttons';

export function addListenersToControlsButtons() {
    document.body.addEventListener('click', async function (event) {
        const targetButton = event.target as HTMLButtonElement;
        if (targetButton.classList.contains('controls__start')) {
            const carId = findId(targetButton);
            await startMoving(carId);
        }
        if (targetButton.classList.contains('controls__reset')) {
            const carId = findId(targetButton);
            await stopMoving(carId);
        }
        if (targetButton.classList.contains('controls__change')) {
            const updateInputText = document.querySelector('.update__input-text') as HTMLInputElement;
            const updateInputColor = document.querySelector('.update__input-color') as HTMLInputElement;

            const carId = findId(targetButton);
            storage.idCarToUpdate = carId;

            await getCarById(carId).then((carToUpdate) => {
                const nameCarToUpdate = carToUpdate.name;
                const colorCarToUpdate = carToUpdate.color;

                updateInputText.value = nameCarToUpdate;
                updateInputColor.value = colorCarToUpdate;

                updateButton.disabled = false;
            });
        }
        if (targetButton.classList.contains('controls__delete')) {
            const carId = findId(targetButton);

            deleteCarById(carId).then(async () => {
                await updateStorageGarage(storage.pageCars);
                drawGarageList();
                drawNewTitles();
                disableTrueOrFalseGarage();
            });

            deleteWinnerById(carId).then(() => {
                updateStorageWinners(storage.pageWinners);
            });
        }
    });
}
