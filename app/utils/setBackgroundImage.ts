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

export const setOriginalStyling = () => {
    if (typeof document !== 'undefined') {
        const mainElement = document.querySelector('main');
        if (mainElement && !mainElement.className.includes("flex")) {
            mainElement.className = mainElement.className.replace("main", "main flex min-h-screen flex-col items-center justify-center");
        }
    }
};

export const removeOriginalStyling = () => {
    if (typeof document !== 'undefined') {
        const mainElement = document.querySelector('main');
        if (mainElement && mainElement.className.includes("flex")) {
            mainElement.className = mainElement.className.replace("main flex min-h-screen flex-col items-center justify-center", "main");
        }
    }
};

