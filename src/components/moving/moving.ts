import { storage, updateStorageWinners } from '../statesStorage/statesStorage';
import { startCarsEngine, switchCarsEngineToDriveMode, saveWinnerToScore } from '../api/api';
import { Movingresult } from '../../types/types';

function animateMoving(id: number, element: HTMLElement, finish: number, duration: number) {
    let currentPoint = element.offsetLeft;
    const framesCount = (duration / 1000) * 60; //! количество фрэймов в анимации (60 кадров в секунду)
    const shift = (finish - element.offsetLeft) / framesCount;

    async function tick() {
        currentPoint += shift;
        element.style.transform = `translateX(${currentPoint}px)`;

        if (currentPoint < finish) {
            storage.animationIds[id] = requestAnimationFrame(tick); //! requestAnimationFrame возвращает ID, по которому эту анимацию можно остановить
        } else {
            if (storage.mode === 'racing') {
                if (storage.newWinnerId === 0) {
                    storage.newWinnerId = id;
                    storage.newWinnerTime = Number((duration / 1000).toFixed(2));
                    //! теперь сохраняю нового победителя в список победителей:
                    await saveWinnerToScore(storage.newWinnerId, storage.newWinnerTime).then(() => {
                        //! вывожу на экран уведомление о победе:
                        if (storage.newWinnerId !== 0) {
                            const nameElement = document.querySelector(
                                `#name-controls-${storage.newWinnerId}`
                            ) as HTMLElement;
                            const messageCanvas = document.querySelector('.garage__message') as HTMLElement;
                            messageCanvas.innerHTML = `${nameElement.textContent} won with ${storage.newWinnerTime} seconds`;
                            //! обновляю storage, как при смене страниц:
                            updateStorageWinners(storage.pageWinners);
                        }
                    });
                }
            }
        }
    }

    storage.animationIds[id] = requestAnimationFrame(tick); //! requestAnimationFrame возвращает ID, по которому эту анимацию можно остановить
}

export async function startMoving(id: number): Promise<Movingresult> {
    const startButton = document.querySelector(`#start-controls-${id}`) as HTMLButtonElement;
    startButton.disabled = true;
    const resetButton = document.querySelector(`#reset-controls-${id}`) as HTMLButtonElement;
    resetButton.disabled = false;

    const { velocity, distance } = await startCarsEngine(id);
    const time = Math.round(distance / velocity); //! параметр функции с анимацией

    const carMoving = document.querySelector(`#car-${id}`) as HTMLElement;
    const flagMoving = document.querySelector(`#flag-${id}`) as HTMLElement;

    const distanceToFinish =
        flagMoving.getBoundingClientRect().left -
        carMoving.getBoundingClientRect().left +
        flagMoving.getBoundingClientRect().width; //! параметр функции с анимацией

    animateMoving(id, carMoving, distanceToFinish, time);

    const isengineBrokenDown = await switchCarsEngineToDriveMode(id);
    if (!isengineBrokenDown.success) {
        cancelAnimationFrame(storage.animationIds[id]);
    }

    return {
        id: id,
        time: time,
    };
}

export async function stopMoving(id: number) {
    const startButton = document.querySelector(`#start-controls-${id}`) as HTMLButtonElement;
    startButton.disabled = false;
    const resetButton = document.querySelector(`#reset-controls-${id}`) as HTMLButtonElement;
    resetButton.disabled = true;

    const carStopped = document.querySelector(`#car-${id}`) as HTMLElement;
    carStopped.style.transform = `translateX(0)`;
    if (storage.animationIds[id]) {
        cancelAnimationFrame(storage.animationIds[id]);
    }
}
