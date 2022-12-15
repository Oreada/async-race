export function findId(element: HTMLButtonElement): number {
    const targetId = element.id.split('-');
    return Number(targetId[targetId.length - 1]);
}
