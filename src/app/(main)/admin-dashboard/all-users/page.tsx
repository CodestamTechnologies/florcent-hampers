"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/providers/authProvider";

import type { Order } from "@/lib/types";
import AdminDashboard from "../page";

type FirestoreUserData = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  lastLogin: string | null;
  createdAt: string;
  orders?: Order[];
};

export default function UserAndOrdersPage() {
  const { allusers } = useAuth();

  const [selectedUser, setSelectedUser] = useState<FirestoreUserData | null>(
    null
  );
  console.log(selectedUser?.orders)
  return (
    <div className="p-6">
            <AdminDashboard/>

      <h1 className="text-2xl font-bold mb-6">Users and Their Orders</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allusers?.map((user) => (
          <Card key={user.uid}>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarImage
                  src={user?.photoURL || ""}
                  alt={user?.displayName || ""}
                />
                <AvatarFallback>{user?.displayName?.[0] || ""}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{user.displayName}</CardTitle>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-gray-600">
                <strong>Created:</strong>{" "}
                {new Date(user.createdAt).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 mb-3">
                <strong>Last Login:</strong>{" "}
                {new Date(user.lastLogin).toLocaleString()}
              </p>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => setSelectedUser(user)}
                    variant="outline"
                  >
                    View Orders
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>
                      Orders for {selectedUser?.displayName}
                    </DialogTitle>
                  </DialogHeader>

                  {selectedUser?.orders?.length ? (
                    <ul className="space-y-4 mt-4 overflow-y-auto h-[70vh] my-2 py-4">
                      {selectedUser.orders.map((order) => (
                        <li
                          key={order.id}
                          className="border rounded-lg p-4 text-sm bg-white shadow-sm"
                        >
                          {/* Order Info */}
                          <div className="mb-2">
                            <p><strong>Order ID:</strong> {order.id}</p>
                            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                            <p><strong>Checkout Method:</strong> {order.checkoutMethod}</p>
                            {order.pickupDate && <p><strong>Pickup Date:</strong> {order.pickupDate}</p>}
                            <p><strong>Store Location:</strong> {order.storeLocation}</p>
                          </div>

                          {/* Contact Info */}
                          <div className="mb-2">
                            <p><strong>Customer:</strong> {order.contact.fullName}</p>
                            <p><strong>Phone:</strong> {order.contact.phone}</p>
                            <p><strong>Email:</strong> {order.contact.email}</p>
                          </div>

                          {/* Cart Items */}
                          <div className="mb-2">
                            <strong>Items:</strong>
                            <ul className="mt-2 space-y-2">
                              {order.cartItems.map((item, index) => (
                                <li key={index} className="flex items-center gap-4">
                                  <img
                                    src={item.product.images[0]}
                                    alt={item.product.title}
                                    className="w-16 h-16 object-cover rounded"
                                  />
                                  <div>
                                    <p className="font-semibold">{item.product.title}</p>
                                    <p>Qty: {item.quantity}</p>
                                    <p>Price: ₹{item.product.priceBeforeDiscount}</p>
                                    <p>Discount: {item.product.discount}%</p>
                                    {/* {item?.product?.colors?.[0]?.name && (
                                      <p>Color: {item.product.colors[0].name}</p>
                                    )} */}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Payment Summary */}
                          <div className="mt-3 pt-3 border-t text-sm grid grid-cols-2 gap-2">
                            <p><strong>Subtotal:</strong> ₹{order.subtotal}</p>
                            <p><strong>Tax:</strong> ₹{order.tax}</p>
                            {(order?.shippingFee ?? 0) > 0 && <p><strong>Shipping Fee:</strong> ₹{order.shippingFee ?? 0}</p>}
                            {order.codFee > 0 && <p><strong>COD Fee:</strong> ₹{order.codFee}</p>}
                            <p className="col-span-2"><strong>Total:</strong> ₹{order.total}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 mt-4">No orders found.</p>
                  )}

                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
