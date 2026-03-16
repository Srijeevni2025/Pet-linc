const admin = require('firebase-admin');

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

async function sendNotification(fcmToken, title, body, data = {}) {
  try {
    await admin.messaging().send({
      token: fcmToken,
      notification: { title, body },
      data,
      android: {
        priority: 'high',
        notification: {
          sound: 'default',
          priority: 'max',
          channelId: 'petlinc_bookings',
        },
      },
    });
    console.log('✅ Push notification sent');
  } catch (err) {
    console.error('Push notification error:', err.message);
  }
}

module.exports = sendNotification;
