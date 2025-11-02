import webpush from "web-push";
import dotenv from "dotenv";

dotenv.config();

const publicVapidKey = process.env.VAPID_PUBLIC_KEY;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY;

if (!publicVapidKey || !privateVapidKey) {
  console.warn(
    "VAPID keys are not set in environment variables. Push will not work until VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY are provided."
  );
}

try {
  webpush.setVapidDetails(
    "mailto:admin@yourdomain.org",
    publicVapidKey || "",
    privateVapidKey || ""
  );
} catch (err) {
  // setVapidDetails can throw if keys are invalid — log and continue so caller can handle sends
  console.error("Error setting VAPID details:", err && err.message);
}

export const sendNotification = async (subscription, payload) => {
  try {
    const body =
      typeof payload === "string" ? payload : JSON.stringify(payload);
    await webpush.sendNotification(subscription, body);
    return { success: true };
  } catch (err) {
    // bubble up error for caller to decide (e.g., remove subscription)
    return { success: false, error: err };
  }
};

export const getPublicVapidKey = () => publicVapidKey || "";

export default { sendNotification, getPublicVapidKey };
