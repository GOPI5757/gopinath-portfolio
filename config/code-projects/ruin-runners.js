// Exact source excerpts; line numbers refer to the supplied Unity archive. Leading indentation is removed for display.
export const blocks = [
  {
    "id": "rr-network-ticks",
    "enabled": true,
    "placeholder": false,
    "title": "Tick-based input and state exchange",
    "description": "Client-owned input is buffered and sent to the server; the server processes queued inputs and returns a state snapshot.",
    "explanationPosition": "right",
    "snippets": [
      {
        "id": "client",
        "fileName": "Network/RR_Movement.cs",
        "language": "C#",
        "startLine": 214,
        "sourcePath": "2PMultiplayer/2PMultiplayer/Assets/Scripts/Network/RR_Movement.cs",
        "code": "void HandleClientTick()\n{\n    if (!IsClient || !IsOwner) return;\n\n    var currentTick = timer.currentTick;\n    var bufferIndex = currentTick % k_bufferSize;\n\n\n    InputPayload inputPayload = new InputPayload()\n    {\n        tick = currentTick,\n        networkObjectId = NetworkObjectId,\n        inputVector = new Vector2(Input.GetKey(KeyCode.A) ? -1f : (Input.GetKey(KeyCode.D) ? 1f : 0f), 0f),\n        position = rb.position,\n        jumpRequested = jumpRequest,\n    };\n\n    clientInputBuffer.Add(inputPayload, bufferIndex);\n    SendToServerRpc(inputPayload);\n\n    StatePayload statePayload = ProcessMovement(inputPayload);\n    clientStateBuffer.Add(statePayload, bufferIndex);\n\n    // Handle Server Reconciliation\n\n    //HandleServerReconciliation();\n}",
        "highlights": [
          {
            "start": 218,
            "end": 235
          },
          {
            "start": 237,
            "end": 239
          }
        ],
        "explanation": {
          "title": "1 / Predict and store the input",
          "text": "The owning client tags input with a tick, stores it in a circular buffer and runs movement locally. The reconciliation call is commented out in this supplied revision; this excerpt deliberately preserves that fact."
        }
      },
      {
        "id": "queue",
        "fileName": "Network/RR_Movement.cs",
        "language": "C#",
        "startLine": 300,
        "sourcePath": "2PMultiplayer/2PMultiplayer/Assets/Scripts/Network/RR_Movement.cs",
        "code": "[ServerRpc]\nvoid SendToServerRpc(InputPayload input)\n{\n    serverInputQueue.Enqueue(input);\n}\n\nStatePayload ProcessMovement(InputPayload input)\n{\n    HandleMovement(input);\n\n    return new StatePayload()\n    {\n        tick = input.tick,\n        networkObjectId = input.networkObjectId,\n        position = rb.position,\n        rotation = transform.rotation,\n        velocity = rb.linearVelocity,\n        isGrounded = isGrounded\n    };\n}",
        "highlights": [
          {
            "start": 300,
            "end": 308
          },
          {
            "start": 312,
            "end": 317
          }
        ],
        "explanation": {
          "title": "2 / Queue input and build state",
          "text": "The ServerRpc enqueues the payload. ProcessMovement runs movement and packages position, rotation, velocity and grounded state."
        }
      },
      {
        "id": "server",
        "fileName": "Network/RR_Movement.cs",
        "language": "C#",
        "startLine": 187,
        "sourcePath": "2PMultiplayer/2PMultiplayer/Assets/Scripts/Network/RR_Movement.cs",
        "code": "void HandleServerTick()\n{\n    if (!IsServer) return;\n\n    var bufferIndex = -1;\n    InputPayload inputPayload = default;\n    while (serverInputQueue.Count > 0)\n    {\n        inputPayload = serverInputQueue.Dequeue();\n\n        bufferIndex = inputPayload.tick % k_bufferSize;\n\n        StatePayload statePayload = ProcessMovement(inputPayload);\n        serverStateBuffer.Add(statePayload, bufferIndex);\n    }\n\n    if (bufferIndex == -1) return;\n    SendToClientRpc(serverStateBuffer.Get(bufferIndex));\n}\n\n[ClientRpc]\nvoid SendToClientRpc(StatePayload statePayload)\n{\n    if (!IsOwner) return;\n    lastServerState = statePayload;\n}",
        "highlights": [
          {
            "start": 193,
            "end": 204
          },
          {
            "start": 208,
            "end": 211
          }
        ],
        "explanation": {
          "title": "3 / Process server ticks",
          "text": "The server consumes queued inputs, stores the resulting state by tick and returns the latest processed state to the owner."
        }
      }
    ],
    "connections": [
      {
        "id": "input-rpc",
        "from": {
          "snippet": "client",
          "start": 232
        },
        "to": {
          "snippet": "queue",
          "start": 301
        },
        "label": "Send input to the server queue"
      },
      {
        "id": "consume-input",
        "from": {
          "snippet": "queue",
          "start": 303
        },
        "to": {
          "snippet": "server",
          "start": 195
        },
        "label": "Server tick consumes queued input"
      },
      {
        "id": "simulate",
        "from": {
          "snippet": "server",
          "start": 199
        },
        "to": {
          "snippet": "queue",
          "start": 306
        },
        "label": "Build a movement state"
      }
    ]
  },
  {
    "id": "rr-relay-session",
    "enabled": true,
    "placeholder": false,
    "title": "Relay rooms and join codes",
    "description": "The multiplayer setup initializes Unity services and connects hosts and clients through Relay.",
    "explanationPosition": "right",
    "snippets": [
      {
        "id": "host",
        "fileName": "Network/RelayManager.cs",
        "language": "C#",
        "startLine": 99,
        "sourcePath": "2PMultiplayer/2PMultiplayer/Assets/Scripts/Network/RelayManager.cs",
        "code": "public async void CreateRelay()\n{\n    CreateButton.interactable = false;\n    RoomJoinButton.interactable = false;\n    RoomPanelBackButton.GetComponent<Button>().interactable = false;\n    Allocation allocation = await RelayService.Instance.CreateAllocationAsync(2);\n\n    string joinCode = await RelayService.Instance.GetJoinCodeAsync(allocation.AllocationId);\n    CodeText.text = \"Code   : \" + joinCode;\n\n    UnityTransport transport = NetworkManager.Singleton.GetComponent<UnityTransport>();\n    transport.SetHostRelayData(\n        allocation.RelayServer.IpV4,\n        (ushort)allocation.RelayServer.Port,\n        allocation.AllocationIdBytes,\n        allocation.Key,\n        allocation.ConnectionData\n    );\n\n    NetworkManager.Singleton.StartHost();\n    RoomPanel.GetComponent<Animator>().SetBool(\"can_exit\", true);\n    StartCoroutine(StartTheHost());\n}",
        "highlights": [
          {
            "start": 104,
            "end": 118
          }
        ],
        "explanation": {
          "title": "1 / Allocate and host",
          "text": "A Relay allocation yields a join code. Its connection data is assigned to UnityTransport before StartHost. Values shown here are runtime fields, not embedded service credentials."
        }
      },
      {
        "id": "join",
        "fileName": "Network/RelayManager.cs",
        "language": "C#",
        "startLine": 133,
        "sourcePath": "2PMultiplayer/2PMultiplayer/Assets/Scripts/Network/RelayManager.cs",
        "code": "public async void JoinRelay()\n{\n    try\n    {\n        JoinButton.interactable = false;\n        print(CodeField.text);\n        JoinAllocation joinAllocation = await RelayService.Instance.JoinAllocationAsync(CodeField.text.Trim().ToUpper());\n\n        UnityTransport transport = NetworkManager.Singleton.GetComponent<UnityTransport>();\n        transport.SetClientRelayData(\n            joinAllocation.RelayServer.IpV4,\n            (ushort)joinAllocation.RelayServer.Port,\n            joinAllocation.AllocationIdBytes,\n            joinAllocation.Key,\n            joinAllocation.ConnectionData,\n            joinAllocation.HostConnectionData\n        );\n\n        RDP_clientwaitMessage.SetActive(true);\n        CodeText.text = \"Code   : \" + CodeField.text.ToUpper();\n\n        if (!NetworkManager.Singleton.IsClient && !NetworkManager.Singleton.IsHost)\n        {\n            NetworkManager.Singleton.StartClient();\n            JoinPanel.GetComponent<Animator>().SetBool(\"can_exit\", true);\n            StartCoroutine(StartTheClient());\n        }",
        "highlights": [
          {
            "start": 139,
            "end": 149
          },
          {
            "start": 154,
            "end": 158
          }
        ],
        "explanation": {
          "title": "2 / Join the room",
          "text": "The entered code is trimmed and uppercased, then used to request a join allocation. The resulting Relay transport data is applied before starting the client."
        }
      }
    ],
    "connections": []
  },
  {
    "id": "rr-network-hazards",
    "enabled": true,
    "placeholder": false,
    "title": "Server-timed hazards with replicated visuals",
    "description": "A networked spike alternates states on the server while clients react to replicated values.",
    "explanationPosition": "right",
    "snippets": [
      {
        "id": "timing",
        "fileName": "ZigZagSpike.cs",
        "language": "C#",
        "startLine": 64,
        "sourcePath": "2PMultiplayer/2PMultiplayer/Assets/Scripts/ZigZagSpike.cs",
        "code": "void Update()\n{\n    if (!IsServer) return;\n\n    timer += Time.deltaTime;\n\n    if (timer > stay_time + wait_time)\n    {\n        timer = 0f; \n        is_up.Value = !is_up.Value;\n        Should_Disable_all.Value = false;\n    }\n\n    if (timer > stay_time)\n    {\n        Should_Disable_all.Value = true;\n    }\n}",
        "highlights": [
          {
            "start": 66,
            "end": 79
          }
        ],
        "explanation": {
          "title": "1 / Author the state on the server",
          "text": "Only the server advances the hazard timer. It toggles the active spike and temporarily disables both spikes between states."
        }
      },
      {
        "id": "listen",
        "fileName": "ZigZagSpike.cs",
        "language": "C#",
        "startLine": 21,
        "sourcePath": "2PMultiplayer/2PMultiplayer/Assets/Scripts/ZigZagSpike.cs",
        "code": "public override void OnNetworkSpawn()\n{\n    // Find the child objects\n    Spike_1 = transform.GetChild(0).gameObject;\n    Spike_2 = transform.GetChild(1).gameObject;\n\n    is_up.OnValueChanged += OnSpikeStateChanged;\n    Should_Disable_all.OnValueChanged += OnShouldDisableAllStateChanged;\n\n    UpdateSpikeVisuals(is_up.Value);\n}\n\npublic override void OnNetworkDespawn()\n{\n    is_up.OnValueChanged -= OnSpikeStateChanged;\n    Should_Disable_all.OnValueChanged -= OnShouldDisableAllStateChanged;\n}\n\nprivate void OnSpikeStateChanged(bool previousValue, bool newValue)\n{\n    UpdateSpikeVisuals(newValue);\n}",
        "highlights": [
          {
            "start": 27,
            "end": 30
          },
          {
            "start": 33,
            "end": 41
          }
        ],
        "explanation": {
          "title": "2 / Subscribe and clean up",
          "text": "Network spawn attaches value-change listeners; despawn removes them. The active-state callback updates visuals."
        }
      },
      {
        "id": "visuals",
        "fileName": "ZigZagSpike.cs",
        "language": "C#",
        "startLine": 58,
        "sourcePath": "2PMultiplayer/2PMultiplayer/Assets/Scripts/ZigZagSpike.cs",
        "code": "private void UpdateSpikeVisuals(bool isUp)\n{\n    Spike_1.SetActive(isUp);\n    Spike_2.SetActive(!isUp);\n}",
        "highlights": [
          {
            "start": 60,
            "end": 61
          }
        ],
        "explanation": {
          "title": "3 / Apply the state",
          "text": "The two spike objects use complementary visibility driven by the replicated flag."
        }
      }
    ],
    "connections": [
      {
        "id": "replicate-spike",
        "from": {
          "snippet": "timing",
          "start": 73
        },
        "to": {
          "snippet": "listen",
          "start": 39
        },
        "label": "Replicated state invokes the listener"
      },
      {
        "id": "apply-spike",
        "from": {
          "snippet": "listen",
          "start": 41
        },
        "to": {
          "snippet": "visuals",
          "start": 58
        },
        "label": "Update the two spike objects"
      }
    ]
  }
];
