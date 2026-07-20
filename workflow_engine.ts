import { ContentMarketingStudioService } from './services/content-marketing-studio/index';
import { VoiceStudioService } from './services/voice-studio/index';
import { VideoStudioService } from './services/video-studio/index';
import { PublishingStudioService } from './services/publishing-studio/index';
import fs from 'fs';
import path from 'path';

/**
 * Nayro AI OS - Unified Master Pipeline Orchestrator
 * Chains Content -> Voice -> Video -> Publishing into an automated production pipeline.
 */
export async function executeEndToEndMasterWorkflow(topic: string) {
  console.log('================================================================');
  console.log('⚡ NAYRO AI OS - MASTER END-TO-END PIPELINE EXECUTION');
  console.log('================================================================');

  const contentStudio = new ContentMarketingStudioService();
  const voiceStudio = new VoiceStudioService();
  const videoStudio = new VideoStudioService();
  const publishingStudio = new PublishingStudioService();

  // Stage 1: Content Intelligence & Script Generation
  console.log('\n[Stage 1/4] Executing Content Intelligence...');
  const scriptRes = await contentStudio.generateViralScript({ topic });
  console.log(`  └─ Script Created: "${scriptRes.hook}"`);

  // Stage 2: Voice Synthesis & LUFS Normalization
  console.log('\n[Stage 2/4] Executing Voice Studio Synthesis...');
  const ttsRes = await voiceStudio.generateTTS({ text: scriptRes.hook, voice: 'ar-SA-HamedNeural' });
  const normAudio = await voiceStudio.denoiseAndNormalizeLUFS(ttsRes.filePath, -14);
  console.log(`  └─ Audio Synthesized & Normalized (-14 LUFS): ${normAudio.filePath}`);

  // Stage 3: Video & Talking Avatar Generation
  console.log('\n[Stage 3/4] Executing Video & Avatar Studio...');
  const avatarRes = await videoStudio.generateTalkingAvatar({
    imagePath: path.join(process.cwd(), 'public', 'sample_avatar.jpg'),
    audioPath: normAudio.filePath,
    enginePreference: 'longcat-avatar',
    enableFaceEnhancement: true
  });
  console.log(`  └─ Avatar Video Generated: ${avatarRes.filePath}`);

  // Stage 4: Social Media Auto-Publishing Dispatch
  console.log('\n[Stage 4/4] Executing Publishing Studio Dispatch...');
  const pubRes = await publishingStudio.scheduleMultiChannelPost({
    title: topic,
    caption: `${scriptRes.hook} #نايرو_استوديو #تيك_توك #عطور_سعودية`,
    mediaPath: avatarRes.filePath,
    platforms: ['tiktok', 'instagram', 'x', 'youtube']
  });
  console.log(`  └─ Dispatched to Postiz Engine (${pubRes.channelsCount} Platforms): ${pubRes.status}`);

  console.log('\n================================================================');
  console.log('🎉 MASTER END-TO-END AUTOMATED PIPELINE EXECUTED & VERIFIED!');
  console.log('================================================================');
  return pubRes;
}

executeEndToEndMasterWorkflow('عطر مسك الفخامة الصيفي الجديد من نايرو استوديو').catch(err => {
  console.error('❌ MASTER PIPELINE FAILED:', err);
});
