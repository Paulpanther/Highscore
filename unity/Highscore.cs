using UnityEngine;
using System.Collections;
using UnityEngine.Networking;

public class Highscore : MonoBehaviour
{
    class _Position {
        public int position;
    }

    /**
     * Send a highscore for the given game to the server.
     * Returns the position on the scoreboard (1-based).
     */
    static IEnumerator SendHighscore(string game, string player, int score, System.Action<int> onScore)
    {
        using (var request = UnityWebRequest.Post("http://192.168.0.221:3000/score" +
            "?game=" + UnityWebRequest.EscapeURL(game) +
            "&player=" + UnityWebRequest.EscapeURL(player) +
            "&score=" + UnityWebRequest.EscapeURL(score.ToString()), "")) {

            yield return request.SendWebRequest();

            if (request.responseCode != 200) {
                Debug.Log("Sending highscore failed: " + request.responseCode);
                onScore(-1);
            } else {
                onScore(JsonUtility.FromJson<_Position>(request.downloadHandler.text).position);
            }
        }
    }

    void Start()
    {
        StartCoroutine(SendHighscore("foo", "corinna", 901, position => {
            Debug.Log("Scored on spot " + position + "!");
        }));
    }
}
