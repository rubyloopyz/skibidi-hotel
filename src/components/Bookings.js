import React, { useState } from "react";
import { Table, Modal, Button, Form, Input, DatePicker, Select, message } from "antd";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";

const { Option } = Select;

const Bookings = () => {
  const [bookings, setBookings] = useState([
    { id: 1, name: "John Doe", room: "Deluxe", people: 2, checkin: "2024-06-10", checkout: "2024-06-12" },
    { id: 2, name: "Jane Smith", room: "Standard", people: 1, checkin: "2024-06-15", checkout: "2024-06-18" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [form] = Form.useForm();

  // Open Modal for Editing
  const handleEdit = (record) => {
    setSelectedBooking(record);
    form.setFieldsValue({
      name: record.name,
      room: record.room,
      people: record.people,
      dates: [moment(record.checkin), moment(record.checkout)],
    });
    setIsModalOpen(true);
  };

  // Open Modal for Adding New Booking
  const handleAdd = () => {
    setSelectedBooking(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  // Save Changes (Edit or Add)
  const handleSave = () => {
    form.validateFields().then((values) => {
      const newBooking = {
        id: selectedBooking ? selectedBooking.id : bookings.length + 1,
        name: values.name,
        room: values.room,
        people: values.people,
        checkin: values.dates[0].format("YYYY-MM-DD"),
        checkout: values.dates[1].format("YYYY-MM-DD"),
      };

      const updatedBookings = selectedBooking
        ? bookings.map((b) => (b.id === selectedBooking.id ? newBooking : b))
        : [...bookings, newBooking];

      setBookings(updatedBookings);
      setIsModalOpen(false);
      message.success(`Booking ${selectedBooking ? "updated" : "added"} successfully!`);
    });
  };

  // Delete Booking
  const handleDelete = (id) => {
    setBookings(bookings.filter((booking) => booking.id !== id));
    message.success("Booking deleted successfully!");
  };

  // Table Columns
  const columns = [
    { title: "Guest Name", dataIndex: "name", key: "name" },
    { title: "Room Type", dataIndex: "room", key: "room" },
    { title: "People", dataIndex: "people", key: "people" },
    { title: "Check-in Date", dataIndex: "checkin", key: "checkin" },
    { title: "Check-out Date", dataIndex: "checkout", key: "checkout" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button type="primary" onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>Bookings Management</h2>
      
      {/* ➕ Add Booking Button */}
      <Button type="primary" style={{ marginBottom: 20 }} onClick={handleAdd}>
        ➕ Add Booking
      </Button>

      <Table columns={columns} dataSource={bookings} rowKey="id" />

      {/* 📅 Booking Calendar */}
      <h2 style={{ marginTop: "20px" }}>📆 Booking Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={bookings.map((b) => ({
          title: `${b.name} - ${b.room}`,
          start: b.checkin,
          end: moment(b.checkout).add(1, "days").format("YYYY-MM-DD"), // Extend to cover full checkout day
        }))}
      />

{/* 📝 Add/Edit Booking Modal */}
      <Modal
        title={selectedBooking ? "Edit Booking" : "Add New Booking"}
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            Save Changes
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Guest Name" name="name" rules={[{ required: true, message: "Please enter guest name!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Room Type" name="room" rules={[{ required: true, message: "Please select a room type!" }]}>
            <Select>
              <Option value="Standard">Standard</Option>
              <Option value="Deluxe">Deluxe</Option>
              <Option value="Suite">Suite</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Number of People" name="people" rules={[{ required: true, message: "Please enter number of people!" }]}>
            <Input type="number" min={1} />
          </Form.Item>
          <Form.Item
            label="Select Dates"
            name="dates"
            rules={[{ required: true, message: "Please select check-in and check-out dates!" }]}
          >
            <DatePicker.RangePicker />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Bookings;