import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

      <div className="space-y-3">
        <Link
          to="/admin/blogs"
          className="block bg-black text-white px-4 py-2 w-48 text-center"
        >
          Manage Blogs
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 w-48"
        >
          Logout
        </button>
      </div>
    </div>
  );
}