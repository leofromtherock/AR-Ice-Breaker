// Registrierung einer neuen A-Frame-Komponente namens "info-popup"
AFRAME.registerComponent('info-popup', {
    // Die init-Funktion wird bei Initialisierung der Komponente aufgerufen
    init: function () {
        // Event-Listener für das Klicken auf das Element mit der Klasse "info"
        const infoElement = document.querySelector('.info');
        infoElement.addEventListener('click', this.openInfoPopup.bind(this));

        // Event-Listener für das Klicken auf das Element mit der Klasse "close-icon"
        const closeIcon = document.querySelector('.close-icon');
        closeIcon.addEventListener('click', this.closeInfoPopup.bind(this));

        // Event-Listener für das Klicken außerhalb des Info Popups
        document.body.onclick = this.handleClickOutside.bind(this);
    },

    // Funktion zum Öffnen des Info Popups
    openInfoPopup: function (event) {
        event.stopPropagation();
        document.getElementById('infoPopup').style.display = 'flex';
    },

    // Funktion zum Schließen des Info Popups
    closeInfoPopup: function () {
        document.getElementById('infoPopup').style.display = 'none';
    },

    // Funktion zum Handhaben des Klickens außerhalb des Info Popups
    handleClickOutside: function (event) {
        const infoPopup = document.getElementById('infoPopup');

        // Überprüfen, ob das geklickte Element das Popup-Fenster ist oder ein Kind davon
        const isClickInside = infoPopup.contains(event.target);

        if (!isClickInside && infoPopup.style.display === 'flex') {
            this.closeInfoPopup();
        }
    }
});