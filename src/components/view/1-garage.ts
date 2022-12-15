import { storage } from '../statesStorage/statesStorage';
import { Car } from '../../types/types';
import { LIMIT_GARAGE_DEFAULT } from '../../constants/constants';

export function drawGarage() {
    return `<div class="main__garage garage">
    <div class="garage__top">

        <div class="garage__header">
            <h1 class="garage__title">Garage: ${storage.amountCars} cars</h1>
            <h2 class="garage__page-number">Page № ${storage.pageCars}</h2>
            <div class="management__race race">
                <button class="race__start management-button">Race start</button>
                <button class="race__reset management-button" disabled>Race reset</button>
            </div>
            <div class="garage__message"></div>
        </div>

        <div class="garage__management management">
            <form class="management__create create">
                <input class="create__input-text" type="text" id="create-text" name="create-text" placeholder="Car name" required>
                <input class="create__input-color" type="color" id="create-color" name="create-color" value="#800000">
                <button class="create__button management-button" type="submit">Create car</button>
            </form>
            <form class="management__update update">
                <input class="update__input-text" type="text" id="update-text" name="update-text" placeholder="Car name">
                <input class="update__input-color" type="color" id="update-color" name="update-color" value="#800000">
                <button class="update__button management-button" type="submit" disabled>Update car</button>
            </form>
            <div class="management__generate generate">
                <button class="generate__button management-button">Generate 100 cars</button>
            </div>
        </div>

    </div>

    <div class="garage__box">
        <ul class="garage__list">
        
        </ul>
        <div class="garage__pages-buttons">
            <button class="garage__pages-previous page-button" ${storage.pageCars > 1 ? '' : 'disabled'}>
                previous
            </button>
            <button class="garage__pages-next page-button"
            ${storage.pageCars * LIMIT_GARAGE_DEFAULT < Number(storage.amountCars) ? '' : 'disabled'}>
                next
            </button>
        </div>
    </div>
    </div>`;
}

export function drawGarageList() {
    //! должна вызываться и при запуске, и при каждой смене страницы
    const garageList = document.querySelector('.garage__list') as HTMLElement;
    garageList.innerHTML = '';

    const fragment = document.createDocumentFragment() as DocumentFragment;

    storage.carsListFromSertainPage.forEach((car: Car) => {
        const listItem = document.createElement('li');
        listItem.classList.add('garage__slot', 'slot');
        listItem.insertAdjacentHTML('beforeend', drawSlot(car.id, car.name, car.color));

        fragment.append(listItem);
    });

    garageList.append(fragment);
}

function drawSlot(id: number, name: string, color: string) {
    return `<div class="slot__controls controls">
                <button class="controls__change controls__button" id="change-controls-${id}">Change</button>
                <button class="controls__delete controls__button" id="delete-controls-${id}">Delete</button>
                <button class="controls__start controls__button" id="start-controls-${id}">Start</button>
                <button class="controls__reset controls__button" id="reset-controls-${id}" disabled>Reset</button>
                <h3 class="controls__name" id="name-controls-${id}">${name}-${id}</h3>
            </div>
            <div class="slot__road road">
                <div class="road__car" id="car-${id}">
                ${addHtmlSvgCar(color)}
                </div>
                <div class="road__flag" id="flag-${id}">
                    <?xml version="1.0" encoding="iso-8859-1"?>
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 60 60" style="fill:darkred" xml:space="preserve">
                        <path d="M53.747,35.323L44.17,20l9.668-15.47c0.193-0.309,0.203-0.697,0.027-1.015C53.688,3.197,53.354,3,52.99,3h-45V1
                        c0-0.553-0.447-1-1-1s-1,0.447-1,1v3v29v3v23c0,0.553,0.447,1,1,1s1-0.447,1-1V37h45c0.008,0.001,0.016,0,0.02,0
                        c0.553,0,1-0.447,1-1C54.01,35.739,53.91,35.502,53.747,35.323z" />
                    </svg>
                </div>
            </div>`;
}

export function addHtmlSvgCar(color: string) {
    return `<?xml version="1.0" encoding="iso-8859-1"?>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 512 512" style="fill:${color}" xml:space="preserve">
                <g>
                    <g>
                        <path d="M494.933,409.6h-17.067v-34.133c0-37.633-30.634-68.267-68.267-68.267h-0.767c-8.045-89.871-79.194-161.761-169.9-169.893
                        V99.256c5.365,1.913,11.055,3.144,17.067,3.144c28.233,0,51.2-22.967,51.2-51.2C307.2,22.967,284.233,0,256,0
                        c-13.161,0-25.054,5.129-34.133,13.317C212.787,5.129,200.894,0,187.733,0c-28.233,0-51.2,22.967-51.2,51.2
                        c0,28.233,22.967,51.2,51.2,51.2c6.012,0,11.702-1.231,17.067-3.144v38.061c-95.534,8.655-170.667,89.203-170.667,186.949V409.6
                        H17.067C7.633,409.6,0,417.233,0,426.667s7.633,17.067,17.067,17.067c15.984,0,35.163,0,51.2,0
                        C68.267,481.366,98.9,512,136.533,512c37.633,0,68.267-30.634,68.267-68.267h102.4c0,37.633,30.634,68.267,68.267,68.267
                        s68.267-30.634,68.267-68.267c16.042,0,35.228,0,51.2,0c9.433,0,17.067-7.633,17.067-17.067S504.367,409.6,494.933,409.6z
                        M256,34.133c9.4,0,17.067,7.666,17.067,17.067S265.4,68.267,256,68.267S238.933,60.6,238.933,51.2S246.6,34.133,256,34.133z
                        M136.533,477.867c-18.834,0-34.133-15.3-34.133-34.133c0-18.27,14.81-34.133,34.133-34.133c19.217,0,34.133,15.889,34.133,34.133
                        C170.667,462.567,155.367,477.867,136.533,477.867z M204.8,341.333h-85.333c-9.433,0-17.067-7.633-17.067-17.067
                        c0-60.023,44.658-109.371,102.4-117.742V341.333z M187.733,68.267c-9.4,0-17.067-7.666-17.067-17.067s7.666-17.067,17.067-17.067
                        S204.8,41.8,204.8,51.2S197.134,68.267,187.733,68.267z M324.267,341.333h-85.333V206.525
                        c57.742,8.371,102.4,57.718,102.4,117.742C341.333,333.7,333.7,341.333,324.267,341.333z M375.467,477.867
                        c-18.834,0-34.133-15.3-34.133-34.133c0-18.27,14.81-34.133,34.133-34.133c19.217,0,34.133,15.889,34.133,34.133
                        C409.6,462.567,394.3,477.867,375.467,477.867z" />
                    </g>
                </g>
            </svg>`;
}
