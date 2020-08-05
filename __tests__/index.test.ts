import { UDPServer, UDPClient } from '../src'

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
			console.log({ msg })
			expect(msg).toBe('Hello')
			done()
		})
	})
})
