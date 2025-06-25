import React, { useEffect } from "react";
import { Table, Spin, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../features/Contact & Subscription/c&sSlice.js";

export const Contact = () => {
  const dispatch = useDispatch();
  const { contacts, loading, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
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
          Loading contacts...
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
          Failed to load contacts. Please try again.
        </p>
      </div>
    );
  }

  const dataSource = contacts.map((contact) => ({
    key: contact._id,
    name: contact.name,
    email: contact.email,
    mobile: contact.mobile,
    city: contact.city,
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
        Contact List
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

export default Contact;
