import {
  buildTheme,
  catalogExplorer,
  categoryList,
  featuredProducts,
  footer,
  header,
  hero,
} from "../shared.js";

export default buildTheme({
  id: "temp_C",
  name: "Pharmacy & Healthcare",
  sections: [
    header({
      announcement: "Licensed Pharmacy Drug License: DL-2024-8849",
      helpline_label: "24/7 Pharmacist Consultation Helpline:",
      helpline_fallback: "24/7 Pharmacist Support",
      search_placeholder: "Search Dolo, Augmentin, Paracetamol, BP Monitor...",
      cart_label: "Basket",
    }),
    footer({
      about:
        "Govt-Licensed Retail Pharmacy. Dispensing authentic medicines, pediatric care, diabetes diagnostics, and surgical equipment with full batch traceability.",
      note: "Retail Drug License No: DL-2024-8849 (Form 20B & 21B)",
      phone_label: "Pharmacist On Duty Helpline:",
      whatsapp_label: "WhatsApp Consultation:",
      email_label: "Pharmacist Email:",
      links_heading: "Specialized Divisions",
      promise_heading: "Regulatory & Safety Compliance",
      help_heading: "Emergency Pharmacist Line",
      help_text:
        "Have questions about drug interactions, contraindications, or missed dosages?",
      copyright: "All rights reserved.",
    }),
    hero(
      {
        badge: "Licensed Pharmacy & Certified Pharmacist Supervision",
        heading: "Genuine Medicines & Expert Healthcare, Delivered Safely.",
        text: "Authentic prescription pharmaceuticals, pain relief, chronic disease management, and verified diagnostic monitors. Temperature-controlled delivery and pharmacist verification.",
        image: "",
        image_alt: "",
        card_enabled: true,
        card_label: "Quick Prescription Order",
        card_tag: "Pharmacist Verified",
        card_heading: "Have a doctor prescription?",
        card_text:
          "Simply browse your prescribed medicines below or order with your verified prescription. Our team verifies dosages before fulfillment.",
        card_link_label: "View Prescription (Rx) Section",
        card_link: "/categories/prescription-rx",
      },
      ["button", "stat", "card_step"],
    ),
    categoryList({
      heading: "Browse Healthcare Departments",
      count_label: "items",
    }),
    featuredProducts({
      eyebrow: "Doctor Recommended",
      heading: "Essential Daily Healthcare",
      link_label: "See All Products",
      link: "#pharmacy-catalog",
      limit: 4,
    }),
    catalogExplorer({
      eyebrow: "Pharmacy Dispensing Catalog",
      title: "Pharmacy & Healthcare Catalog",
      count_label: "verified health products",
      search_placeholder: "Search medicine, salt, brand...",
      empty_title: "No medicines found",
      empty_text: "Try searching by generic salt composition or brand name.",
    }),
  ],
  pages: {
    category: {
      eyebrow: "Healthcare Department",
      text: "Healthcare items in {category}.",
      title: "{category} Section",
    },
    search: {
      eyebrow: "Clinical Medicine Search",
      heading: 'Search Results for "{query}"',
      heading_empty: "Search Medicines",
      text: "Showing pharmaceutical results matching brand name, active salt composition, or manufacturer.",
      title: 'Results for "{query}"',
      title_empty: "All Healthcare Products",
    },
    product: {
      related_heading: "Similar Healthcare Products in {category}",
    },
  },
  blocks: {
    header: [
      [
        "nav_link",
        {
          label: "All Medicines",
          link: "/#pharmacy-catalog",
          highlight: false,
        },
      ],
      [
        "nav_link",
        {
          label: "Pain & Fever",
          link: "/categories/pain-fever",
          highlight: false,
        },
      ],
      [
        "nav_link",
        {
          label: "Prescription (Rx)",
          link: "/categories/prescription-rx",
          highlight: true,
        },
      ],
      [
        "nav_link",
        {
          label: "Vitamins & Wellness",
          link: "/categories/vitamins-nutrition",
          highlight: false,
        },
      ],
      [
        "nav_link",
        {
          label: "Health Devices",
          link: "/categories/devices-monitors",
          highlight: false,
        },
      ],
    ],
    footer: [
      [
        "link",
        { label: "Fever, Cold & Analgesics", link: "/categories/pain-fever" },
      ],
      [
        "link",
        {
          label: "Prescription Antibiotics & Cardiac",
          link: "/categories/prescription-rx",
        },
      ],
      [
        "link",
        {
          label: "Supplements & Immunity",
          link: "/categories/vitamins-nutrition",
        },
      ],
      [
        "link",
        {
          label: "Digital BP & Sugar Monitors",
          link: "/categories/devices-monitors",
        },
      ],
      ["promise", { text: "Verified by Registered Pharmacists" }],
      ["promise", { text: "Schedule H/H1 Prescription Protocols" }],
      ["promise", { text: "2°C – 8°C Cold Chain Logistics" }],
      ["promise", { text: "Barcode & Batch Number Audits" }],
      ["legal_link", { label: "Drug Dispensation Policy", link: "/" }],
      ["legal_link", { label: "Prescription Verification", link: "/" }],
      ["legal_link", { label: "Privacy Policy", link: "/" }],
    ],
    hero: [
      [
        "button",
        {
          label: "Order Medicines & Healthcare",
          link: "/#pharmacy-catalog",
          style: "primary",
        },
      ],
      [
        "button",
        {
          label: "Upload Rx Prescription",
          link: "/categories/prescription-rx",
          style: "secondary",
        },
      ],
      ["stat", { value: "100% Genuine", label: "Batch Verified Drugs" }],
      ["stat", { value: "24/7 Support", label: "Registered Pharmacists" }],
      ["stat", { value: "Safe Transit", label: "Tamper-Proof Seal" }],
      [
        "card_step",
        { text: "Select doctor-prescribed medicine or OTC health device" },
      ],
      [
        "card_step",
        { text: "Rx items checked against official medical database" },
      ],
      [
        "card_step",
        { text: "Dispensed directly by licensed clinical pharmacists" },
      ],
    ],
  },
});
