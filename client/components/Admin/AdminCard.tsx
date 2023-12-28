import { AdminCardProps } from "@/typings/props";
import Link from "next/link";

function AdminCard({ title, count, Icon }: AdminCardProps) {
  return (
    <div className="admin__card">
      <h5 className="admin__card-title">{title}</h5>
      <div className="admin__card-count">{count}</div>
      <div className="admin__card-link-wrapper">
        <Link href={`admin/${title}`} className="admin__card-link">
          {title}
        </Link>
        <div className="admin__cardIcon">
          <Icon className="icon" />
        </div>
      </div>
    </div>
  );
}

export default AdminCard;
