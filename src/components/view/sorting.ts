import { changeSortWinners, changeOrderWinners } from '../statesStorage/statesStorage';
import { drawWinnersList } from './2-winners';
import { selectSorting } from '../..';

export function addSortHandler() {
    selectSorting.addEventListener('change', async function () {
        const sortParameter = selectSorting.value;
        switch (sortParameter) {
            case 'wins-ascending':
                await changeSortWinners('wins');
                await changeOrderWinners('ASC');
                drawWinnersList();
                break;
            case 'wins-descending':
                await changeSortWinners('wins');
                await changeOrderWinners('DESC');
                drawWinnersList();
                break;
            case 'time-ascending':
                await changeSortWinners('time');
                await changeOrderWinners('ASC');
                drawWinnersList();
                break;
            case 'time-descending':
                await changeSortWinners('time');
                await changeOrderWinners('DESC');
                drawWinnersList();
                break;
            default:
                break;
        }
    });
}
