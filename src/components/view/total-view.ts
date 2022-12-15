import { drawGarage } from './1-garage';
import { drawWinners } from './2-winners';
import { storage } from '../statesStorage/statesStorage';

export function htmlTotal() {
    const htmlTotal = `<div class="wrapper">

                        <header class="header">
                            <div class="header__container _container">
                                <div class="header__navigation navigation">
                                    <button class="navigation__garage">garage</button>
                                    <button class="navigation__winners">winners</button>
                                </div>
                            </div>
                        </header>

                        <main class="main">
                            <div class="main__container _container">
                                ${drawGarage()}
                                ${drawWinners()}
                            </div>
                        </main>

                        <footer class="footer">
                            <div class="footer__container _container">
                                <div class="footer__row">
                                    <p class="github">
                                        <a class="github__link" href="https://github.com/Oreada" target="_blank">
                                            <img class="github__image" src="./asset/github-logo.png" alt="Github logo">
                                        </a>
                                    </p>
                                    <p class="year">2022</p>
                                    <p class="rsschool">
                                        <a class="rsschool__link" href="https://rs.school/js/" target="_blank">
                                            <img class="rsschool__image" src="./asset/rs_school_js.svg" alt="Rs-school logo">
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </footer>

                    </div>`;

    const body = document.querySelector('body') as HTMLElement;
    body.innerHTML = htmlTotal;
}

export function drawNewTitles() {
    const garageTitle = document.querySelector('.garage__title') as HTMLElement;
    garageTitle.innerHTML = `Garage: ${storage.amountCars} cars`;
    const garagePageNumber = document.querySelector('.garage__page-number') as HTMLElement;
    garagePageNumber.innerHTML = `Page № ${storage.pageCars}`;

    const winnersTitle = document.querySelector('.winners__title') as HTMLElement;
    winnersTitle.innerHTML = `Winners: ${storage.amountWinners} cars`;
    const winnersPageNumber = document.querySelector('.winners__page-number') as HTMLElement;
    winnersPageNumber.innerHTML = `Page № ${storage.pageWinners}`;
}
