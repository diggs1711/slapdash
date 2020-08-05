import { createSocket, Socket } from 'dgram'
import ConnectionOptions from './connectionOptions'
import { RemoteInfo } from 'dgram'
import { EventEmitter } from 'events'
export default class Client extends EventEmitter {
	url: string
	socket: Socket
	port: number

	constructor({ url, family, port }: ConnectionOptions) {
		super()
		this.socket = createSocket({ type: family })
		this.url = url
		this.port = port
		this.socket.bind({
			port: this.port - 1,
			address: this.url
		})
		this.socket.on('message', this.handleIncomingMessage.bind(this))
		this.socket.on('listening', () =>
			console.log(`listerning on port ${this.socket.address().port}`)
		)
	}

	handleIncomingMessage(message: Buffer, info: RemoteInfo) {
		const msg = message.toString()
		this.emit('server-message', msg)
	}

	subscribe() {
		this.send({
			message: 'subscribe'
		})
	}

	send({ message }: { message: string }) {
		this.socket.send(Buffer.from(message), this.port, this.url, (err, bytes) => {
			if (err) console.error({ err })
		})
	}
}
