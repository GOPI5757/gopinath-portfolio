// Exact source excerpts; line numbers refer to the supplied Unity archive. Leading indentation is removed for display.
export const blocks = [
  {
    "id": "dig-surface-mesh",
    "enabled": true,
    "layout": "stacked",
    "placeholder": false,
    "title": "Digging updates an exposed-face mesh",
    "description": "Sand is stored in a chunk grid. Breaking a cell changes its type, then rebuilds the visible surface and collider. These excerpts show the actual rebuild path.",
    "explanationPosition": "right",
    "snippets": [
      {
        "id": "damage",
        "fileName": "Grid/Chunk.cs",
        "language": "C#",
        "maxHeight": "24rem", // Individual code area height; long excerpts scroll vertically.
        "startLine": 337,
        "sourcePath": "DiggingGame/DiggingGame/Assets/Scripts/Grid/Chunk.cs",
        "code": "public void ReduceStrength(Vector3Int coord, int value)\n{\n    if (block_Datas[coord.x, coord.y, coord.z].blockType != BlockType.Sand) return;\n    int sandValueBef = block_Datas[coord.x, coord.y, coord.z].strength;\n\n    block_Datas[coord.x, coord.y, coord.z].strength -= value;\n    block_Datas[coord.x, coord.y, coord.z].strength = Mathf.Clamp(\n        block_Datas[coord.x, coord.y, coord.z].strength,\n        0,\n        block_Datas[coord.x, coord.y, coord.z].maxStrength\n    );\n\n    int sandValueAft = block_Datas[coord.x, coord.y, coord.z].strength;\n\n    BackpackDelegate.Raise(sandValueBef - sandValueAft);\n    EventBus<QuestProgressEvent>.Raise(new QuestProgressEvent(QuestType.Dig, sandValueBef - sandValueAft));\n\n    if (block_Datas[coord.x, coord.y, coord.z].strength == 0)\n    {\n        BlockBreakDelegate.Raise(chunkSize.y, coord.y);\n        block_Datas[coord.x, coord.y, coord.z].blockType = BlockType.Air;\n        GenerateMesh();\n    }\n}",
        "highlights": [
          {
            "start": 342,
            "end": 347
          },
          {
            "start": 354,
            "end": 358
          }
        ],
        "explanation": {
          "title": "1 / Apply damage",
          "text": "Strength is clamped, actual removed strength is sent to the backpack and quests, and a depleted cell becomes air."
        }
      },
      {
        "id": "rebuild",
        "fileName": "Grid/Chunk.cs",
        "language": "C#",
        "maxHeight": "24rem", // Individual code area height; long excerpts scroll vertically.
        "startLine": 315,
        "sourcePath": "DiggingGame/DiggingGame/Assets/Scripts/Grid/Chunk.cs",
        "code": "private void UpdateMesh()\n{\n    if (mesh == null) return;\n\n    mesh.Clear();\n\n    mesh.vertices = vertices.ToArray();\n    mesh.triangles = triangles.ToArray();\n    mesh.RecalculateNormals();\n\n    meshRenderer.material = sandMat;\n    meshCollider.sharedMesh = null;\n    meshCollider.sharedMesh = mesh;\n}\n\nprivate void GenerateMesh(bool flag = false)\n{\n    if (flag) PrepareBlockData();\n    CreateShape();\n    UpdateMesh();\n}",
        "highlights": [
          {
            "start": 321,
            "end": 327
          },
          {
            "start": 330,
            "end": 335
          }
        ],
        "explanation": {
          "title": "2 / Rebuild rendering and collision",
          "text": "GenerateMesh calls CreateShape and UpdateMesh. The latter replaces vertices and triangles, recalculates normals and refreshes the MeshCollider."
        }
      },
      {
        "id": "surface",
        "fileName": "Grid/Chunk.cs",
        "language": "C#",
        "maxHeight": "24rem", // Individual code area height; long excerpts scroll vertically.
        "startLine": 266,
        "sourcePath": "DiggingGame/DiggingGame/Assets/Scripts/Grid/Chunk.cs",
        "code": "if (block_Datas[i, j, k].blockType == BlockType.Sand)\n{\n    for(int l = 0; l < 6; l++)\n    {\n        Vector3Int neighbour = block_Datas[i, j, k].coord + boundCheckVector[l];\n        bool flag = true;\n        if (CheckBounds(neighbour))\n        {\n            flag = IsCoordFree(neighbour);\n        }\n\n        if(flag)\n        {\n            for(int p = 0; p < 4; p++)\n            {\n                vertices.Add(block_Datas[i, j, k].localPos + vertexData[l, p]);\n            }\n\n            for(int m = 0; m < 6; m++)\n            {\n                triangles.Add((vertices.Count - 4) + triangleData[m]);\n            }\n        }",
        "highlights": [
          {
            "start": 270,
            "end": 275
          },
          {
            "start": 277,
            "end": 286
          }
        ],
        "explanation": {
          "title": "3 / Emit exposed faces",
          "text": "For each sand cell, the six neighbouring coordinates decide whether a face is emitted. A visible face adds four vertices and six triangle indices. This is face culling, not greedy meshing."
        }
      }
    ],
    "connections": [
      {
        "id": "break-rebuild",
        "from": {
          "snippet": "damage",
          "start": 358
        },
        "to": {
          "snippet": "rebuild",
          "start": 330
        },
        "label": "A broken block rebuilds the chunk"
      },
      {
        "id": "build-faces",
        "from": {
          "snippet": "rebuild",
          "start": 333
        },
        "to": {
          "snippet": "surface",
          "start": 270
        },
        "label": "CreateShape tests neighbouring cells"
      }
    ]
  },
  {
    "id": "dig-quest-events",
    "enabled": true,
    "layout": "stacked",
    "placeholder": false,
    "title": "Mining progress flows through typed events",
    "description": "A generic event channel lets digging report quest progress without owning the quest UI.",
    "explanationPosition": "right",
    "snippets": [
      {
        "id": "publish",
        "fileName": "Grid/Chunk.cs",
        "language": "C#",
        "maxHeight": "24rem", // Individual code area height; long excerpts scroll vertically.
        "startLine": 349,
        "sourcePath": "DiggingGame/DiggingGame/Assets/Scripts/Grid/Chunk.cs",
        "code": "int sandValueAft = block_Datas[coord.x, coord.y, coord.z].strength;\n\nBackpackDelegate.Raise(sandValueBef - sandValueAft);\nEventBus<QuestProgressEvent>.Raise(new QuestProgressEvent(QuestType.Dig, sandValueBef - sandValueAft));\n\nif (block_Datas[coord.x, coord.y, coord.z].strength == 0)\n{\n    BlockBreakDelegate.Raise(chunkSize.y, coord.y);\n    block_Datas[coord.x, coord.y, coord.z].blockType = BlockType.Air;\n    GenerateMesh();\n}",
        "highlights": [
          {
            "start": 351,
            "end": 352
          }
        ],
        "explanation": {
          "title": "1 / Publish the amount mined",
          "text": "The event carries the Dig quest type and the amount of strength removed by this hit."
        }
      },
      {
        "id": "bus",
        "fileName": "Delegates/EventBus.cs",
        "language": "C#",
        "maxHeight": "24rem", // Individual code area height; long excerpts scroll vertically.
        "startLine": 1,
        "sourcePath": "DiggingGame/DiggingGame/Assets/Scripts/Delegates/EventBus.cs",
        "code": "namespace DiggingGame.Delegates\n{\n    public static class EventBus<T>\n    {\n        public delegate void Event(T args);\n        public static Event OnEvent;\n\n        public static void Raise(T args) => OnEvent?.Invoke(args);\n    }\n}",
        "highlights": [
          {
            "start": 3,
            "end": 8
          }
        ],
        "explanation": {
          "title": "2 / Dispatch a typed payload",
          "text": "EventBus<T> exposes a separate event channel for each payload type. Raise invokes current listeners when any are registered."
        }
      },
      {
        "id": "quest",
        "fileName": "Areas/QuestManager.cs",
        "language": "C#",
        "maxHeight": "24rem", // Individual code area height; long excerpts scroll vertically.
        "startLine": 263,
        "sourcePath": "DiggingGame/DiggingGame/Assets/Scripts/Areas/QuestManager.cs",
        "code": "private void OnQuestProgressEvent(QuestProgressEvent evt)\n{\n    for(int i = 0; i < current_quests.Count; i++)\n    {\n        if (current_quests[i].quest_type == evt.type)\n        {\n            if (!current_quests[i].IsCompleted)\n            {\n                int newValue = current_quests[i].CurrentValue + evt.valueUpdate;\n                bool isCompleted = false;\n                if(newValue >= current_quests[i].MaxValue)\n                {\n                    newValue = current_quests[i].MaxValue;\n                    isCompleted = true;\n\n                    questTitles_ig[i].color = quest_finishedColor;\n                    completedQuests.Add(current_quests[i]);\n                }\n\n                current_quests[i] = new Quests(\n                    current_quests[i].quest_type, \n                    current_quests[i].QuestTitle, \n                    newValue, \n                    current_quests[i].MaxValue, \n                    isCompleted,\n                    current_quests[i].reward,\n                    false\n                );\n            }\n        }\n    }\n\n    UpdateQuestUI();\n}",
        "highlights": [
          {
            "start": 267,
            "end": 279
          },
          {
            "start": 295,
            "end": 295
          }
        ],
        "explanation": {
          "title": "3 / Advance matching quests",
          "text": "The listener updates unfinished quests of the matching type, caps progress at the target, records completions and refreshes the UI. Start and OnDestroy subscribe and unsubscribe this listener."
        }
      }
    ],
    "connections": [
      {
        "id": "publish-event",
        "from": {
          "snippet": "publish",
          "start": 352
        },
        "to": {
          "snippet": "bus",
          "start": 8
        },
        "label": "Publish QuestProgressEvent"
      },
      {
        "id": "quest-listener",
        "from": {
          "snippet": "bus",
          "start": 8
        },
        "to": {
          "snippet": "quest",
          "start": 263
        },
        "label": "Registered quest listener receives the payload"
      }
    ]
  },
  {
    "id": "dig-depth-activation",
    "enabled": true,
    "layout": "stacked",
    "placeholder": false,
    "title": "Depth-based chunk activation",
    "description": "A depth-change event controls which chunk objects and their chests stay active around the player.",
    "explanationPosition": "right",
    "snippets": [
      {
        "id": "subscription",
        "fileName": "Grid/GridManager.cs",
        "language": "C#",
        "maxHeight": "24rem", // Individual code area height; long excerpts scroll vertically.
        "startLine": 31,
        "sourcePath": "DiggingGame/DiggingGame/Assets/Scripts/Grid/GridManager.cs",
        "code": "void Start()\n{\n    DepthChangeDelegate.OnEvent += UpdateChunkObjects;\n    SpawnChunk();\n}\n\nprivate void OnDestroy()\n{\n    DepthChangeDelegate.OnEvent -= UpdateChunkObjects;\n}",
        "highlights": [
          {
            "start": 33,
            "end": 34
          },
          {
            "start": 39,
            "end": 39
          }
        ],
        "explanation": {
          "title": "1 / Listen for depth changes",
          "text": "The grid subscribes while active in the scene and removes the listener when destroyed."
        }
      },
      {
        "id": "activation",
        "fileName": "Grid/GridManager.cs",
        "language": "C#",
        "maxHeight": "24rem", // Individual code area height; long excerpts scroll vertically.
        "startLine": 67,
        "sourcePath": "DiggingGame/DiggingGame/Assets/Scripts/Grid/GridManager.cs",
        "code": "private void UpdateChunkObjects(int currentDepth, Vector3 playerPosition)\n{\n    for(int i = 0; i < chunkObjects.Count; i++)\n    {\n        int depthDistance = Mathf.Abs(currentDepth - Mathf.FloorToInt(chunkObjects[i].transform.position.y));\n        if(depthDistance > maxDepthDistance)\n        {\n            HandleChunkActivation(chunkObjects[i], false);\n        } else\n        {\n            HandleChunkActivation(chunkObjects[i], true);\n        }\n    }\n}\n\nprivate void HandleChunkActivation(GameObject chunkObj, bool is_active)\n{\n    Chunk chunkScript = chunkObj.GetComponent<Chunk>();\n    if (chunkScript != null)\n    {\n        chunkScript.HandleChestObjects(is_active);\n        chunkObj.SetActive(is_active);\n    }\n}",
        "highlights": [
          {
            "start": 71,
            "end": 77
          },
          {
            "start": 87,
            "end": 88
          }
        ],
        "explanation": {
          "title": "2 / Activate nearby chunks",
          "text": "The absolute distance from player depth is compared with a configured limit. Both chunk objects and associated chest visibility are updated. Chunks are pre-created, so this is activation management rather than on-demand streaming."
        }
      }
    ],
    "connections": [
      {
        "id": "depth-event",
        "from": {
          "snippet": "subscription",
          "start": 33
        },
        "to": {
          "snippet": "activation",
          "start": 67
        },
        "label": "Depth changes update chunk activation"
      }
    ]
  },
  {
    "id": "dig-machine-queue",
    "enabled": true,
    "layout": "stacked",
    "placeholder": false,
    "title": "Timed processing queues and claim callbacks",
    "description": "The mortar machine tracks each processing job independently, then hands a claim callback to its UI slot.",
    "explanationPosition": "right",
    "snippets": [
      {
        "id": "timer",
        "fileName": "Areas/Machines/MortarMachine.cs",
        "language": "C#",
        "maxHeight": "24rem", // Individual code area height; long excerpts scroll vertically.
        "startLine": 351,
        "sourcePath": "DiggingGame/DiggingGame/Assets/Scripts/Areas/Machines/MortarMachine.cs",
        "code": "private void HandleQueues()\n{\n    for(int i = 0; i < queues.Count; i++)\n    {\n        if(queues[i].QS_script.GetCanStartTimer())\n        {\n            if (queues[i].Duration > 0)\n            {\n                float duration = queues[i].Duration;\n                duration -= Time.deltaTime;\n                queues[i] = new QueueDetails(queues[i].QueueObject, queues[i].QS_script, duration, \n                    queues[i].HasClaimed, queues[i].ElapsedTime, queues[i].CurrentPos, queues[i].TargetPos);\n\n                if(queues[i].QS_script != null)\n                {\n                    queues[i].QS_script.UpdateTimerText(duration);\n                }\n\n            } else\n            {\n                queues[i] = new QueueDetails(queues[i].QueueObject, queues[i].QS_script, queues[i].Duration, true,\n                    queues[i].ElapsedTime, queues[i].CurrentPos, queues[i].TargetPos);\n                if (queues[i].QS_script != null)\n                {\n                    queues[i].QS_script.UpdateStatus(\"COMPLETED\");\n                    queues[i].QS_script.SetCanClaim(this, i);\n                }\n            }\n        }\n    }\n}",
        "highlights": [
          {
            "start": 355,
            "end": 366
          },
          {
            "start": 371,
            "end": 376
          }
        ],
        "explanation": {
          "title": "1 / Advance processing jobs",
          "text": "Each enabled job counts down using delta time. Finished jobs show a completed state and receive the machine and queue index for claiming."
        }
      },
      {
        "id": "slot",
        "fileName": "UI/QueueSlot.cs",
        "language": "C#",
        "maxHeight": "24rem", // Individual code area height; long excerpts scroll vertically.
        "startLine": 79,
        "sourcePath": "DiggingGame/DiggingGame/Assets/Scripts/UI/QueueSlot.cs",
        "code": "public void SetCanMoveDown(bool value) { canMoveDown = value; }\n\npublic bool GetCanMoveDown() { return canMoveDown; }\npublic bool GetCanStartTimer() { return canStartTimer; }\n\npublic void SetCanClaim(IMachine machine, int index) { \n    this.machine = machine;\n    queueIndex = index;\n    animator.SetBool(\"canShowClaim\", true);\n}",
        "highlights": [
          {
            "start": 84,
            "end": 87
          }
        ],
        "explanation": {
          "title": "2 / Bind the claim destination",
          "text": "The slot stores an IMachine reference and queue index, then reveals its claim control."
        }
      },
      {
        "id": "claim",
        "fileName": "UI/QueueSlot.cs",
        "language": "C#",
        "maxHeight": "24rem", // Individual code area height; long excerpts scroll vertically.
        "startLine": 40,
        "sourcePath": "DiggingGame/DiggingGame/Assets/Scripts/UI/QueueSlot.cs",
        "code": "public void DestroyObject()\n{\n    machine.Claim(queueIndex);\n    Destroy(gameObject);\n}",
        "highlights": [
          {
            "start": 42,
            "end": 43
          }
        ],
        "explanation": {
          "title": "3 / Dispatch the claim",
          "text": "When the slot closes, it delegates the claim to the stored machine before destroying its UI object."
        }
      }
    ],
    "connections": [
      {
        "id": "bind-claim",
        "from": {
          "snippet": "timer",
          "start": 376
        },
        "to": {
          "snippet": "slot",
          "start": 84
        },
        "label": "Pass the machine and queue index"
      },
      {
        "id": "dispatch-claim",
        "from": {
          "snippet": "slot",
          "start": 85
        },
        "to": {
          "snippet": "claim",
          "start": 42
        },
        "label": "Stored machine receives Claim"
      }
    ]
  },
  {
    "id": "dig-treasure-timing",
    "enabled": true,
    "layout": "stacked",
    "placeholder": false,
    "title": "A timing challenge unlocks treasure",
    "description": "A moving pointer and randomized safe zone produce the chest-opening interaction.",
    "explanationPosition": "right",
    "snippets": [
      {
        "id": "motion",
        "fileName": "Grid/ChestOpen.cs",
        "language": "C#",
        "maxHeight": "24rem", // Individual code area height; long excerpts scroll vertically.
        "startLine": 268,
        "sourcePath": "DiggingGame/DiggingGame/Assets/Scripts/Grid/ChestOpen.cs",
        "code": "private void HandleTreasureMiniGame()\n{\n    if (!canPlayMiniGame || hasGamePassed) return;\n    RandomizeSafezonePosition();\n\n    float t = pointerElapsedTime / pointerMoveTime;\n    float new_y = Mathf.Lerp(currentPointerY, isUp ? mg_pointAPos.y : mg_pointBPos.y, t);\n    pointerTransform.localPosition = new Vector3(\n        pointerTransform.localPosition.x,\n        new_y,\n        pointerTransform.localPosition.z\n    );\n\n    pointerElapsedTime += Time.deltaTime;\n\n    if (t >= 1)\n    {\n        isUp = !isUp;\n        currentPointerY = pointerTransform.localPosition.y;\n        pointerElapsedTime = 0f;\n    }\n}",
        "highlights": [
          {
            "start": 271,
            "end": 274
          },
          {
            "start": 283,
            "end": 287
          }
        ],
        "explanation": {
          "title": "1 / Animate the pointer",
          "text": "The pointer interpolates between two endpoints, reverses at the end and stops when the attempt passes."
        }
      },
      {
        "id": "success",
        "fileName": "Grid/ChestOpen.cs",
        "language": "C#",
        "maxHeight": "24rem", // Individual code area height; long excerpts scroll vertically.
        "startLine": 239,
        "sourcePath": "DiggingGame/DiggingGame/Assets/Scripts/Grid/ChestOpen.cs",
        "code": "private void HandlePointerDetection()\n{\n    if (!canOpenChest || hasGamePassed) return;\n    if(Keyboard.current.spaceKey.wasPressedThisFrame)\n    {\n        Vector3 safeZonePos = new Vector3(\n            safeZone.localPosition.y + (safeZone.sizeDelta.y / 2),\n            safeZone.localPosition.y,\n            safeZone.localPosition.y - (safeZone.sizeDelta.y / 2)\n        );\n\n        Vector3 pointerPos = new Vector3(\n            pointerTransform.localPosition.y + (pointerTransform.sizeDelta.y / 2),\n            pointerTransform.localPosition.y,\n            pointerTransform.localPosition.y - (pointerTransform.sizeDelta.y / 2)\n        );\n\n        if((pointerPos.x > safeZonePos.z && pointerPos.x < safeZonePos.x) || \n            (pointerPos.z < safeZonePos.x && pointerPos.z > safeZonePos.z))\n        {\n            hasGamePassed = true;\n            EventBus<MG_GamePassedEvent>.Raise(new MG_GamePassedEvent(\n                false, false, chestObjTemp, keyIndices[currentMiniGameIndex], currentKeyPositionIndex, keyPositionsLength));\n            currentKeyPositionIndex += keyIndices[currentMiniGameIndex++];\n            UpdateTotalMiniGameText();\n        }\n    }\n}",
        "highlights": [
          {
            "start": 242,
            "end": 242
          },
          {
            "start": 256,
            "end": 263
          }
        ],
        "explanation": {
          "title": "2 / Check the attempt",
          "text": "A Space press compares the pointer edges with the safe-zone bounds. Successful attempts publish a minigame event and advance key progress."
        }
      }
    ],
    "connections": []
  }
];
