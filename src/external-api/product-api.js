// ProductAPI.js
import productsData from './products.json';

export class ProductAPI {
  /**
   * Simulates fetching products from an API
   * @returns {Promise} Promise that resolves to products array
   */
  static async getProducts() {
    // Simulate network delay (300-800ms random)
    const delay = Math.random() * 500 + 300;
    await new Promise((resolve) => setTimeout(resolve, delay));

    // Simulate occasional network errors (5% chance)
    if (Math.random() < 0.05) {
      throw new Error('Network error: Failed to fetch products');
    }

    return productsData.products;
  }

  /**
   * Simulates fetching a single product by ID
   * @param {number} id - Product ID
   * @returns {Promise} Promise that resolves to a single product
   */
  static async getProductById(id) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const product = productsData.products.find((p) => p.id === id);

    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }

    return product;
  }

  /**
   * Get all unique categories
   * @returns {Promise} Promise that resolves to array of categories
   */
  static async getCategories() {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 200));

    const categories = [
      ...new Set(productsData.products.map((p) => p.category)),
    ];
    return categories.sort();
  }

  /**
   * Get price range of all products
   * @returns {Promise} Promise that resolves to min and max prices
   */
  static async getPriceRange() {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 200));

    const prices = productsData.products.map((p) => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }
}
