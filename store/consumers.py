from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer


class UpdateConsumer(JsonWebsocketConsumer):
    user_update_group = None

    def connect(self):
        user = self.scope["user"]
        if user.is_authenticated:
            # join the updates feed of the connecting user
            self.user_update_group = f'updates_{user}'
            async_to_sync(self.channel_layer.group_add)(self.user_update_group, self.channel_name)
            self.accept()
        else:
            self.close()

    def disconnect(self, close_code):
        if self.user_update_group:
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
