// Sunshine Spice Bakery & Cafe — small enhancements. The page works without this file.

(function () {
  // ---- Mobile navigation ----
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  // ---- "Open now" status, in Boise time ----
  // Hours: Wednesday to Sunday, 9:00 to 16:00. Closed Monday and Tuesday.
  var OPEN_DAYS = [0, 3, 4, 5, 6]; // Sun, Wed, Thu, Fri, Sat
  var OPEN_MIN = 9 * 60;
  var CLOSE_MIN = 16 * 60;
  var DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  function boiseNow() {
    var parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Boise",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h23"
    }).formatToParts(new Date());
    var get = function (type) {
      var p = parts.find(function (x) { return x.type === type; });
      return p ? p.value : "";
    };
    var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
    return { day: day, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
  }

  function nextOpenDay(fromDay) {
    for (var i = 1; i <= 7; i++) {
      var d = (fromDay + i) % 7;
      if (OPEN_DAYS.indexOf(d) !== -1) return i === 1 ? "tomorrow" : DAY_NAMES[d];
    }
    return "";
  }

  var status = document.querySelector("[data-open-status]");
  if (status && window.Intl) {
    try {
      status.hidden = false;
      var now = boiseNow();
      var openToday = OPEN_DAYS.indexOf(now.day) !== -1;
      if (openToday && now.minutes >= OPEN_MIN && now.minutes < CLOSE_MIN) {
        status.textContent = "Open now";
        status.classList.add("is-open");
      } else if (openToday && now.minutes < OPEN_MIN) {
        status.textContent = "Opens today at 9 am";
      } else {
        status.textContent = "Closed now, opens " + nextOpenDay(now.day) + " at 9 am";
      }
    } catch (err) {
      status.hidden = true;
    }
  }

  // ---- Footer year ----
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
})();
