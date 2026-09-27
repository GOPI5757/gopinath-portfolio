// Exact excerpts from word_search_2d.rar. Original line numbers; leading indentation removed.
export const blocks = [
  {
    "id": "ws-placement",
    "enabled": true,
    "placeholder": false,
    "title": "Directional word placement with bounds checks",
    "description": "The generator rotates through placement orientations, rejects occupied cells and fills unused positions with random letters.",
    "explanationPosition": "right",
    "snippets": [
      {
        "id": "choose",
        "fileName": "GameManager.cs",
        "sourcePath": "WordSearch/word_search_2d/Assets/Scripts/GameManager.cs",
        "language": "C#",
        "startLine": 389,
        "code": "void PlaceLetters()\n{\n    for(int i = 0; i < words_taken.Count; i++)\n    {\n        do\n        {\n            int word_placement = priority_order[priority_order.Count - 1];\n            bool success = WordPlacementAlgorithm(words_taken[i], word_placement, word_placement == 2 ? 2 : 1);\n            if (success) {\n                priority_order.Insert(0, priority_order[priority_order.Count - 1]);\n                priority_order.RemoveAt(priority_order.Count - 1);\n                break;\n            }\n            else\n            {\n                priority_order.Insert(0, priority_order[priority_order.Count - 1]);\n                priority_order.RemoveAt(priority_order.Count - 1);\n            }\n        } while (true);",
        "highlights": [
          {
            "start": 395,
            "end": 405
          }
        ],
        "explanation": {
          "title": "1 / Try the next orientation",
          "text": "The priority list rotates after each placement attempt. A failed candidate falls back to another orientation. The outer retry loop is unbounded in this revision, so this is not presented as a guaranteed-termination generator."
        }
      },
      {
        "id": "check",
        "fileName": "GameManager.cs",
        "sourcePath": "WordSearch/word_search_2d/Assets/Scripts/GameManager.cs",
        "language": "C#",
        "startLine": 440,
        "code": "bool boundCheck = false;\nif(word_placement != 2)\n{\n    boundCheck = dir == 0 ?\n        (word_placement == 0 ? x : y) + length_word - 1 < gridSize :\n        (word_placement == 0 ? x : y) - (length_word - 1) > -1;\n} else\n{\n    boundCheck = dir == 0 ?\n        x + length_word - 1 < gridSize && y - (length_word - 1) > -1 :\n        x + length_word - 1 < gridSize && y + length_word - 1 < gridSize;\n}\nif (boundCheck) \n{\n    bool flag = false;\n\n    for (int j = 0; j < length_word; j++)\n    {\n        int final_x = word_placement == 2 ? x + j :\n                    (word_placement == 1 ? x : dir == 0 ? x + j : x - j);\n        int final_y = word_placement == 2 ? y + (j * (dir == 0 ? -1 : 1)) :\n            (word_placement == 1 ? dir == 0 ? y + j : y - j : y);\n        if (gv[final_x].val[final_y] != null)\n        {\n            flag = true;\n            break;\n        }\n    }\n\n    if (!flag)\n    {\n        main_flag = true;\n        break;\n    }\n}",
        "highlights": [
          {
            "start": 441,
            "end": 450
          },
          {
            "start": 456,
            "end": 466
          }
        ],
        "explanation": {
          "title": "2 / Check bounds and occupancy",
          "text": "Horizontal, vertical and diagonal candidates use direction-specific bounds. Every target cell must be empty; this implementation does not share matching letters at intersections."
        }
      },
      {
        "id": "write",
        "fileName": "GameManager.cs",
        "sourcePath": "WordSearch/word_search_2d/Assets/Scripts/GameManager.cs",
        "language": "C#",
        "startLine": 493,
        "code": "    for (int j = 0; j < length_word; j++)\n    {\n        int final_x = word_placement == 2 ? x + j :\n                            (word_placement == 1 ? x : dir == 0 ? x + j : x - j);\n        int final_y = word_placement == 2 ? y + (j * (dir == 0 ? -1 : 1)) :\n            (word_placement == 1 ? dir == 0 ? y + j : y - j : y);\n        gv[final_x].val[final_y] = word[j].ToString().ToUpper();\n    }\n    return true;\n}",
        "highlights": [
          {
            "start": 493,
            "end": 501
          }
        ],
        "explanation": {
          "title": "3 / Commit the letters",
          "text": "After a valid candidate is found, the same coordinate formula writes each character in uppercase."
        }
      }
    ],
    "connections": [
      {
        "id": "placement-check",
        "from": {
          "snippet": "choose",
          "start": 396
        },
        "to": {
          "snippet": "check",
          "start": 440
        },
        "label": "The placement attempt checks bounds and occupancy"
      },
      {
        "id": "placement-write",
        "from": {
          "snippet": "check",
          "start": 471
        },
        "to": {
          "snippet": "write",
          "start": 493
        },
        "label": "A valid candidate is written into the grid"
      }
    ]
  },
  {
    "id": "ws-selection",
    "enabled": true,
    "placeholder": false,
    "title": "Straight-line selection and reverse-word matching",
    "description": "Selection starts with neighbouring cells, locks to a direction after the next cell, and accepts a target word in either reading direction.",
    "explanationPosition": "right",
    "snippets": [
      {
        "id": "direction",
        "fileName": "GameManager.cs",
        "sourcePath": "WordSearch/word_search_2d/Assets/Scripts/GameManager.cs",
        "language": "C#",
        "startLine": 676,
        "code": "void CalculateNextPositions(string box_name, bool first = false)\n{\n    Vector2Int coord = divide_coord(box_name);\n    if(first)\n    {\n        for(int i = -1; i <= 1; i++)\n        {\n            for(int j = -1; j <= 1; j++)\n            {\n                if (i == 0 && j == 0) continue;\n                int target_x = coord.x + i;\n                int target_y = coord.y + j;\n                if(target_x > -1 && target_x < gridSize && target_y > -1 && target_y < gridSize)\n                {\n                    possibleMoves.Add(new Vector2Int(target_x, target_y));\n                }\n            }\n        }\n    } else\n    {\n        Vector2Int prev_val = order_list[order_list.Count - 2];\n        Vector2Int new_val = order_list[order_list.Count - 1];\n\n        int inc_x_val = new_val.x - prev_val.x == 0 ? 0 : (new_val.x - prev_val.x < 0 ? -1 : 1);\n        int inc_y_val = new_val.y - prev_val.y == 0 ? 0 : (new_val.y - prev_val.y < 0 ? -1 : 1);\n\n        possibleMoves.Add(new Vector2Int(new_val.x + inc_x_val, new_val.y + inc_y_val));\n    }\n}",
        "highlights": [
          {
            "start": 681,
            "end": 690
          },
          {
            "start": 696,
            "end": 702
          }
        ],
        "explanation": {
          "title": "1 / Constrain the selection path",
          "text": "The first cell exposes its in-bounds neighbours. After two cells are selected, a signed direction step allows only the next cell along the same line."
        }
      },
      {
        "id": "match",
        "fileName": "GameManager.cs",
        "sourcePath": "WordSearch/word_search_2d/Assets/Scripts/GameManager.cs",
        "language": "C#",
        "startLine": 590,
        "code": "for (int i = final_word.Length - 1; i > -1; i--)\n{\n    final_word_rev += final_word[i];\n}\n\nbool pre_flag = false;\n\nfor(int i = 0; i < words_completed.Count; i++)\n{\n    if (words_completed[i].ToUpper() == final_word.ToUpper() || words_completed[i].ToUpper() == final_word_rev.ToUpper())\n    {\n        pre_flag = true;\n        break;\n    }\n}\n\nbool flag = false;\nstring word_to_hide = \"\";\nif(!pre_flag)\n{\n\n    for (int i = 0; i < words_taken.Count; i++)\n    {\n        if (words_taken[i].ToUpper() == final_word.ToUpper() || words_taken[i].ToUpper() == final_word_rev.ToUpper())\n        {\n            flag = true;\n            words_completed.Add(words_taken[i]);\n            word_to_hide = words_taken[i];\n            break;\n        }\n    }\n}\nif (!flag)\n{\n    Destroy(Current_SelectionBar);\n}",
        "highlights": [
          {
            "start": 590,
            "end": 603
          },
          {
            "start": 611,
            "end": 624
          }
        ],
        "explanation": {
          "title": "2 / Recognize a new word",
          "text": "The selected text is reversed and compared case-insensitively. Already completed words are excluded; invalid selections discard their visual bar."
        }
      }
    ],
    "connections": []
  },
  {
    "id": "ws-levels",
    "enabled": true,
    "placeholder": false,
    "title": "Inspector-configured level tiers and time limits",
    "description": "The supplied revision stores level settings in serialized structs and arrays, then selects grid size and time budget from the current tier.",
    "explanationPosition": "right",
    "snippets": [
      {
        "id": "data",
        "fileName": "GameManager.cs",
        "sourcePath": "WordSearch/word_search_2d/Assets/Scripts/GameManager.cs",
        "language": "C#",
        "startLine": 23,
        "code": "[System.Serializable]\nstruct level_data\n{\n    public int max_level;\n    public float[] max_times;\n    public int grid_size;\n}",
        "highlights": [
          {
            "start": 24,
            "end": 28
          }
        ],
        "explanation": {
          "title": "1 / Define level data",
          "text": "A tier contains its maximum level, grid size and per-level time limits. In this archive these are serializable level_data values, not ScriptableObject classes."
        }
      },
      {
        "id": "select",
        "fileName": "GameManager.cs",
        "sourcePath": "WordSearch/word_search_2d/Assets/Scripts/GameManager.cs",
        "language": "C#",
        "startLine": 283,
        "code": "void Pre_Preparation()\n{\n    lvl_txt_obj.GetComponent<TMP_Text>().text = \"Level \" + currentLevel.ToString();\n    if(currentLevel <= 35)\n    {\n        for(int i = 0; i < level_dataSet.Length; i++)\n        {\n            if(currentLevel <= level_dataSet[i].max_level)\n            {\n                gridSize = level_dataSet[i].grid_size;\n                total_time = level_dataSet[i].max_times[((currentLevel - 1) % 5)];\n                max_time = level_dataSet[i].max_times[((currentLevel - 1) % 5)];\n                break;\n            }\n        }\n    } else\n    {\n        gridSize = level_dataSet[level_dataSet.Length - 1].grid_size;\n        total_time = level_dataSet[\n            level_dataSet.Length - 1].max_times[level_dataSet[level_dataSet.Length - 1].max_times.Length - 1\n        ];\n\n        max_time = level_dataSet[\n            level_dataSet.Length - 1].max_times[level_dataSet[level_dataSet.Length - 1].max_times.Length - 1\n        ];\n    }\n}",
        "highlights": [
          {
            "start": 288,
            "end": 295
          },
          {
            "start": 300,
            "end": 307
          }
        ],
        "explanation": {
          "title": "2 / Select the current tier",
          "text": "The first matching max_level supplies the grid size. A modulo-five index selects the time budget; levels above 35 use the final configured values."
        }
      },
      {
        "id": "timer",
        "fileName": "GameManager.cs",
        "sourcePath": "WordSearch/word_search_2d/Assets/Scripts/GameManager.cs",
        "language": "C#",
        "startLine": 740,
        "code": "void HandleTime()\n{\n    if (hasWon || IsGameOver) return;\n    total_time -= Time.deltaTime;\n    minutes = Mathf.FloorToInt(total_time / 60f);\n    float seconds = total_time - 60f * minutes;\n    if (seconds > 59.5f)\n    {\n        seconds = 0f;\n        minutes += 1;\n    }\n    Timer_Text.text = minutes.ToString(\"00\") + \":\" + seconds.ToString(\"00\");\n\n    if(total_time <= 0f)\n    {\n        Destroy(Current_SelectionBar);\n        Current_SelectionBar = null;\n        IsGameOver = true;\n        StartCoroutine(TriggerScreens(false));\n    }\n}",
        "highlights": [
          {
            "start": 742,
            "end": 751
          },
          {
            "start": 753,
            "end": 758
          }
        ],
        "explanation": {
          "title": "3 / Present and expire the timer",
          "text": "The timer stops after a win or loss, formats minutes and seconds, then clears the active selection and triggers the loss presentation on expiry."
        }
      }
    ],
    "connections": [
      {
        "id": "tier-data",
        "from": {
          "snippet": "data",
          "start": 27
        },
        "to": {
          "snippet": "select",
          "start": 293
        },
        "label": "Read the per-level time budget"
      },
      {
        "id": "time-budget",
        "from": {
          "snippet": "select",
          "start": 293
        },
        "to": {
          "snippet": "timer",
          "start": 743
        },
        "label": "Advance the selected time budget"
      }
    ]
  }
];
