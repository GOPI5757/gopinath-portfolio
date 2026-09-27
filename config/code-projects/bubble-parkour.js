// Exact source excerpts; line numbers refer to the supplied Unity archive. Leading indentation is removed for display.
export const blocks = [
  {
    "id": "bubble-slide",
    "enabled": true,
    "placeholder": false,
    "title": "A timed slide links movement and camera animation",
    "description": "The player enters a slide only under the configured movement and ground-state conditions.",
    "explanationPosition": "right",
    "snippets": [
      {
        "id": "slide",
        "fileName": "Player.cs",
        "language": "C#",
        "startLine": 105,
        "sourcePath": "GGJ2025/GGJ_2025_ParkourFPS-main/Assets/Scripts/Player.cs",
        "code": "if(Input.GetKeyDown(KeyCode.LeftControl) && !IsSliding && (canGoLeft && canGoRight) && IsGrounded)\n{\n    if(z > 0)\n    {\n        rb.AddForce(transform.forward * 10f, ForceMode.Impulse);\n        CamParent.GetComponent<Animator>().SetBool(\"CanSlide\", true);\n        IsSliding = true;\n    }\n}\n\nif(IsSliding)\n{\n    SlideTimeRun += Time.deltaTime;\n    if(SlideTimeRun >= SlideTimer)\n    {\n        SlideTimeRun = 0f;\n        IsSliding = false;\n        CamParent.GetComponent<Animator>().SetBool(\"CanSlide\", false);\n    }\n}",
        "highlights": [
          {
            "start": 105,
            "end": 122
          }
        ],
        "explanation": {
          "title": "1 / Start and finish the slide",
          "text": "Forward input plus Left Control applies an impulse and enables the slide animation. The timer clears both the movement state and camera animation flag."
        }
      },
      {
        "id": "jump",
        "fileName": "Player.cs",
        "language": "C#",
        "startLine": 153,
        "sourcePath": "GGJ2025/GGJ_2025_ParkourFPS-main/Assets/Scripts/Player.cs",
        "code": "transform.Translate(x * speed * Time.deltaTime, 0f, z * speed * Time.deltaTime);\nif(Input.GetKeyDown(KeyCode.Space) && !IsSliding)\n{\n    rb.AddForce(0f, JumpForce, 0f);\n    IsGrounded = false;\n}",
        "highlights": [
          {
            "start": 153,
            "end": 157
          }
        ],
        "explanation": {
          "title": "2 / Gate jumping during the slide",
          "text": "The normal movement path uses local-space translation. Jump input is blocked while IsSliding is true."
        }
      }
    ],
    "connections": [
      {
        "id": "slide-gate",
        "from": {
          "snippet": "slide",
          "start": 111
        },
        "to": {
          "snippet": "jump",
          "start": 154
        },
        "label": "Sliding disables the jump path"
      }
    ]
  },
  {
    "id": "bubble-wall-contact",
    "enabled": true,
    "placeholder": false,
    "title": "Wall contacts control movement and camera tilt",
    "description": "Side collision sensors communicate contact state to the player controller.",
    "explanationPosition": "right",
    "snippets": [
      {
        "id": "sensor",
        "fileName": "TriggerScript.cs",
        "language": "C#",
        "startLine": 31,
        "sourcePath": "GGJ2025/GGJ_2025_ParkourFPS-main/Assets/Scripts/TriggerScript.cs",
        "code": "if(collision.gameObject.tag == \"Walls\")\n{\n    if(isLeft)\n    {\n        Player.Instance.canGoLeft = false;\n    } else if(!isForward)\n    {\n        Player.Instance.canGoRight = false;\n    }\n    Player.Instance.rb.useGravity = false;\n    Player.Instance.canAffectMouseY = false;\n    if(Player.Instance.x < 0f)\n    {\n        Player.Instance.x = 0f;\n    }\n}",
        "highlights": [
          {
            "start": 33,
            "end": 44
          }
        ],
        "explanation": {
          "title": "1 / Set wall-contact state",
          "text": "A wall collision marks the blocked side, disables gravity and restricts vertical mouse look for the wall interaction."
        }
      },
      {
        "id": "tilt",
        "fileName": "Player.cs",
        "language": "C#",
        "startLine": 136,
        "sourcePath": "GGJ2025/GGJ_2025_ParkourFPS-main/Assets/Scripts/Player.cs",
        "code": "if (!canGoLeft)\n{\n    CamParent.GetComponent<Animator>().SetBool(\"CanTiltRight\", true);\n} else\n{\n    CamParent.GetComponent<Animator>().SetBool(\"CanTiltRight\", false);\n}\n\nif (!canGoRight)\n{\n    CamParent.GetComponent<Animator>().SetBool(\"CanTiltLeft\", true);\n}\nelse\n{\n    CamParent.GetComponent<Animator>().SetBool(\"CanTiltLeft\", false);\n}",
        "highlights": [
          {
            "start": 136,
            "end": 150
          }
        ],
        "explanation": {
          "title": "2 / Reflect contact in the camera",
          "text": "The blocked-side flags drive the opposite camera tilt animation. TriggerScript restores movement flags, gravity and mouse look on collision exit."
        }
      }
    ],
    "connections": [
      {
        "id": "wall-camera",
        "from": {
          "snippet": "sensor",
          "start": 35
        },
        "to": {
          "snippet": "tilt",
          "start": 136
        },
        "label": "Left-wall state drives camera tilt"
      }
    ]
  }
];
