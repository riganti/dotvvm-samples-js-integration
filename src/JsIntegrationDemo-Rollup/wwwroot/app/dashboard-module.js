var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function init(context) {
    return __awaiter(this, void 0, void 0, function* () {
        // init map
        const map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 49.872289,
                lng: 15.428261
            },
            zoom: 8
        });
        // init signalR
        const connection = new signalR.HubConnectionBuilder().withUrl("/hub").build();
        connection.on("newPositions", (positions) => onNewPositions(context, positions));
        connection.on("notification", (text) => onNotification(context, text));
        yield connection.start();
        context.state['map'] = map;
        context.state['markers'] = [];
        context.state['connection'] = connection;
        // change viewmodel from JS
        //dotvvm.stateManager.setState({
        //    Connected: true
        //});
        context.viewModel.Connected(true);
        // init toast notifications
        $(".toast").toast({ delay: 5000 });
    });
}
const blackIcon = {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 10,
    strokeColor: "black"
};
const redIcon = {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 10,
    strokeColor: "red"
};
function onNewPositions(context, positions) {
    // move markers on the map
    for (let i = 0; i < positions.length; i++) {
        let marker = context.state['markers'][i];
        if (!marker) {
            // create a new marker
            marker = new google.maps.Marker({
                position: positions[i],
                icon: blackIcon,
                draggable: false,
                map: context.state['map']
            });
            let id = i + 1;
            marker.addListener("click", () => {
                //context.namedCommands["SelectCourier"](id);
                commands.highlightCourier(context, id);
            });
            context.state['markers'][i] = marker;
        }
        else {
            // update marker position
            marker.setPosition(positions[i]);
        }
    }
}
function onNotification(context, text) {
    context.viewModel.Notification(text);
    $(".toast").toast('show');
}
export const commands = {
    highlightCourier(context, id) {
        const markers = context.state['markers'];
        for (let i = 0; i < markers.length; i++) {
            markers[i].setIcon((i + 1 === id) ? redIcon : blackIcon);
        }
    }
};
