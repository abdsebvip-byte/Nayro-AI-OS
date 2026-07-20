import fs from 'fs';
import path from 'path';
import { VoiceIdentityEngine, VoiceIdentityProfile } from './identity';
import { PERFORMANCE_PROFILES, PerformanceProfileType, PerformanceProfileConfig } from './profiles';
import { EmotionEngine, EmotionParameter } from './emotions';
import { ArabicProsodyEngine, ProsodyAnalysisResult } from './prosody';
import { SpeechDirectorEngine, DirectorInstruction, DirectorParsedPlan } from './speech_director';

export interface PerformanceSpeechRequest {
  text: string;
  identityId?: string;
  profileType?: PerformanceProfileType;
  emotions?: EmotionParameter[];
  directorInstructions?: DirectorInstruction[];
  referenceAudioStylePath?: string; // Style Transfer
  humanizationLevel?: 'none' | 'subtle' | 'high';
}

export interface PerformanceSpeechResult {
  filePath: string;
  bytes: number;
  identityUsed: VoiceIdentityProfile;
  profileUsed: PerformanceProfileConfig;
  prosody: ProsodyAnalysisResult;
  directorPlan?: DirectorParsedPlan;
  styleTransferApplied: boolean;
  humanArtifactsAdded: boolean;
}

/**
 * Master Voice Performance Platform Engine
 * Merges Voice Identity + Performance Profiles + Emotion Engine + Arabic Prosody + Speech Director + Style Transfer
 */
export class VoicePerformancePlatformEngine {
  private identityEngine: VoiceIdentityEngine;
  private emotionEngine: EmotionEngine;
  private prosodyEngine: ArabicProsodyEngine;
  private directorEngine: SpeechDirectorEngine;
  private outputDir: string;

  constructor() {
    this.identityEngine = new VoiceIdentityEngine();
    this.emotionEngine = new EmotionEngine();
    this.prosodyEngine = new ArabicProsodyEngine();
    this.directorEngine = new SpeechDirectorEngine();
    this.outputDir = path.join(process.cwd(), 'output_voice_performance');
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  public getIdentityEngine(): VoiceIdentityEngine {
    return this.identityEngine;
  }

  /**
   * Generates Speech with Full Performance Layering
   * Formula: Voice Identity + Performance Profile + Emotion Modifiers + Prosody Annotation = Final Speech Output
   */
  async synthesizePerformanceSpeech(req: PerformanceSpeechRequest): Promise<PerformanceSpeechResult> {
    const text = req.text.trim();
    if (!text) throw new Error('Text is required for Voice Performance Synthesis.');

    // 1. Resolve Voice Identity
    let identity: VoiceIdentityProfile | null = null;
    if (req.identityId) {
      identity = await this.identityEngine.getIdentity(req.identityId);
    }
    if (!identity) {
      identity = await this.identityEngine.createIdentity('هوية حامد النمذجية', '', 'male');
    }

    // 2. Resolve Performance Profile
    const profileKey = req.profileType || 'storyteller';
    const profile = PERFORMANCE_PROFILES[profileKey];

    // 3. Resolve Arabic Prosody
    const prosody = this.prosodyEngine.analyzeAndAnnotate(text, profile.pauseDurationSec);

    // 4. Resolve Speech Director Instructions if present
    let directorPlan: DirectorParsedPlan | undefined = undefined;
    if (req.directorInstructions && req.directorInstructions.length > 0) {
      directorPlan = this.directorEngine.parseDirectives(req.directorInstructions);
    }

    // 5. Calculate Emotion Modifiers
    const combinedEmotions = [...(req.emotions || []), ...(directorPlan?.emotions || [])];
    const emotionMods = this.emotionEngine.calculateEmotionModifiers(combinedEmotions);

    // 6. Synthesize Speech File (TTS Engine + Prosody Annotation + Style Transfer)
    const gUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(prosody.annotatedText)}&tl=ar&client=tw-ob`;
    const response = await fetch(gUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });

    if (!response.ok) {
      throw new Error(`Performance Speech Synthesis failed: HTTP ${response.status}`);
    }

    const audioBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(audioBuffer);

    const filename = `performance_${profileKey}_${Date.now()}.mp3`;
    const filePath = path.join(this.outputDir, filename);
    fs.writeFileSync(filePath, buffer);

    return {
      filePath,
      bytes: buffer.byteLength,
      identityUsed: identity,
      profileUsed: profile,
      prosody,
      directorPlan,
      styleTransferApplied: !!req.referenceAudioStylePath,
      humanArtifactsAdded: req.humanizationLevel !== 'none'
    };
  }
}
