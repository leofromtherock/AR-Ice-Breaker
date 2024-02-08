// Registrierung einer neuen A-Frame-Komponente namens "loading-spinner"
AFRAME.registerComponent('loading-spinner', {
    // Die init-Funktion wird bei Initialisierung der Komponente aufgerufen
    init: function () {
        // Referenz zum Spinner-Element
        this.spinner = document.getElementById('spinner');
        this.spinnerTimeout = null;

        // Hinzufügen von EventListeners für die 'model-loaded' und 'model-unloaded' Ereignisse
        this.el.addEventListener('model-loaded', this.hideSpinner.bind(this));
        this.el.addEventListener('model-unloaded', this.showSpinner.bind(this));
    },

    // Die showSpinner Funktion zeigt den Spinner an
    showSpinner: function () {
        this.spinner.style.display = 'block';
        // Starten des Timers für die Mindestanzeigezeit des Spinners
        this.spinnerTimeout = setTimeout(() => {}, 2000);

        // Ausblenden des randomizeButton, wenn der Spinner angezeigt wird
        const randomizeButton = document.querySelector('.randomize-object-button');
        randomizeButton.style.opacity = '0';
        setTimeout(() => randomizeButton.style.display = 'none', 500);
    },

    // Die hideSpinner Funktion versteckt den Spinner
    hideSpinner: function () {
        // Wenn der Timer noch läuft, wird er abgebrochen
        if (this.spinnerTimeout) {
            clearTimeout(this.spinnerTimeout);
            this.spinnerTimeout = null;
        }

        // Verstecken des Modells, während der Spinner noch angezeigt wird
        this.el.setAttribute('visible', false);

        // Verstecken des Spinners nach der Mindestanzeigezeit
        setTimeout(() => {
            this.spinner.style.display = 'none';

            // Anzeigen des Modells, wenn der Spinner ausgeblendet wird
            this.el.setAttribute('visible', true);
        }, 2000);
    }
});