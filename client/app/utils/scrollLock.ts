export const disableScroll = () => {
    const scrollY = window.scrollY;
    document.body.style.top = `-${scrollY}px`;
    document.body.classList.add('scroll-lock');
};

export const enableScroll = () => {
    const scrollY = document.body.style.top;
    document.body.classList.remove('scroll-lock');
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
};