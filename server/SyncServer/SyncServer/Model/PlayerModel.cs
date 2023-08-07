using System.Text.Json.Serialization;

namespace SyncServer.Model
{
    class PlayerModel : IPlayerModel
    {
        [JsonPropertyName("id")]
        public string Id
        {
            get;
            set;
        }

        [JsonPropertyName("x")]
        public int X
        {
            get;
            set;
        }

        [JsonPropertyName("y")]
        public int Y
        {
            get;
            set;
        }
    }
}
