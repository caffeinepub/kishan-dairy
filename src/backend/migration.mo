import Map "mo:core/Map";
import Nat32 "mo:core/Nat32";
import Principal "mo:core/Principal";

module {
  type OldProduct = {
    productId : Nat32;
    name : Text;
    description : Text;
    price : Nat;
    unit : Text;
    imageRef : Text;
    available : Bool;
  };

  type OldActor = {
    productCatalog : Map.Map<Nat32, OldProduct>;
    shoppingCarts : Map.Map<Principal, [CartItem]>;
    orders : Map.Map<Nat32, Order>;
  };

  type CartItem = {
    productId : Nat32;
    quantity : Nat;
  };

  type Order = {
    orderId : Nat32;
    customerName : Text;
    phoneNumber : Text;
    address : Text;
    items : [CartItem];
    totalAmount : Nat;
  };

  type NewProduct = {
    productId : Nat32;
    name : Text;
    description : Text;
    price : Nat;
    unit : Text;
    imageRef : Text;
    available : Bool;
    isInstant : Bool;
  };

  type NewActor = {
    productCatalog : Map.Map<Nat32, NewProduct>;
    shoppingCarts : Map.Map<Principal, [CartItem]>;
    orders : Map.Map<Nat32, Order>;
  };

  public func run(old : OldActor) : NewActor {
    let newProductCatalog = old.productCatalog.map<Nat32, OldProduct, NewProduct>(
      func(_id, oldProduct) {
        { oldProduct with isInstant = false };
      }
    );
    {
      old with
      productCatalog = newProductCatalog
    };
  };
};
