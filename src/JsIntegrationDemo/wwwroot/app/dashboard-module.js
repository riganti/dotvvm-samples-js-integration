
// Export required by DotVVM 
export default (context) => new App(context);

class App {

    constructor(context) {
        this.context = context;

        // init map
        this.map = new google.maps.Map(document.getElementById('map'),
            {
                center: {
                    lat: 49.872289,
                    lng: 15.428261
                },
                zoom: 8
            });

        // init signalR
        this.connection = new signalR.HubConnectionBuilder().withUrl("/hub").build();
        this.connection.on("newPositions", positions => this._onNewPositions(positions));
        this.connection.on("notification", text => this._onNotification(text));
        this.connection.start();

        this.markers = [];

        // change viewmodel from JS
        dotvvm.patchState({
            Connected: true
        });
        
        // init toast notifications
        $(".toast").toast({ delay: 5000 });
    }

    _onNewPositions(positions) {
        // move markers on the map
        for (let i = 0; i < positions.length; i++) {
            let marker = this.markers[i];
            if (!marker) {
                // create a new marker
                marker = new google.maps.Marker({
                    position: positions[i],
                    icon: this._blackIcon,
                    draggable: false,
                    map: this.map
                });

                let id = i + 1;
                marker.addListener("click", () => {
                    this.context.namedCommands["SelectCourier"](i);
                    this.highlightCourier(id);
                });
                this.markers[i] = marker;
            } else {
                // update marker position
                marker.setPosition(positions[i]);
            }
        }
    }

    _onNotification(text) {
        dotvvm.patchState({
            Notification: text
        });
        $(".toast").toast('show');
    }

    highlightCourier(id) {
        for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].setIcon((i + 1 === id) ? this._redIcon : this._blackIcon);
        }
    }

    $dispose() {
        this.connection.stop();
        console.info("disposed");
    }

    _blackIcon = {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        strokeColor: "black"
    };
    _redIcon = {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        strokeColor: "red"
    };

}

