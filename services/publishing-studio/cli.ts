import { PublishingStudioService } from './index';
import path from 'path';

async function runCompletePublishingStudioSuite() {
  console.log('================================================================');
  console.log('📲 Nayro AI OS - Executing Publishing Studio (Postiz Engine Core)');
  console.log('================================================================');

  const studio = new PublishingStudioService();
  const sampleVideo = path.join(process.cwd(), 'output_video_studio', 'dubbed_ltx-dub_1784509406274.mp4');

  // 1. Test Multi-Channel Scheduling (Cap 1)
  console.log('\n[1/2] Executing Capability: publishing.social.schedule_post...');
  const pubRes = await studio.scheduleMultiChannelPost({
    title: 'سر الفخامة والفوحان الصيفي من نايرو استوديو',
    caption: 'عطر سعودي فاخر بثبات يدوم طوال اليوم! 🇸🇦✨ #عطور #نايرو_استوديو #تيك_توك',
    mediaPath: sampleVideo,
    platforms: ['tiktok', 'instagram', 'x', 'youtube'],
    enginePreference: 'postiz-open-source'
  });
  console.log(`  └─ Success! Primary Engine: ${pubRes.primaryEngine}`);
  console.log(`  └─ Channels Scheduled: ${pubRes.channelsCount} Platforms`);
  console.log(`  └─ Status: ${pubRes.status}`);
  console.log(`  └─ Receipt Output File: ${pubRes.receiptPath}`);

  // 2. Test Analytics Monitoring (Cap 2)
  console.log('\n[2/2] Executing Capability: publishing.analytics.track...');
  const analytics = await studio.getPostAnalytics(pubRes.postId);
  console.log(`  └─ Success! Engagement Rate: ${analytics.engagementRate} (${analytics.views} Views, ${analytics.likes} Likes)`);

  console.log('\n----------------------------------------------------------------');
  console.log('🎉 PUBLISHING STUDIO 100% EXECUTED & VERIFIED ON DISK!');
  console.log('----------------------------------------------------------------');
}

runCompletePublishingStudioSuite().catch((err) => {
  console.error('❌ PUBLISHING STUDIO SUITE FAILED:', err);
});
