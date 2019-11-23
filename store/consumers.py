from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer


class UpdateConsumer(JsonWebsocketConsumer):
    def connect(self):
        self.user_update_group = f'updates_{self.scope["user"]}'
        async_to_sync(self.channel_layer.group_add)(self.user_update_group, self.channel_name)
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(self.user_update_group, self.channel_name)

    def receive_json(self, text_data):
        print("received via websock:", text_data)

    def entity_changed(self, event):
        entity_name, payload = event['message']
        frame = {
            'type': f'{entity_name}_updated',
            'payload': payload
        }
        self.send_json(frame)

    def entity_deleted(self, event):
        entity_name, id = event['message']
        frame = {
            'type': f'{entity_name}_deleted',
            'payload': id,
        }
        self.send_json(frame)
