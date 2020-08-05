import { createSocket, Socket, RemoteInfo } from 'dgram'
import { EventEmitter } from 'events'
import ConnectionOptions from './connectionOptions'

export default class Server extends EventEmitter {
	url: string
	sock: Socket
	port: number

	constructor({ url, family, port }: ConnectionOptions) {
		super()
		this.sock = createSocket({
			type: family,
			reuseAddr: true
		})
		this.url = url
		this.port = port
		this.sock.bind({
			port: this.port,
			address: this.url
		})
		this.sock.on('message', this.handleMessage.bind(this))
		this.sock.on('listening', this.handleListening.bind(this))
	}

	handleListening() {
		console.log(`Listening on port ${this.port}`)
	}

	handleMessage(message: Buffer, rinfo: RemoteInfo) {
		this.emit('message', message.toString())
	}
}
