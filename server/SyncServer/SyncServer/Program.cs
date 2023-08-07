using Microsoft.Extensions.DependencyInjection;
using SyncServer.Behaviors;
using System;
using WebSocketSharp.Server;

namespace SyncServer
{
    class Program
    {
        static void Main(string[] args)
        {
            WebSocketServer server = new WebSocketServer(9100);

            server.AddWebSocketService<MovementSyncBehavior>("/sync");

            ServiceCollection collection = new ServiceCollection();

            //TODO: all dependenices to service collection

            using (ServiceProvider serviceProvider = collection.BuildServiceProvider())
            {
                try
                {
                    server.Start();
                    Console.ReadKey(true);

                }
                finally
                {
                    server.Stop();
                }
            }
        }
    }
}
