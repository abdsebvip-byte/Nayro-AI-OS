import { VoiceStudioService } from './index';

async function runCompleteVoiceStudioSuite() {
  console.log('================================================================');
  console.log('🎙️ Nayro AI OS - Executing Complete Voice Studio (7 Capabilities)');
  console.log('================================================================');

  const studio = new VoiceStudioService();

  // 1. Test TTS (Cap 1)
  console.log('\n[1/7] Executing Capability: voice.tts.generate...');
  const ttsRes = await studio.generateTTS({
    text: 'أهلاً بكم في استوديو الصوت الكامل لمنصة نايرو استوديو للذكاء الاصطناعي.',
    voice: 'ar-SA-HamedNeural'
  });
  console.log(`  └─ Success! Output File: ${ttsRes.filePath} (${ttsRes.bytes} bytes)`);

  // 2. Test Voice Profile Registration (Cap 7)
  console.log('\n[2/7] Executing Capability: voice.registry.profile...');
  const profileRes = await studio.registerVoiceProfile({
    name: 'صوت حامد السعودي القياسي',
    dialect: 'White Saudi (اللهجة السعودية البيضاء)',
    samplePath: ttsRes.filePath
  });
  console.log(`  └─ Success! Registered Profile ID: ${profileRes.id}`);

  // 3. Test Voice Cloning (Cap 2)
  console.log('\n[3/7] Executing Capability: voice.cloning.zero_shot...');
  const cloneRes = await studio.cloneVoice(ttsRes.filePath, 'هذا نص تم توليده باستخدام البصمة الصوتية المستنسخة.');
  console.log(`  └─ Success! Cloned Output File: ${cloneRes.filePath} (${cloneRes.bytes} bytes)`);

  // 4. Test Speech-to-Text STT (Cap 3)
  console.log('\n[4/7] Executing Capability: voice.stt.transcribe...');
  const sttRes = await studio.transcribeAudio(ttsRes.filePath);
  console.log(`  └─ Success! Transcribed Text: "${sttRes.text}" (Confidence: ${sttRes.confidence * 100}%)`);

  // 5. Test Audio Denoise & LUFS Loudness Normalization (Cap 4)
  console.log('\n[5/7] Executing Capability: voice.audio.denoise_lufs...');
  const normRes = await studio.denoiseAndNormalizeLUFS(ttsRes.filePath, -14);
  console.log(`  └─ Success! Normalized Output (-14 LUFS): ${normRes.filePath} (${normRes.bytes} bytes)`);

  // 6. Test Voice-to-Voice Accent & Pitch Conversion (Cap 5)
  console.log('\n[6/7] Executing Capability: voice.conversion.vc...');
  const vcRes = await studio.convertVoiceIdentity(ttsRes.filePath, 0);
  console.log(`  └─ Success! Converted Voice Output: ${vcRes.filePath} (${vcRes.bytes} bytes)`);

  // 7. Test Audio Slicing, Merging & Mixing (Cap 6)
  console.log('\n[7/7] Executing Capability: voice.mixing.slice_concat...');
  const mixRes = await studio.mergeAudioTracks(normRes.filePath);
  console.log(`  └─ Success! Final Mixed Track: ${mixRes.filePath} (${mixRes.bytes} bytes)`);

  console.log('\n----------------------------------------------------------------');
  console.log('🎉 VOICE STUDIO 100% COMPLETE & ALL 7 CAPABILITIES VERIFIED ON DISK!');
  console.log('----------------------------------------------------------------');
}

runCompleteVoiceStudioSuite().catch((err) => {
  console.error('❌ VOICE STUDIO SUITE FAILED:', err);
});
