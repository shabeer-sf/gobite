"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { DUMMY_ORDERS, MENU_ITEMS } from "../utils/data";
import {
  CartItem,
  MenuItem,
  Order,
  OrderStatus,
  OrderType,
  User,
} from "../utils/types";

interface AddToCartParams {
  item: MenuItem;
  quantity: number;
  orderType: OrderType;
  instructions?: string;
  allergies?: string[];
  customAllergy?: string;
}

interface StoreContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  cart: CartItem[];
  addToCart: (params: AddToCartParams) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  updateOrderItemQuantity: (
    orderId: string,
    itemCartId: string,
    newQuantity: number,
  ) => void;
  addItemsToOrder: (orderId: string, newItems: CartItem[]) => void;
  updateOrderItemStatus: (
    orderId: string,
    itemCartId: string,
    status: "active" | "removed" | "unavailable",
    note?: string,
  ) => void;
  removeOrderItem: (orderId: string, itemCartId: string) => void;
  activeOrderId: string | null;
  setActiveOrder: (orderId: string | null) => void;
  menuItems: MenuItem[];
  updateMenuItemAvailability: (itemId: string, available: boolean) => void;
  restaurantId: string;
  tableNumber: string;
  setSessionInfo: (restId: string, table: string) => void;
  isLoading: boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: "gobite_web_user",
  CART: "gobite_web_cart",
  ORDERS: "gobite_web_orders",
  TABLE: "gobite_web_table",
  MENU: "gobite_web_menu",
};

export const StoreProvider = ({ children }: { children?: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [restaurantId, setRestaurantId] = useState("default");
  const [tableNumber, setTableNumber] = useState("");
  const [activeOrderId, setActiveOrder] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
        const storedCart = localStorage.getItem(STORAGE_KEYS.CART);
        const storedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
        const storedTable = localStorage.getItem(STORAGE_KEYS.TABLE);
        const storedMenu = localStorage.getItem(STORAGE_KEYS.MENU);

        if (storedUser) setUser(JSON.parse(storedUser));
        if (storedCart) setCart(JSON.parse(storedCart));
        if (storedOrders) {
          setOrders(JSON.parse(storedOrders));
        } else {
          setOrders(DUMMY_ORDERS);
        }
        if (storedTable) setTableNumber(storedTable);
        if (storedMenu) setMenuItems(JSON.parse(storedMenu));
      }
    } catch (e) {
      console.error("Error loading stored data:", e);
    } finally {
      setIsLoading(false);
      setIsInitialized(true);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (isInitialized && typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
      localStorage.setItem(STORAGE_KEYS.TABLE, tableNumber);
      localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(menuItems));
    }
  }, [user, cart, orders, tableNumber, menuItems, isInitialized]);

  const login = (newUser: User) => setUser(newUser);
  const logout = () => {
    setUser(null);
    setCart([]);
    setTableNumber("");
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.CART);
      localStorage.removeItem(STORAGE_KEYS.TABLE);
    }
  };

  const addToCart = ({
    item,
    quantity,
    orderType,
    instructions,
    allergies,
    customAllergy,
  }: AddToCartParams) => {
    const cleanInstructions = (instructions || "").trim();
    const cleanCustomAllergy = (customAllergy || "").trim();
    const sortedAllergies = [...(allergies || [])].sort().join(",");
    const cartId = `${item.id}-${orderType}-${cleanInstructions}-${sortedAllergies}-${cleanCustomAllergy}`;

    setCart((prev) => {
      const existing = prev.find((i) => i.cartId === cartId);
      if (existing) {
        return prev.map((i) =>
          i.cartId === cartId ? { ...i, quantity: i.quantity + quantity } : i,
        );
      }
      return [
        ...prev,
        {
          ...item,
          cartId,
          quantity,
          orderType,
          instructions: cleanInstructions,
          allergies: allergies?.sort(),
          customAllergy: cleanCustomAllergy,
        },
      ];
    });
  };

  const removeFromCart = (cartId: string) =>
    setCart((prev) => prev.filter((i) => i.cartId !== cartId));
  const updateQuantity = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartId);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.cartId === cartId ? { ...i, quantity } : i)),
    );
  };
  const clearCart = () => setCart([]);

  const addOrder = (order: Order) => setOrders((prev) => [order, ...prev]);
  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o)),
    );
  };
  const updateOrderItemQuantity = (
    orderId: string,
    itemCartId: string,
    newQuantity: number,
  ) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        const updatedItems = order.items.map((item) =>
          item.cartId === itemCartId
            ? { ...item, quantity: newQuantity }
            : item,
        );
        const newTotal = updatedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        );
        return { ...order, items: updatedItems, total: newTotal };
      }),
    );
  };
  const addItemsToOrder = (orderId: string, newItems: CartItem[]) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        const currentItems = [...order.items];
        newItems.forEach((newItem) => {
          const existingItemIndex = currentItems.findIndex(
            (i) => i.cartId === newItem.cartId,
          );
          if (
            existingItemIndex >= 0 &&
            (!currentItems[existingItemIndex].status ||
              currentItems[existingItemIndex].status === "active")
          ) {
            currentItems[existingItemIndex] = {
              ...currentItems[existingItemIndex],
              quantity:
                currentItems[existingItemIndex].quantity + newItem.quantity,
            };
          } else {
            currentItems.push({ ...newItem, status: "active" });
          }
        });
        const newTotal = currentItems.reduce(
          (sum, item) =>
            item.status === "removed" || item.status === "unavailable"
              ? sum
              : sum + item.price * item.quantity,
          0,
        );
        return { ...order, items: currentItems, total: newTotal };
      }),
    );
  };
  const updateOrderItemStatus = (
    orderId: string,
    itemCartId: string,
    status: "active" | "removed" | "unavailable",
    note?: string,
  ) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        const updatedItems = order.items.map((item) =>
          item.cartId === itemCartId
            ? { ...item, status, staffNote: note }
            : item,
        );
        const newTotal = updatedItems.reduce(
          (sum, item) =>
            item.status === "removed" || item.status === "unavailable"
              ? sum
              : sum + item.price * item.quantity,
          0,
        );
        return { ...order, items: updatedItems, total: newTotal };
      }),
    );
  };
  const removeOrderItem = (orderId: string, itemCartId: string) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        const updatedItems = order.items.filter((i) => i.cartId !== itemCartId);
        const newTotal = updatedItems.reduce(
          (sum, item) =>
            item.status === "removed" || item.status === "unavailable"
              ? sum
              : sum + item.price * item.quantity,
          0,
        );
        return { ...order, items: updatedItems, total: newTotal };
      }),
    );
  };

  const updateMenuItemAvailability = (itemId: string, available: boolean) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, available } : item)),
    );
  };

  const setSessionInfo = (restId: string, table: string) => {
    setRestaurantId(restId);
    setTableNumber(table);
  };

  return (
    <StoreContext.Provider
      value={{
        user,
        login,
        logout,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        orders,
        addOrder,
        updateOrderStatus,
        updateOrderItemQuantity,
        addItemsToOrder,
        updateOrderItemStatus,
        removeOrderItem,
        activeOrderId,
        setActiveOrder,
        menuItems,
        updateMenuItemAvailability,
        restaurantId,
        tableNumber,
        setSessionInfo,
        isLoading,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
