import Link from "next/link";

import {
  UsersIcon,
  TagIcon,
  ChatBubbleBottomCenterIcon,
  DocumentIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/solid";
function index() {
  return (
    <div className="admin__sidebar">
      <Link href="/admin" className="admin__sidebar-title">
        <AdjustmentsHorizontalIcon className="icon" />
        Dashboard
      </Link>
      <ul className="admin__sidebar-list">
        <Link href="/admin/users" className="admin__sidebar-link">
          <UsersIcon className="icon" />
          Users
        </Link>
        <Link href="/admin/posts" className="admin__sidebar-link">
          <DocumentIcon className="icon" />
          Posts
        </Link>
        <Link href="/admin/categories" className="admin__sidebar-link">
          <TagIcon className="icon" />
          Categories
        </Link>
        <Link href="/admin/comments" className="admin__sidebar-link">
          <ChatBubbleBottomCenterIcon className="icon" />
          Comments
        </Link>
      </ul>
    </div>
  );
}

export default index;
