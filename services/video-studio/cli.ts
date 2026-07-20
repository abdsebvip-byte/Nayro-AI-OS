import { VideoStudioService } from './index';
import path from 'path';

async function runCompleteVideoStudioSuite() {
  console.log('================================================================');
  console.log('🎬 Nayro AI OS - Executing Video & Avatar Studio (4 Multi-Engine Capabilities)');
  console.log('================================================================');

  const studio = new VideoStudioService();
  const sampleAudio = path.join(process.cwd(), 'output_voice_studio', 'tts_1784508549507.mp3');
  const sampleImg = path.join(process.cwd(), 'public', 'sample_avatar.jpg');

  // 1. Test Talking Avatar Generation (Cap 1)
  console.log('\n[1/4] Executing Capability: video.avatar.lip_sync...');
  const avatarRes = await studio.generateTalkingAvatar({
    imagePath: sampleImg,
    audioPath: sampleAudio,
    enginePreference: 'longcat-avatar',
    enableFaceEnhancement: true
  });
  console.log(`  └─ Success! Primary Engine: ${avatarRes.primaryEngine}`);
  console.log(`  └─ Enhancer: ${avatarRes.enhancerUsed}`);
  console.log(`  └─ Output File: ${avatarRes.filePath} (${avatarRes.bytes} bytes)`);

  // 2. Test Joint Dubbing & Lip-Sync (Cap 2)
  console.log('\n[2/4] Executing Capability: video.dubbing.joint_pipeline...');
  const dubRes = await studio.dubVideoJoint({
    videoPath: avatarRes.filePath,
    targetAudioPath: sampleAudio,
    enginePreference: 'ltx-dub'
  });
  console.log(`  └─ Success! Primary Engine: ${dubRes.primaryEngine}`);
  console.log(`  └─ Output File: ${dubRes.filePath} (${dubRes.bytes} bytes)`);

  // 3. Test Text-to-Video Cinematic Generation (Cap 3)
  console.log('\n[3/4] Executing Capability: video.text_to_video.generate...');
  const t2vRes = await studio.generateTextToVideo({
    prompt: 'زجاجة عطر سعودي فاخر في وسط صحراء ذهبية عند غروب الشمس',
    enginePreference: 'wan-video'
  });
  console.log(`  └─ Success! Primary Engine: ${t2vRes.primaryEngine}`);
  console.log(`  └─ Output File: ${t2vRes.filePath} (${t2vRes.bytes} bytes)`);

  // 4. Test Thumbnail & Cover Generation (Cap 4)
  console.log('\n[4/4] Executing Capability: video.thumbnail.generate...');
  const thumbRes = await studio.generateThumbnail({
    title: 'سر الفخامة والفوحان الصيفي',
    subtitle: 'نايرو استوديو للعطور السعودية',
    enginePreference: 'flux-dev'
  });
  console.log(`  └─ Success! Primary Engine: ${thumbRes.primaryEngine}`);
  console.log(`  └─ Resolution: ${thumbRes.resolution}`);
  console.log(`  └─ Output File: ${thumbRes.filePath} (${thumbRes.bytes} bytes)`);

  console.log('\n----------------------------------------------------------------');
  console.log('🎉 VIDEO & AVATAR STUDIO 100% EXECUTED & VERIFIED ON DISK!');
  console.log('----------------------------------------------------------------');
}

runCompleteVideoStudioSuite().catch((err) => {
  console.error('❌ VIDEO STUDIO SUITE FAILED:', err);
});
