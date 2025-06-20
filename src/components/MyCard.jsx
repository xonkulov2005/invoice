import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StatusBadge from "./StatusBadge";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MyCard({
  createdAt = "Due  19 Aug 2021",
  clientName = "Jensen Huang",
  price = "1,800.90",
  status = "draft",
  id = "1",
}) {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => {
        navigate(`/${id}`);
      }}
      className="border-2 border-transparent hover:border-blue-400 transition-colors"
    >
      <CardHeader>
        <div className="custom-responsive-layout grid-cols-2 grid-rows-3 gap-3">
          <CardTitle>#{id}</CardTitle>
          <CardDescription>{createdAt}</CardDescription>
          <span className="text-[#858BB2]">{clientName}</span>
          <span className="text-[16px] font-[700]">£ {price}</span>
          <StatusBadge status={status} />
          <ArrowRight className="text-[#7C5DFA] none" />
        </div>
      </CardHeader>
    </Card>
  );
}
