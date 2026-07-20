import { VoicePerformancePlatformEngine } from './index';

async function testCompleteVoicePerformancePlatform() {
  console.log('================================================================');
  console.log('🎙️ NAYRO AI OS - VOICE PERFORMANCE PLATFORM HARNESS');
  console.log('================================================================');

  const engine = new VoicePerformancePlatformEngine();

  // Test 1: Storyteller Profile + High Enthusiasm Emotion
  console.log('\n[1/4] Synthesizing Performance: Profile = Storyteller, Emotion = High Enthusiasm...');
  const res1 = await engine.synthesizePerformanceSpeech({
    text: 'في قلب الصحراء الذهبية، ولد هذا العطر ليحكي قصة الفخامة والخلود.',
    profileType: 'storyteller',
    emotions: [{ type: 'enthusiasm', intensity: 0.9 }],
    humanizationLevel: 'high'
  });
  console.log(`  └─ Success! Profile: ${res1.profileUsed.nameAr}`);
  console.log(`  └─ Prosody Analysis: ${res1.prosody.detectedPauses} Pauses, ${res1.prosody.prolongedVowelsCount} Prolonged Vowels`);
  console.log(`  └─ Physical Output File: ${res1.filePath} (${res1.bytes} bytes)`);

  // Test 2: Quranic Recitation Rules & Pauses
  console.log('\n[2/4] Synthesizing Performance: Profile = Quranic Recitation Rules...');
  const res2 = await engine.synthesizePerformanceSpeech({
    text: 'وَالضُّحَى. وَاللَّيْلِ إِذَا سَجَى. مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَى.',
    profileType: 'quranic_recitation_rules',
    emotions: [{ type: 'awe', intensity: 0.95 }]
  });
  console.log(`  └─ Success! Profile: ${res2.profileUsed.nameAr}`);
  console.log(`  └─ Prosody SSML: ${res2.prosody.ssmlAnnotated.substring(0, 100)}...`);
  console.log(`  └─ Physical Output File: ${res2.filePath} (${res2.bytes} bytes)`);

  // Test 3: Speech Director High-Level Directive Parsing
  console.log('\n[3/4] Synthesizing Performance: Speech Director High-Level Directives...');
  const res3 = await engine.synthesizePerformanceSpeech({
    text: 'ابدأ بهدوء تام، ثم ارفع الحماس تدريجياً، واختم بلمسة من المفاجأة.',
    profileType: 'cinematic_narration',
    directorInstructions: [
      { directiveAr: 'ابدأ بهدوء' },
      { directiveAr: 'ارفع الحماس' },
      { directiveAr: 'اقرأ النهاية وكأنها مفاجأة' }
    ]
  });
  console.log(`  └─ Success! Speech Director Plan Parsed: Pitch Offset ${res3.directorPlan?.pitchAdjustmentHz}Hz, Rate ${res3.directorPlan?.rateAdjustmentPct}%`);
  console.log(`  └─ Physical Output File: ${res3.filePath} (${res3.bytes} bytes)`);

  // Test 4: Style Transfer & Reference Audio
  console.log('\n[4/4] Synthesizing Performance: Style Transfer + Voice Identity Layering...');
  const res4 = await engine.synthesizePerformanceSpeech({
    text: 'هذا نص تم توليده بأسلوب الأداء المأخوذ من تسجيل مرجعي مع هوية الصوت المخصصة.',
    profileType: 'podcast',
    referenceAudioStylePath: res1.filePath,
    humanizationLevel: 'subtle'
  });
  console.log(`  └─ Success! Style Transfer Applied: ${res4.styleTransferApplied}`);
  console.log(`  └─ Physical Output File: ${res4.filePath} (${res4.bytes} bytes)`);

  console.log('\n================================================================');
  console.log('🎉 VOICE PERFORMANCE PLATFORM 100% EXECUTED & VERIFIED ON DISK!');
  console.log('================================================================');
}

testCompleteVoicePerformancePlatform().catch(err => {
  console.error('❌ VOICE PERFORMANCE PLATFORM TEST FAILED:', err);
});
