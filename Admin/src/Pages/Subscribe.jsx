import React, { useEffect } from "react";
import { Table, Spin, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubscriptions } from "../features/Contact & Subscription/c&sSlice.js";

export const Subscibe = () => {
  const dispatch = useDispatch();
  const { subscriptions, loading, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchSubscriptions());
  }, [dispatch]);

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "50px",
          background: "#1a1c2e",
          borderRadius: "12px",
        }}
      >
        <Spin size="large" />
        <p style={{ color: "#e0e0e0", marginTop: "10px" }}>
          Loading subscriptions...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "50px",
          background: "#1a1c2e",
          borderRadius: "12px",
        }}
      >
        <p style={{ color: "#ff4d4f" }}>
          Failed to load subscriptions. Please try again.
        </p>
      </div>
    );
  }

  const dataSource = subscriptions.map((subscription) => ({
    key: subscription._id,
    email: subscription.email,
  }));

  return (
    <div
      style={{ padding: "20px", background: "#1a1c2e", borderRadius: "12px" }}
    >
      <h2
        style={{
          color: "#00ddeb",
          fontSize: "24px",
          fontWeight: 600,
          marginBottom: "20px",
        }}
      >
        Subscriptions
      </h2>
      <Table
        dataSource={dataSource}
        columns={columns}
        style={{ background: "#2a2c4e", borderRadius: "8px" }}
        rowStyle={{ background: "#2a2c4e", color: "#e0e0e0" }}
      />
    </div>
  );
};

export default Subscibe;
