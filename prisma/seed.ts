import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getProducts().map((product) => {
      return db.product.create({ data: product });
    })
  );

  await Promise.all(
    getCategories().map((category) => {
      return db.category.create({ data: category });
    })
  );
}

seed();

function getProducts() {
  return [
    {
      productName: "Chrome",
      productVendor: "Google",
      productDescription: "Browser",
    },
    {
      productName: "Firefox",
      productVendor: "Mozilla",
      productDescription: "Browser",
    },
    {
      productName: "VSCode",
      productVendor: "Microsoft",
      productDescription: "IDE",
    },
    {
      productName: "VIM",
      productVendor: "Linux",
      productDescription: "Terminal",
    },
  ];
}

function getCategories() {
  return [
    {
      categoryName: "Browser",
    },
    {
      categoryName: "Video",
    },
    {
      categoryName: "PDF",
    },
    {
      categoryName: "Design",
    },
    {
      categoryName: "Software",
    },
  ];
}
