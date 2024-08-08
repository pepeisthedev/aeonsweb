export const setBackgroundImage = (url: string) => {
    if (typeof document !== 'undefined') {
        const mainElement = document.querySelector('main');
        if (mainElement) {
            mainElement.style.backgroundImage = `url(${url})`;
        }
    }
};

export const resetBackgroundImage = () => {
    if (typeof document !== 'undefined') {
        const mainElement = document.querySelector('main');
        if (mainElement) {
            mainElement.style.backgroundImage = `url(/blackaeonsbg.png)`; // default background image
        }
    }
};