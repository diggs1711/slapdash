export default interface ConnectionOptions {
	url: string
	family: 'udp4' | 'udp6'
	port: number
}
