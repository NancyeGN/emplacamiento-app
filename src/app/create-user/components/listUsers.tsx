"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";

export default function UsersList() {

  const users = useQuery(api.users.get);
  
  return (
    <div>
       <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Corre Electronico</TableHead>
              <TableHead>Clerk Id</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.clerkId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </div>
  );
}