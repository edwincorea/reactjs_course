import AppStore from "./app";
import GameStore from "./game";
import LobbyStore from "./lobby";
import UserStore from "./user";

// import all stores and re-export them out in a function,
// which returns instantiations of the stores
export default function(services) {
    const user = new UserStore(services);
    const game = new GameStore(services, user);
    const lobby = new LobbyStore(services, user);
    const app = new AppStore(services);

    return {
        user, game, lobby, app
    };
}