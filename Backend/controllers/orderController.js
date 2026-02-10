import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

export const placeOrder = async (req, res) => {
  try {
    const { id } = req.user;
    const { address, paymentMethod } = req.body;
    if (!address) {
      return res
        .status(400)
        .json({ message: "Address is required", success: false });
    }
    if (!paymentMethod) {
      return res
        .status(400)
        .json({ message: "Payment method is required", success: false });
    }
    if (!["cash", "card"].includes(paymentMethod)) {
      return res
        .status(400)
        .json({ message: "Invalid payment method", success: false });
    }
    const cart = await Cart.findOne({ user: id }).populate("items.menuItem");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty", success: false });
    }
    const totalAmount = cart.items.reduce(
      (total, item) => total + item.menuItem.price * item.quantity,
      0,
    );
    const newOrder = await Order.create({
      user: id,
      items: cart.items.map((item) => ({
        menuItem: item.menuItem._id,
        quantity: item.quantity,
      })),
      totalAmount: totalAmount,
      address: address,
      paymentMethod: paymentMethod,
    });
    //clear cart
    cart.items = [];
    await cart.save();
    res.status(201).json({
      message: "Order placed successfully",
      success: true,
      order: newOrder,
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error", success: false });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { id } = req.user;
    const orders = await Order.find({ user: id })
      .populate("items.menuItem")
      .sort({ createdAt: -1 });
    res.status(200).json({
      message: "Orders retrieved successfully",
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error", success: false });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.menuItem")
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json({
      message: "Orders retrieved successfully",
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id || req.params.orderId;
    const { status } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found", success: false });
    }
    order.status = status;
    await order.save();
    res
      .status(200)
      .json({ message: "Order status updated", success: true, order });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
