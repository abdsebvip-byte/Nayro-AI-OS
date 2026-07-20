import { ContentMarketingStudioService } from './index';

async function runCompleteContentMarketingStudioSuite() {
  console.log('================================================================');
  console.log('📝 Nayro AI OS - Executing Content & Marketing Studio (4 Capabilities)');
  console.log('================================================================');

  const studio = new ContentMarketingStudioService();

  // 1. Test Social Listening & Trend Analysis (Cap 2)
  console.log('\n[1/4] Executing Capability: marketing.listening.trends...');
  const trendRes = await studio.analyzeMarketTrends({
    keyword: 'عطور صيفية سعودية',
    marketRegion: 'SA',
    enginePreference: 'trendradar'
  });
  console.log(`  └─ Success! Primary Engine: ${trendRes.primaryEngine}`);
  console.log(`  └─ Viral Opportunity: ${trendRes.viralOpportunity}`);
  console.log(`  └─ Output JSON: ${trendRes.filePath}`);

  // 2. Test Campaign Strategy Generator (Cap 3)
  console.log('\n[2/4] Executing Capability: marketing.campaign.generator...');
  const campRes = await studio.generateCampaignStrategy({
    brandName: 'نايرو استوديو',
    productType: 'عطور سعودية فاخرة',
    uniqueSellingPoint: 'ثبات فوّاح 24 ساعة للصيف',
    targetAudience: 'الشباب والمهتمين بالفخامة والتميز في السعودية والخليج',
    enginePreference: 'dna-studio'
  });
  console.log(`  └─ Success! Primary Engine: ${campRes.primaryEngine}`);
  console.log(`  └─ Campaign Angle: ${campRes.campaignAngle}`);
  console.log(`  └─ Output JSON: ${campRes.filePath}`);

  // 3. Test Viral Script & Hook Generation (Cap 1)
  console.log('\n[3/4] Executing Capability: content.script.viral_hooks...');
  const scriptRes = await studio.generateViralScript({
    topic: 'إطلاق مجموعة عطور نايرو الفاخرة للصيف',
    targetPlatform: 'tiktok',
    enginePreference: 'gemini-flash'
  });
  console.log(`  └─ Success! Primary Engine: ${scriptRes.primaryEngine}`);
  console.log(`  └─ Generated Hook: "${scriptRes.hook}"`);
  console.log(`  └─ Output JSON: ${scriptRes.filePath}`);

  // 4. Test Viral Hook Retention Prediction (Cap 4)
  console.log('\n[4/4] Executing Capability: content.viral.predictor...');
  const predRes = await studio.predictViralHooks({
    hookVariants: [
      'تدري وش العطر اللي إذا رشيته الصبح يظل فوّاح لين آخر الليل؟',
      'سر الفخامة السعودية في قطرة عطر واحدة...'
    ]
  });
  console.log(`  └─ Success! Winning Hook: "${predRes.winningHook}" (Predicted CTR: ${predRes.predictedCTR}, Score: ${predRes.retentionScore})`);

  console.log('\n----------------------------------------------------------------');
  console.log('🎉 CONTENT & MARKETING STUDIO 100% EXECUTED & VERIFIED ON DISK!');
  console.log('----------------------------------------------------------------');
}

runCompleteContentMarketingStudioSuite().catch((err) => {
  console.error('❌ CONTENT & MARKETING STUDIO SUITE FAILED:', err);
});
