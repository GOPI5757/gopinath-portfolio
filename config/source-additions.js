// Additional source-backed technical content; existing project content is preserved.
export const sourceAdditions = {
  "digging-game": {
    "technicalBlocks": [
      {
        "id": "source-dig-surface-mesh",
        "enabled": true,
        "title": "Digging updates an exposed-face mesh",
        "description": "Implemented chunk-local face culling: each sand cell checks six neighbours and only exposed faces contribute vertices and triangle indices. A depleted cell becomes air and triggers a mesh and collider rebuild. The supplied version rebuilds the affected chunk; it does not use greedy meshing or claim measured frame-rate gains.",
        "layout": "image-right",
        "images": [
          {
            "id": "source-mining-hit",
            "enabled": true,
            "src": "assets/images/projects/digging-game/gameplay/mining-hit.webp",
            "alt": "Mining a sand cell with the current tool",
            "caption": "Mining a sand cell with the current tool"
          }
        ]
      },
      {
        "id": "source-dig-quest-events",
        "enabled": true,
        "title": "Mining progress flows through typed events",
        "description": "A generic event channel lets digging report quest progress without owning the quest UI.",
        "layout": "image-right",
        "images": []
      },
      {
        "id": "source-dig-depth-activation",
        "enabled": true,
        "title": "Depth-based chunk activation",
        "description": "A depth-change event controls which chunk objects and their chests stay active around the player.",
        "layout": "image-right",
        "images": []
      },
      {
        "id": "source-dig-machine-queue",
        "enabled": true,
        "title": "Timed processing queues and claim callbacks",
        "description": "The mortar machine tracks each processing job independently, then hands a claim callback to its UI slot.",
        "layout": "image-right",
        "images": [
          {
            "id": "source-mortar-processing",
            "enabled": true,
            "src": "assets/images/projects/digging-game/gameplay/mortar-processing.webp",
            "alt": "Mortar processing interface and inventory",
            "caption": "Mortar processing interface and inventory"
          }
        ]
      },
      {
        "id": "source-dig-treasure-timing",
        "enabled": true,
        "title": "A timing challenge unlocks treasure",
        "description": "Implemented a chest timing challenge with an oscillating UI pointer, a randomized safe zone and event-driven key progression. Success dispatches MG_GamePassedEvent to coordinate the chest and its UI; tuning remains in the project’s serialized values.",
        "layout": "image-right",
        "images": [
          {
            "id": "source-rare-chest",
            "enabled": true,
            "src": "assets/images/projects/digging-game/gameplay/rare-chest.webp",
            "alt": "A rare chest exposed inside the digging area",
            "caption": "A rare chest exposed inside the digging area"
          }
        ]
      }
    ],
    "images": [
      {
        "id": "source-mining-hit",
        "enabled": true,
        "src": "assets/images/projects/digging-game/gameplay/mining-hit.webp",
        "alt": "Mining a sand cell with the current tool",
        "caption": "Mining a sand cell with the current tool"
      },
      {
        "id": "source-rare-chest",
        "enabled": true,
        "src": "assets/images/projects/digging-game/gameplay/rare-chest.webp",
        "alt": "A rare chest exposed inside the digging area",
        "caption": "A rare chest exposed inside the digging area"
      },
      {
        "id": "source-mortar-processing",
        "enabled": true,
        "src": "assets/images/projects/digging-game/gameplay/mortar-processing.webp",
        "alt": "Mortar processing interface and inventory",
        "caption": "Mortar processing interface and inventory"
      }
    ]
  },
  "ruin-runners": {
    "technicalBlocks": [
      {
        "id": "source-rr-network-ticks",
        "enabled": true,
        "title": "Tick-based input and state exchange",
        "description": "Built a tick-driven network movement experiment with serialized input/state payloads, circular history buffers, client-side movement and server input processing. The source also contains rewind/replay reconciliation methods, but their call is disabled in this revision; active reconciliation or production latency guarantees are not claimed.",
        "layout": "image-right",
        "images": []
      },
      {
        "id": "source-rr-relay-session",
        "enabled": true,
        "title": "Relay rooms and join codes",
        "description": "Implemented host creation and join-code entry with Unity Authentication, Relay allocations and UnityTransport configuration. The lobby exposes player count and enables the host’s start control once two players are present.",
        "layout": "image-right",
        "images": []
      },
      {
        "id": "source-rr-network-hazards",
        "enabled": true,
        "title": "Server-timed hazards with replicated visuals",
        "description": "A networked spike alternates states on the server while clients react to replicated values.",
        "layout": "image-right",
        "images": []
      }
    ],
    "images": []
  },
  "ball-bashers": {
    "technicalBlocks": [
      {
        "id": "source-bb-hit-speed",
        "enabled": true,
        "title": "Hit detection drives ball acceleration",
        "description": "Bat raycasts resolve a hit and delegate ball-speed changes to the ball component.",
        "layout": "image-right",
        "images": [
          {
            "id": "source-arena-recording",
            "enabled": true,
            "src": "assets/images/projects/ball-bashers/gameplay/arena-recording.webp",
            "alt": "Ball Bashers arena from the supplied recording",
            "caption": "Ball Bashers arena from the supplied recording"
          }
        ]
      },
      {
        "id": "source-bb-match-timer",
        "enabled": true,
        "title": "Match state and timed results",
        "description": "The match timer updates its UI and transitions to the post-game presentation when time expires.",
        "layout": "image-right",
        "images": []
      }
    ],
    "images": [
      {
        "id": "source-arena-recording",
        "enabled": true,
        "src": "assets/images/projects/ball-bashers/gameplay/arena-recording.webp",
        "alt": "Ball Bashers arena from the supplied recording",
        "caption": "Ball Bashers arena from the supplied recording"
      }
    ]
  },
  "two-player-tag": {
    "technicalBlocks": [
      {
        "id": "source-tag-transfer",
        "enabled": true,
        "title": "Contact transfers the tag",
        "description": "Collision state separates tag transfer from continued overlap between players.",
        "layout": "image-right",
        "images": []
      },
      {
        "id": "source-tag-shared-camera",
        "enabled": true,
        "title": "A shared camera follows both players",
        "description": "Implemented shared-screen framing using average player position, vertical camera limits and distance-based orthographic zoom. The game also provides randomized spawn points, a timed round, paired teleporters and score presentation; these systems are separate from the online networking used in Ruin Runners.",
        "layout": "image-right",
        "images": []
      }
    ],
    "images": []
  },
  "tower-of-hanoi": {
    "technicalBlocks": [
      {
        "id": "source-hanoi-valid-moves",
        "enabled": true,
        "title": "Validate disc placement before counting a move",
        "description": "The drop handler checks the destination stack and restores invalid placements.",
        "layout": "image-right",
        "images": []
      },
      {
        "id": "source-hanoi-scramble",
        "enabled": true,
        "title": "Generate puzzles with legal disc moves",
        "description": "Created randomized starting layouts by applying legal disc transfers to an initialized stack. Each transfer updates transform-derived tower lists, while the interactive drop handler enforces the same smaller-on-larger rule. This provides reversible puzzle states without claiming an optimal solver or a measured difficulty score.",
        "layout": "image-right",
        "images": []
      }
    ],
    "images": []
  },
  "ben-3": {
    "technicalBlocks": [
      {
        "id": "source-ben-ability-selection",
        "enabled": true,
        "title": "Ability selection gates movement options",
        "description": "The selector keeps at most one unlocked ability active, and the player dispatches the corresponding action.",
        "layout": "image-right",
        "images": []
      },
      {
        "id": "source-ben-wire-puzzle",
        "enabled": true,
        "title": "Wire swapping updates visuals and puzzle state",
        "description": "A wire puzzle moves the chosen pair and commits the logical swap when animation reaches its destination.",
        "layout": "image-right",
        "images": []
      },
      {
        "id": "source-ben-memory-puzzle",
        "enabled": true,
        "title": "Memory sequences validate partial input",
        "description": "The sequence puzzle checks each player input against the expected order before advancing the round.",
        "layout": "image-right",
        "images": []
      }
    ],
    "images": []
  },
  "bubble-parkour": {
    "technicalBlocks": [
      {
        "id": "source-bubble-slide",
        "enabled": true,
        "title": "A timed slide links movement and camera animation",
        "description": "The player enters a slide only under the configured movement and ground-state conditions.",
        "layout": "image-right",
        "images": []
      },
      {
        "id": "source-bubble-wall-contact",
        "enabled": true,
        "title": "Wall contacts control movement and camera tilt",
        "description": "Connected wall-contact sensors to directional movement restrictions, gravity changes and camera tilt. Separate slope triggers set a slope-traversal flag and camera animation. These excerpts document the supplied prototype implementation, without presenting it as a general-purpose parkour controller.",
        "layout": "image-right",
        "images": []
      }
    ],
    "images": []
  },
  "lost-trance": {
    "technicalBlocks": [
      {
        "id": "source-trance-realm-collision",
        "enabled": true,
        "title": "Realm changes alter the world’s collision state",
        "description": "Realm-tagged objects fade during a transition, then their colliders are enabled or disabled for the new realm.",
        "layout": "image-right",
        "images": [
          {
            "id": "source-red-realm-traversal",
            "enabled": true,
            "src": "assets/images/projects/lost-trance/gameplay/red-realm-traversal.webp",
            "alt": "Red realm traversal and obstacles",
            "caption": "Red realm traversal and obstacles"
          }
        ]
      },
      {
        "id": "source-trance-local-slow",
        "enabled": true,
        "title": "Slow selected hazards without slowing everything",
        "description": "The slow-mode toggle propagates state to falling blocks and their spawners.",
        "layout": "image-right",
        "images": [
          {
            "id": "source-blue-realm-platforms",
            "enabled": true,
            "src": "assets/images/projects/lost-trance/gameplay/blue-realm-platforms.webp",
            "alt": "Platform traversal in the blue realm",
            "caption": "Platform traversal in the blue realm"
          }
        ]
      },
      {
        "id": "source-trance-traversal",
        "enabled": true,
        "title": "Realm-gated dash and wall traversal",
        "description": "Implemented realm-gated movement including dash, double-jump availability, wall jumping and staged wall climbing. Dash temporarily alters collider/gravity state and decays over an unscaled timer; wall jumping is bounded by a wall-hold window.",
        "layout": "image-right",
        "images": [
          {
            "id": "source-yellow-realm-dash",
            "enabled": true,
            "src": "assets/images/projects/lost-trance/gameplay/yellow-realm-dash.webp",
            "alt": "Dashing across the yellow realm",
            "caption": "Dashing across the yellow realm"
          }
        ]
      },
      {
        "id": "source-trance-swing",
        "enabled": true,
        "title": "Attach the player to a physics swing",
        "description": "The player first moves to the swing position, then adds a configured DistanceJoint2D.",
        "layout": "image-right",
        "images": [
          {
            "id": "source-swing-joint",
            "enabled": true,
            "src": "assets/images/projects/lost-trance/gameplay/swing-joint.webp",
            "alt": "Swinging between platforms",
            "caption": "Swinging between platforms"
          }
        ]
      }
    ],
    "images": [
      {
        "id": "source-yellow-realm-dash",
        "enabled": true,
        "src": "assets/images/projects/lost-trance/gameplay/yellow-realm-dash.webp",
        "alt": "Dashing across the yellow realm",
        "caption": "Dashing across the yellow realm"
      },
      {
        "id": "source-blue-realm-platforms",
        "enabled": true,
        "src": "assets/images/projects/lost-trance/gameplay/blue-realm-platforms.webp",
        "alt": "Platform traversal in the blue realm",
        "caption": "Platform traversal in the blue realm"
      },
      {
        "id": "source-red-realm-traversal",
        "enabled": true,
        "src": "assets/images/projects/lost-trance/gameplay/red-realm-traversal.webp",
        "alt": "Red realm traversal and obstacles",
        "caption": "Red realm traversal and obstacles"
      },
      {
        "id": "source-swing-joint",
        "enabled": true,
        "src": "assets/images/projects/lost-trance/gameplay/swing-joint.webp",
        "alt": "Swinging between platforms",
        "caption": "Swinging between platforms"
      }
    ]
  },
  "word-search": {
    "technicalBlocks": [
      {
        "id": "source-ws-placement",
        "enabled": true,
        "title": "Directional word placement with bounds checks",
        "description": "Implemented randomized horizontal, vertical and diagonal word placement with direction-specific boundary tests and empty-cell checks. Placement orientation is rotated between attempts, and remaining grid positions receive random filler letters. Word selection filters by length and avoids duplicate target words. The supplied generator rejects occupied cells rather than overlapping matching letters.",
        "layout": "image-right",
        "images": []
      },
      {
        "id": "source-ws-selection",
        "enabled": true,
        "title": "Straight-line selection and reverse-word matching",
        "description": "Built drag selection with backtracking, a direction-locked continuation after the first two cells, and forward/reverse word matching. Completed targets are tracked to prevent repeat matches; invalid selections remove their selection bar.",
        "layout": "image-right",
        "images": []
      },
      {
        "id": "source-ws-levels",
        "enabled": true,
        "title": "Inspector-configured level tiers and time limits",
        "description": "In the supplied Word Search revision, serializable level_data arrays define the maximum level, grid size and five time budgets per tier. The timer formats minutes/seconds and triggers the loss state on expiry; matching all target words triggers the win presentation. This documents the supplied implementation while retaining the earlier technical notes below.",
        "layout": "image-right",
        "images": []
      }
    ],
    "images": [
      {
        "id": "source-recorded-level-08",
        "enabled": true,
        "src": "assets/images/projects/word-search/gameplay/recorded-level-08.webp",
        "alt": "Level 8: a larger grid and four target words",
        "caption": "Level 8: a larger grid and four target words"
      },
      {
        "id": "source-recorded-level-17",
        "enabled": true,
        "src": "assets/images/projects/word-search/gameplay/recorded-level-17.webp",
        "alt": "Level 17: a denser grid and six target words",
        "caption": "Level 17: a denser grid and six target words"
      }
    ]
  }
};
