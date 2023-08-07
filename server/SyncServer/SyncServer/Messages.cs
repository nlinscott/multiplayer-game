namespace SyncServer
{
    class Messages
    {
        /// <summary>
        /// messages that are sent to all clients. The rest are only sent between 1 client and the server
        /// </summary>
        public class Broadcast
        {
            public const string Connected = "aa";
            public const string Updated = "ab";
            public const string Disconnected = "ac";
        }
    
        public const string ConnectMe = "ad";
    }
}
