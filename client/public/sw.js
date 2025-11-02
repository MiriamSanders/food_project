self.addEventListener("push", function (event) {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { title: "Notification", body: event.data.text() };
    }
  }

  const title = data.title || "Notification";
  const options = {
    body: data.body || "You have a new message",
    icon: data.icon || "/favicon.ico",
    data: data.url || "/",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  const url = event.notification.data || "/";
  event.waitUntil(clients.openWindow(url));
});
