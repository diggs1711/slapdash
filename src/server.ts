import { EventEmitter } from 'events'

type ServerOptions = {
	url: string
}

export default class Server extends EventEmitter {
	url: string
	constructor({ url }: ServerOptions) {
		super()
		this.url = url
	}
}
