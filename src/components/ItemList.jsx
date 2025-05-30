// import { useState } from "react";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import { PlusCircle, Trash2 } from "lucide-react";
// import { toast } from "sonner";

// export default function ItemList() {
//   const [items, setItems] = useState([
//     {
//       id: crypto.randomUUID(),
//       name: "Banner Design",
//       quantity: 2,
//       price: 156,
//       get total() {
//         return this.price * this.quantity;
//       },
//     },
//     {
//       id: crypto.randomUUID(),
//       name: "Banner Design",
//       quantity: 2,
//       price: 156,
//       get total() {
//         return this.price * this.quantity;
//       },
//     },
//     {
//       id: crypto.randomUUID(),
//       name: "Banner Design",
//       quantity: 2,
//       price: 156,
//       get total() {
//         return this.price * this.quantity;
//       },
//     },
//   ]);

//   function handleChange(e, id) {
//     const changedItem = items.find((el) => {
//       return el.id === id;
//     });
//     changedItem[e.target.name] = e.target.value;

//     setItems((prev) => {
//       const mapped = prev.map((el) => {
//         if (el.id === changedItem.id) {
//           return changedItem;
//         } else {
//           return el;
//         }
//       });
//       return mapped;
//     });
//   }

//   function handleClick(type, id) {
//     if (type === "add") {
//       setItems((prev) => {
//         if (items.at(-1).name.trim() !== "") {
//           return [
//             ...prev,
//             {
//               id,
//               name: "",
//               quantity: 1,
//               price: 0,
//               get total() {
//                 return this.price * this.quantity;
//               },
//             },
//           ];
//         } else {
//           toast.info("Oxirgi nameni kiriting");
//         }
//       });
//     } else if (type === "delete") {
//       if (items.length === 1) {
//         toast.info("Eng kamida bitta element bo'lishi kerak");
//       }
//       const filtered = items.filter((el) => el.id !== id);
//       setItems(filtered);
//     }
//   }
//   return (
//     <div>
//       <h3>Item List</h3>
//       <div className="flex items-center justify-between">
//         <span>Item Name</span>
//         <span>Qty.</span>
//         <span>Price</span>
//         <span>Total</span>
//       </div>
//       <ul className="flex flex-col gap-5 mb-5">
//         {items.map(({ name, quantity, price, total, id }) => {
//           return (
//             <li className="flex items-center justify-between" key={id}>
//               <Input
//                 onChange={(e) => handleChange(e, id)}
//                 defaultValue={name}
//                 className="w-[210px]"
//                 type="text"
//                 name="name"
//                 placeholder="Item Name"
//               />
//               <Input
//                 onChange={(e) => handleChange(e, id)}
//                 className="w-[100px]"
//                 type="number"
//                 name="quantity"
//                 defaultValue={quantity}
//                 placeholder="Qty"
//               />
//               <Input
//                 onChange={(e) => handleChange(e, id)}
//                 className="w-[100px]"
//                 defaultValue={price.toFixed(2)}
//                 type="number"
//                 name="price"
//                 placeholder="Price"
//               />
//               <span>{total.toFixed(2)}</span>
//               <Button
//                 onClick={() => handleClick("delete", id)}
//                 variant="destructive"
//                 size="icon"
//               >
//                 <Trash2 />
//               </Button>
//             </li>
//           );
//         })}
//       </ul>
//       <Button
//         onClick={() => handleClick("add", crypto.randomUUID())}
//         className="w-full"
//         variant="secondary"
//       >
//         <PlusCircle />
//         Add New Item
//       </Button>
//     </div>
//   );
// }
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function ItemList() {
  const [items, setItems] = useState([
    {
      id: crypto.randomUUID(),
      name: "Banner Design",
      quantity: 2,
      price: 156,
    },
  ]);

  function handleChange(e, id) {
    const { name, value, type } = e.target;
    const updatedValue = type === "number" ? Number(value) : value;

    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, [name]: updatedValue };
      }
      return item;
    });

    setItems(updatedItems);
  }

  function handleClick(type, id) {
    if (type === "add") {
      if (items.at(-1).name.trim() === "") {
        toast.info("Oxirgi element nomini kiriting");
        return;
      }

      setItems((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          name: "",
          quantity: 1,
          price: 0,
        },
      ]);
    } else if (type === "delete") {
      if (items.length === 1) {
        toast.info("Eng kamida bitta element bo'lishi kerak");
        return;
      }

      const filtered = items.filter((item) => item.id !== id);
      setItems(filtered);
    }
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Item List</h3>
      <div className="flex items-center justify-between text-sm font-medium mb-2">
        <span className="w-[210px]">Item Name</span>
        <span className="w-[100px] text-center">Qty.</span>
        <span className="w-[100px] text-center">Price</span>
        <span className="w-[80px] text-center">Total</span>
        <span className="w-[40px]" />
      </div>

      <ul className="flex flex-col gap-4 mb-5">
        {items.map(({ id, name, quantity, price }) => {
          const total = price * quantity;

          return (
            <li className="flex items-center justify-between gap-2" key={id}>
              <Input
                value={name}
                onChange={(e) => handleChange(e, id)}
                className="w-[210px]"
                type="text"
                name="name"
                placeholder="Item Name"
              />
              <Input
                value={quantity}
                onChange={(e) => handleChange(e, id)}
                className="w-[100px] text-center"
                type="number"
                name="quantity"
                placeholder="Qty"
              />
              <Input
                value={price}
                onChange={(e) => handleChange(e, id)}
                className="w-[100px] text-center"
                type="number"
                name="price"
                placeholder="Price"
              />
              <span className="w-[80px] text-center font-semibold">
                {total.toFixed(2)}
              </span>
              <Button
                onClick={() => handleClick("delete", id)}
                variant="destructive"
                size="icon"
                className="w-[40px]"
              >
                <Trash2 size={18} />
              </Button>
            </li>
          );
        })}
      </ul>

      <Button
        onClick={() => handleClick("add")}
        className="w-full"
        variant="secondary"
      >
        <PlusCircle className="mr-2" />
        Add New Item
      </Button>
    </div>
  );
}
