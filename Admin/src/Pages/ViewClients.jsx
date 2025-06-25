import React, { useEffect } from "react";
import { Table, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getClients, deleteClient } from "../features/Clients/clientSlice";

export const ViewClients = () => {
  const dispatch = useDispatch();
  const { clients, loading } = useSelector((state) => state.clients);

  useEffect(() => {
    dispatch(getClients())
      .unwrap()
      .catch((error) => message.error(`Failed to fetch clients: ${error}`));
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteClient(id))
      .unwrap()
      .then(() => {
        message.success("Client deleted successfully!");
        dispatch(getClients());
      })
      .catch((error) => message.error(`Failed to delete client: ${error}`));
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "image",
      render: (text) => (
        <img
          src={text}
          alt="Client Avatar"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "2px solid #00ddeb",
          }}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <a
          onClick={() => handleDelete(record._id)}
          style={{
            color: "#ff4d4f",
            cursor: "pointer",
            fontWeight: 600,
            transition: "color 0.3s ease",
          }}
        >
          Delete
        </a>
      ),
    },
  ];

  return (
    <div
      style={{
        padding: "16px",
        background: "#1a1c2e",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <h2
        style={{
          color: "#00ddeb",
          fontSize: "24px",
          fontWeight: 600,
          marginBottom: "20px",
        }}
      >
        Client List
      </h2>
      <Table
        dataSource={clients}
        columns={columns}
        rowKey={(record) => record._id}
        loading={loading}
        style={{ background: "#2a2c4e", borderRadius: "8px" }}
        rowStyle={{ background: "#2a2c4e", color: "#e0e0e0" }}
      />
    </div>
  );
};

export default ViewClients;
