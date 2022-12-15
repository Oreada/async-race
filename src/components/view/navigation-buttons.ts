import { drawWinnersList } from './2-winners';
import { storage } from '../statesStorage/statesStorage';
import { disableTrueOrFalseWinners } from './prev-next-buttons';
import { drawNewTitles } from './total-view';

export function addListenersToNavigation() {
    document.body.addEventListener('click', function (event) {
        const garageElement = document.querySelector('.garage') as HTMLDivElement;
        const winnersElement = document.querySelector('.winners') as HTMLDivElement;

        const targetButton = event.target as HTMLButtonElement;
        if (targetButton.classList.contains('navigation__garage')) {
            storage.view === 'garage';
            garageElement.style.display = 'block';
            winnersElement.style.display = 'none';
            // drawGarageList(); //! не перерисовываю garage, чтобы сохранилось движение машинок при переключении
        }
        if (targetButton.classList.contains('navigation__winners')) {
            storage.view === 'winners';
            garageElement.style.display = 'none';
            winnersElement.style.display = 'block';
            drawWinnersList(); //! перерисовываю winners, т.к. могли появиться новые победители или удалиться старые
            drawNewTitles();
            disableTrueOrFalseWinners(); //! и могло измениться количество страниц
        }
    });
}
