"use server";
import { revalidatePath } from "next/cache";
// import { getCookie, hasCookie, setCookie } from "cookies-next";
import { cookies } from "next/headers";

/*
cookie cart
{
    'uuid-123-1':1
    'uuid-123-2':3
    'uuid-123-3':2

}
*/


export const getCookieCart = ():{[id:string]:number}=>{
    const cookieStore = cookies();
    if (cookieStore.has("cart")) {
      const cookieCart = JSON.parse(cookieStore.get("cart")?.value??'{}');
      return cookieCart;
    }
    return {};
}


export const addProductToCart = (id:string)=>{
    const cookieStore = cookies();
    const cookieCart = getCookieCart();

    if(cookieCart[id]){
        cookieCart[id] = cookieCart[id]+1;
    }else{
        cookieCart[id] = 1;
    }
    revalidatePath("/dashboard/server-todos");
    revalidatePath("/dashboard/cart");
    cookieStore.set("cart", JSON.stringify(cookieCart));
}

export const removeProductFromCart = (id: string) => {
  const cookieStore = cookies();
  const cookieCart = getCookieCart();
  if(!cookieCart[id]) return;
  
  delete cookieCart[id];
  
  revalidatePath("/dashboard/server-todos");
  cookieStore.set("cart", JSON.stringify(cookieCart));
};

export const removeSingleProductFromCart = (id: string) => {
  const cookieStore = cookies();
  const cookieCart = getCookieCart();
  if (!cookieCart[id]) return;
  
  if (cookieCart[id] === 1) {
    delete cookieCart[id]
  }else{
    cookieCart[id] -= 1;
  } 
  
  
  
  revalidatePath("/dashboard/cart");
  cookieStore.set("cart", JSON.stringify(cookieCart));
};


export const productExistInCart = async (id:string):Promise<boolean>=>{
    const cookieCart = getCookieCart();
    if (!cookieCart[id]) {
        return false;
    }
    return true;
}