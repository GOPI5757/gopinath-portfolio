// Edit your contact details and labels here. Set `enabled: false` to hide an item.
export const contactWidgets = [
  {
    id: "contact",
    enabled: true,
    eyebrow: "CONTACT / 05",
    title: "Let’s build something playable.",
    description: "Get in touch by email, or prepare a message using the form below.",
    bar: {
      enabled: true,
      label: "Contact",
    },
    form: {
      enabled: true,
      title: "Prepare an email",
      recipientEmail: "sgopinath2006@gmail.com",
      deliveryMode: "mailto", // `mailto` works with an email app. Use `endpoint` with server/contact-server.example.js.
      endpoint: "", // Set only if you connect a real sending service.
      maxWidth: "36rem",
      showGmail: true,
      gmailLabel: "Open Gmail",
      showCopy: true,
      copyLabel: "Copy message",
      timeoutMs: 15000,
      buttonLabel: "Open email app",
      explanation: "Choose your email app or Gmail to prepare a draft, then send it there. You can also copy your message. This website does not send email directly.",
      successMessage: "Email draft requested. If nothing opened, use Gmail or copy your message. Your message has not been sent by this website.",
      fields: [
        { id: "name", enabled: true, label: "Name", type: "text", required: true, placeholder: "Your name" },
        { id: "email", enabled: true, label: "Email", type: "email", required: true, placeholder: "you@example.com" },
        { id: "message", enabled: true, label: "Message", type: "textarea", required: true, placeholder: "Tell me about your project" },
      ],
    },
    directDetails: [
      { id: "email", enabled: true, label: "Email", value: "sgopinath2006@gmail.com", href: "mailto:" },
      { id: "phone", enabled: true, label: "Phone", value: "+91 93846 39220", href: "tel:" },
    ],
    socialLinks: [
      { id: "linkedin", enabled: true, label: "LinkedIn", url: "https://www.linkedin.com/in/gopinath-s-5b994b32b/", icon: "in" },
      { id: "github", enabled: true, label: "GitHub", url: "https://github.com/GOPI5757", icon: "<>" },
      { id: "itch", enabled: true, label: "itch.io", url: "https://gopi5757.itch.io/", icon: "◉" },
    ],
  },
];
