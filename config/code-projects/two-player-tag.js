// Exact source excerpts; line numbers refer to the supplied Unity archive. Leading indentation is removed for display.
export const blocks = [
  {
    "id": "tag-transfer",
    "enabled": true,
    "placeholder": false,
    "title": "Contact transfers the tag",
    "description": "Collision state separates tag transfer from continued overlap between players.",
    "explanationPosition": "right",
    "snippets": [
      {
        "id": "touch",
        "fileName": "Tag_Player.cs",
        "language": "C#",
        "startLine": 239,
        "sourcePath": "c_3/c_3/Assets/Snow_Game/Scripts/Tag_Player.cs",
        "code": "private void OnTriggerEnter2D(Collider2D collision)\n{\n    if (collision.gameObject.tag == \"Player\" && collision.gameObject != this.gameObject && !TagGameManager.instance.is_collided)\n    {\n        if(collision.gameObject.GetComponent<Tag_Player>().isTagged)\n        {\n            TagGameManager.instance.is_collided = true;\n            collision.gameObject.GetComponent<Tag_Player>().isTagged = false;\n            isTagged = true;\n            StartCoroutine(SpawnBubble());\n            audio_source.clip = BellSound;\n            audio_source.Play();\n        }\n    }",
        "highlights": [
          {
            "start": 241,
            "end": 250
          }
        ],
        "explanation": {
          "title": "1 / Transfer the tagged state",
          "text": "Only another tagged player can transfer the state. A shared collision flag prevents repeated processing while overlapping, and the transfer triggers a bubble and sound."
        }
      },
      {
        "id": "leave",
        "fileName": "Tag_Player.cs",
        "language": "C#",
        "startLine": 265,
        "sourcePath": "c_3/c_3/Assets/Snow_Game/Scripts/Tag_Player.cs",
        "code": "private void OnTriggerExit2D(Collider2D collision)\n{\n    if (collision.gameObject.tag == \"Player\" && collision.gameObject != this.gameObject && TagGameManager.instance.is_collided)\n    {\n        TagGameManager.instance.is_collided = false;\n\n    }\n}\n\nIEnumerator SpawnBubble()\n{\n    yield return new WaitForSeconds(0.2f);\n    GameObject Bubble = Instantiate(SnowBubble, transform.position, Quaternion.identity);\n    Bubble.transform.SetParent(this.transform);\n    yield return new WaitForSeconds(1f);\n    Destroy(Bubble);\n}",
        "highlights": [
          {
            "start": 267,
            "end": 270
          },
          {
            "start": 274,
            "end": 280
          }
        ],
        "explanation": {
          "title": "2 / Reset contact and show feedback",
          "text": "Leaving the overlap clears the guard. SpawnBubble provides delayed, temporary visual feedback attached to the recipient."
        }
      }
    ],
    "connections": [
      {
        "id": "tag-feedback",
        "from": {
          "snippet": "touch",
          "start": 248
        },
        "to": {
          "snippet": "leave",
          "start": 274
        },
        "label": "Spawn tag-transfer feedback"
      }
    ]
  },
  {
    "id": "tag-shared-camera",
    "enabled": true,
    "placeholder": false,
    "title": "A shared camera follows both players",
    "description": "The camera tracks the average player position and changes its view size with player separation.",
    "explanationPosition": "right",
    "snippets": [
      {
        "id": "midpoint",
        "fileName": "TagGameManager.cs",
        "language": "C#",
        "startLine": 257,
        "sourcePath": "c_3/c_3/Assets/Snow_Game/Scripts/TagGameManager.cs",
        "code": "void HandleCameraMovement()\n{\n    float sumX = 0f;\n    float sumY = 0f;\n    for(int i = 0; i < Players_in_game.Count; i++)\n    {\n        sumX += Players_in_game[i].transform.position.x;\n        sumY += Players_in_game[i].transform.position.y;\n    }\n    PlayersMidPointX = sumX / Players_in_game.Count;\n    PlayersMidPointY = sumY / Players_in_game.Count;\n    Camera.main.transform.position = new Vector2(PlayersMidPointX, PlayersMidPointY);\n    float clampY = Mathf.Clamp(Camera.main.transform.position.y, (Camera.main.orthographicSize - minZoom), 30f);\n    Camera.main.transform.position = new Vector2(PlayersMidPointX, clampY);\n}",
        "highlights": [
          {
            "start": 261,
            "end": 270
          }
        ],
        "explanation": {
          "title": "1 / Track the midpoint",
          "text": "Positions are averaged over the player list, then camera height is clamped relative to its current orthographic size."
        }
      },
      {
        "id": "zoom",
        "fileName": "TagGameManager.cs",
        "language": "C#",
        "startLine": 273,
        "sourcePath": "c_3/c_3/Assets/Snow_Game/Scripts/TagGameManager.cs",
        "code": "void Zoom()\n{\n    float distance = Vector2.Distance(Players_in_game[0].transform.position, Players_in_game[1].transform.position);\n    float newZoom = Mathf.Lerp(minZoom, maxZoom, distance / zoomLimiter);\n    Camera.main.orthographicSize = Mathf.Lerp(Camera.main.orthographicSize, newZoom, Time.deltaTime * cameraZoomSpeed);\n    Camera.main.transform.position = new Vector2(Camera.main.transform.position.x, Camera.main.transform.position.y);\n}",
        "highlights": [
          {
            "start": 275,
            "end": 278
          }
        ],
        "explanation": {
          "title": "2 / Fit player separation",
          "text": "The distance between the two players selects a target orthographic size. A delta-time-scaled interpolation smooths the change."
        }
      }
    ],
    "connections": []
  }
];
