// Helper to register service worker and subscribe for push notifications

const API_BASE =
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE) ||
  "http://localhost:5000";

export async function getVapidPublicKey() {
  const url = `${API_BASE}/push/vapidPublicKey`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Failed to get VAPID key: ${res.status} ${res.statusText} - ${text}`
    );
  }
  const json = await res.json();
  return json.publicKey;
}

export async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return null;
  const reg = await navigator.serviceWorker.register("/sw.js");
  return reg;
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export async function subscribeUser() {
  // Request permission
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    throw new Error("Notification permission denied");
  }

  const reg = await registerServiceWorker();
  if (!reg) throw new Error("Service worker not supported");

  const publicKey = await getVapidPublicKey();
  const sub = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicKey),
  });
  // Send subscription to server. Use toJSON() to ensure a plain object is sent.
  const endpoint = API_BASE.replace(/\/$/, "");
  let bodyPayload;
  try {
    bodyPayload = typeof sub.toJSON === "function" ? sub.toJSON() : sub;
  } catch (e) {
    bodyPayload = sub;
  }

  const res = await fetch(`${endpoint}/push/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyPayload),
  }).catch((err) => {
    // Network or CORS error
    throw new Error(`Network error sending subscription: ${err.message}`);
  });

  if (!res.ok) {
    // Try to get useful response text for debugging (may be HTML or JSON)
    const text = await res.text().catch(() => "");
    throw new Error(
      `Failed to save subscription on server: ${res.status} ${res.statusText} - ${text}`
    );
  }

  // Optionally parse JSON response (if any) and return subscription
  try {
    const json = await res.json().catch(() => null);
    // return the PushSubscription object (not server response) but include server reply in logs
    console.log("Subscription saved on server:", json);
  } catch (e) {
    // ignore parse errors
  }

  return sub;
}
