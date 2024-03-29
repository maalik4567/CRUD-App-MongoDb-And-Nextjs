"use client"
import Image from "next/image";
import StdData from "@/components/StudentsData/StudentsData"
import StdFormData from "@/components/StudentsData/StudentForm"
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="mb-10 text-4xl font-bold mb-4">CRUD APP CONNECT MONGODB and NEXTJS</h1>
        <StdFormData/>
        <StdData/>
    </main>
  );
}
