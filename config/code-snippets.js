// Replace these illustrative examples with your own code. See CUSTOMIZATION-UPDATES.md.
export const codeSnippetSettings = {
  enabled: true,
  title: "Code walkthroughs",
  columns: 3,
  minCardWidth: 260, // Fewer columns are used when needed to keep code readable.
  mobileMaxWidth: 760,
  explanationPosition: "right", // "left" or "right"; stacks below on mobile
  explanationWidth: "15rem",
  explanationStackBelow: 780, // Available group width, including contact-panel reflow.
  fontSize: "0.75rem",
  lineHeight: "1.8",
  arrowColor: "#efbc61",
  highlightColor: "#efbc6126",
  showConnections: true,
};

const example = {
  id: "chunk-example", enabled: true, placeholder: true,
  title: "From declaration to mesh generation",
  description: "Illustrative placeholder code — replace with your own implementation and explanation.",
  explanationPosition: "right",
  snippets: [
    {
      id: "header", fileName: "ChunkManager.h", language: "C++", startLine: 1,
      code: `#pragma once
#include "MeshBuilder.h"

class ChunkManager {
public:
    Mesh GenerateChunkMesh(const Chunk& chunk);
};`,
      highlights: [{ start: 6, end: 6 }],
      explanation: { title: "01 / Declaration", text: "This header declares the entry point. Replace this explanation with the purpose and design decisions behind your actual code." },
    },
    {
      id: "implementation", fileName: "ChunkManager.cpp", language: "C++", startLine: 1,
      code: `#include "ChunkManager.h"

Mesh ChunkManager::GenerateChunkMesh(
    const Chunk& chunk)
{
    Mesh mesh = MeshBuilder::Build(chunk);
    return mesh;
}`,
      highlights: [{ start: 3, end: 4 }, { start: 6, end: 6 }],
      explanation: { title: "02 / Implementation", text: "The implementation delegates mesh creation to a helper. The highlighted ranges and every connection are editable independently." },
    },
    {
      id: "builder", fileName: "MeshBuilder.cpp", language: "C++", startLine: 1,
      code: `#include "MeshBuilder.h"

Mesh MeshBuilder::Build(const Chunk& chunk)
{
    Mesh mesh;
    for (const auto& voxel : chunk.voxels) {
        if (voxel.IsExposed()) {
            mesh.AddFaces(voxel);
        }
    }
    return mesh;
}`,
      highlights: [{ start: 3, end: 4 }, { start: 6, end: 9 }],
      explanation: { title: "03 / Called function", text: "Illustrative pseudocode for building exposed voxel faces. This is a layout demonstration, not this project's production code." },
    },
  ],
  connections: [
    { id: "declaration", label: "Declaration → implementation", from: { snippet: "header", start: 6, end: 6 }, to: { snippet: "implementation", start: 3, end: 4 } },
    { id: "call", label: "Call → mesh builder", from: { snippet: "implementation", start: 6, end: 6 }, to: { snippet: "builder", start: 3, end: 4 } },
    { id: "flow", label: "Entry point → voxel loop", from: { snippet: "header", start: 6, end: 6 }, to: { snippet: "builder", start: 6, end: 9 } },
  ],
};

export const projectCodeSnippets = { "digging-game": [example] };
