import { createSocket, Socket, RemoteInfo } from 'dgram'
import { EventEmitter } from 'events'
import ConnectionOptions from './connectionOptions'
import Client from './client'

export default class Server extends EventEmitter {
	url: string
	sock: Socket
	port: number
	subscribers: RemoteInfo[]

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
		this.sock.on('error', this.handleError.bind(this))
		this.on('subscribe', this.addSubscriber.bind(this))
		this.subscribers = []
	}

	handleError(err: Error) {
		console.error({ err })
		this.sock.close()
	}

	handleListening() {
		console.log(`Listening on port ${this.port}`)
	}

	handleMessage(message: Buffer, rinfo: RemoteInfo) {
		const msg = message.toString()

		if (msg === 'subscribe') {
			this.emit('subscribe', rinfo)
			return
		} else if (msg == 'unsubscribe') {
			return
		}

		this.emit('message', message.toString())
	}

	addSubscriber(rinfo: RemoteInfo) {
		this.subscribers.push(rinfo)
	}

	sendToSubscribers({ message }: { message: string }) {
		this.subscribers.forEach((subscriber) => {
			this.sock.send(Buffer.from(message), subscriber.port, subscriber.address)
		})
	}
}
