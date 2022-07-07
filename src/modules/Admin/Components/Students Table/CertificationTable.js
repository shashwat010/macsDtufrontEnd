import React, { useState, useEffect } from "react";
import { Input, Button, Space, Typography, message, Spin } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "ant-table-extensions";

const { Text } = Typography;

function CertificationTable(props) {
  const [tableData, setTableData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const certificationData = useSelector(
    (state) => state.AdminReducer.certificationData
  );

  useEffect(() => {
    setTableData(certificationData);
  }, []);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",

    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const headings = [
    {
      title: "Name",
      dataIndex: "student_name",
      key: "student_name",
      width: "13%",
      ...getColumnSearchProps("student_name"),
    },

    {
      title: "Roll no",
      dataIndex: "student_roll",
      key: "student_roll",
      width: "10%",
      ...getColumnSearchProps("student_roll"),
    },

    {
      title: "Email",
      dataIndex: "student_email",
      key: "student_email",
      ...getColumnSearchProps("student_email"),
    },

    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps("title"),
    },
    {
      title: "Issued by",
      dataIndex: "issuingOrganision",
      key: "issuingOrganision",

      ...getColumnSearchProps("issuingOrganision"),
    },
    {
      title: "Issued On",
      dataIndex: "issuedOn",
      key: "issuedOn",

      ...getColumnSearchProps("issuedOn"),
    },

    {
      title: "Link",
      dataIndex: "support_url",
      key: "support_url",
      render: (support_url) => (
        <div>
          {support_url === "" ? (
            <div>No File</div>
          ) : (
            <a href={support_url}>Click here</a>
          )}
        </div>
      ),
    },
  ];
  return (
    <div>
      <p style={{ fontSize: "22px", marginTop: "20px" }}>
        List of all Certifications
      </p>
      <div>
        {tableData === null ? (
          <Spin />
        ) : (
          <Table
            dataSource={tableData}
            columns={headings}
            exportable
            searchable
          />
        )}
      </div>
    </div>
  );
}

export default CertificationTable;
