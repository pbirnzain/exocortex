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

    def topic_changed(self, event):
        topic = event['message']
        message = {
            'type': 'update_topic',
            'payload': topic,
        }
        self.send(text_data=json.dumps(message))
