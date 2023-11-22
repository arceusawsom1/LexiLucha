import { IPlayer } from "../types";

const getDisplayname = (player: IPlayer) => {
    return player.name + (player.type=="GUEST" ? " (Guest)":"")
}
export {getDisplayname}