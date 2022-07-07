import { io, Socket } from 'socket.io-client'
import {Ticker} from '../common/models/ticker';


class SocketService {
    private socket: Socket = null!;
    private readonly _url = 'http://localhost:4000';
    public connect(
    ): Promise<Socket> {
        return new Promise((rs, rj) => {
            this.socket = io(this._url);

            if (!this.socket) return rj();

            this.socket.on('connect', () => {
                rs(this.socket as Socket);
            });

            this.socket.on('connect_error', (err) => {
                console.log('Connection error: ', err);
                rj(err);
            });
        });
    }

    start() {
        this.socket.emit('start')
    }

    onGetTickers(func: (res: Ticker[]) => void) {
        this.socket.on('ticker', func)
    }

}


export default new SocketService()
