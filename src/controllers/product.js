import axios from "axios";
import joi from "joi";
import dotenv from "dotenv";
import Product from "../models/product";

dotenv.config();
const { API_URI } = process.env;
const productSchema = joi.object({
    name: joi.string().required(),
});

export const getAll = async (req, res) => {
    try {
        const products = await Product.find();
        if (products.length === 0) {
            return res.json({
                message: "Không có san pham nao",
            });
        }
        return res.json(products);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const get = async function (req, res) {
    try {
        const product = await Product.find(req.params.id);
        if (!product) {
            return res.json({
                message: "Không có sản phẩm nào",
            });
        }
        return res.json(product);
    }
    catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const create = async function (req, res) {
    try {
        const { error } = productSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,

            });

        }
        const product = await Product.create(req.body);
        if (!product) {
            return res.json({
                message: "Không thêm sản phẩm nào",
            });
        }
        return res.json({
            message: "Thêm san pham thanh cong",
            data: product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const update = async function (req, res) {
    try {
        const product = await Product.updateOne({
            _id: req.params.id
        }, req.body)

        if (!product) {
            return res.json({
                message: "Cập nhật sản phẩm ko thành công",
            });
        }
        return res.json({
            message: "Cập nhật sản phẩm thành công",
            data: product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const remove = async function (req, res) {
    try {
        const product = await Product.deleteOne({
            _id: req.params.id
        })
        res.json({
            message: "Xóa thành công",
        });

    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
