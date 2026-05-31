"use client";
import { Spinner } from "@/components/ui/spinner";
import { getUsers } from "@/services/dashboard-actions/users/users";
import React, { useEffect, useState } from "react";

export default function page() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      if (res?.success) {
        setUsers(res.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Users Management</h1>
        <p className="text-sm text-gray-500">
          Track and manage your store's users.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Spinner className={"size-14"} />
        </div>
      ) : users?.length > 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm font-medium">
                  <th className="p-4">User ID</th>
                  <th className="p-4">User Email</th>
                  <th className="p-4">First Name</th>
                  <th className="p-4">Last Name</th>
                  <th className="p-4">Address</th>
                  <th className="p-4">Phone Number</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50/70 transition-colors"
                  >
                    <td className="p-4 font-semibold text-slate-900">
                      #{user.id}
                    </td>
                    <td className="p-4 text-gray-600">{user.email}</td>
                    <td className="p-4 text-gray-600">{user.firstName}</td>
                    <td className="p-4 text-gray-600">{user.lastName}</td>
                    <td className="p-4 text-gray-600">{user.address}</td>
                    <td className="p-4 text-gray-600">{user.phoneNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500 shadow-sm">
          No users found yet.
        </div>
      )}
    </div>
  );
}
