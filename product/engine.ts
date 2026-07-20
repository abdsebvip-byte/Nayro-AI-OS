import { NayroKernelOrchestrator } from '../kernel/orchestrator';
import { StorageManager } from '../kernel/storage';
import path from 'path';

export interface CampaignResult {
  campaignId: string;
  topic: string;
  hook: string;
  audioUrl: string;
  audioPath: string;
  videoUrl: string;
  videoPath: string;
  publishingStatus: string;
  platforms: string[];
  executionTimeMs: number;
}

/**
 * Nayro Studio Product Engine
 * High-level Product Architecture wrapping Kernel Orchestrator into usable business APIs.
 */
export class NayroProductEngine {
  private orchestrator: NayroKernelOrchestrator;
  private storage: StorageManager;

  constructor() {
    this.orchestrator = new NayroKernelOrchestrator();
    this.storage = StorageManager.getInstance();
  }

  /**
   * Product API 1: Generate Full Content Campaign (Script -> Voice -> Avatar -> Publish)
   */
  async createFullContentCampaign(topic: string, platforms: string[] = ['tiktok', 'instagram', 'x']): Promise<CampaignResult> {
    const startTime = Date.now();
    const campaignId = `camp_prod_${Date.now()}`;

    // 1. Generate Script
    const scriptRes = await this.orchestrator.dispatchCapability('content.script.viral_hooks', { topic });
    const hookText = scriptRes.output.hook;

    // 2. Synthesize Saudi Audio
    const voiceRes = await this.orchestrator.dispatchCapability('voice.tts.generate', {
      text: hookText,
      voice: 'ar-SA-HamedNeural'
    });
    const audioPath = voiceRes.output.filePath;
    const audioFilename = path.basename(audioPath);
    const audioUrl = this.storage.getPublicUrl('audio', audioFilename);

    // 3. Generate Avatar Video
    const sampleImg = path.join(process.cwd(), 'public', 'sample_avatar.jpg');
    const videoRes = await this.orchestrator.dispatchCapability('video.avatar.lip_sync', {
      imagePath: sampleImg,
      audioPath: audioPath
    });
    const videoPath = videoRes.output.filePath;
    const videoFilename = path.basename(videoPath);
    const videoUrl = this.storage.getPublicUrl('video', videoFilename);

    // 4. Schedule Multi-Channel Social Post
    const pubRes = await this.orchestrator.dispatchCapability('publishing.social.schedule_post', {
      title: topic,
      caption: `${hookText} #نايرو_استوديو #عطور_سعودية`,
      mediaPath: videoPath,
      platforms
    });

    return {
      campaignId,
      topic,
      hook: hookText,
      audioUrl,
      audioPath,
      videoUrl,
      videoPath,
      publishingStatus: pubRes.output.status,
      platforms,
      executionTimeMs: Date.now() - startTime
    };
  }

  /**
   * Product API 2: Synthesize Saudi Speech Only
   */
  async synthesizeSaudiSpeech(text: string, voice: string = 'ar-SA-HamedNeural'): Promise<{ audioUrl: string; filePath: string; bytes: number }> {
    const voiceRes = await this.orchestrator.dispatchCapability('voice.tts.generate', { text, voice });
    const filePath = voiceRes.output.filePath;
    const filename = path.basename(filePath);
    return {
      audioUrl: this.storage.getPublicUrl('audio', filename),
      filePath,
      bytes: voiceRes.output.bytes
    };
  }

  /**
   * Product API 3: Schedule Social Post Only
   */
  async schedulePost(title: string, caption: string, mediaPath: string, platforms: string[]): Promise<{ receiptPath: string; status: string }> {
    const pubRes = await this.orchestrator.dispatchCapability('publishing.social.schedule_post', {
      title,
      caption,
      mediaPath,
      platforms
    });
    return {
      receiptPath: pubRes.output.receiptPath,
      status: pubRes.output.status
    };
  }
}
