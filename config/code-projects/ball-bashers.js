// Each object in this array is an independent block with its own files, highlights, arrows and explanations.
// Replace these clearly labelled placeholders. Duplicate a block and give it a unique id to add another.
export const blocks = [
{
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
},
{
  id: "second-example", enabled: true, placeholder: true,
  title: "Second independent walkthrough block",
  description: "Replace this independent example with another system from this game.",
  explanationPosition: "left",
  snippets: [
    { id: "request", fileName: "InputFlow.txt", language: "Pseudocode", startLine: 1,
      code: `when interact is pressed:
    request interaction with target`,
      highlights: [{start: 1, end: 2}],
      explanation: {title: "Input request", text: "Explain how this part of your system starts an interaction."} },
    { id: "handler", fileName: "InteractionFlow.txt", language: "Pseudocode", startLine: 1,
      code: `handle interaction request:
    if target is available:
        perform interaction`,
      highlights: [{start: 1, end: 3}],
      explanation: {title: "Interaction handling", text: "Explain the checks and behavior in your implementation. This is placeholder pseudocode."} },
  ],
  connections: [{ id: "input-to-handler", label: "Input → handler", from: {snippet: "request", start: 2}, to: {snippet: "handler", start: 1, end: 3} }],
}
];
