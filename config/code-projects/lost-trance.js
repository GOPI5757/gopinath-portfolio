// Exact source excerpts; line numbers refer to the supplied Unity archive. Leading indentation is removed for display.
export const blocks = [
  {
    "id": "trance-realm-collision",
    "enabled": true,
    "placeholder": false,
    "title": "Realm changes alter the world’s collision state",
    "description": "Realm-tagged objects fade during a transition, then their colliders are enabled or disabled for the new realm.",
    "explanationPosition": "right",
    "snippets": [
      {
        "id": "data",
        "fileName": "RealmData.cs",
        "language": "C#",
        "startLine": 3,
        "sourcePath": "mask-project/mask-project/Assets/Scripts/_1/RealmData.cs",
        "code": "public class RealmData : MonoBehaviour\n{\n    public int supporting_realm;\n    public bool is_movable;\n    public bool is_trampoline;\n    public bool canFade = true;\n\n    public bool canFall = true;",
        "highlights": [
          {
            "start": 5,
            "end": 10
          }
        ],
        "explanation": {
          "title": "1 / Describe realm participation",
          "text": "Each object stores a realm index and flags for fading, movement and interaction."
        }
      },
      {
        "id": "request",
        "fileName": "RealmGameManager.cs",
        "language": "C#",
        "startLine": 399,
        "sourcePath": "mask-project/mask-project/Assets/Scripts/_1/RealmGameManager.cs",
        "code": "public void ChangeRealm(int next_Realm)\n{\n    if (HasChanged) return;\n    nextRealm = next_Realm;\n    HasChanged = true;\n}",
        "highlights": [
          {
            "start": 401,
            "end": 403
          }
        ],
        "explanation": {
          "title": "2 / Request a transition",
          "text": "A new request is ignored while a transition is already active. Otherwise it records the destination realm and starts the transition."
        }
      },
      {
        "id": "collision",
        "fileName": "RealmGameManager.cs",
        "language": "C#",
        "startLine": 269,
        "sourcePath": "mask-project/mask-project/Assets/Scripts/_1/RealmGameManager.cs",
        "code": "for (int i = 0; i < Interactables.Length; i++)\n{\n    if (Interactables[i].supporting_realm == nextRealm)\n    {\n        if (Interactables[i].canFade)\n        {\n            Interactables[i].GetComponent<Collider2D>().enabled = false;\n            for(int j = 0; j < Interactables[i].transform.childCount; j++)\n            {\n                if(Interactables[i].transform.GetChild(j).transform.gameObject.GetComponent<Collider2D>())\n                {\n                    Interactables[i].transform.GetChild(j).transform.gameObject.GetComponent<Collider2D>().enabled = false;\n                }\n            }\n        }\n    } else\n    {\n        if (Interactables[i].canFade)\n        {\n            Interactables[i].GetComponent<Collider2D>().enabled = true;\n            for (int j = 0; j < Interactables[i].transform.childCount; j++)\n            {\n                if (Interactables[i].transform.GetChild(j).transform.gameObject.GetComponent<Collider2D>())\n                {\n                    Interactables[i].transform.GetChild(j).transform.gameObject.GetComponent<Collider2D>().enabled = true;\n                }\n            }\n        }\n    }\n}\nprev_realm = currentRealm;\ncurrentRealm = nextRealm;\nnextRealm = -1;",
        "highlights": [
          {
            "start": 271,
            "end": 280
          },
          {
            "start": 286,
            "end": 300
          }
        ],
        "explanation": {
          "title": "3 / Apply collision rules",
          "text": "At transition completion, fade-enabled objects whose supporting_realm matches the destination have their colliders disabled; other participating objects are enabled. Child colliders follow the same rule."
        }
      }
    ],
    "connections": [
      {
        "id": "realm-index",
        "from": {
          "snippet": "data",
          "start": 5
        },
        "to": {
          "snippet": "collision",
          "start": 271
        },
        "label": "Per-object realm index controls collision"
      },
      {
        "id": "realm-request",
        "from": {
          "snippet": "request",
          "start": 402
        },
        "to": {
          "snippet": "collision",
          "start": 271
        },
        "label": "Compare against the requested realm"
      }
    ]
  },
  {
    "id": "trance-local-slow",
    "enabled": true,
    "placeholder": false,
    "title": "Slow selected hazards without slowing everything",
    "description": "The slow-mode toggle propagates state to falling blocks and their spawners.",
    "explanationPosition": "right",
    "snippets": [
      {
        "id": "toggle",
        "fileName": "RealmGameManager.cs",
        "language": "C#",
        "startLine": 369,
        "sourcePath": "mask-project/mask-project/Assets/Scripts/_1/RealmGameManager.cs",
        "code": "void HandleSlowToggle()\n{\n    if (currentRealm != 2 || is_toggling_slowMode) return;\n    if(Input.GetKeyDown(KeyCode.Q))\n    {\n        is_slow_Toggled = !is_slow_Toggled;\n        if(is_slow_Toggled)\n        {\n            FindFirstObjectByType<RealmPlayer>().SpawnSoundPrefab(FindFirstObjectByType<RealmPlayer>().TimeSlowSound);\n            FindFirstObjectByType<RealmPlayer>().SpawnSoundPrefab(FindFirstObjectByType<RealmPlayer>().TimeSlowLoop, true);\n        } else\n        {\n            FindFirstObjectByType<RealmPlayer>().SpawnSoundPrefab(FindFirstObjectByType<RealmPlayer>().TimeSlowRemoveSound);\n        }\n            is_toggling_slowMode = true;\n        BlockSpawner[] b_spawners = FindObjectsByType<BlockSpawner>(FindObjectsSortMode.None);\n        for(int i = 0; i < b_spawners.Length; i++)\n        {\n            b_spawners[i].is_slow = is_slow_Toggled;\n            b_spawners[i].main_time = 0f + (b_spawners[i].is_opp ? b_spawners[i].TimeBetweenSpawn / 2 : 0);\n        }\n\n        FallingBlock[] falling_blocks = FindObjectsByType<FallingBlock>(FindObjectsSortMode.None);\n        for(int i = 0; i < falling_blocks.Length; i++)\n        {\n            falling_blocks[i].is_slow = is_slow_Toggled;\n        }\n    }\n}",
        "highlights": [
          {
            "start": 371,
            "end": 374
          },
          {
            "start": 384,
            "end": 394
          }
        ],
        "explanation": {
          "title": "1 / Update affected hazards",
          "text": "The toggle is restricted to realm 2 and updates the relevant block spawners and active falling blocks."
        }
      },
      {
        "id": "fall",
        "fileName": "FallingBlock.cs",
        "language": "C#",
        "startLine": 38,
        "sourcePath": "mask-project/mask-project/Assets/Scripts/_1/FallingBlock.cs",
        "code": "    downSpeed = is_slow ? slowSpeed : normalSpeed;\n    transform.Translate(0f, downSpeed * Time.deltaTime, 0f);\n    if(transform.position.y <= DestroyPosition)\n    {\n        Destroy(gameObject);\n    }\n}",
        "highlights": [
          {
            "start": 38,
            "end": 42
          }
        ],
        "explanation": {
          "title": "2 / Choose movement speed",
          "text": "Each block chooses its slow or normal speed from the flag and still advances with ordinary delta time. This is targeted hazard slowdown, not a global time-scale change."
        }
      }
    ],
    "connections": [
      {
        "id": "slow-block",
        "from": {
          "snippet": "toggle",
          "start": 394
        },
        "to": {
          "snippet": "fall",
          "start": 38
        },
        "label": "The hazard reads the propagated slow flag"
      }
    ]
  },
  {
    "id": "trance-traversal",
    "enabled": true,
    "placeholder": false,
    "title": "Realm-gated dash and wall traversal",
    "description": "Player abilities combine realm checks with movement-state guards.",
    "explanationPosition": "right",
    "snippets": [
      {
        "id": "dash",
        "fileName": "RealmPlayer.cs",
        "language": "C#",
        "startLine": 886,
        "sourcePath": "mask-project/mask-project/Assets/Scripts/_1/RealmPlayer.cs",
        "code": "void HandleDashing()\n{\n    if (isHoldingSomething || isClicking_MS_Tab || is_swinging || RealmGameManager.instance.currentRealm != 1) return;\n    int x = Input.GetKey(KeyCode.A) ? -1 : (Input.GetKey(KeyCode.D) ? 1 : 0);\n    if(Input.GetKeyDown(KeyCode.LeftShift) && !isDashing && x != 0)\n    {\n        if(x < 0)\n        {\n            DashForce = -DashForce;\n        }\n        isDashing = true;\n        SpawnSoundPrefab(DashSound);\n        animator.SetBool(\"canDash\", true);\n        GetComponent<BoxCollider2D>().size = new Vector2(GetComponent<BoxCollider2D>().size.x, initialBoxColliderX_Size / 2);\n        rb.gravityScale = 0f;\n        rb.linearVelocityY = 0f;\n    }\n\n    if(isDashing)\n    {\n        float t = DashElapsedTime / DashResetTime;\n        DashForceDynamic = Mathf.Lerp(DashForce, 0, t);\n        DashElapsedTime += Time.unscaledDeltaTime;\n        if(t >= 1)\n        {\n            is_dashOver = true;\n            DashForce = Mathf.Abs(DashForce);\n            rb.gravityScale = initialGravityScale;\n            isDashing = false;\n            DashElapsedTime = 0f;\n        }\n    }\n}",
        "highlights": [
          {
            "start": 888,
            "end": 901
          },
          {
            "start": 906,
            "end": 915
          }
        ],
        "explanation": {
          "title": "1 / Dash in the permitted realm",
          "text": "The dash rejects conflicting actions, sets animation and collider state, and eases its force down using unscaled time before restoring gravity."
        }
      },
      {
        "id": "wall",
        "fileName": "RealmPlayer.cs",
        "language": "C#",
        "startLine": 584,
        "sourcePath": "mask-project/mask-project/Assets/Scripts/_1/RealmPlayer.cs",
        "code": "void HandleWallJump()\n{\n    if (!is_wall) return;\n    wall_time += Time.deltaTime;\n    if (wall_time >= wall_friction_time)\n    {\n        canHoldWall = false;\n        rb.gravityScale = initialGravityScale;\n    }\n    else\n    {\n        if (Input.GetKeyDown(KeyCode.Space))\n        {\n            int multiplier = Input.GetKey(KeyCode.A) ? -1 : Input.GetKey(KeyCode.D) ? 1 : 0;\n            rb.AddForce(new Vector2(wall_jumpForce.x * multiplier, wall_jumpForce.y), ForceMode2D.Impulse);\n            rb.gravityScale = initialGravityScale;\n            space_clicked = false;\n            wall_time = 0f;\n        }\n    }\n}",
        "highlights": [
          {
            "start": 586,
            "end": 601
          }
        ],
        "explanation": {
          "title": "2 / Jump away from a wall",
          "text": "A wall-hold timer limits the jump window. Input selects horizontal impulse direction while the jump restores normal gravity."
        }
      }
    ],
    "connections": []
  },
  {
    "id": "trance-swing",
    "enabled": true,
    "placeholder": false,
    "title": "Attach the player to a physics swing",
    "description": "The player first moves to the swing position, then adds a configured DistanceJoint2D.",
    "explanationPosition": "right",
    "snippets": [
      {
        "id": "approach",
        "fileName": "RealmPlayer.cs",
        "language": "C#",
        "startLine": 963,
        "sourcePath": "mask-project/mask-project/Assets/Scripts/_1/RealmPlayer.cs",
        "code": "void HandleSwinging()\n{\n    animator.SetBool(\"canSwing\", is_swinging);\n    if(is_insideSwingBounds)\n    {\n        if(Input.GetMouseButtonDown(1))\n        {\n            canSwing = true;\n            swing_player_startPos = transform.position;\n            swing_bar_pos = new Vector2(SwingBarObject.transform.position.x, SwingBarObject.transform.position.y - swingbarOffset);\n            rb.gravityScale = 0f;\n        }\n    }\n\n    if(canSwing)\n    {\n        float t = swing_elapsedTime / swing_lerpTime;\n        Vector3 newPlayerPos = Vector3.Lerp(swing_player_startPos, swing_bar_pos, t);\n        swing_elapsedTime += Time.deltaTime;\n        transform.position = newPlayerPos;",
        "highlights": [
          {
            "start": 968,
            "end": 982
          }
        ],
        "explanation": {
          "title": "1 / Approach the bar",
          "text": "Right-click within the swing bounds captures the start and bar positions, disables gravity and interpolates toward the attachment position."
        }
      },
      {
        "id": "joint",
        "fileName": "RealmPlayer.cs",
        "language": "C#",
        "startLine": 983,
        "sourcePath": "mask-project/mask-project/Assets/Scripts/_1/RealmPlayer.cs",
        "code": "if (t >= 1)\n{\n    is_swinging = true;\n    is_insideSwingBounds = false;\n    canSwing = false;\n    swing_elapsedTime = 0f;\n    DJ_2D = transform.AddComponent<DistanceJoint2D>();\n    DJ_2D.anchor = new Vector2(anchorX_offset, anchorY_offset);\n    DJ_2D.connectedAnchor = new Vector2(swing_bar_pos.x, (swing_bar_pos.y + swingbarOffset) - connectedAnchorY_offset);\n    transform.GetChild(0).transform.localPosition = swingSpritePosition;\n    DJ_2D.autoConfigureDistance = false;\n    DJ_2D.distance = swing_distance;\n    DJ_2D.enableCollision = true;\n    rb.gravityScale = initialGravityScale;\n    rb.linearVelocity = new Vector2(rb.linearVelocityX / 3, rb.linearVelocityY / 3);\n}",
        "highlights": [
          {
            "start": 989,
            "end": 997
          }
        ],
        "explanation": {
          "title": "2 / Create the joint",
          "text": "Once aligned, the player enters swing state, configures the joint anchors and distance, restores gravity and reduces the incoming velocity."
        }
      }
    ],
    "connections": [
      {
        "id": "attach-swing",
        "from": {
          "snippet": "approach",
          "start": 982
        },
        "to": {
          "snippet": "joint",
          "start": 983
        },
        "label": "Attach after the approach completes"
      }
    ]
  }
];
