"use client";
import getAugitLogs from "@/libs/getAuditLogs";
import dayjs from "dayjs";
import { AuditLogJson } from "interfaces";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuditLogsPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [auditLogJson, setAuditLogJson] = useState<AuditLogJson>({
    success: false,
    data: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);
  if (!session?.user.token) {
    return;
  }
  useEffect(() => {
    const fetchAuditLogs = async () => {
      try {
        const response = await getAugitLogs(session?.user.token);
        if (session.user.User_info.role !== "admin") {
          setError("You are not an administrator. Access denied.");
          return;
        }
        if (!response.success) {
          setError("Could not fetch audit logs.");
        }
        response.data.reverse();
        setAuditLogJson(response);
      } catch (err) {
        setError("Could not fetch audit logs.");
      } finally {
        setLoading(false);
      }
    };

    fetchAuditLogs();
  }, [refresh]);
  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
      </div>
    );
  if (error)
    return (
      <div className="text-center text-xl text-red-600 p-4 bg-slate-100 rounded-lg shadow-md max-w-md mx-auto">
        {error}
      </div>
    );
  return (
    <main className="p-6 min-h-screen font-sans">
      {session.user.User_info.role === "admin" ? (
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-semibold text-gray-800 mb-5 py-10 font-poppins">
              All Audit Logs
            </h1>
            <h1 className="text-xl font-semibold text-gray-800 mb-2 font-poppins">
              This platform has recorded {auditLogJson.data.length} actions so
              far.
            </h1>
            <h2 className="text-lg text-white font-open-sans">
              Tracks all user actions, changes, and events for transparency and
              accountability.
            </h2>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            {auditLogJson?.data?.length === 0 ? (
              <div className="p-6 text-center text-gray-500 font-open-sans">
                No edit history found.
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {auditLogJson?.data?.map((auditLogItem) => (
                  <div key={auditLogItem._id} className="p-6 font-open-sans">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-lg font-semibold text-gray-700 font-poppins">
                          Audit Log ID: {auditLogItem._id}
                        </div>
                        <div className="text-gray-600">
                          Action: {auditLogItem.action}
                        </div>
                        <div className="text-gray-600">
                          User ID: {auditLogItem.user_id?._id || "Deleted user"}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-600">
                          Target: {auditLogItem.target}
                        </div>
                        <div className="text-gray-600">
                          Target ID: {auditLogItem.target_id}
                        </div>
                        <div className="text-gray-600">
                          Description: {auditLogItem.description}
                        </div>
                        <div className="text-gray-600">
                          Time Stamp: {auditLogItem.timeStamp}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center text-xl text-red-600 p-4 bg-slate-100 rounded-lg shadow-md max-w-md mx-auto">
          You are not an administrator. Access denied.
        </div>
      )}
    </main>
  );
}
