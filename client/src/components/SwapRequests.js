import React, { useEffect, useState } from "react";

const SwapRequests = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/items/requests/incoming", {
          headers: { Authorization: token },
        });

        const data = await res.json();
        console.log("✅ Swap requests API response:", data);

        if (res.ok && Array.isArray(data)) {
          setRequests(data);
        } else {
          setRequests([]); // fallback
          setError("Something went wrong while loading requests.");
        }
      } catch (err) {
        console.error("❌ API Error:", err);
        setError("Server error occurred.");
        setRequests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [token]);

  const handleAction = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/items/swap/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ status }),
      });

      const result = await res.json();
      alert(result.msg || `Request ${status}`);
      window.location.reload();
    } catch (err) {
      alert("Failed to update request.");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-indigo-600">📩 Incoming Swap Requests</h2>

      {requests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requests.map((r) => (
            <div key={r._id} className="border p-4 rounded bg-gray-50 shadow">
              <img
                src={r.item?.imageUrl}
                alt={r.item?.title}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h3 className="font-semibold">{r.item?.title}</h3>
              <p>
                <strong>Requested by:</strong> {r.requester?.name}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="capitalize">{r.status}</span>
              </p>

              {r.status === "pending" && (
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleAction(r._id, "accepted")}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleAction(r._id, "rejected")}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No swap requests found.</p>
      )}
    </div>
  );
};

export default SwapRequests;
