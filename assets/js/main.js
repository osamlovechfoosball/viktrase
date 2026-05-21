(function () {
  const body = document.body;
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-site-nav]");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  const notice = document.querySelector("[data-cookie-notice]");
  const noticeButton = document.querySelector("[data-cookie-ok]");
  const storageKey = "vik-trase-cookie-notice";

  try {
    if (notice && localStorage.getItem(storageKey) === "ok") {
      notice.hidden = true;
    }
  } catch (error) {
    // Local storage can be disabled. The notice still works without persistence.
  }

  if (notice && noticeButton) {
    noticeButton.addEventListener("click", () => {
      notice.hidden = true;
      try {
        localStorage.setItem(storageKey, "ok");
      } catch (error) {
        // No-op when storage is unavailable.
      }
    });
  }

  const form = document.querySelector("[data-quote-form]");
  if (!form) {
    return;
  }

  const phone = "359879447532";
  const whatsapp = form.querySelector("[data-whatsapp-submit]");
  const copy = form.querySelector("[data-copy-message]");
  const status = form.querySelector("[data-form-status]");
  const lang = document.documentElement.lang || "bg";

  const labels = lang.startsWith("en")
    ? {
        greeting: "Hello, I would like to request a quote for a VIK project.",
        name: "Name",
        location: "Location",
        service: "Service",
        details: "Details",
        copied: "The request text was copied. You can paste it in Viber or another app.",
        missing: "Please add at least a location or short project description."
      }
    : {
        greeting: "Здравейте, искам запитване за ВиК обект.",
        name: "Име",
        location: "Локация",
        service: "Тип дейност",
        details: "Описание",
        copied: "Текстът на запитването е копиран. Може да го поставите във Viber или друго приложение.",
        missing: "Добавете поне локация или кратко описание на обекта."
      };

  function value(name) {
    const field = form.querySelector(`[name="${name}"]`);
    return field ? field.value.trim() : "";
  }

  function buildMessage() {
    const lines = [
      labels.greeting,
      "",
      `${labels.name}: ${value("name") || "-"}`,
      `${labels.location}: ${value("location") || "-"}`,
      `${labels.service}: ${value("service") || "-"}`,
      `${labels.details}: ${value("details") || "-"}`
    ];

    return lines.join("\n");
  }

  function hasMinimumInput() {
    return Boolean(value("location") || value("details"));
  }

  function updateWhatsapp() {
    const message = buildMessage();
    if (whatsapp) {
      whatsapp.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    }
  }

  form.addEventListener("input", updateWhatsapp);
  updateWhatsapp();

  if (whatsapp) {
    whatsapp.addEventListener("click", (event) => {
      if (!hasMinimumInput()) {
        event.preventDefault();
        if (status) {
          status.textContent = labels.missing;
        }
      }
    });
  }

  if (copy) {
    copy.addEventListener("click", async () => {
      const message = buildMessage();
      if (!hasMinimumInput()) {
        if (status) {
          status.textContent = labels.missing;
        }
        return;
      }

      try {
        await navigator.clipboard.writeText(message);
        if (status) {
          status.textContent = labels.copied;
        }
      } catch (error) {
        const temp = document.createElement("textarea");
        temp.value = message;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        temp.remove();
        if (status) {
          status.textContent = labels.copied;
        }
      }
    });
  }
})();
