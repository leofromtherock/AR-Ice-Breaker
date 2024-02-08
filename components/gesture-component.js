// Registrierung einer neuen A-Frame-Komponente namens "gesture-control"
AFRAME.registerComponent('gesture-control', {
    // Die init-Funktion wird bei Initialisierung der Komponente aufgerufen
    init: function () {
        // Initialisierung von Skalierungs- und Rotationsfaktoren für die Gestensteuerung
        this.scaleFactor = 1;
        this.initialScale = {x: 1, y: 1, z: 1}; 
        this.rotationFactor = 0.1; 

        // Event-Listener für Gesten-Events
        this.el.sceneEl.addEventListener("onefingermove", this.handleRotation.bind(this));
        this.el.sceneEl.addEventListener("twofingermove", this.handleScale.bind(this));
    },

    // Funktion zur Handhabung der Rotation (Gestensteuerung)
    handleRotation: function (event) {
        if (this.el.object3D.visible) {
            this.el.object3D.rotation.y += event.detail.positionChange.x * this.rotationFactor;
            this.el.object3D.rotation.x += event.detail.positionChange.y * this.rotationFactor;
        }
    },

    // Funktion zur Handhabung der Skalierung (Gesturesteuerung)
    handleScale: function (event) {
        if (this.el.object3D.visible) {
            this.scaleFactor *= 1 + event.detail.spreadChange / event.detail.startSpread;
            const minScale = this.el.getAttribute('gesture-handler').minScale;
            const maxScale = this.el.getAttribute('gesture-handler').maxScale;
            this.scaleFactor = Math.min(Math.max(this.scaleFactor, minScale), maxScale);
            this.el.object3D.scale.x = this.scaleFactor * this.initialScale.x;
            this.el.object3D.scale.y = this.scaleFactor * this.initialScale.y;
            this.el.object3D.scale.z = this.scaleFactor * this.initialScale.z;
        }
    }
});