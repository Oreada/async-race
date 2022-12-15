import { storage } from '../statesStorage/statesStorage';
import { WinnerAdvanced } from '../../types/types';
import { addHtmlSvgCar } from './1-garage';
import { LIMIT_WINNERS_DEFAULT } from '../../constants/constants';

export function drawWinners() {
    return `<div class="main__winners winners">
	<div class="winners__box">
        <div class="winners__header">
            <h1 class="winners__title">Winners: ${storage.amountWinners} cars</h1>
            <h2 class="winners__page-number">Page № ${storage.pageWinners}</h2>
        </div>
        <div class="winners__sorting sorting">
            <select class="sorting__select" name="sorting">
                <option class="sorting__option" value="wins-ascending">Sort by Wins number, ascending</option>
                <option class="sorting__option" value="wins-descending">Sort by Wins number, descending</option>
                <option class="sorting__option" value="time-ascending">Sort by Best time, ascending</option>
                <option class="sorting__option" value="time-descending">Sort by Best time, descending</option>
            </select>
        </div>
        <div class="winners__headers headers">
            <p class="headers__number">№</p>
            <p class="headers__color">color</p>
            <p class="headers__name">name</p>
            <p class="headers__wins">wins</p>
            <p class="headers__besttime">best time</p>
        </div>
		<ul class="winners__list">

		</ul>
        <div class="winners__pages-buttons">
            <button class="winners__pages-previous page-button" ${storage.pageWinners > 1 ? '' : 'disabled'}>
                previous
            </button>
            <button class="winners__pages-next page-button"
            ${storage.pageWinners * LIMIT_WINNERS_DEFAULT < Number(storage.amountWinners) ? '' : 'disabled'}>
                next
            </button>
        </div>
	</div>
	</div>`;
}

export function drawWinnersList() {
    //! должна вызываться и при запуске, и при каждой смене страницы
    const winnersList = document.querySelector('.winners__list') as HTMLElement;
    winnersList.innerHTML = '';

    let counter = 0;

    const fragment = document.createDocumentFragment() as DocumentFragment;

    storage.winnersListFromSertainPage.forEach((winner: WinnerAdvanced) => {
        counter += 1;
        const listItem = document.createElement('li');
        listItem.classList.add('winners__row', 'row');
        listItem.id = `row-winner-${winner.id}`; //! добавила ID для строки победителя - пока не знаю зачем
        listItem.insertAdjacentHTML(
            'beforeend',
            drawRow(
                counter + (storage.pageWinners - 1) * LIMIT_WINNERS_DEFAULT,
                winner.id,
                winner.color,
                winner.name,
                winner.wins,
                winner.time
            )
        );

        fragment.append(listItem);
    });

    winnersList.append(fragment);
}

function drawRow(counter: number, id: number, color: string, name: string, wins: number, time: number) {
    return `<p class="row__number">${counter}</p>
            <p class="row__color">${addHtmlSvgCar(color)}</p>
            <p class="row__name">${name}-${id}</p>
            <p class="row__wins">${wins}</p>
            <p class="row__besttime">${time}</p>`;
}
