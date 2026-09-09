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
      endpoint: "http://localhost:8787/api/contact",
      buttonLabel: "Open email app",
      explanation: "This form opens your email application with a draft. Send the email there to complete your message.",
      successMessage: "Your email app should now be ready with the message.",
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
