"use client";
import DashboardTitle from "@/app/(components)/shared/dashboard-title/DashboardTitle";
import { AddAdmin } from "@/app/(components)/ui/add-admin-dialog/AddAdmin";
import { Spinner } from "@/components/ui/spinner";
import { getAdmins } from "@/services/dashboard-actions/admins/getAdmins";
import { useEffect, useState } from "react";
export default function page() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const res = await getAdmins();
      if (res?.success) {
        setAdmins(res?.admins);
      }
    } catch (error) {
      console.error("Error Fetching Admins", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row md:gap-0 items-center justify-between">
        <DashboardTitle
          title={"Admins Mangement"}
          description={"Here you can mange your admins"}
        />
        <AddAdmin />
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Spinner className={"size-10"} />
        </div>
      ) : admins?.length > 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mt-5">
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm font-medium">
                  <th className="p-4">Admin ID</th>
                  <th className="p-4">Admin Email</th>
                  <th className="p-4">First Name</th>
                  <th className="p-4">Last Name</th>

                  <th className="p-4">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {admins.map((admin) => (
                  <tr
                    key={admin.id}
                    className="hover:bg-gray-50/70 transition-colors"
                  >
                    <td className="p-4 font-semibold text-slate-900">
                      #{admin.id}
                    </td>
                    <td className="p-4 text-gray-600">{admin.email}</td>
                    <td className="p-4 text-gray-600">{admin.firstName}</td>
                    <td className="p-4 text-gray-600">{admin.lastName}</td>
                    <td className="p-4 text-gray-600">{admin.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500 shadow-sm mt-5">
          No admins found yet.
        </div>
      )}
    </div>
  );
}
