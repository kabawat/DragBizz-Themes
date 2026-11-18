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
  id: "temp_F",
  name: "Stationery & Office",
  industry: "Stationery & Office",
  sections: [
    header({
      announcement:
        "📓 School, College & Corporate Office Orders: Buy 5+ Packs and Save up to 25% Instantly",
      search_placeholder:
        "Search Leuchtturm, Lamy, Midori, A4 Paper, Gel Pens...",
      cart_label: "Supplies",
    }),
    footer({
      about:
        "Serving academic institutions, creative studios, and modern businesses with precision paper, ergonomic fountain pens, and desk organizers.",
      email_label: "Inquiries & Orders:",
      phone_label: "Helpline:",
      whatsapp_label: "WhatsApp:",
      links_heading: "Stationery Departments",
      promise_heading: "Environmental & Paper Pledge",
      newsletter_enabled: true,
      newsletter_heading: "Desk & Writing Newsletter",
      newsletter_text:
        "Get our monthly curation of desk setups, journal templates, and seasonal student discount codes.",
      newsletter_placeholder: "Enter your email",
      newsletter_button: "Subscribe",
      newsletter_success: "Subscribed to Scholar & Co. stationery dispatches!",
      copyright: "All rights reserved.",
    }),
    hero(
      {
        badge: "School, University & Corporate Office Supplies",
        heading: "Craft Ideas with Precision Paper & Writing Tools.",
        text: "German-engineered Leuchtturm1917 journals, Lamy fountain pens, bleedproof Midori paper, and student exam bundles. Designed for scholars, creators, and modern workspaces.",
        image: "",
        image_alt: "",
        card_enabled: true,
        card_label: "Institutional & School Packs",
        card_tag: "Save Up to 25%",
        card_heading: "Ordering for a school, college, or team?",
        card_text:
          "Get volume discounts applied directly in cart on notebooks, copier paper reams, and exam survival packs.",
        card_link_label: "Explore Notebooks & Planners",
        card_link: "/categories/notebooks-planners",
      },
      ["button", "stat", "card_row"],
    ),
    categoryList({
      heading: "Explore Collections & Departments",
      count_label: "Supplies",
      fallback_text: "Explore collection",
    }),
    featuredProducts({
      eyebrow: "Scholars' Curation",
      heading: "Featured Notebooks & Instruments",
      link_label: "See All Supplies",
      link: "#stationery-catalog",
      limit: 4,
    }),
    catalogExplorer({
      eyebrow: "Organized Stationery Supplies",
      title: "School, Office & Fine Stationery",
      count_label: "office & study tools",
      search_placeholder: "Search Leuchtturm, Lamy, dot grid, paper...",
      empty_title: "No stationery items found",
      empty_text: "Try searching for other journals, pens, or art sets.",
    }),
  ],
  pages: {
    category: {
      eyebrow: "Stationery Department",
      text: "Curated items in {category}.",
      title: "{category} Supplies",
    },
    search: {
      eyebrow: "Supplies Search",
      heading: 'Search Results for "{query}"',
      heading_empty: "Search Stationery",
      text: "Showing school, office, and fine art supplies matching your search.",
      title: 'Results for "{query}"',
      title_empty: "All Stationery Supplies",
    },
    product: {
      related_heading: "Complementary Stationery in {category}",
      labels: [
        [
          "loading_stationery_paper_details",
          "Loading stationery paper details...",
        ],
        ["sold_out", "Sold Out"],
        ["select_option_pack_quantity", "Select Option / Pack Quantity"],
        ["paper_tool_craftsmanship", "Paper & Tool Craftsmanship:"],
        ["ruling", "Ruling:"],
        ["binding", "Binding:"],
      ],
    },
  },
  blocks: {
    header: [
      [
        "nav_link",
        {
          label: "All Supplies",
          link: "/#stationery-catalog",
          highlight: false,
        },
      ],
      [
        "nav_link",
        {
          label: "Notebooks & Dot Grids",
          link: "/categories/notebooks-planners",
          highlight: false,
        },
      ],
      [
        "nav_link",
        {
          label: "Fountain Pens & Inks",
          link: "/categories/pens-writing",
          highlight: false,
        },
      ],
      [
        "nav_link",
        {
          label: "Desk Tools & Paper",
          link: "/categories/desk-organizers",
          highlight: false,
        },
      ],
      [
        "nav_link",
        {
          label: "Exam Kits & Art Sets",
          link: "/categories/art-bundles",
          highlight: false,
        },
      ],
    ],
    footer: [
      [
        "link",
        {
          label: "Leuchtturm & Midori Journals",
          link: "/categories/notebooks-planners",
        },
      ],
      [
        "link",
        {
          label: "Lamy Fountain Pens & Nibs",
          link: "/categories/pens-writing",
        },
      ],
      [
        "link",
        {
          label: "A4 Copier Paper & Desk Caddies",
          link: "/categories/desk-organizers",
        },
      ],
      [
        "link",
        {
          label: "Student Semester Exam Bundles",
          link: "/categories/art-bundles",
        },
      ],
      ["promise", { text: "100% Acid-Free & Archival Paper" }],
      ["promise", { text: "FSC-Certified Sustainable Forestry" }],
      ["promise", { text: "Non-Toxic Vegetable Inks" }],
      ["promise", { text: "Recyclable Plastic-Free Packaging" }],
      ["legal_link", { label: "Institutional Terms", link: "/" }],
      ["legal_link", { label: "Return Guidelines", link: "/" }],
      ["legal_link", { label: "Paper Care", link: "/" }],
    ],
    hero: [
      [
        "button",
        {
          label: "Shop Stationery Catalog",
          link: "/#stationery-catalog",
          style: "primary",
        },
      ],
      [
        "button",
        {
          label: "Student Exam Bundles",
          link: "/categories/art-bundles",
          style: "secondary",
        },
      ],
      ["stat", { value: "120 GSM", label: "Ink-Proof Acid-Free" }],
      ["stat", { value: "Bulk Tiers", label: "Up to 25% Off Packs" }],
      ["stat", { value: "GST Invoice", label: "Corporate Procurement" }],
      [
        "card_row",
        {
          label: "Buy 5 to 9 Units:",
          value: "Save 10% Instantly",
          tone: "primary",
        },
      ],
      [
        "card_row",
        {
          label: "Buy 10 to 19 Units:",
          value: "Save 18% Instantly",
          tone: "primary",
        },
      ],
      [
        "card_row",
        {
          label: "Buy 20+ Units:",
          value: "Save 25% Corporate Tier",
          tone: "success",
        },
      ],
    ],
  },
});
