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
  id: "temp_E",
  name: "Computers & Electronics",
  sections: [
    header({
      announcement:
        "⚡ Mega Electronics Carnival — Up to ₹15,000 Instant Bank Discount + 12 Months No-Cost EMI on All Major Banks",
      search_placeholder: "Search MacBook, Sony OLED, PS5, Bose, ROG...",
      cart_label: "Cart",
    }),
    footer({
      about:
        "India’s authorized premier retailer for Apple, Sony, ASUS ROG, Bose, and Canon. Comprehensive warranty protection and verified electronics.",
      phone_label: "Tech Support Helpline:",
      email_label: "Support Email:",
      whatsapp_label: "WhatsApp:",
      links_heading: "Electronics Categories",
      promise_heading: "Customer Assurance",
      newsletter_enabled: true,
      newsletter_heading: "Tech Flash Alerts",
      newsletter_text:
        "Be the first to hear about midnight tech drops, launch pre-orders, and clearance sales.",
      newsletter_placeholder: "Your email address",
      newsletter_button: "Subscribe",
      newsletter_success: "Subscribed to Electrotech tech alerts!",
      copyright: "All rights reserved.",
    }),
    hero(
      {
        badge: "Mega Electronics Fest 2025",
        heading: "Next-Level Computing, OLED Vision & Studio Sound.",
        text: "Experience the Apple M3 Pro, Sony 4K XR OLED, Bose Spatial Audio, and PlayStation 5 Slim. 100% brand warranties, instant trade-in valuations, and No-Cost EMI.",
        image: "",
        image_alt: "",
        card_enabled: true,
        card_label: "Limited Festival Offer",
        card_tag: "HDFC & ICICI Bank Deals",
        card_heading: "Trade-In Your Old Tech",
        card_text:
          "Upgrade your old laptop, television, or console and get up to ₹20,000 exchange bonus credited instantly at checkout.",
        card_link_label: "View OLED TV & Audio Offers",
        card_link: "/categories/tvs-audio",
      },
      ["button", "stat", "card_row"],
    ),
    categoryList({
      heading: "Featured Departments",
      count_label: "Items",
      fallback_text: "Explore collection",
    }),
    featuredProducts({
      eyebrow: "Top Rated Hardware",
      heading: "Featured Flagships & Consoles",
      link_label: "See All Devices",
      link: "#electronics-catalog",
      limit: 4,
    }),
    catalogExplorer({
      eyebrow: "Electronics Mega Store",
      title: "Consumer Electronics & Gadgets",
      count_label: "devices with brand warranty",
      search_placeholder: "Search MacBook, OLED, PS5, Bose...",
      empty_title: "No electronics found",
      empty_text: "Try expanding your brand, category, or price filters.",
    }),
  ],
  pages: {
    category: {
      eyebrow: "Electronics Department",
      text: "Fine pieces in {category}.",
      title: "{category} Devices",
    },
    search: {
      eyebrow: "Hardware Search",
      heading: 'Search Results for "{query}"',
      heading_empty: "Search Electronics",
      text: "Showing consumer tech matching processors, models, audio specs, or brands.",
      title: 'Results for "{query}"',
      title_empty: "All Consumer Electronics",
    },
    product: {
      related_heading: "Similar Electronics in {category}",
    },
  },
  blocks: {
    header: [
      [
        "nav_link",
        {
          label: "All Electronics",
          link: "/#electronics-catalog",
          highlight: false,
        },
      ],
      [
        "nav_link",
        {
          label: "Laptops & MacBooks",
          link: "/categories/laptops-computing",
          highlight: false,
        },
      ],
      [
        "nav_link",
        {
          label: "OLED TVs & Soundbars",
          link: "/categories/tvs-audio",
          highlight: false,
        },
      ],
      [
        "nav_link",
        {
          label: "Headphones & Smartwatches",
          link: "/categories/headphones-wearables",
          highlight: false,
        },
      ],
      [
        "nav_link",
        {
          label: "Gaming & PS5",
          link: "/categories/gaming-consoles",
          highlight: false,
        },
      ],
    ],
    footer: [
      [
        "link",
        {
          label: "Apple MacBook Pro & ROG Laptops",
          link: "/categories/laptops-computing",
        },
      ],
      [
        "link",
        { label: "Sony Bravia 4K OLED TVs", link: "/categories/tvs-audio" },
      ],
      [
        "link",
        {
          label: "Bose & Sony ANC Headphones",
          link: "/categories/headphones-wearables",
        },
      ],
      [
        "link",
        {
          label: "PlayStation 5 Consoles & Games",
          link: "/categories/gaming-consoles",
        },
      ],
      ["promise", { text: "Official Indian Brand Warranty" }],
      ["promise", { text: "No Cost EMI on Credit & Debit Cards" }],
      ["promise", { text: "GST Invoicing with Input Tax Credit" }],
      ["promise", { text: "Free Demo & Wall Mount Installation" }],
      ["legal_link", { label: "Warranty Policy", link: "/" }],
      ["legal_link", { label: "Return & Replacement", link: "/" }],
      ["legal_link", { label: "GST Terms", link: "/" }],
    ],
    hero: [
      [
        "button",
        {
          label: "Shop Electronics Deals",
          link: "/#electronics-catalog",
          style: "primary",
        },
      ],
      [
        "button",
        {
          label: "MacBooks & Rigs",
          link: "/categories/laptops-computing",
          style: "secondary",
        },
      ],
      ["stat", { value: "No Cost EMI", label: "Up to 24 Months" }],
      ["stat", { value: "₹15,000", label: "Instant Bank Discount" }],
      ["stat", { value: "Doorstep Delivery", label: "Free Installation" }],
      [
        "card_row",
        {
          label: "Credit Card No-Cost EMI:",
          value: "Available on all items",
          tone: "success",
        },
      ],
      [
        "card_row",
        {
          label: "Free On-Site Installation:",
          value: "OLED TVs & Audio",
          tone: "default",
        },
      ],
      [
        "card_row",
        {
          label: "Extended Protect+:",
          value: "Free 1 Year Coverage",
          tone: "primary",
        },
      ],
    ],
  },
});
