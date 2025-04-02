import request from "supertest";
import { expect, describe, it, jest } from "@jest/globals";
import { app } from "../app";

jest.mock("../models/product", () => {
  const mockModel = {
    find: jest.fn().mockImplementation(() => {
      return {
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn<any>().mockResolvedValue([
          {
            _id: "1",
            name: "Product 1",
            price: { currency: "67e583b361b43c3fabeec39d", amount: 200 },
            description: "Description 1",
            stock: 10,
            category: "67e5834112258a9780099bb5",
          },
          {
            _id: "2",
            name: "Product 2",
            price: { currency: "67e583b361b43c3fabeec39d", amount: 200 },
            description: "Description 2",
            stock: 10,
            category: "67e5834112258a9780099bb5",
          },
        ]),
      };
    }),
  };

  return {
    ProductModel: mockModel,
  };
});

describe("GET v1/products", () => {
  it("should return 200 and product list", async () => {
    const response = await request(app).get("/v1/products");

    expect(response.statusCode).toBe(200);
  });
});
