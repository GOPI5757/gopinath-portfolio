// Exact source excerpts; line numbers refer to the supplied Unity archive. Leading indentation is removed for display.
export const blocks = [
  {
    "id": "bb-hit-speed",
    "enabled": true,
    "placeholder": false,
    "title": "Hit detection drives ball acceleration",
    "description": "Bat raycasts resolve a hit and delegate ball-speed changes to the ball component.",
    "explanationPosition": "right",
    "snippets": [
      {
        "id": "hit",
        "fileName": "GameManager.cs",
        "language": "C#",
        "startLine": 323,
        "sourcePath": "BaseBallGame/BaseBallGame/Assets/Scripts/GameManager.cs",
        "code": "bool canHit = (isLeft && !hasHit_left) || (!isLeft && !hasHit_right);\n\nif (front_success && canHit)\n{\n    hasHit_left = isLeft;\n    hasHit_right = !isLeft;\n    BallScript b_script = hit_front.transform.parent.parent.GetComponent<BallScript>();\n    if (b_script != null)\n    {\n        if (!b_script.GetCanStart())\n        {\n            b_script.SetHasHit(true);\n            b_script.SetCanStart(true);\n        }\n        else\n        {\n            b_script.SpeedIncrement();\n        }\n    }\n}",
        "highlights": [
          {
            "start": 325,
            "end": 339
          }
        ],
        "explanation": {
          "title": "1 / Resolve a valid hit",
          "text": "The side-specific hit guard prevents a swing from being processed repeatedly. The first valid hit starts the ball; later hits call SpeedIncrement."
        }
      },
      {
        "id": "speed",
        "fileName": "BallScript.cs",
        "language": "C#",
        "startLine": 101,
        "sourcePath": "BaseBallGame/BaseBallGame/Assets/Scripts/BallScript.cs",
        "code": "public void SpeedIncrement()\n{\n    if (HasHit) return;\n\n    if(isReversed)\n    {\n        isReversed = false;\n        rotateSpeed += ballSO.incrementSpeed / 2;\n    } else\n    {\n        rotateSpeed += ballSO.incrementSpeed;\n    }\n    rotateSpeed = Mathf.Clamp(rotateSpeed, ballSO.minimumRotateSpeed, ballSO.SpeedCap);\n    elapsedTime = 0f;\n    currentSpeed = rotateSpeed;\n    SetHasHit(true);\n}",
        "highlights": [
          {
            "start": 105,
            "end": 116
          }
        ],
        "explanation": {
          "title": "2 / Increase and clamp speed",
          "text": "A reversed ball uses half the normal increment when returning to its normal direction. The result is clamped to the configured minimum and speed cap."
        }
      },
      {
        "id": "tuning",
        "fileName": "BallSO.cs",
        "language": "C#",
        "startLine": 3,
        "sourcePath": "BaseBallGame/BaseBallGame/Assets/Scripts/BallSO.cs",
        "code": "[CreateAssetMenu(fileName = \"BallSO\", menuName = \"BallSpin/BallSO\")]\npublic class BallSO : ScriptableObject\n{\n    [field: SerializeField] public float minimumRotateSpeed { get; private set; }\n    [field: SerializeField] public float downTime { get; private set; }\n    [field: SerializeField] public float gameEndSlowDownTime { get; private set; }\n\n    [field: SerializeField] public float incrementSpeed { get; private set; }\n\n    [field: SerializeField] public float SpeedCap { get; private set; }\n    [field: SerializeField] public float preparationSpeed { get; private set; }\n}",
        "highlights": [
          {
            "start": 6,
            "end": 13
          }
        ],
        "explanation": {
          "title": "3 / Keep balancing data in an asset",
          "text": "The ScriptableObject holds rotation, acceleration, preparation and slowdown parameters for editing in Unity."
        }
      }
    ],
    "connections": [
      {
        "id": "hit-speed",
        "from": {
          "snippet": "hit",
          "start": 339
        },
        "to": {
          "snippet": "speed",
          "start": 101
        },
        "label": "The hit changes ball speed"
      },
      {
        "id": "speed-data",
        "from": {
          "snippet": "speed",
          "start": 113
        },
        "to": {
          "snippet": "tuning",
          "start": 12
        },
        "label": "Clamp against the asset speed cap"
      }
    ]
  },
  {
    "id": "bb-match-timer",
    "enabled": true,
    "placeholder": false,
    "title": "Match state and timed results",
    "description": "The match timer updates its UI and transitions to the post-game presentation when time expires.",
    "explanationPosition": "right",
    "snippets": [
      {
        "id": "timer",
        "fileName": "GameManager.cs",
        "language": "C#",
        "startLine": 177,
        "sourcePath": "BaseBallGame/BaseBallGame/Assets/Scripts/GameManager.cs",
        "code": "private void SetTimer()\n{\n    if (game_state != GameState.Game) return;\n    Timer -= Time.deltaTime;\n    Timer = Mathf.Clamp(Timer, 0, maxTimer);\n\n    timerText.text = Timer.ToString(\"F1\");\n    timer_slider.value = Timer / maxTimer;\n\n    if(Timer <= 0f)\n    {\n        game_state = GameState.PostGame;\n        PlaySound(winSound);\n        HandlePostGame();\n    }\n}",
        "highlights": [
          {
            "start": 179,
            "end": 190
          }
        ],
        "explanation": {
          "title": "1 / Finish the timed match",
          "text": "The timer only advances during gameplay, updates text and slider, then changes state once it reaches zero."
        }
      },
      {
        "id": "finish",
        "fileName": "GameManager.cs",
        "language": "C#",
        "startLine": 150,
        "sourcePath": "BaseBallGame/BaseBallGame/Assets/Scripts/GameManager.cs",
        "code": "private void HandlePostGame()\n{\n    if (game_state != GameState.PostGame) return;\n\n    ws_bgImage.gameObject.SetActive(true);\n    Color finalColor = LeftScore < RightScore ? RightColor : LeftColor;\n    Color finalColorDark = LeftScore < RightScore ? RightColorDark : LeftColorDark;\n\n    ws_bgImage.color = finalColor;\n    ws_playerText.text = LeftScore < RightScore ? \"Player 2\" : \"Player 1\";\n    ws_restartButtonImg.color = finalColorDark;\n    ws_restartText.color = finalColor;",
        "highlights": [
          {
            "start": 152,
            "end": 161
          }
        ],
        "explanation": {
          "title": "2 / Present the result",
          "text": "The post-game UI takes its player label and colors from the score comparison. The remainder of this method stops input and starts ball slowdown."
        }
      },
      {
        "id": "slow",
        "fileName": "BallScript.cs",
        "language": "C#",
        "startLine": 92,
        "sourcePath": "BaseBallGame/BaseBallGame/Assets/Scripts/BallScript.cs",
        "code": "public void SetEndGame()\n{\n    elapsedTime = 0f;\n    dynamicTime = rotateSpeed / ballSO.gameEndSlowDownTime;\n    currentSpeed = rotateSpeed;\n\n    targetSpeedDynamic = 0f;\n}",
        "highlights": [
          {
            "start": 94,
            "end": 98
          }
        ],
        "explanation": {
          "title": "3 / Ease toward rest",
          "text": "SetEndGame captures the current speed and sets the target to zero for the shared speed interpolation path."
        }
      }
    ],
    "connections": [
      {
        "id": "show-result",
        "from": {
          "snippet": "timer",
          "start": 190
        },
        "to": {
          "snippet": "finish",
          "start": 150
        },
        "label": "Transition to the results UI"
      }
    ]
  }
];
