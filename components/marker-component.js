// Registrierung einer neuen A-Frame-Komponente namens "marker-detection"
AFRAME.registerComponent('marker-detection', {
    init: function () {
        this.isMarkerVisible = false;

        this.el.sceneEl.addEventListener('markerFound', () => {
            this.isMarkerVisible = true;
        });

        this.el.sceneEl.addEventListener('markerLost', () => {
            this.isMarkerVisible = false;
        });
    }
});