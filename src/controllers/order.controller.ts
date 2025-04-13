import { Request, Response } from "express";
import Order from "../models/Order";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    if (items && items.length === 0) {
      res.status(400).json({
        success: false,
        message: "No order items",
      });
      return;
    }

    let itemsPrice = 0;
    itemsPrice = items.reduce((acc: number, item: any) => {
      return acc + item.price * item.quantity;
    }, 0);

    const seller = items[0].seller;

    const order = await Order.create({
      user: req.user._id,
      seller,
      items,
      shippingAddress,
      paymentMethod,
      totalPrice: itemsPrice,
    });

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};

export const getMyOrders = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};
