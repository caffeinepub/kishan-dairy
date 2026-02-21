import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    name: string;
    unit: string;
    description: string;
    productId: number;
    available: boolean;
    imageRef: string;
    isInstant: boolean;
    price: bigint;
}
export interface CartItem {
    productId: number;
    quantity: bigint;
}
export interface backendInterface {
    addProduct(productId: number, name: string, description: string, price: bigint, unit: string, imageRef: string, isInstant: boolean): Promise<void>;
    addToCart(productId: number, quantity: bigint): Promise<void>;
    getAvailableProducts(): Promise<Array<Product>>;
    placeOrder(orderId: number, customerName: string, phoneNumber: string, address: string): Promise<void>;
    viewCart(): Promise<Array<CartItem>>;
}
