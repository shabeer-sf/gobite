import { MenuItem, Order } from "./types";

export const HOTEL_NAME = "Gobite Premium Dining";

export const CATEGORIES = [
  "All",
  "Appetizers",
  "Main Course",
  "Desserts",
  "Beverages",
];

export const COMMON_ALLERGIES = [
  "Peanuts",
  "Dairy",
  "Gluten",
  "Shellfish",
  "Soy",
  "Eggs",
  "Tree Nuts",
  "Fish",
];

export const AVAILABLE_TABLES = [
  "T-01",
  "T-02",
  "T-03",
  "T-04",
  "T-05",
  "T-06",
  "T-07",
  "T-08",
  "T-09",
  "T-10",
  "T-11",
  "T-12",
  "T-13",
  "T-14",
  "T-15",
  "T-16",
  "T-17",
  "T-18",
  "T-19",
  "T-20",
  "Bar-1",
  "Bar-2",
  "Patio",
  "VIP-1",
  "VIP-2",
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "1",
    name: "Crispy Calamari",
    description:
      "Tender squid rings, lightly battered and fried to golden perfection. Served with spicy marinara.",
    price: 12.99,
    category: "Appetizers",
    image:
      "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=800",
    popular: true,
    available: true,
  },
  {
    id: "2",
    name: "Classic Bruschetta",
    description:
      "Grilled country bread topped with Roma tomatoes, fresh basil, garlic, and extra virgin olive oil.",
    price: 8.99,
    category: "Appetizers",
    image:
      "https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=800",
    available: true,
  },
  {
    id: "3",
    name: "Spicy Chicken Wings",
    description:
      "Jumbo wings tossed in our signature buffalo sauce, served with blue cheese dip and celery.",
    price: 14.5,
    category: "Appetizers",
    image:
      "https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=800",
    available: true,
  },
  {
    id: "4",
    name: "Grilled Salmon",
    description:
      "Atlantic salmon fillet grilled with lemon herb butter, served with asparagus and wild rice.",
    price: 24.99,
    category: "Main Course",
    image:
      "https://images.pexels.com/photos/3763847/pexels-photo-3763847.jpeg?auto=compress&cs=tinysrgb&w=800",
    popular: true,
    available: true,
  },
  {
    id: "5",
    name: "Gourmet Burger",
    description:
      "Angus beef patty, caramelized onions, gruyere cheese, arugula, and truffle mayo on a brioche bun.",
    price: 18.5,
    category: "Main Course",
    image:
      "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800",
    available: true,
  },
  {
    id: "6",
    name: "Truffle Pasta",
    description:
      "Fresh tagliatelle tossed in a creamy truffle mushroom sauce topped with parmesan shavings.",
    price: 21.0,
    category: "Main Course",
    image:
      "https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg?auto=compress&cs=tinysrgb&w=800",
    available: true,
  },
  {
    id: "7",
    name: "Margherita Pizza",
    description:
      "San Marzano tomato sauce, fresh mozzarella di bufala, basil, and extra virgin olive oil.",
    price: 16.0,
    category: "Main Course",
    image:
      "https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=800",
    available: true,
  },
  {
    id: "8",
    name: "Molten Lava Cake",
    description:
      "Warm chocolate cake with a gooey center, served with a scoop of vanilla bean ice cream.",
    price: 9.99,
    category: "Desserts",
    image:
      "https://images.pexels.com/photos/3026804/pexels-photo-3026804.jpeg?auto=compress&cs=tinysrgb&w=800",
    popular: true,
    available: true,
  },
  {
    id: "9",
    name: "Tiramisu",
    description:
      "Classic Italian dessert made with coffee-soaked ladyfingers and mascarpone cream.",
    price: 8.5,
    category: "Desserts",
    image:
      "https://images.pexels.com/photos/691152/pexels-photo-691152.jpeg?auto=compress&cs=tinysrgb&w=800",
    available: true,
  },
  {
    id: "10",
    name: "Fresh Orange Juice",
    description: "Freshly squeezed oranges, served chilled.",
    price: 5.0,
    category: "Beverages",
    image:
      "https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg?auto=compress&cs=tinysrgb&w=800",
    available: true,
  },
  {
    id: "11",
    name: "Iced Coffee",
    description: "Cold brew coffee served over ice with a splash of milk.",
    price: 4.5,
    category: "Beverages",
    image:
      "https://images.pexels.com/photos/2615323/pexels-photo-2615323.jpeg?auto=compress&cs=tinysrgb&w=800",
    available: true,
  },
];

export const DUMMY_ORDERS: Order[] = [
  {
    id: "ORD-8821",
    restaurantId: "res-sushi",
    restaurantName: "Zen Sushi & Bar",
    tableNumber: "T-12",
    date: new Date(Date.now() - 172800000).toISOString(),
    status: "completed",
    total: 30.8,
    customerName: "John Doe",
    customerPhone: "555-0123",
    items: [
      {
        id: "s1",
        name: "Dragon Roll",
        description: "Eel and cucumber topped with avocado",
        price: 18.0,
        category: "Sushi",
        image:
          "https://images.pexels.com/photos/8951203/pexels-photo-8951203.jpeg?auto=compress&cs=tinysrgb&w=800",
        quantity: 1,
        orderType: "Dining",
        cartId: "s1-d",
        instructions: "No mayo",
      },
      {
        id: "s2",
        name: "Miso Soup",
        description: "Traditional Japanese soup",
        price: 5.0,
        category: "Soup",
        image:
          "https://images.pexels.com/photos/13014603/pexels-photo-13014603.jpeg?auto=compress&cs=tinysrgb&w=800",
        quantity: 2,
        orderType: "Dining",
        cartId: "s2-d",
      },
    ],
  },
  {
    id: "ORD-1029",
    restaurantId: "res-burger",
    restaurantName: "Burger Kingdom",
    tableNumber: "Takeaway",
    date: new Date(Date.now() - 432000000).toISOString(),
    status: "completed",
    total: 27.5,
    customerName: "Jane Smith",
    customerPhone: "555-0456",
    items: [
      {
        id: "b1",
        name: "Double Whopper Meal",
        description: "Flame-grilled beef patty with fries",
        price: 12.5,
        category: "Burgers",
        image:
          "https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg?auto=compress&cs=tinysrgb&w=800",
        quantity: 2,
        orderType: "Takeaway",
        cartId: "b1-t",
      },
    ],
  },
];
