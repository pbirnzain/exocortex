from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator
from channels.routing import ProtocolTypeRouter, URLRouter
from django.conf.urls import url

from store.consumers import UpdateConsumer

websocket_urlpatterns = [
    url(r'^api/ws/updates/$', UpdateConsumer),
]

application = ProtocolTypeRouter({
    # http->django views is added by default
    'websocket': AllowedHostsOriginValidator(
        AuthMiddlewareStack(
            URLRouter(websocket_urlpatterns)
        ),
    ),
})
