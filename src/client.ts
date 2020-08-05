type ClientOptions = {
	url: string
}

export default class Client {
	url: string
	constructor({ url }: ClientOptions) {
		this.url = url
	}
	send({ event, message }: { event: string; message: string }) {}
}
