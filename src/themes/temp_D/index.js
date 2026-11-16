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
  id: "temp_D",
  name: "Fashion & Handloom",
  sections: [
    header({
      announcement:
        "Complimentary insured delivery on Indian handloom orders above ₹2,000",
      search_placeholder: "Search collection...",
      cart_label: "Bag",
    }),
    footer({
      about:
        "An ongoing archival journey across India’s historic weaving clusters. We work directly with generational master artisans to sustain slow, intentional handloom couture.",
      note: "GI-Tagged Certified Indian Handlooms",
      phone_label: "Atelier Concierge:",
      email_label: "Inquiries:",
      whatsapp_label: "WhatsApp Salon:",
      links_heading: "Archival Collections",
      promise_heading: "Artisan Guild Commitments",
      newsletter_enabled: true,
      newsletter_heading: "Private Salon & Dispatches",
      newsletter_text:
        "Receive private previews of limited loom batches, seasonal lookbooks, and textile histories.",
      newsletter_placeholder: "Your email address",
      newsletter_button: "Request Lookbook",
      newsletter_success: "Welcome to the private circle of Aura Atelier.",
      copyright: "All rights preserved.",
    }),
    hero(
      {
        badge: "The Heritage Handloom Atelier — Chapter 2025",
        heading: "Woven by Hand.",
        heading_accent: "Draped for Eternity.",
        text: "Preserving India’s master weaving traditions. Pure Mulberry Katan silks from Varanasi, organic hand-spun Khadi cottons, European flax linens, and hand-embroidered Ladakhi Cashmere shawls.",
        card_enabled: true,
        image:
          "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1000&auto=format&fit=crop&q=80",
        image_alt: "Heritage Silk Weave",
        card_label: "Featured Archive",
        card_heading: "Katan Mulberry Silk Saree",
        card_text: "Woven with electroplated gold zari in Varanasi",
      },
      ["button", "stat"],
    ),
    categoryList({
      eyebrow: "The Curation",
      heading: "Collections & Departments",
      count_label: "Creations",
      fallback_text: "Curated collection",
    }),
    featuredProducts({
      eyebrow: "Handpicked Heirlooms",
      heading: "Featured Masterpieces",
      link_label: "View Complete Archive",
      link: "#fashion-catalog",
      limit: 4,
    }),
    catalogExplorer({
      eyebrow: "The Lookbook Archive",
      title: "Curated Textile & Apparel Archive",
      count_label: "curated heirloom pieces",
      search_placeholder: "Search silk, linen, handblock, pashmina...",
      empty_title: "No textile pieces found",
      empty_text: "Try refining your weave or fabric search parameters.",
    }),
  ],
  pages: {
    category: {
      eyebrow: "Haute Department",
      text: "Artisanal pieces in {category}.",
      title: "{category} Collection",
    },
    search: {
      eyebrow: "Textile Discovery",
      heading: 'Search Results for "{query}"',
      heading_empty: "Search Lookbook",
      text: "Search across pure mulberry silks, organic khadi cottons, European linens, and block-printed textiles.",
      title: 'Pieces matching "{query}"',
      title_empty: "All Archival Pieces",
    },
    product: {
      related_heading: "Related Creations",
      related_eyebrow: "Harmonious Weaves",
    },
  },
  blocks: {
    header: [
      [
        "nav_link",
        { label: "Collection", link: "/#fashion-catalog", highlight: false },
      ],
      [
        "nav_link",
        { label: "Silks", link: "/categories/silk-sarees", highlight: false },
      ],
      [
        "nav_link",
        {
          label: "Pure Linen",
          link: "/categories/linen-kurtas",
          highlight: false,
        },
      ],
      [
        "nav_link",
        {
          label: "Running Fabrics",
          link: "/categories/fabrics-meters",
          highlight: false,
        },
      ],
      [
        "nav_link",
        {
          label: "Pashmina & Jackets",
          link: "/categories/jackets-shawls",
          highlight: false,
        },
      ],
    ],
    footer: [
      [
        "link",
        {
          label: "Varanasi Katan & Tussar Silks",
          link: "/categories/silk-sarees",
        },
      ],
      [
        "link",
        {
          label: "Pure French Washed Linens",
          link: "/categories/linen-kurtas",
        },
      ],
      [
        "link",
        {
          label: "Dabu Mud-Resist Block Prints",
          link: "/categories/fabrics-meters",
        },
      ],
      [
        "link",
        {
          label: "Ladakhi Pashmina Jamawar",
          link: "/categories/jackets-shawls",
        },
      ],
      ["promise", { text: "Fair-Wage Direct Artisan Sourcing" }],
      ["promise", { text: "Zero Synthetic or Polyester Blends" }],
      ["promise", { text: "Natural Plant & Mineral Dyes" }],
      ["promise", { text: "Traceable Cluster Provenance" }],
      ["legal_link", { label: "Provenance Manifesto", link: "/" }],
      ["legal_link", { label: "Textile Care", link: "/" }],
      ["legal_link", { label: "Bespoke Concierge", link: "/" }],
    ],
    hero: [
      [
        "button",
        {
          label: "Explore The Collection",
          link: "/#fashion-catalog",
          style: "primary",
        },
      ],
      [
        "button",
        {
          label: "Heritage Silks",
          link: "/categories/silk-sarees",
          style: "secondary",
        },
      ],
      ["stat", { value: "100%", label: "Pure Silk & Flax" }],
      ["stat", { value: "24 Days", label: "Avg Handloom Weave" }],
      ["stat", { value: "Direct", label: "Master Artisan Guilds" }],
    ],
  },
});
