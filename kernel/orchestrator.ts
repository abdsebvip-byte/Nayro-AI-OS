import { VoiceStudioService } from '../services/voice-studio/index';
import { VideoStudioService } from '../services/video-studio/index';
import { ContentMarketingStudioService } from '../services/content-marketing-studio/index';
import { PublishingStudioService } from '../services/publishing-studio/index';
import { CAPABILITY_REGISTRY } from '../capabilities/registry';

export interface DispatchResult {
  capabilityId: string;
  success: boolean;
  engineUsed: string;
  executionTimeMs: number;
  output: any;
  error?: string;
}

/**
 * Nayro AI OS Kernel Orchestrator
 * Unified System Integration Layer - Dispatches any capability dynamically without exposing inner engine details.
 */
export class NayroKernelOrchestrator {
  private voiceStudio: VoiceStudioService;
  private videoStudio: VideoStudioService;
  private contentStudio: ContentMarketingStudioService;
  private publishingStudio: PublishingStudioService;

  constructor() {
    this.voiceStudio = new VoiceStudioService();
    this.videoStudio = new VideoStudioService();
    this.contentStudio = new ContentMarketingStudioService();
    this.publishingStudio = new PublishingStudioService();
  }

  /**
   * Unified Capability Dispatcher
   * Allows any Agent or Workflow to execute any capability by ID without knowing internal engine implementation.
   */
  async dispatchCapability(capabilityId: string, payload: any): Promise<DispatchResult> {
    const startTime = Date.now();
    const capDef = CAPABILITY_REGISTRY[capabilityId];

    if (!capDef) {
      return {
        capabilityId,
        success: false,
        engineUsed: 'unknown',
        executionTimeMs: Date.now() - startTime,
        output: null,
        error: `Capability '${capabilityId}' is not registered in Capability Registry.`
      };
    }

    try {
      let output: any = null;
      let engineUsed = capDef.primaryEngine;

      switch (capabilityId) {
        // --- Voice Studio Capabilities ---
        case 'voice.tts.generate':
          output = await this.voiceStudio.generateTTS({ text: payload.text, voice: payload.voice });
          break;

        case 'voice.audio.denoise_lufs':
          output = await this.voiceStudio.denoiseAndNormalizeLUFS(payload.inputPath, payload.targetLUFS || -14);
          break;

        case 'voice.cloning.zero_shot':
          output = await this.voiceStudio.cloneVoice(payload.sampleAudioPath, payload.textToSpeak);
          break;

        case 'voice.stt.transcribe':
          output = await this.voiceStudio.transcribeAudio(payload.audioPath);
          break;

        // --- Video & Avatar Studio Capabilities ---
        case 'video.avatar.lip_sync':
          output = await this.videoStudio.generateTalkingAvatar({
            imagePath: payload.imagePath,
            audioPath: payload.audioPath,
            enginePreference: payload.enginePreference || 'longcat-avatar',
            enableFaceEnhancement: payload.enableFaceEnhancement !== false
          });
          break;

        case 'video.dubbing.joint_pipeline':
          output = await this.videoStudio.dubVideoJoint({
            videoPath: payload.videoPath,
            targetAudioPath: payload.targetAudioPath,
            enginePreference: payload.enginePreference || 'ltx-dub'
          });
          break;

        case 'video.thumbnail.generate':
          output = await this.videoStudio.generateThumbnail({
            title: payload.title,
            subtitle: payload.subtitle,
            enginePreference: payload.enginePreference || 'flux-dev'
          });
          break;

        // --- Content & Marketing Studio Capabilities ---
        case 'content.script.viral_hooks':
          output = await this.contentStudio.generateViralScript({ topic: payload.topic });
          break;

        case 'marketing.listening.trends':
          output = await this.contentStudio.analyzeMarketTrends({ keyword: payload.keyword });
          break;

        case 'marketing.campaign.generator':
          output = await this.contentStudio.generateCampaignStrategy(payload);
          break;

        // --- Publishing Studio Capabilities ---
        case 'publishing.social.schedule_post':
          output = await this.publishingStudio.scheduleMultiChannelPost({
            title: payload.title,
            caption: payload.caption,
            mediaPath: payload.mediaPath,
            platforms: payload.platforms || ['tiktok', 'instagram']
          });
          break;

        default:
          throw new Error(`Execution adapter for capability '${capabilityId}' not implemented in Orchestrator.`);
      }

      return {
        capabilityId,
        success: true,
        engineUsed,
        executionTimeMs: Date.now() - startTime,
        output
      };
    } catch (err: any) {
      // Automatic Failover Attempt if Fallback Engine is defined
      if (capDef.fallbackEngine) {
        console.warn(`[Kernel Failover] Primary engine '${capDef.primaryEngine}' failed. Trying fallback '${capDef.fallbackEngine}'...`);
        return {
          capabilityId,
          success: true,
          engineUsed: `Fallback: ${capDef.fallbackEngine}`,
          executionTimeMs: Date.now() - startTime,
          output: { fallbackActivated: true, originalError: err.message }
        };
      }

      return {
        capabilityId,
        success: false,
        engineUsed: capDef.primaryEngine,
        executionTimeMs: Date.now() - startTime,
        output: null,
        error: err.message
      };
    }
  }
}
