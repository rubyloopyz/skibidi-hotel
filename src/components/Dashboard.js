import React, { useEffect, useState } from "react";
import { Card, Row, Col, List, Spin } from "antd";
import { Bar, Line, Pie } from "react-chartjs-2";
import axios from "axios";
import "chart.js/auto"; // Required for Chart.js
 
const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    axios
      .get("https://your-api-url.com/dashboard-data") // 🔹 Replace with your API
      .then((response) => {
        setStats(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);
 
  if (loading) {
    return <Spin size="large" style={{ display: "block", margin: "auto" }} />;
  }
 
  // 📊 Chart Data
  const barData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Booking Arrivals (%)",
        data: stats?.bookingArrivals || [65, 75, 80, 90, 95],
        backgroundColor: "#40c9ff",
      },
    ],
  };
 
  const pieDataAge = {
    labels: ["Child", "Adult", "Middle Age", "Elder"],
    datasets: [
      {
        data: stats?.ageGroups || [20, 50, 20, 10],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#8DFF33"],
      },
    ],
  };
 
  const pieDataGuests = {
    labels: ["Members", "General Guests"],
    datasets: [
      {
        data: stats?.guestComparison || [60, 40],
        backgroundColor: ["#40c9ff", "#FF6384"],
      },
    ],
  };
 
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Total Income ($)",
        data: stats?.totalIncome || [5000, 7000, 8000, 9000, 11000],
        borderColor: "#40c9ff",
        backgroundColor: "rgba(64, 201, 255, 0.2)",
      },
    ],
  };
 
  return (
<div>
<h1 style={{ textAlign: "center", marginBottom: "20px" }}>📊 Admin Dashboard</h1>
 
      {/* 📌 Cards Row */}
<Row gutter={16}>
<Col span={8}>
<Card title="Arrivals & Departures Today">
<h2>Arrivals: {stats?.arrivalsToday || 0}</h2>
<h2>Departures: {stats?.departuresToday || 0}</h2>
</Card>
</Col>
<Col span={8}>
<Card title="Canceled Bookings (This Month)">
<h2>{stats?.canceledBookings || 0} ({stats?.canceledPercentage || 0}%)</h2>
</Card>
</Col>
<Col span={8}>
<Card title="Occupancy Rate & ADR">
<h2>Occupancy: {stats?.occupancyRate || 0}%</h2>
<h2>ADR: ${stats?.averageDailyRate || 0}</h2>
</Card>
</Col>
</Row>
 
      {/* 📅 Lists */}
<Row gutter={16} style={{ marginTop: "20px" }}>
<Col span={12}>
<Card title="Guest Birthdays (This Month)">
<List
              dataSource={stats?.birthdays || []}
              renderItem={(item) => <List.Item>{item.name} - {item.date}</List.Item>}
            />
</Card>
</Col>
<Col span={12}>
<Card title="Most Frequently Booked Units">
<List
              dataSource={stats?.mostBookedUnits || []}
              renderItem={(item) => <List.Item>{item.room} - {item.bookings} bookings</List.Item>}
            />
</Card>
</Col>
</Row>
 
      {/* 📊 Charts */}
<Row gutter={16} style={{ marginTop: "20px" }}>
<Col span={12}>
<Card title="Booking Arrivals (%)" className="chart-container">
<Bar data={barData} />
</Card>
</Col>
<Col span={12}>
<Card title="Age Group Segmentation" className="chart-container">
<Pie data={pieDataAge} />
</Card>
</Col>
</Row>
 
      <Row gutter={16} style={{ marginTop: "20px" }}>
<Col span={12}>
<Card title="Members vs General Guests" className="chart-container">
<Pie data={pieDataGuests} />
</Card>
</Col>
<Col span={12}>
<Card title="Total Income (Monthly & Yearly)" className="chart-container">
<Line data={lineData} />
</Card>
</Col>
</Row>
</div>
  );
};
 
export default Dashboard;

