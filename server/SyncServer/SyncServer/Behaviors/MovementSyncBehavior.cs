using SyncServer.Model;
using System;
using System.Text.Json;
using WebSocketSharp;
using WebSocketSharp.Server;


namespace SyncServer.Behaviors
{
    class MovementSyncBehavior : WebSocketBehavior
    {
        protected override void OnMessage(MessageEventArgs e)
        {
            base.OnMessage(e);

            //TODO: cache the current players position and forward position change to other players
            
            string code = e.Data.Substring(0, 2);

            if (code.Equals(Messages.ConnectMe))
            {
                PlayerModel player = new PlayerModel();
                player.Id = Guid.NewGuid().ToString();

                string playerStr = JsonSerializer.Serialize(player);
                string response = code + playerStr;

                Send(response);

                this.Sessions.Broadcast(generateConnectedMessage(playerStr));

                return;
            }

            if (code.Equals(Messages.Broadcast.Updated))
            {
                this.Sessions.Broadcast(e.Data);
                return;
            }

            if (code.Equals(Messages.Broadcast.Disconnected))
            {
                this.Sessions.Broadcast(e.Data);
                return;
            }
        }

        private static string generateConnectedMessage(string playerStr)
        {
            return Messages.Broadcast.Connected + playerStr;
        }
    }
}
