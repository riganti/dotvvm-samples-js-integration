import * as signalR from "@microsoft/signalr";

export default class {

    map: google.maps.Map<HTMLElement>;
    connection: signalR.HubConnection;
    markers: google.maps.Marker[];

    constructor(public context: ModuleContext) {

        // init map
        this.map = new google.maps.Map(document.getElementById('map')!,
            {
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

    private onNewPositions(positions: any) {
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
            } else {
                // update marker position
                marker.setPosition(positions[i]);
            }
        }
    }

    private onNotification(text: string) {
        dotvvm.viewModels.root.viewModel.Notification(text);
        $(".toast").toast("show");
    }

    highlightCourier(id: number) {
        for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].setIcon((i + 1 === id) ? this.redIcon : this.blackIcon);
        }
    }

    $dispose() {
        this.connection.stop();
        console.info("disposed");
    }

    private blackIcon = {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        strokeColor: "black"
    };
    private redIcon = {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        strokeColor: "red"
    };

}