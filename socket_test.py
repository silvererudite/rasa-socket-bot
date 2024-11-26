import socketio

sio = socketio.Client()

sio.connect('http://localhost:5005')


@sio.event
def bot_uttered(data):
    print("Received from bot:", data)


sio.emit('user_uttered', {'message': 'Hello, bot!'})

sio.wait()
# print(globals())
