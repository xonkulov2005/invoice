// import { buttonVariants } from "./ui/button";

// export default function StatusBadge({ status = "draft" }) {
//   const style = {
//     draft: {
//       dote: "bg-[rgba(55,59,83,1)]",
//       color: "rgba(55,59,83,1)",
//       bg: "rgba(55,59,83,0.05)",
//     },
//     paid: {
//       dote: "bg-[#33D69F]",
//       color: "#33D69F",
//       bg: "rgba(51,214,159,0.05)",
//     },
//     pending: {
//       dote: "bg-[#FF8F00]",
//       color: "#FF8F00",
//       bg: "rgba(255,143,0,0.05)",
//     },
//   };

//   return (
//     <span
//       className={`${buttonVariants({
//         variant: "outline",
//       })} min-w-[104px]`}
//       style={{
//         backgroundColor: style[status].bg,
//         color: style[status].color,
//       }}
//     >
//       <span
//         className={`inline-block w-2 h-2 rounded-full ${style[status].dote}`}
//       ></span>
//       <span className="capitalize">{status}</span>
//     </span>
//   );
// }
import { buttonVariants } from "./ui/button";

export default function StatusBadge({ status = "paid" }) {
  const style = {
    draft: {
      dote: "bg-[rgba(55,59,83,1)]",
      text: "text-[rgba(55,59,83,1)]",
      bg: "rgba(55,59,83,0.05)",
    },
    paid: {
      dote: "bg-[#33D69F]",
      text: "text-[#33D69F]",
      bg: "rgba(51,214,159, 0.05)",
    },
    pending: {
      dote: "bg-[#FF8F00]",
      text: "text-[#FF8F00]",
      bg: "rgba(255,143,0, 0.05)",
    },
  };

  const currentStyle = style[status] || style["draft"];

  return (
    <span
      className={`${buttonVariants({
        variant: "outline",
      })} min-w-[104px] flex items-center gap-2 justify-center rounded-full px-3 py-1`}
      style={{ backgroundColor: currentStyle.bg }}
    >
      <span
        className={`inline-block w-2 h-2 rounded-full ${currentStyle.dote}`}
      ></span>
      <span className={`capitalize ${currentStyle.text}`}>{status}</span>
    </span>
  );
}
