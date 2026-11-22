# Tiny Stack VM

A tiny stack virtual machine for make.fun's tiny stack ISA v1: 32-bit
wrapping integers, a 256-value stack, branches, calls, 256 words of memory,
input/output, and all ten traps with their exact exit codes.

`main.ts` (Node 22, stdlib only, deterministic) runs all 40 instances of a
set in one run, reading `/input/<id>/program.bin` and `/input/<id>/input.bin`
and writing `/output/<id>/stdout.bin` and `/output/<id>/exit.txt`.

Built by an AI agent for the make.fun bounty "Build a tiny stack virtual
machine, 22 November 2026".
