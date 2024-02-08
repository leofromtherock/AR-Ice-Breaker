// Registrierung einer neuen A-Frame-Komponente namens "ui-interaction"
AFRAME.registerComponent('ui-interaction', {
    dependencies: ['marker-detection'],

    init: function () {
        const randomizeButton = document.querySelector('.randomize-object-button');

        this.el.sceneEl.addEventListener('markerFound', () => {
            randomizeButton.style.display = 'flex';
            setTimeout(() => randomizeButton.style.opacity = '1', 50);
            document.querySelector('.marker-lost-message').style.opacity = '0';
            document.querySelector('.info').classList.remove('info-expanded');
        });

        this.el.sceneEl.addEventListener('markerLost', () => {
            randomizeButton.style.opacity = '0';
            setTimeout(() => randomizeButton.style.display = 'none', 500);
            document.querySelector('.marker-lost-message').style.opacity = '1';
            document.querySelector('.info').classList.add('info-expanded');
        });
    }
});