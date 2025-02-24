import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { DashboardOutlined, CalendarOutlined } from "@ant-design/icons";
import Dashboard from "./components/Dashboard";
import Bookings from "./components/Bookings";

const { Header, Content, Sider } = Layout;

const App = () => {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        {/* Sidebar Menu */}
        <Sider collapsible>
        <Menu
  theme="dark"
  mode="inline"
  defaultSelectedKeys={["dashboard"]}
  style={{ fontSize: "16px", fontWeight: "bold" }}
>
  <Menu.Item key="dashboard" icon={<DashboardOutlined />} style={{ marginTop: "20px" }}>
    <Link to="/">Dashboard</Link>
  </Menu.Item>
  <Menu.Item key="bookings" icon={<CalendarOutlined />}>
    <Link to="/bookings">Bookings</Link>
  </Menu.Item>
</Menu>
        </Sider>

        {/* Content Area */}
        <Layout>
          <Header style={{ background: "#fff", padding: 0, textAlign: "center", fontSize: "20px" }}>
            Admin Dashboard
          </Header>
          <Content style={{ margin: "20px" }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/bookings" element={<Bookings />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
