import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Nat32 "mo:core/Nat32";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Migration "migration";

// Use migration to update actor state on upgrade!
(with migration = Migration.run)
actor {
  type Product = {
    productId : Nat32;
    name : Text;
    description : Text;
    price : Nat;
    unit : Text; // liters/kg
    imageRef : Text;
    available : Bool;
    isInstant : Bool;
  };

  type CartItem = {
    productId : Nat32;
    quantity : Nat;
  };

  type Order = {
    orderId : Nat32;
    customerName : Text;
    phoneNumber : Text;
    address : Text; // Sitamarhi-specific address
    items : [CartItem];
    totalAmount : Nat;
  };

  let productCatalog = Map.empty<Nat32, Product>();
  let shoppingCarts = Map.empty<Principal, [CartItem]>();
  let orders = Map.empty<Nat32, Order>();

  // Products
  public shared ({ caller }) func addProduct(productId : Nat32, name : Text, description : Text, price : Nat, unit : Text, imageRef : Text, isInstant : Bool) : async () {
    let product : Product = {
      productId;
      name;
      description;
      price;
      unit;
      imageRef;
      available = true;
      isInstant;
    };
    productCatalog.add(productId, product);
  };

  public query ({ caller }) func getAvailableProducts() : async [Product] {
    let products = productCatalog.values().toArray();
    products.filter(
      func(product) {
        product.available;
      }
    );
  };

  // Cart
  public shared ({ caller }) func addToCart(productId : Nat32, quantity : Nat) : async () {
    let cart = switch (shoppingCarts.get(caller)) {
      case (null) { [] };
      case (?existingCart) { existingCart };
    };
    let newItem : CartItem = { productId; quantity };
    shoppingCarts.add(caller, cart.concat([newItem]));
  };

  public query ({ caller }) func viewCart() : async [CartItem] {
    switch (shoppingCarts.get(caller)) {
      case (null) { [] };
      case (?cart) { cart };
    };
  };

  // Orders
  public shared ({ caller }) func placeOrder(orderId : Nat32, customerName : Text, phoneNumber : Text, address : Text) : async () {
    let cartItems = switch (shoppingCarts.get(caller)) {
      case (null) { Runtime.trap("Cart is empty") };
      case (?cart) { cart };
    };

    let totalAmount = cartItems.foldLeft(
      0,
      func(acc, item) {
        switch (productCatalog.get(item.productId)) {
          case (null) { acc };
          case (?product) { acc + (product.price * item.quantity) };
        };
      },
    );

    let order : Order = {
      orderId;
      customerName;
      phoneNumber;
      address;
      items = cartItems;
      totalAmount;
    };
    orders.add(orderId, order);
    shoppingCarts.remove(caller);
  };
};
