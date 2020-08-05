import { createSocket, Socket } from 'dgram'
import ConnectionOptions from './connectionOptions'

export default class Client {
	url: string
	socket: Socket
	port: number

	constructor({ url, family, port }: ConnectionOptions) {
		this.socket = createSocket({ type: family })
		this.url = url
		this.port = port
	}
	send({ message }: { message: string }) {
		this.socket.send(Buffer.from(message), this.port, this.url)
	}
}
