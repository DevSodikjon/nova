"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export type CartItem = {
  productId: string;
  color: string;
  size: string;
  qty: number;
};

// For Cart
export type CartKey = Pick<CartItem, "productId" | "color" | "size">;

type ShopContextType = {
  wishlist: string[];
  isWished: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;
  cart: CartItem[];
  cartCount: number;
  addToCart: (item: CartItem) => boolean;

  // For Cart
  ready: boolean;
  setCartQty: (key: CartKey, qty: number) => void;
  removeFromCart: (key: CartKey) => void;
};

const ShopContext = createContext<ShopContextType | null>(null);

function read<T>(key: string): T[] {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "[]");
  } catch {
    return [];
  }
}

function sameItem(a: CartKey, b: CartKey) {
  return (
    a.productId === b.productId && a.color === b.color && a.size === b.size
  );
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const uid = user?.uid;

  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loadedFor, setLoadedFor] = useState<string | null>(null);

  // 1) Foydalanuvchi aniqlanganda shu accountning ma'lumotini o'qiydi
  useEffect(() => {
    if (loading) return;
    if (!uid) {
      setWishlist([]);
      setCart([]);
      setLoadedFor(null);
      return;
    }
    setWishlist(read<string>(`nova:${uid}:wishlist`));
    setCart(read<CartItem>(`nova:${uid}:cart`));
    setLoadedFor(uid);
  }, [uid, loading]);

  // 2) O'zgarganda saqlaydi (o'qib bo'lmaguncha yozmaydi, aks holda bo'sh ro'yxat ustiga yozib yuboradi)
  useEffect(() => {
    if (!uid || loadedFor !== uid) return;
    localStorage.setItem(`nova:${uid}:wishlist`, JSON.stringify(wishlist));
  }, [wishlist, uid, loadedFor]);

  useEffect(() => {
    if (!uid || loadedFor !== uid) return;
    localStorage.setItem(`nova:${uid}:cart`, JSON.stringify(cart));
  }, [cart, uid, loadedFor]);

  // Kirmagan bo'lsa /login ga yuboradi
  function requireUser(): boolean {
    if (loading) return false;
    if (!user) {
      router.push("/login");
      return false;
    }
    return true;
  }

  const toggleWishlist = (productId: string) => {
    if (!requireUser()) return;
    setWishlist((list) =>
      list.includes(productId)
        ? list.filter((x) => x !== productId)
        : [productId, ...list],
    );
  };

  const addToCart = (item: CartItem) => {
    if (!requireUser()) return false;
    setCart((list) =>
      list.some((x) => sameItem(x, item))
        ? list.map((x) =>
            sameItem(x, item) ? { ...x, qty: x.qty + item.qty } : x,
          )
        : [...list, item],
    );
    return true;
  };

  const setCartQty = (key: CartKey, qty: number) => {
    if (!requireUser()) return;
    setCart((list) =>
      qty <= 0
        ? list.filter((x) => !sameItem(x, key))
        : list.map((x) => (sameItem(x, key) ? { ...x, qty } : x)),
    );
  };

  const removeFromCart = (key: CartKey) => setCartQty(key, 0);

  const ready = !loading && (!uid || loadedFor === uid);

  return (
    <ShopContext.Provider
      value={{
        wishlist,
        ready,
        setCartQty,
        removeFromCart,
        isWished: (productId) => wishlist.includes(productId),
        toggleWishlist,
        cart,
        cartCount: cart.reduce((sum, i) => sum + i.qty, 0),
        addToCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop(): ShopContextType {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}
