// Add certificate images to assets/images/certificates, then enable an item.
// The full certificates section disappears automatically until at least one
// enabled item has a real image path.
export const certificateWidgets = [
  {
    id: "certificates",
    enabled: true,
    eyebrow: "CERTIFICATES / 04",
    title: "Certificates",
    description: "Training and certificates can be added as an accessible carousel.",
    items: [
      {
        id: "example-disabled-certificate",
        enabled: false,
        title: "Certificate title",
        issuer: "Issuer",
        image: "./assets/images/certificates/certificate-name.jpg",
        credentialUrl: "",
        alt: "Certificate title",
      },
    ],
  },
];
