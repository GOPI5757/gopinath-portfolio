// Exact source excerpts; line numbers refer to the supplied Unity archive. Leading indentation is removed for display.
export const blocks = [
  {
    "id": "ben-ability-selection",
    "enabled": true,
    "placeholder": false,
    "title": "Ability selection gates movement options",
    "description": "The selector keeps at most one unlocked ability active, and the player dispatches the corresponding action.",
    "explanationPosition": "right",
    "snippets": [
      {
        "id": "select",
        "fileName": "SelectionManager.cs",
        "language": "C#",
        "startLine": 149,
        "sourcePath": "BYOG_2D/BYOG_2D/Assets/Scripts/SelectionManager.cs",
        "code": "public void SetClickColor_IS(Image Img)\n{\n    if (player.is_getting_ability) return;\n    int index = -1;\n    for(int i = 0; i < ImageSelectors.Length; i++)\n    {\n        if (ImageSelectors[i] == Img)\n        {\n            if (Abilities[i].locked)\n            {\n                return;\n            }\n            Abilities[i].is_using = !Abilities[i].is_using;\n            if (Abilities[i].is_using)\n            {\n                index = i;\n            }\n            break;\n        }\n    }\n\n    SoundManager.instance.PlaySound(SoundManager.instance.Select_alien_sound);\n\n    if(index != -1)\n    {\n        for(int i = 0; i < 3; i++)\n        {\n            if(i != index)\n            {\n                Abilities[i].is_using = false;\n            }\n        }\n    }\n}",
        "highlights": [
          {
            "start": 157,
            "end": 166
          },
          {
            "start": 172,
            "end": 179
          }
        ],
        "explanation": {
          "title": "1 / Select an unlocked ability",
          "text": "Locked entries are rejected. Selecting an ability clears the active flag on the other entries."
        }
      },
      {
        "id": "dispatch",
        "fileName": "Player.cs",
        "language": "C#",
        "startLine": 409,
        "sourcePath": "BYOG_2D/BYOG_2D/Assets/Scripts/Player.cs",
        "code": "void HandleAbilityMovements()\n{\n    if (canFreezeMovement || Is_SelectionPanelOpen) return;\n    if (SelectionManager.instance.Abilities[0].is_using)\n    {\n        if (Input.GetKeyDown(KeyCode.Space) && isGrounded)\n        {\n            jumpRequested = true;\n        }\n    }\n    else if (SelectionManager.instance.Abilities[1].is_using)\n    {\n        if(Input.GetKeyDown(KeyCode.LeftShift) && !is_dashing && horizontal != 0f)\n        {\n            SoundManager.instance.PlaySound(SoundManager.instance.dash_sound);\n            is_dashing = true;\n            animator.SetBool(\"canDash\", true);\n            StartCoroutine(ResetDashing());\n        }\n    }\n    else if (SelectionManager.instance.Abilities[2].is_using && !is_shrinking)\n    {\n        if (!is_small || !is_under_shrink_area)\n        {\n            if(Input.GetKeyDown(KeyCode.F))\n            {\n                is_shrinking = true;\n            }\n        }\n    }",
        "highlights": [
          {
            "start": 411,
            "end": 426
          },
          {
            "start": 429,
            "end": 436
          }
        ],
        "explanation": {
          "title": "2 / Dispatch the active ability",
          "text": "Input is gated while movement is frozen or the selection panel is open. Active ability state chooses jump, dash or shrink behavior."
        }
      },
      {
        "id": "dash",
        "fileName": "Player.cs",
        "language": "C#",
        "startLine": 464,
        "sourcePath": "BYOG_2D/BYOG_2D/Assets/Scripts/Player.cs",
        "code": "IEnumerator ResetDashing()\n{\n    yield return new WaitForSeconds(DashTime);\n    animator.SetBool(\"canDash\", false);\n    is_dashing = false;\n}",
        "highlights": [
          {
            "start": 466,
            "end": 468
          }
        ],
        "explanation": {
          "title": "3 / Reset a timed dash",
          "text": "The dash coroutine waits for DashTime before clearing animation and state flags."
        }
      }
    ],
    "connections": [
      {
        "id": "ability-state",
        "from": {
          "snippet": "select",
          "start": 161
        },
        "to": {
          "snippet": "dispatch",
          "start": 412
        },
        "label": "The selected state gates the player action"
      },
      {
        "id": "dash-reset",
        "from": {
          "snippet": "dispatch",
          "start": 426
        },
        "to": {
          "snippet": "dash",
          "start": 464
        },
        "label": "Schedule the dash reset"
      }
    ]
  },
  {
    "id": "ben-wire-puzzle",
    "enabled": true,
    "placeholder": false,
    "title": "Wire swapping updates visuals and puzzle state",
    "description": "A wire puzzle moves the chosen pair and commits the logical swap when animation reaches its destination.",
    "explanationPosition": "right",
    "snippets": [
      {
        "id": "request",
        "fileName": "PuzzleGame_1.cs",
        "language": "C#",
        "startLine": 231,
        "sourcePath": "BYOG_2D/BYOG_2D/Assets/Scripts/PuzzleGame_1.cs",
        "code": "void HandleSwapButtons()\n{\n    if (puzzleCompleted) return;\n    Vector2 worldPos = Camera.main.ScreenToWorldPoint(Input.mousePosition);\n    Collider2D col = Physics2D.OverlapCircle(worldPos, 0.1f, SwapLayer);\n\n    if (col != null)\n    {\n        col.gameObject.transform.localScale = new Vector3(0.6f, 0.6f, 0.6f);\n        if(Input.GetMouseButtonDown(0) && !shouldSwap)\n        {\n            canCheckPuzzleCompleted = false;\n            for (int i = 0; i < SwapButtons.Length; i++)\n            {\n                if (SwapButtons[i] == col.gameObject)\n                {\n                    shouldSwap = true;\n                    swapIndex = i;\n                    break;\n                }\n            }",
        "highlights": [
          {
            "start": 233,
            "end": 248
          }
        ],
        "explanation": {
          "title": "1 / Request a swap",
          "text": "A mouse overlap locates the swap control. Input is ignored after completion or while a swap is in progress."
        }
      },
      {
        "id": "animate",
        "fileName": "PuzzleGame_1.cs",
        "language": "C#",
        "startLine": 266,
        "sourcePath": "BYOG_2D/BYOG_2D/Assets/Scripts/PuzzleGame_1.cs",
        "code": "void SwapWires(int swapIndex)\n{\n\n    GameObject up_obj = Wires_in_Order[swap_Values[swapIndex][0]];\n    GameObject down_obj = Wires_in_Order[swap_Values[swapIndex][1]];\n\n    up_obj.GetComponent<SpriteRenderer>().sortingOrder = 612;\n\n    Vector2 pos_1 = Positions_1[swap_Values[swapIndex][1]];\n    Vector2 pos_2 = Positions_1[swap_Values[swapIndex][0]];\n\n    float distance = Vector2.Distance(up_obj.transform.position, pos_1);\n\n    Vector2 newPos_1 = Vector2.MoveTowards(up_obj.transform.position, pos_1, Time.deltaTime * swapSpeed);\n    up_obj.transform.position = newPos_1;\n\n    Vector2 newPos_2 = Vector2.MoveTowards(down_obj.transform.position, pos_2, Time.deltaTime * swapSpeed);\n    down_obj.transform.position = newPos_2;",
        "highlights": [
          {
            "start": 269,
            "end": 283
          }
        ],
        "explanation": {
          "title": "2 / Animate both wires",
          "text": "The selected pair looks up each other’s target positions and moves both objects toward them."
        }
      },
      {
        "id": "commit",
        "fileName": "PuzzleGame_1.cs",
        "language": "C#",
        "startLine": 285,
        "sourcePath": "BYOG_2D/BYOG_2D/Assets/Scripts/PuzzleGame_1.cs",
        "code": "if(distance <= 0f)\n{\n    up_obj.GetComponent<SpriteRenderer>().sortingOrder = 611;\n\n    Wires_in_Order[swap_Values[swapIndex][0]].transform.position = Positions_1[swap_Values[swapIndex][1]];\n    Wires_in_Order[swap_Values[swapIndex][1]].transform.position = Positions_1[swap_Values[swapIndex][0]];\n\n    GameObject Temp = Wires_in_Order[swap_Values[swapIndex][0]];\n    Wires_in_Order[swap_Values[swapIndex][0]] = Wires_in_Order[swap_Values[swapIndex][1]];\n    Wires_in_Order[swap_Values[swapIndex][1]] = Temp;\n\n    int index_temp = arr[swap_Values[swapIndex][0]].left;\n    arr[swap_Values[swapIndex][0]].left = arr[swap_Values[swapIndex][1]].left;\n    arr[swap_Values[swapIndex][1]].left = index_temp;\n\n    shouldSwap = false;\n    canCheckPuzzleCompleted = true;\n}",
        "highlights": [
          {
            "start": 292,
            "end": 301
          }
        ],
        "explanation": {
          "title": "3 / Commit the ordering",
          "text": "After the move completes, object references and logical wire endpoints are swapped, then completion checks are re-enabled."
        }
      }
    ],
    "connections": [
      {
        "id": "wire-choice",
        "from": {
          "snippet": "request",
          "start": 248
        },
        "to": {
          "snippet": "animate",
          "start": 269
        },
        "label": "Selected index chooses the wire pair"
      },
      {
        "id": "wire-commit",
        "from": {
          "snippet": "animate",
          "start": 280
        },
        "to": {
          "snippet": "commit",
          "start": 285
        },
        "label": "Finish the animation before committing"
      }
    ]
  },
  {
    "id": "ben-memory-puzzle",
    "enabled": true,
    "placeholder": false,
    "title": "Memory sequences validate partial input",
    "description": "The sequence puzzle checks each player input against the expected order before advancing the round.",
    "explanationPosition": "right",
    "snippets": [
      {
        "id": "input",
        "fileName": "PuzzleGame_3.cs",
        "language": "C#",
        "startLine": 298,
        "sourcePath": "BYOG_2D/BYOG_2D/Assets/Scripts/PuzzleGame_3.cs",
        "code": "player_order.Add(index);\n\nif (checkOrder())\n{\n    if (player_order.Count == order.Count)\n    {\n        if (current_time < maxTimes)\n        {\n            current_time++;\n            is_showing_order = true;\n            player_order.Clear();\n            check_time = 0;\n        }\n        else\n        {\n            for (int i = 0; i < 9; i++)\n            {\n                Buttons[i].GetComponent<SpriteRenderer>().color = NormalColor;\n            }\n            isPuzzleCompleted = true;\n            StartCoroutine(setcanMoveCameraUp());\n        }",
        "highlights": [
          {
            "start": 298,
            "end": 318
          }
        ],
        "explanation": {
          "title": "1 / Advance a correct sequence",
          "text": "A correct full sequence advances to the next round; the final round marks completion and starts the return transition."
        }
      },
      {
        "id": "compare",
        "fileName": "PuzzleGame_3.cs",
        "language": "C#",
        "startLine": 354,
        "sourcePath": "BYOG_2D/BYOG_2D/Assets/Scripts/PuzzleGame_3.cs",
        "code": "bool checkOrder()\n{\n    for(int i = 0; i < player_order.Count; i++)\n    {\n        if (player_order[i] != order[i])\n        {\n            return false;\n        }\n    }\n    return true;\n}",
        "highlights": [
          {
            "start": 356,
            "end": 363
          }
        ],
        "explanation": {
          "title": "2 / Validate the prefix",
          "text": "Only the entered prefix is compared, so a wrong selection can be rejected immediately rather than waiting for a complete sequence."
        }
      }
    ],
    "connections": [
      {
        "id": "check-sequence",
        "from": {
          "snippet": "input",
          "start": 300
        },
        "to": {
          "snippet": "compare",
          "start": 354
        },
        "label": "Validate the entered sequence"
      }
    ]
  }
];
