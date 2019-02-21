import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer


class UpdateConsumer(WebsocketConsumer):
    def connect(self):
        async_to_sync(self.channel_layer.group_add)('updates', self.channel_name)
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)('updates', self.channel_name)

    def receive(self, text_data):
        print("received via websock:", text_data)

    def entity_changed(self, event):
        entity_name, payload = event['message']
        frame = {
            'type': f'{entity_name}_updated',
            'payload': payload
        }
        self.send(text_data=json.dumps(frame))

    def entity_deleted(self, event):
        entity_name, id = event['message']
        frame = {
            'type': f'{entity_name}_deleted',
            'payload': id,
        }
        self.send(text_data=json.dumps(frame))
