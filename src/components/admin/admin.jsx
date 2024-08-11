"use client";
import { useState } from "react";

const Admin = ({}) => {
  const initialUsers = [
    {
        id: "1",
        leader_name: "John Doe",
        member1_name: "Jane Doe",
        member2_name: "Jim Doe",
        email: "john@example.com",
        instance: "Example University",
        num_phone: "1234567890",
        competition_category: "Category A",
        competition_payment: "Paid",
        competition_status: true,
        workshop_payment: "Paid",
        workshop_status: false,
      },
      {
        id: "2",
        leader_name: "Alice Smith",
        member1_name: "Bob Smith",
        member2_name: "Charlie Smith",
        email: "alice@example.com",
        instance: "Another University",
        num_phone: "0987654321",
        competition_category: "Category B",
        competition_payment: "Paid",
        competition_status: true,
        workshop_payment: "Paid",
        workshop_status: true,
      },
      {
        id: "3",
        leader_name: "Tom Brown",
        member1_name: "Jerry Brown",
        member2_name: "Tina Brown",
        email: "tom@example.com",
        instance: "Some University",
        num_phone: "1122334455",
        competition_category: "Category C",
        competition_payment: "Unpaid",
        competition_status: false,
        workshop_payment: "Paid",
        workshop_status: true,
      },
      {
        id: "4",
        leader_name: "Emma White",
        member1_name: "Sophia White",
        member2_name: "Liam White",
        email: "emma@example.com",
        instance: "Tech University",
        num_phone: "2233445566",
        competition_category: "Category D",
        competition_payment: "Paid",
        competition_status: true,
        workshop_payment: "Unpaid",
        workshop_status: false,
      },
      {
        id: "5",
        leader_name: "Olivia Green",
        member1_name: "Isabella Green",
        member2_name: "Mason Green",
        email: "olivia@example.com",
        instance: "Innovation University",
        num_phone: "3344556677",
        competition_category: "Category E",
        competition_payment: "Unpaid",
        competition_status: false,
        workshop_payment: "Unpaid",
        workshop_status: false,
      },
      {
        id: "6",
        leader_name: "William Black",
        member1_name: "Elijah Black",
        member2_name: "James Black",
        email: "william@example.com",
        instance: "Business University",
        num_phone: "4455667788",
        competition_category: "Category F",
        competition_payment: "Paid",
        competition_status: true,
        workshop_payment: "Paid",
        workshop_status: true,
      },
  ];

  const [searchEmail, setSearchEmail] = useState("");
  const [users, setUsers] = useState(initialUsers);

  const handleSearch = (e) => {
    setSearchEmail(e.target.value);
  };

  const filteredUsers = users.filter((user) => user.email.toLowerCase().includes(searchEmail.toLowerCase()));

  return (
    <div className="flex-col flex justify-start items-start p-4">
      <h1 className="text-4xl md:text-6xl font-semibold mb-10">TABEL USER</h1>

      <input
        type="text"
        value={searchEmail}
        onChange={handleSearch}
        placeholder="Cari berdasarkan email"
        className="text-black mb-4 p-3 pl-10 w-full max-w-md border border-gray-400 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-main-primary transition duration-300 ease-in-out bg-white"
      />

      <div className="overflow-x-auto w-full">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-500 text-white">
              <th className="py-2 px-4 border-b border-r">ID</th>
              <th className="py-2 px-6 border-b border-r">Nama Ketua</th>
              <th className="py-2 px-6 border-b border-r">Nama Anggota 1</th>
              <th className="py-2 px-6 border-b border-r">Nama Anggota 2</th>
              <th className="py-2 px-6 border-b border-r">Email</th>
              <th className="py-2 px-6 border-b border-r">Institusi</th>
              <th className="py-2 px-6 border-b border-r">Nomor Telepon</th>
              <th className="py-2 px-12 border-b border-r">Detail Kompetisi & Workshop</th>
              <th className="py-2 px-6 border-b border-r">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index} className="hover:bg-gray-700 text-center">
                <td className="py-2 px-4 border-b border-r">{user.id}</td>
                <td className="py-2 px-4 border-b border-r">{user.leader_name}</td>
                <td className="py-2 px-4 border-b border-r">{user.member1_name}</td>
                <td className="py-2 px-4 border-b border-r">{user.member2_name}</td>
                <td className="py-2 px-4 border-b border-r">{user.email}</td>
                <td className="py-2 px-4 border-b border-r">{user.instance}</td>
                <td className="py-2 px-4 border-b border-r">{user.num_phone}</td>
                <td className="py-2 px-4 border-b border-r text-start">
                  <div>
                    <strong>Kategori Kompetisi:</strong> {user.competition_category}
                  </div>
                  <br />
                  <div>
                    <strong>Pembayaran Kompetisi: </strong>
                    <a href="/path-to-pdf" className="text-blue-500 underline">
                      Download PDF
                    </a>
                  </div>
                  <div className={`mt-2 px-2 py-1 inline-block text-white rounded ${user.competition_status ? "bg-green-500" : "bg-red-500"}`}>
                    {user.competition_status ? "Lunas" : "Belum Lunas"}
                  </div>
                  <br />
                  <div className="mt-4">
                    <strong>Pembayaran Workshop: </strong>
                    <a href="/path-to-pdf" className="text-blue-500 underline">
                      Download PDF
                    </a>
                  </div>
                  <div className={`mt-2 px-2 py-1 inline-block text-white rounded ${user.workshop_status ? "bg-green-500" : "bg-red-500"}`}>
                    {user.workshop_status ? "Lunas" : "Belum Lunas"}
                  </div>
                </td>
                <td className="py-2 px-4 border-b border-r">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Verifikasi Pembayaran</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
