# multiplayer-game

## Running the Server

Open the SyncServer solution and run the application from Visual Studio. Firewall access may be required as we are creating services using web sockets. Use your dash account to give acccess if prompted and it will run.

## Running the Client

This is a simple angular application that currently does not require any special setup. Once the server is running, simply navigate to the `client/dot-chase` directory and type the command:

```
> ng serve
```

Open `localhost:4200` in your browser and you will see a red box. You can use the arrow keys on your keyboard to move the box within the boundaries. 
Open a second tab to `localhost:4200` and you will notice a second box appear. Each can be controlled individually and updates are made in real time to all connected tabs.