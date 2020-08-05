import { UDPServer, UDPClient } from '../src'
import { RemoteInfo } from 'dgram'
const PORT = 8080
const type = 'udp4'

const server = new UDPServer({
	url: 'localhost',
	family: type,
	port: PORT
})

const client = new UDPClient({
	url: 'localhost',
	family: type,
	port: PORT
})

describe('bind()', () => {})

describe('send()', () => {
	it('should send the message', (done) => {
		client.send({
			message: 'Hello'
		})

		server.on('message', (msg) => {
			expect(msg).toBe('Hello')
			done()
		})
	})
})

describe('subscribe', () => {
	it('should add client as a subscriber', () => {
		const info: RemoteInfo = {
			address: 'localhost',
			family: 'IPv4',
			port: 5000,
			size: 5
		}

		server.addSubscriber(info)
		expect(server.subscribers.length).toBe(1)
	})

	it('allows server to send message to subscribers', (done) => {
		server.addSubscriber({
			address: client.url,
			family: 'IPv4',
			port: PORT - 1,
			size: 9
		})

		server.sendToSubscribers({ message: 'test' })

		client.on('server-message', (msg) => {
			expect(msg).toBe('test')
			done()
		})
	})
})
