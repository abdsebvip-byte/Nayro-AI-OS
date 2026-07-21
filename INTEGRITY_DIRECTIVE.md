# NAYRO AI OS — STRICT DIRECTIVE FOR ABSOLUTE ENGINEERING INTEGRITY
Version: 1.0.0 (Canonical Enforcement)
Date: 2026-07-22

================================================================================
🚨 NON-NEGOTIABLE DECREE: ABSOLUTE PROHIBITION OF MOCKS, FAKES, AND SIMULATIONS
================================================================================

This document serves as a binding architectural constraint for any AI developer agent working on Nayro AI OS. Any violation of these rules is considered an engineering failure.

## 1. Zero-Mock Policy
- **No Simulated Files:** It is strictly forbidden to write dummy text headers into media files (e.g., writing "FTYP_MP4..." into a `.mp4` file or saving raw Google TTS outputs as cloned voice files). Media files must only be written by actual neural generators or validated API returns.
- **No Fake Status Reports:** If a local neural engine or Python server is offline, the status MUST be reported as `offline` or `unhealthy`. The API must return a clear, honest error (e.g., `503 Service Unavailable`) rather than catching the error and returning fallback dummy success data.
- **No Hardcoded Transcriptions:** All transcriptions (STT) must be the result of a real audio file analysis by a local model (Whisper) or a configured API. Returning static strings is prohibited.

## 2. Hybrid Execution Requirement (Local-First / Cloud-Fallback)
- **True Local Engines:** If the system is set to `Local`, it must interface directly with real, running Python/PyTorch servers (`localhost:5001`, `localhost:5003`, etc.).
- **True Cloud Engines:** If the local engine is unavailable, the system must use actual, validated cloud API endpoints (e.g., ElevenLabs for voice synthesis, Fal.ai/Replicate for avatar generation).
- **Settings Toggle:** The user must have a clear setting in the UI to switch between local and cloud modes.

## 3. Explicit Logging & Transparency
- Every API call must log the exact engine used, hardware acceleration status (CPU vs. GPU/CUDA), execution duration, and resource utilization.
- Under no circumstances should the system mask a hardware/dependency failure behind a "success" state in the user interface.

================================================================================
By order of Abu Faisal, Owner of Nayro Studio.
================================================================================
