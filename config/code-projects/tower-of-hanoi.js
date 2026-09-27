// Exact source excerpts; original line numbers, leading indentation removed.
export const blocks = [
  {
    "id": "hanoi-valid-moves",
    "enabled": true,
    "placeholder": false,
    "title": "Validate disc placement before counting a move",
    "description": "The drop handler checks the destination stack and restores invalid placements.",
    "explanationPosition": "right",
    "snippets": [
      {
        "id": "drop",
        "fileName": "GameManager.cs",
        "language": "C#",
        "startLine": 252,
        "sourcePath": "TOH/TOH/Assets/Scripts/GameManager.cs",
        "code": "if(isMouseUp && !is_moving)\n{\n    currentDiscNo = -1;\n    int currentDisc_value = currentDisc.gameObject.name[1] - '0';\n    int index = Mathf.RoundToInt((currentDisc.transform.position.x + 5f) / 5f);\n    if (t_datas[index].t_index.Count > 0)\n    {\n        int nextDisc_value = t_datas[index].t_index[t_datas[index].t_index.Count - 1];\n        if (currentDisc_value < nextDisc_value)\n        {\n            moves++;\n            UIManager.Instance.UpdateMovesText();\n            Physics2D.SyncTransforms();\n            AssignLists();\n        }\n        else\n        {\n            currentDisc.transform.position = cd_startPos;\n        }\n    }\n    else\n    {\n        moves++;\n        UIManager.Instance.UpdateMovesText();\n        Physics2D.SyncTransforms();\n        AssignLists();\n    }\n\n    currentDisc = null;\n    isMouseUp = false;\n}",
        "highlights": [
          {
            "start": 257,
            "end": 269
          },
          {
            "start": 272,
            "end": 277
          }
        ],
        "explanation": {
          "title": "1 / Check the destination",
          "text": "A disc may be placed on an empty tower or a larger top disc. Valid drops increment the move count, sync transforms and rebuild tower lists; invalid drops return to the pickup position."
        }
      },
      {
        "id": "ui",
        "fileName": "UIManager.cs",
        "language": "C#",
        "startLine": 56,
        "sourcePath": "TOH/TOH/Assets/Scripts/UIManager.cs",
        "code": "public void UpdateMovesText()\n{\n    moves_text.text = \"Moves\\n\" + GameManager.instance.moves.ToString();\n}\n\npublic void UpdateTimerText()\n{\n    Timer_Text.text = \"Timer\\n\" + GameManager.instance.Timer.ToString(\"F0\");\n}",
        "highlights": [
          {
            "start": 56,
            "end": 63
          }
        ],
        "explanation": {
          "title": "2 / Reflect moves and time",
          "text": "Dedicated UI methods update the displayed move count and timer from GameManager state."
        }
      }
    ],
    "connections": [
      {
        "id": "hanoi-count",
        "from": {
          "snippet": "drop",
          "start": 263
        },
        "to": {
          "snippet": "ui",
          "start": 56
        },
        "label": "Refresh the move counter"
      }
    ]
  },
  {
    "id": "hanoi-scramble",
    "enabled": true,
    "placeholder": false,
    "title": "Generate puzzles with legal disc moves",
    "description": "The board setup sorts discs and then scrambles the tower using valid transfers.",
    "explanationPosition": "right",
    "snippets": [
      {
        "id": "source",
        "fileName": "GameManager.cs",
        "language": "C#",
        "startLine": 394,
        "sourcePath": "TOH/TOH/Assets/Scripts/GameManager.cs",
        "code": "void RandomAlgorithm()\n{\n    for(int i = 0; i < reverseMoves; i++)\n    {\n        bool main_flag = true;\n        GameObject currentDisc = null;\n        int rand = -1;\n        do\n        {\n            rand = Random.Range(0, 3);\n            if (t_datas[rand].t_index.Count > 0)\n            {\n                currentDisc = rev_discs[t_datas[rand].t_index[t_datas[rand].t_index.Count - 1] - 1];\n                for(int j = 0; j < 3; j++)\n                {\n                    if(j != rand)\n                    {\n                        if (t_datas[j].t_index.Count > 0)\n                        {\n                            if(t_datas[j].t_index[t_datas[j].t_index.Count - 1] > currentDisc.gameObject.name[1] - '0')\n                            {\n                                main_flag = false;\n                            }\n                        } else\n                        {\n                            main_flag = false;\n                        }\n                    }\n                }\n                if(!main_flag)\n                {\n                    break;\n                }\n            }\n        } while (true);",
        "highlights": [
          {
            "start": 403,
            "end": 419
          }
        ],
        "explanation": {
          "title": "1 / Choose a movable top disc",
          "text": "The scramble selects a nonempty source tower and checks that another tower can receive its top disc."
        }
      },
      {
        "id": "destination",
        "fileName": "GameManager.cs",
        "language": "C#",
        "startLine": 429,
        "sourcePath": "TOH/TOH/Assets/Scripts/GameManager.cs",
        "code": "    int rand_1 = -1;\n    bool can_changePos = false;\n    do\n    {\n        rand_1 = Random.Range(0, 3);\n        if(t_datas[rand_1].t_index.Count > 0)\n        {\n            can_changePos = t_datas[rand_1].t_index[t_datas[rand_1].t_index.Count - 1] > currentDisc.gameObject.name[1] - '0';\n        } else\n        {\n            can_changePos = true;\n        }\n        if (rand_1 != rand && can_changePos)\n        {\n            break;\n        }\n    } while (true);\n    float new_y = -3.55f + (t_datas[rand_1].t_index.Count > 0 ?\n        (t_datas[rand_1].t_index.Count) : 0);\n    currentDisc.transform.position = new Vector3(column_values[rand_1], new_y, 0f);\n    Physics2D.SyncTransforms();\n    AssignLists();\n}",
        "highlights": [
          {
            "start": 433,
            "end": 450
          }
        ],
        "explanation": {
          "title": "2 / Select a legal destination",
          "text": "A different destination must be empty or topped by a larger disc. After moving, the tower data is rebuilt before the next iteration."
        }
      }
    ],
    "connections": [
      {
        "id": "scramble-step",
        "from": {
          "snippet": "source",
          "start": 425
        },
        "to": {
          "snippet": "destination",
          "start": 429
        },
        "label": "Continue with a legal destination"
      }
    ]
  }
];
