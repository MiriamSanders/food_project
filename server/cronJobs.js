// Lightweight cronJobs placeholder
// Exports startCronJobs which starts minimal scheduled tasks (no-op by default)

export function startCronJobs() {
  console.log("CronJobs: starting (placeholder)");

  // Example periodic task: log heartbeat every hour. Change or remove as needed.
  const heartbeat = setInterval(() => {
    console.log("CronJobs: heartbeat - scheduled tasks placeholder running");
  }, 60 * 60 * 1000); // 1 hour

  // Keep references so we can stop in future if desired
  if (!global.__cronTimers) global.__cronTimers = [];
  global.__cronTimers.push(heartbeat);

  // return a stop function for graceful shutdown (optional)
  return function stopCronJobs() {
    console.log("CronJobs: stopping");
    if (global.__cronTimers) {
      global.__cronTimers.forEach((t) => clearInterval(t));
      global.__cronTimers = [];
    }
  };
}

export function stopCronJobs() {
  if (global.__cronTimers) {
    global.__cronTimers.forEach((t) => clearInterval(t));
    global.__cronTimers = [];
  }
  console.log("CronJobs: stopped");
}

export default { startCronJobs, stopCronJobs };
