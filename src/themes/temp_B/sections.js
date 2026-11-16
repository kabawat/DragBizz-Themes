import {
  checkbox,
  image,
  linkFields,
  number,
  select,
  text,
  textarea,
  url,
} from "../../fields.js";

export const header = {
  type: "header",
  name: "Header",
  templates: ["header"],
  settings: [
    text(
      "announcement",
      "Announcement bar",
      "⚡ 15-Minute Guaranteed Delivery to Pin: 110001 | Free Delivery on Orders Over ₹199!",
      200,
    ),
    checkbox("show_location", "Show delivery location", true),
    text("location_label", "Location label", "Delivery Location", 40),
    text("location_text", "Location", "New Delhi, 110001", 60),
    text(
      "search_placeholder",
      "Search placeholder",
      "Search atta, milk, mangoes, ghee, paneer...",
      80,
    ),
    text("cart_items_label", "Cart items label", "Items", 20),
  ],
};

export const footer = {
  type: "footer",
  name: "Footer",
  templates: ["footer"],
  settings: [
    textarea(
      "about",
      "About the store",
      "India's favorite 15-minute neighborhood grocery. Fresh dairy, farm-picked greens, organic staples, and snacks delivered fresh every day.",
    ),
    text(
      "hours",
      "Opening hours",
      "Delivery Hours: 6:00 AM – 11:30 PM (Daily)",
      80,
    ),
    text("links_heading", "Links heading", "Popular Categories", 60),
    text("promise_heading", "Promise heading", "Our Freshness Promise", 60),
    text("help_heading", "Help heading", "Instant Help & Queries", 60),
    textarea(
      "help_text",
      "Help text",
      "Need assistance with your ongoing 15-minute order? Our quick-support team is active.",
      240,
    ),
  ],
  blocks: {
    link: { name: "Footer link", limit: 8, settings: linkFields },
    promise: {
      name: "Promise point",
      limit: 8,
      settings: [text("text", "Text", "", 80)],
    },
    legal_link: { name: "Bottom link", limit: 5, settings: linkFields },
  },
  maxBlocks: 21,
};

export const hero = {
  type: "hero",
  name: "Hero banner",
  templates: ["home"],
  settings: [
    text("badge", "Badge", "Instant 15-Minute Supermarket Delivery", 60),
    text(
      "heading",
      "Heading",
      "Farm Fresh Produce & Daily Groceries at Your Door.",
    ),
    textarea(
      "text",
      "Text",
      "Harvested at dawn, quality checked at noon, and delivered to your kitchen in 15 minutes. Pure cow ghee, stone-ground flours, hydroponic greens, and seasonal fruits.",
    ),
    image("image", "Side image (shown instead of the coupon card)", ""),
    text("image_alt", "Side image description", "", 120),
    checkbox("offer_enabled", "Show coupon card", true),
    text("offer_label", "Coupon card label", "Special Grocery Deal", 40),
    text("coupon_label", "Coupon label", "Coupon Code", 30),
    text("coupon_code", "Coupon code", "FRESH50", 30),
    text("coupon_text", "Coupon text", "Flat ₹50 OFF on first 3 orders", 80),
    text("copy_label", "Copy button label", "COPY", 20),
  ],
  blocks: {
    button: {
      name: "Button",
      limit: 2,
      settings: [
        text("label", "Label", "Shop now", 40),
        url("link", "Link", "/#grocery-catalog"),
        select("style", "Style", ["primary", "secondary"], "primary"),
      ],
    },
    stat: {
      name: "Highlight",
      limit: 3,
      settings: [
        text("value", "Value", "", 30),
        text("label", "Label", "", 40),
      ],
    },
    offer_point: {
      name: "Coupon card point",
      limit: 4,
      settings: [text("text", "Text", "", 80)],
    },
  },
  maxBlocks: 9,
};

export const categoryList = {
  type: "category-list",
  name: "Category list",
  templates: ["home"],
  settings: [
    text("heading", "Heading", "Shop by Grocery Department", 80),
    text("link_label", "Link label", "View All", 40),
    url("link", "Link", "/#grocery-catalog"),
    text("count_label", "Item count label", "items", 20),
  ],
};

export const featuredProducts = {
  type: "featured-products",
  name: "Featured products",
  templates: ["home"],
  settings: [
    text("eyebrow", "Eyebrow", "Top Farm Picks", 40),
    text("heading", "Heading", "Daily Fresh & Super Savers", 80),
    text("link_label", "Link label", "See All Items", 40),
    url("link", "Link", "#grocery-catalog"),
    number("limit", "Products to show", 5, 1, 15),
  ],
};

export const catalogExplorer = {
  type: "catalog-explorer",
  name: "Product catalog",
  templates: ["home"],
  settings: [
    text("eyebrow", "Eyebrow", "15-Minute Instant Basket", 40),
    text("title", "Title", "Fresh Grocery Supermarket", 80),
    text("count_label", "Result count label", "fresh packs", 30),
    text(
      "search_placeholder",
      "Search placeholder",
      "Search atta, milk, mangoes, ghee...",
      80,
    ),
    text("empty_title", "No results title", "No grocery items found", 80),
    text(
      "empty_text",
      "No results text",
      "Try searching for other fruits, dairy, or staples.",
      160,
    ),
  ],
};
