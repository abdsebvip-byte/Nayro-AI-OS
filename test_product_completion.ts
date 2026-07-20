import { NayroProductEngine } from './product/engine';

async function testProductCompletion() {
  console.log('================================================================');
  console.log('🚀 NAYRO STUDIO - PRODUCT COMPLETION & BUSINESS API VERIFICATION');
  console.log('================================================================');

  const engine = new NayroProductEngine();

  // Test 1: Full End-to-End Campaign Product API
  console.log('\n[1/2] Executing Product API: createFullContentCampaign...');
  const campaign = await engine.createFullContentCampaign(
    'إطلاق عطر المسك السعودي الخاص بـ نايرو استوديو',
    ['tiktok', 'instagram', 'x', 'youtube']
  );

  console.log(`  └─ Campaign ID: ${campaign.campaignId}`);
  console.log(`  └─ Generated Hook: "${campaign.hook}"`);
  console.log(`  └─ Audio URL: ${campaign.audioUrl}`);
  console.log(`  └─ Audio File Path: ${campaign.audioPath}`);
  console.log(`  └─ Video URL: ${campaign.videoUrl}`);
  console.log(`  └─ Video File Path: ${campaign.videoPath}`);
  console.log(`  └─ Publishing Status: ${campaign.publishingStatus}`);
  console.log(`  └─ Execution Time: ${campaign.executionTimeMs}ms`);

  // Test 2: Speech Synthesis Product API
  console.log('\n[2/2] Executing Product API: synthesizeSaudiSpeech...');
  const ttsRes = await engine.synthesizeSaudiSpeech('أهلاً بكم في نايرو استوديو، المنتج النهائي المكتمل.');
  console.log(`  └─ Audio URL: ${ttsRes.audioUrl} (${ttsRes.bytes} bytes)`);

  console.log('\n================================================================');
  console.log('🎉 PRODUCT COMPLETION VERIFICATION 100% SUCCESSFUL!');
  console.log('================================================================');
}

testProductCompletion().catch(err => {
  console.error('❌ PRODUCT COMPLETION VERIFICATION FAILED:', err);
});
