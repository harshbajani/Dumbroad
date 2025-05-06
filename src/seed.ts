import { getPayload } from "payload";
import config from "@payload-config";
import { stripe } from "./lib/stripe";

const categories = [
  {
    name: "All",
    slug: "all",
  },
  {
    name: "Business & Money",
    color: "#FFB347",
    slug: "business-money",
    subcategories: [
      { name: "Accounting", slug: "accounting" },
      {
        name: "Entrepreneurship",
        slug: "entrepreneurship",
      },
      { name: "Gigs & Side Projects", slug: "gigs-side-projects" },
      { name: "Investing", slug: "investing" },
      { name: "Management & Leadership", slug: "management-leadership" },
      {
        name: "Marketing & Sales",
        slug: "marketing-sales",
      },
      { name: "Networking, Careers & Jobs", slug: "networking-careers-jobs" },
      { name: "Personal Finance", slug: "personal-finance" },
      { name: "Real Estate", slug: "real-estate" },
    ],
  },
  {
    name: "Software Development",
    color: "#7EC8E3",
    slug: "software-development",
    subcategories: [
      { name: "Web Development", slug: "web-development" },
      { name: "Mobile Development", slug: "mobile-development" },
      { name: "Game Development", slug: "game-development" },
      { name: "Programming Languages", slug: "programming-languages" },
      { name: "DevOps", slug: "devops" },
    ],
  },
  {
    name: "Writing & Publishing",
    color: "#D8B5FF",
    slug: "writing-publishing",
    subcategories: [
      { name: "Fiction", slug: "fiction" },
      { name: "Non-Fiction", slug: "non-fiction" },
      { name: "Blogging", slug: "blogging" },
      { name: "Copywriting", slug: "copywriting" },
      { name: "Self-Publishing", slug: "self-publishing" },
    ],
  },
  {
    name: "Other",
    slug: "other",
  },
  {
    name: "Education",
    color: "#FFE066",
    slug: "education",
    subcategories: [
      { name: "Online Courses", slug: "online-courses" },
      { name: "Tutoring", slug: "tutoring" },
      { name: "Test Preparation", slug: "test-preparation" },
      { name: "Language Learning", slug: "language-learning" },
    ],
  },
  {
    name: "Self Improvement",
    color: "#96E6B3",
    slug: "self-improvement",
    subcategories: [
      { name: "Productivity", slug: "productivity" },
      { name: "Personal Development", slug: "personal-development" },
      { name: "Mindfulness", slug: "mindfulness" },
      { name: "Career Growth", slug: "career-growth" },
    ],
  },
  {
    name: "Fitness & Health",
    color: "#FF9AA2",
    slug: "fitness-health",
    subcategories: [
      { name: "Workout Plans", slug: "workout-plans" },
      { name: "Nutrition", slug: "nutrition" },
      { name: "Mental Health", slug: "mental-health" },
      { name: "Yoga", slug: "yoga" },
    ],
  },
  {
    name: "Design",
    color: "#B5B9FF",
    slug: "design",
    subcategories: [
      { name: "UI/UX", slug: "ui-ux" },
      { name: "Graphic Design", slug: "graphic-design" },
      { name: "3D Modeling", slug: "3d-modeling" },
      { name: "Typography", slug: "typography" },
    ],
  },
  {
    name: "Drawing & Painting",
    color: "#FFCAB0",
    slug: "drawing-painting",
    subcategories: [
      { name: "Watercolor", slug: "watercolor" },
      { name: "Acrylic", slug: "acrylic" },
      { name: "Oil", slug: "oil" },
      { name: "Pastel", slug: "pastel" },
      { name: "Charcoal", slug: "charcoal" },
    ],
  },
  {
    name: "Music",
    color: "#FFD700",
    slug: "music",
    subcategories: [
      { name: "Songwriting", slug: "songwriting" },
      { name: "Music Production", slug: "music-production" },
      { name: "Music Theory", slug: "music-theory" },
      { name: "Music History", slug: "music-history" },
    ],
  },
  {
    name: "Photography",
    color: "#FF6B6B",
    slug: "photography",
    subcategories: [
      { name: "Portrait", slug: "portrait" },
      { name: "Landscape", slug: "landscape" },
      { name: "Street Photography", slug: "street-photography" },
      { name: "Nature", slug: "nature" },
      { name: "Macro", slug: "macro" },
    ],
  },
];

const seed = async () => {
  try {
    console.log("Starting database seeding...");
    const payload = await getPayload({ config });

    const adminAccount = await stripe.accounts.create({});

    // create admin tenant
    const adminTenant = await payload.create({
      collection: "tenants",
      data: { name: "admin", slug: "admin", stripeAccountId: adminAccount.id },
    });

    //create admin user
    await payload.create({
      collection: "users",
      data: {
        email: "harshbajani7@gmail.com",
        password: "Admin@123",
        roles: ["super-admin"],
        username: "admin",
        tenants: [
          {
            tenant: adminTenant.id,
          },
        ],
      },
    });

    // First, let's clear existing categories to avoid conflicts
    console.log("Cleaning up existing categories...");
    try {
      await payload.delete({
        collection: "categories",
        where: {
          id: {
            exists: true,
          },
        },
      });
    } catch {
      console.log(
        "No existing categories to delete or error during deletion. Continuing..."
      );
    }

    console.log("Creating categories...");
    for (const category of categories) {
      try {
        // Check if category exists first
        const existing = await payload.find({
          collection: "categories",
          where: {
            slug: {
              equals: category.slug,
            },
          },
        });

        let parentCategory;

        if (existing.docs.length === 0) {
          console.log(`Creating category: ${category.name}`);
          parentCategory = await payload.create({
            collection: "categories",
            data: {
              name: category.name,
              slug: category.slug,
              color: category.color,
              parent: null,
            },
          });
        } else {
          console.log(`Category ${category.name} already exists, skipping...`);
          parentCategory = existing.docs[0];
        }

        if (category.subcategories && category.subcategories.length > 0) {
          for (const subcategory of category.subcategories) {
            const existingSub = await payload.find({
              collection: "categories",
              where: {
                slug: {
                  equals: subcategory.slug,
                },
              },
            });

            if (existingSub.docs.length === 0) {
              console.log(`Creating subcategory: ${subcategory.name}`);
              await payload.create({
                collection: "categories",
                data: {
                  name: subcategory.name,
                  slug: subcategory.slug,
                  parent: parentCategory?.id,
                },
              });
            } else {
              console.log(
                `Subcategory ${subcategory.name} already exists, skipping...`
              );
            }
          }
        }
      } catch (err) {
        console.error(`Error processing category ${category.name}:`, err);
      }
    }

    console.log("Seeding completed successfully!");
  } catch (err) {
    console.error("Error during seeding:", err);
  }
};

(async () => {
  try {
    await seed();
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Failed to seed database:", error);
  } finally {
    process.exit(0);
  }
})();
