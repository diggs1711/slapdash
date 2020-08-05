import { UDPServer, UDPClient } from '../src'

const server = new UDPServer({
	url: 'localhost:5000'
})

const client = new UDPClient({
	url: 'localhost:5000'
})

describe('bind()', () => {})

describe('send()', () => {
	it('should send the message', () => {
		client.send({
			event: 'message',
			message: 'Hello'
		})

		server.on('message', (msg) => {
			expect(msg).toBe('Hello')
		})
	})
})
