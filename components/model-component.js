AFRAME.registerComponent('model-manager', {
    schema: {
        models: {type: 'array'}, // Array von Modellnamen
    },
    init: function () {
        // Klick-Handler für den Randomize-Button setzen
        const randomizeButton = document.querySelector('.randomize-object-button');
        randomizeButton.addEventListener('click', this.randomizeModel.bind(this));
        
        // Zufälliges Modell auswählen und beim Initialisieren laden
        this.randomizeModel();

        // Variable hinzufügen, um den Ladestatus zu verfolgen
        this.isLoading = false;

        // Zähler für die Anzahl der Ladeversuche
        this.loadAttempts = 0;
    },
    randomizeModel: function () {
        // Vorheriges Modell entfernen, falls vorhanden
        if (this.currentModel) {
            this.removeModel(this.currentModel);
        }

        // Zufälliges Modell aus der Liste auswählen, das nicht das aktuelle Modell ist
        let modelId;
        do {
            const randomIndex = Math.floor(Math.random() * this.data.models.length);
            modelId = this.data.models[randomIndex];
        } while (modelId === this.currentModel);

        const modelUrl = `https://keb-rheinland-pfalz.de/wp-content/uploads/AR/assets/${modelId}/object.glb`;

        // Neues Modell laden
        this.loadModel(modelId, modelUrl);
        this.currentModel = modelId; // Aktuelles Modell speichern
    },
    loadModel: function (modelId, modelUrl) {
        // Überprüfen, ob bereits ein Modell geladen wird
        if (this.isLoading) {
            console.warn('Ein Modell wird bereits geladen, Abbruch');
            return;
        }

        // Asset-Element für das neue Modell hinzufügen
        const assets = this.el.sceneEl.querySelector('a-assets');
        if (!assets) {
            console.error('Kein a-assets Element gefunden');
            return;
        }
        const modelItem = document.createElement('a-asset-item');
        modelItem.setAttribute('id', modelId);
        modelItem.setAttribute('src', modelUrl);
        assets.appendChild(modelItem);

        // Auf das Laden des Asset-Elements warten
        this.isLoading = true; // Laden beginnt

        const loadListener = () => {
            // Ereignis auslösen, dass das Modell geladen wurde
            this.el.emit('model-loaded', {modelId: modelId});

            // Modell auf die Entität setzen
            this.el.setAttribute('gltf-model', modelUrl);

            modelItem.removeEventListener('loaded', loadListener);
            modelItem.removeEventListener('error', errorListener);

            this.isLoading = false; // Laden beendet
            this.loadAttempts = 0; // Zurücksetzen des Zählers
        };
        modelItem.addEventListener('loaded', loadListener);

        // Fehlerbehandlung, wenn das Modell nicht geladen werden kann
        const errorListener = () => {
            console.error(`Fehler beim Laden des Modells: ${modelId}`);
            modelItem.removeEventListener('loaded', loadListener);
            modelItem.removeEventListener('error', errorListener);

            this.isLoading = false; // Laden beendet
        };
        modelItem.addEventListener('error', errorListener);

        // Timeout hinzufügen, um sicherzustellen, dass das Laden nicht ewig dauert
        setTimeout(() => {
            if (!modelItem.hasLoaded) {
                console.error(`Zeitüberschreitung beim Laden des Modells: ${modelId}`);
                modelItem.removeEventListener('loaded', loadListener);
                modelItem.removeEventListener('error', errorListener);

                this.isLoading = false; // Laden beendet

                // Versuchen Sie, ein anderes Modell zu laden, wenn die Anzahl der Versuche weniger als 3 ist
                if (this.loadAttempts < 3) {
                    this.loadAttempts++;
                    this.randomizeModel();
                } else {
                    console.error('Maximale Anzahl von Ladeversuchen erreicht');
                }
            }
        }, 5000); // 5 Sekunden Timeout
    },
    removeModel: function (modelId) {
        // Asset-Element für das alte Modell entfernen
        const oldModel = document.getElementById(modelId);
        if (oldModel) {
            oldModel.parentNode.removeChild(oldModel);
            // Ereignis auslösen, dass das Modell entladen wurde
            this.el.emit('model-unloaded', {modelId: modelId});
        } else {
            console.warn(`Versuch, ein nicht vorhandenes Modell zu entfernen: ${modelId}`);
        }
    }
});