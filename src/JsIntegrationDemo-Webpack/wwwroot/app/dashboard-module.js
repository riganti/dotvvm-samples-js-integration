import * as signalR from "@microsoft/signalr";
// Export required by DotVVM 
export default (context) => new App(context);
export class App {
    constructor(context) {
        this.context = context;
        this.blackIcon = {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            strokeColor: "black"
        };
        this.redIcon = {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            strokeColor: "red"
        };
        // init map
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 49.872289,
                lng: 15.428261
            },
            zoom: 8
        });
        // init signalR
        this.connection = new signalR.HubConnectionBuilder().withUrl("/hub").build();
        this.connection.on("newPositions", positions => this.onNewPositions(positions));
        this.connection.on("notification", text => this.onNotification(text));
        this.connection.start();
        this.markers = [];
        // change viewmodel from JS
        //dotvvm.stateManager.setState({
        //    Connected: true
        //});
        dotvvm.viewModels.root.viewModel.Connected(true);
        // init toast notifications
        $(".toast").toast({ delay: 5000 });
    }
    onNewPositions(positions) {
        // move markers on the map
        for (let i = 0; i < positions.length; i++) {
            let marker = this.markers[i];
            if (!marker) {
                // create a new marker
                marker = new google.maps.Marker({
                    position: positions[i],
                    icon: this.blackIcon,
                    draggable: false,
                    map: this.map
                });
                const id = i + 1;
                marker.addListener("click", () => {
                    this.context.namedCommands["SelectCourier"](i);
                    this.highlightCourier(id);
                });
                this.markers[i] = marker;
            }
            else {
                // update marker position
                marker.setPosition(positions[i]);
            }
        }
    }
    onNotification(text) {
        dotvvm.viewModels.root.viewModel.Notification(text);
        $(".toast").toast("show");
    }
    highlightCourier(id) {
        for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].setIcon((i + 1 === id) ? this.redIcon : this.blackIcon);
        }
    }
    $dispose() {
        this.connection.stop();
        console.info("disposed");
    }
}
