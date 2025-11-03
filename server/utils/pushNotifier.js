import webpush from "web-push";

let subscriptions = [];

const publicVapidKey = process.env.VAPID_PUBLIC_KEY;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY;

if (!publicVapidKey || !privateVapidKey) {
  console.warn('VAPID keys not configured. Push sending will fail until VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY are set in environment.');
} else {
  try {
    webpush.setVapidDetails('mailto:morb9876@gmail.com', publicVapidKey, privateVapidKey);
  } catch (err) {
    console.error('Invalid VAPID keys provided:', err && err.message ? err.message : err);
  }
}

export function saveSubscription(sub) {
  if (!subscriptions.find((s) => s.endpoint === sub.endpoint)) {
    subscriptions.push(sub);
  }
}

export async function sendNotificationToAll(title, body) {
  const payload = JSON.stringify({
    title,
    body,
    icon: "/icons/icon-192x192.png",
  });

  if (!publicVapidKey) {
    console.warn('sendNotificationToAll called but VAPID public key is not configured. Aborting sends.');
    return { success: false, reason: 'VAPID keys not configured' };
  }

  const results = await Promise.allSettled(
    subscriptions.map((sub) => webpush.sendNotification(sub, payload))
  );

  subscriptions = subscriptions.filter(
    (_, i) => results[i].status === "fulfilled"
  );

  console.log(`✅ Sent ${results.filter((r) => r.status === "fulfilled").length} notifications`);
  return { success: true, results };
}

export function getPublicVapidKey() {
  return publicVapidKey || '';
}
