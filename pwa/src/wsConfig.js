
const loc = window.location
var wsEndpoint
if (loc.protocol === 'http:') {
  wsEndpoint = 'ws:'
} else {
  wsEndpoint = 'wss:'
}
wsEndpoint += '//' + loc.host
wsEndpoint += '/api/ws/updates/'

export { wsEndpoint }
